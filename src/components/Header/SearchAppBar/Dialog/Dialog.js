import React, {useState, useEffect} from "react";
import {useGet} from "restful-react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {useForm, FormProvider} from "react-hook-form";
import {useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import cn from "classnames/bind";
import _, {add, constant} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import BigNumber from "bignumber.js";
import axios from "axios";
import {reduceString} from "src/lib/scripts";

import LoadingOverlay from "src/components/common/LoadingOverlay";
import consts from "src/constants/consts";
import {showAlert} from "src/store/modules/global";
import {formatOrai} from "src/helpers/helper";
import Alert from "src/components/common/Alert/Alert";
import Keystation from "src/lib/Keystation";
import SendOraiTab from "./SendOraiTab";
import SendTrasactionTab from "./SendTrasactionTab";
import {ReactComponent as CloseIcon} from "src/assets/icons/close.svg";

import styles from "./Dialog.scss";

const cx = cn.bind(styles);

yup.addMethod(yup.number, "lessThanNumber", function(amount) {
	return this.test({
		name: "test-name",
		exclusive: false,
		message: "Transfer amount must be greater than 0 and less than your account's amount",
		test(value) {
			if (_.isNaN(value)) {
				return true;
			}
			return value >= 0 && value <= parseFloat(amount);
		},
	});
});

const TABS = [
	{
		name: "Send ORAI",
		id: 1,
	},
	{
		name: "Send transaction",
		id: 2,
	},
];

const reduceAddress = address => {
	return address.substr(0, 10) + "..." + address.substr(30);
};

export default function FormDialog({show, handleClose, address, account, amount, reFetchAmount}) {
	const [isLoading, setIsLoading] = useState(false);
	const [activeTabId, setActiveTabId] = useState(1);
	const [multiSendData, handleInputMulti] = useState(null);
	const [gas, setGas] = useState(200000);
	const dispatch = useDispatch();
	const history = useHistory();
	const status = useSelector(state => state.blockchain.status);
	const path = `${consts.API.MIN_GAS}`;
	const {data: minGas, loading, error} = useGet({
		path: path,
	});

	const validationSchemaForm1 = yup.object().shape({
		recipientAddress: yup.string().required("Recipient Address Field is Required"),
		sendAmount: yup
			.number()
			.required("Send Amount Field is Required")
			.lessThanNumber(amount / 1000000, "lessThanNumber"),
		// freeMessage: yup.string().required("Recipient Address Field is Required"),
	});

	const validationSchemaForm2 = yup.object().shape({
		freeMessage: yup.string().required("Transaction Field is Required"),
	});

	const methods = useForm({
		// resolver: yupResolver(activeTabId === 1 ? validationSchemaForm1 : validationSchemaForm2),
	});

	const {handleSubmit, errors, register, setValue, getValues, setError} = methods;

	const onSubmit = data => {
		// if (data && (data.sendAmount <= 0 || parseFloat(data.sendAmount) > amount / 1000000)) {
		// 	setError("sendAmount", {
		// 		type: "greater_than_0",
		// 		message: "Transfer amount must be greater than 0 and less than your account's amount",
		// 	});
		// 	return;
		// }
		const myKeystation = new Keystation({
			client: process.env.REACT_APP_WALLET_API,
			lcd: "https://lcd.orai.io",
			path: "44/118/0/0/0",
			keystationUrl: process.env.REACT_APP_WALLET_API,
		});

		let payload;
		if (activeTabId === 1) {
			let msg = [];
			if (multiSendData) {
				console.log(multiSendData);
				msg = multiSendData.map(v => {
					return {
						type: "cosmos-sdk/MsgSend",
						value: {
							from_address: address,
							to_address: v.address,
							amount: [
								{
									denom: "orai",
									amount: new BigNumber(v.amount).multipliedBy(1000000),
								},
							],
						},
					};
				});
			} else {
				msg = [
					{
						type: "cosmos-sdk/MsgSend",
						value: {
							from_address: address,
							to_address: data.recipientAddress,
							amount: [
								{
									denom: "orai",
									amount: new BigNumber(data.sendAmount).multipliedBy(1000000),
								},
							],
						},
					},
				];
			}
			payload = {
				type: "cosmos-sdk/StdTx",
				value: {
					msg,
					fee: {
						amount: [minGas?.estimate_fee],
						gas,
					},
					signatures: null,
					memo: (data && data.memo) || "",
				},
			};
		} else {
			try {
				payload = JSON.parse(data.freeMessage);
			} catch (e) {
				return dispatch(
					showAlert({
						show: true,
						message: "Cannot parse transaction. Please check again!",
						autoHideDuration: 1500,
						type: "error",
					})
				);
			}
		}

		const popup = myKeystation.openWindow("transaction", payload, account);
		let popupTick = setInterval(function() {
			if (popup.closed) {
				clearInterval(popupTick);
			}
		}, 500);
	};

	useEffect(() => {
		const callBack = function(e) {
			if (e && e.data === "deny") {
				return handleClose();
			}
			if (e?.data?.txhash) {
				dispatch(
					showAlert({
						show: true,
						message: "Transaction Successful!",
						autoHideDuration: 3000,
					})
				);
				setIsLoading(true);
				const checkTimeout = async () => {
					const result = await axios.get(`${consts.API_BASE}${consts.API.TX}/${e.data.txhash}`);
					if (!result || !result.data || !result.data.result) {
						setTimeout(checkTimeout, 2000);
					} else {
						history.push(`/txs/${e.data.txhash}`);
						setIsLoading(false);
					}
				};
				setTimeout(checkTimeout, 2000);
				handleClose();
			}
		};
		window.addEventListener("message", callBack, false);
		return () => {
			window.removeEventListener("message", callBack);
		};
	}, [dispatch, handleClose, history, reFetchAmount]);

	const renderTab = id => {
		if (id === 1) {
			return (
				<SendOraiTab
					address={address}
					amount={amount}
					status={status}
					methods={methods}
					handleInputMulti={handleInputMulti}
					minGas={minGas}
					handleChangeGas={setGas}
				/>
			);
		}

		if (id === 2) {
			return <SendTrasactionTab address={address} amount={amount} methods={methods} />;
		}
	};

	const handleClickNext = () => {
		if (multiSendData) {
			return onSubmit();
		}
		return handleSubmit(onSubmit)();
	};

	return (
		<div>
			{isLoading && <LoadingOverlay />}
			<Dialog open={show} onClose={handleClose} aria-labelledby='form-dialog-title'>
				<DialogTitle className={cx("form-dialog-title")} onClick={handleClose}>
					{" "}
					<CloseIcon />{" "}
				</DialogTitle>
				<DialogContent>
					<div className={cx("tab-wrapper")}>
						{TABS.map(({id, name}, index) => {
							return (
								<button className={cx({selected: id === activeTabId})} onClick={() => setActiveTabId(id)} key={"tab-" + index}>
									<p> {name} </p>
								</button>
							);
						})}
					</div>
					<FormProvider {...methods}>{renderTab(activeTabId)}</FormProvider>
				</DialogContent>
				<DialogActions>
					<div className={cx("btn-action-group")}>
						<Button onClick={handleClose} className={cx("btn-cancel")}>
							Cancel
						</Button>
						<Button variant='contained' className={cx("btn-submit")} onClick={handleClickNext}>
							Next
						</Button>
					</div>
				</DialogActions>
			</Dialog>
		</div>
	);
}