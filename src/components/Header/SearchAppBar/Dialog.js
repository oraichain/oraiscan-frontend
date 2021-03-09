import React, {useState, useEffect} from "react";
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
import {reduceString} from "src/lib/scripts";

import LoadingOverlay from "src/components/common/LoadingOverlay";
import consts from "src/constants/consts";
import {showAlert} from "src/store/modules/global";
import {formatOrai} from "src/helpers/helper";
import Alert from "src/components/common/Alert/Alert";
import Keystation from "src/lib/Keystation";
import {InputNumberOrai, TextArea, InputTextWithIcon} from "src/components/common/form-controls";
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
	const [fee, setFee] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [activeTabId, setActiveTabId] = useState(1);
	const dispatch = useDispatch();
	const history = useHistory();
	const status = useSelector(state => state.blockchain.status);
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
		resolver: yupResolver(activeTabId === 1 ? validationSchemaForm1 : validationSchemaForm2),
	});

	const {handleSubmit, errors, register, setValue, getValues, setError} = methods;

	const onSubmit = data => {
		if (data.sendAmount <= 0) {
			setError("sendAmount", {
				type: "greater_than_0",
				message: "Transfer amount must be greater than 0 and less than your account's amount",
			});
		}
		const myKeystation = new Keystation({
			client: process.env.REACT_APP_WALLET_API,
			lcd: "https://lcd.orai.io",
			path: "44/118/0/0/0",
			keystationUrl: process.env.REACT_APP_WALLET_API,
		});

		let payload;
		if (activeTabId === 1) {
			payload = {
				type: "cosmos-sdk/StdTx",
				value: {
					msg: [
						{
							type: "cosmos-sdk/MsgSend",
							value: {
								from_address: address,
								to_address: data.recipientAddress,
								amount: [
									{
										denom: "orai",
										amount: data.sendAmount * 1000000,
									},
								],
							},
						},
					],
					fee: {
						amount: [fee],
						gas: 200000,
					},
					signatures: null,
					memo: data.memo || "",
				},
			};
		} else {
			try {
				payload = JSON.parse(data.freeMessage);
			} catch (e) {
				alert("Cannot parse transaction. Please check again!");
				return;
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
				setTimeout(() => {
					history.push(`/txs/${e.data.txhash}`);
					setIsLoading(false);
				}, 7000);
				handleClose();
			}
		};
		window.addEventListener("message", callBack, false);
		return () => {
			window.removeEventListener("message", callBack);
		};
	}, [dispatch, handleClose, history, reFetchAmount]);

	const setAmountValue = (e, rate) => {
		e.preventDefault();
		amount &&
			setValue(
				"sendAmount",
				new BigNumber(amount)
					.multipliedBy(rate)
					.dividedBy(1000000)
					.toFixed(6)
			);
	};

	const handleClickEndAdornment = () => {
		const form = getValues();
		if (form.recipientAddress) {
			const url = `${consts.DOMAIN}account/${form.recipientAddress}`;
			var win = window.open(url, "_blank");
			win.focus();
		}
	};

	const priceInUSD = new BigNumber(amount)
		.dividedBy(1000000)
		.multipliedBy(status?.price || 0)
		.toFormat(2);

	const renderTab = id => {
		if (id === 1) {
			return (
				<FormProvider {...methods}>
					<form className={cx("form-dialog")}>
						<Grid container spacing={2}>
							<div className={cx("row-balance")}>
								<div className={cx("left")}>
									<div className={cx("title")}> My Address </div>
									<div className={cx("value")}> {reduceString(address, 8, 8)} </div>
								</div>
								<div className={cx("right")}>
									<div className={cx("title", "title-right")}> Balance </div>
									<div className={cx("value")}>
										{formatOrai(amount || 0)} ORAI <span>{status?.price ? "($" + priceInUSD + ")" : ""}</span>
									</div>
								</div>
							</div>
							<Grid item xs={12} className={cx("form-input")}>
								<div className={cx("label")}> Add Recipient </div>
								<InputTextWithIcon name='recipientAddress' required errorobj={errors} onClickEndAdornment={handleClickEndAdornment} />
							</Grid>
							<Grid item xs={12} className={cx("form-input")}>
								<div className={cx("label", "label-right")}>
									<div className={cx("left")}> Amount </div>
									<div className={cx("right")}>
										<button onClick={e => setAmountValue(e, 0.5)}> 1 / 2 </button>
										<button onClick={e => setAmountValue(e, 1)}> Max </button>
									</div>
								</div>
								<InputNumberOrai name='sendAmount' required errorobj={errors} />
							</Grid>
							<Grid item xs={12} className={cx("form-input")}>
								<div className={cx("label")}>
									{" "}
									Memo <span className={cx("optional")}> (Optional) </span>{" "}
								</div>
								<TextArea name='memo' placeholder='Insert memo here' rows={5} />
							</Grid>
							<Grid item xs={12} className={cx("form-input")}>
								<div className={cx("label")}>
									{" "}
									Tx Fee:
									<span className={cx("fee")}> {formatOrai(fee || 0)} ORAI </span>{" "}
									<span>{status?.price ? "($" + (status?.price * Number(formatOrai(fee))).toFixed(6) + ")" : ""}</span>
								</div>
							</Grid>
						</Grid>
					</form>
				</FormProvider>
			);
		}

		if (id === 2) {
			return (
				<FormProvider {...methods}>
					<form className={cx("form-dialog")}>
						<Grid container spacing={2}>
							<div className={cx("row-balance")}>
								<div className={cx("left")}>
									<div className={cx("title")}> My Address </div>
									<div className={cx("value")}> {reduceString(address, 8, 8)} </div>
								</div>
								<div className={cx("right")}>
									<div className={cx("title", "title-right")}> Balance </div>
									<div className={cx("value")}> {formatOrai(amount || 0)} ORAI </div>
								</div>
							</div>
							<Grid item xs={12} className={cx("form-input")}>
								<div className={cx("label")}> Transaction </div>
								<TextArea name='freeMessage' placeholder='Enter unsigned transaction json' rows={23} required errorobj={errors} />
							</Grid>
						</Grid>
					</form>
				</FormProvider>
			);
		}
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
					{renderTab(activeTabId)}
				</DialogContent>
				<DialogActions>
					<div className={cx("btn-action-group")}>
						<Button onClick={handleClose} className={cx("btn-cancel")}>
							Cancel
						</Button>
						<Button variant='contained' className={cx("btn-submit")} onClick={handleSubmit(onSubmit)}>
							Next
						</Button>
					</div>
				</DialogActions>
			</Dialog>
		</div>
	);
}
