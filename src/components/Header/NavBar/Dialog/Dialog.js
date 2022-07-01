// @ts-nocheck
import React, { useState, useEffect, memo } from "react";
// import {useGet} from "restful-react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useForm, FormProvider } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import cn from "classnames/bind";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import BigNumber from "bignumber.js";
import LoadingOverlay from "src/components/common/LoadingOverlay";
import { showAlert } from "src/store/modules/global";
import SendOraiTab from "./SendOraiTab";
import SendAiriTab from "./SendAiriTab";
import { ReactComponent as CloseIcon } from "src/assets/icons/close.svg";
import config from "src/config";
import styles from "./Dialog.scss";
import "./Dialog.css";
import consts from "src/constants/consts";
import { args, handleTransactionResponse } from "src/helpers/transaction";
import typeUrl from "src/constants/typeurl";
import typeSend from "src/constants/typeSend";
import { walletStation } from "src/lib/walletStation";
import { notification } from "antd";
import { handleErrorMessage } from "../../../../lib/scripts";
const cx = cn.bind(styles);

yup.addMethod(yup.string, "lessThanNumber", function (amount) {
	return this.test({
		name: "test-name",
		exclusive: false,
		message: "Transfer amount must be greater than 0 and less than your account's amount",
		test(value) {
			if (_.isNaN(value)) {
				return true;
			}
			return parseFloat(value) > 0 && parseFloat(value) <= parseFloat(amount);
		},
	});
});

const TABS = [
	{
		name: "Send ORAI",
		id: 1,
	},
];

const FormDialog = memo(({ show, handleClose, address, account, amount }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [activeTabId, setActiveTabId] = useState(1);
	const [multiSendData, handleInputMulti] = useState(null);
	const [loadingTransaction, setLoadingTransaction] = useState(false);
	const [inputAmountValue, setInputAmountValue] = useState("");
	const dispatch = useDispatch();
	const history = useHistory();
	const status = useSelector(state => state.blockchain.status);
	const validationSchemaForm1 = yup.object().shape({
		recipientAddress: yup.string().required("Recipient Address Field is Required"),
		freeMessage: yup.string().required("Recipient Address Field is Required"),
	});

	const validationSchemaForm2 = yup.object().shape({
		freeMessage: yup.string().required("Transaction Field is Required"),
	});

	const methods = useForm({
		resolver: yupResolver(activeTabId === 1 ? validationSchemaForm1 : validationSchemaForm2),
	});

	const { handleSubmit, errors, register, setValue, getValues, setError, watch, trigger } = methods;
	const handleBigNumber = (amount = "0") => new BigNumber(amount.toString().replaceAll(",", "")).multipliedBy(1000000).toString();
	const onSubmit = async data => {
		try {
			setLoadingTransaction(true);
			let payload;
			let typeSendSubmit = typeSend.SEND;
			let total_amount = 0;
			if (activeTabId === 1) {
				let msg = [];
				if (multiSendData) {
					typeSendSubmit = typeSend.MULTISEND;
					msg = multiSendData.map(v => {
						total_amount = +v.amount + total_amount;
						return {
							type: typeUrl.MSG_SEND,
							value: {
								from_address: address,
								to_address: v.address,
								amount: [
									{
										denom: consts.DENOM,
										amount: handleBigNumber(v.amount),
									},
								],
							},
						};
					});
				} else {
					total_amount = +data.sendAmount + total_amount;
					msg = [
						{
							type: typeUrl.MSG_SEND,
							value: {
								from_address: address,
								to_address: data.recipientAddress,
								amount: [
									{
										denom: consts.DENOM,
										amount: handleBigNumber(data.sendAmount),
									},
								],
							},
						},
					];
				}
				payload = args({ msg, type: typeSendSubmit, fromAddress: address, toAddress: data?.recipientAddress, totalAmount: handleBigNumber(total_amount) }); // TODO: temp hardcode gas
			}
			const response = await walletStation.sendCoin(payload);
			handleClose();
			handleTransactionResponse(response, notification, history, setLoadingTransaction);
		} catch (error) {
			setLoadingTransaction(false);
			notification.error({ message: handleErrorMessage(error) });
			console.log(error);
		}
	};

	useEffect(() => {
		const callBack = function (e) {
			if (e && e.data === "deny") {
				return handleClose();
			}
			if (e?.data?.res?.txhash) {
				handleClose();
			}
		};
		window.addEventListener("message", callBack, false);
		return () => {
			window.removeEventListener("message", callBack);
		};
	}, [dispatch, handleClose, history]);

	const renderTab = id => {
		if (id === 1) {
			return (
				<SendOraiTab
					address={address}
					inputAmountValue={inputAmountValue}
					amount={amount}
					status={status}
					methods={methods}
					handleInputMulti={handleInputMulti}
				/>
			);
		}
	};

	const handleClickNext = async () => {
		if (multiSendData) {
			return onSubmit();
		}
		await trigger();
		if (Object.values(errors).length === 0) return onSubmit(getValues());
		return;
	};

	return (
		<div>
			<Dialog open={show} onClose={handleClose} aria-labelledby='form-dialog-title'>
				<DialogTitle className={cx("form-dialog-title")} onClick={handleClose}>
					{" "}
					<CloseIcon />{" "}
				</DialogTitle>
				<DialogContent>
					<div className={cx("tab-wrapper")}>
						{TABS.map(({ id, name }, index) => {
							return (
								<button
									className={cx({ selected: id === activeTabId })}
									onClick={() => {
										setValue("sendAmount", 0);
										setActiveTabId(id);
									}}
									key={"tab-" + index}>
									<p className={cx("nowrap")}> {name} </p>
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
				{loadingTransaction && <LoadingOverlay />}
			</Dialog>
		</div>
	);
});
export default FormDialog;
