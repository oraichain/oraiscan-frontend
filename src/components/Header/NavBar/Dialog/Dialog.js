// @ts-nocheck
import React, { useState, useEffect, memo } from "react";
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
import SendOraiTab from "./SendOraiTab";
import SendAiriTab from "./SendAiriTab";
import SendCw20 from "./SendCw20";
import { ORAIX_CONTRACT } from "@oraichain/oraidex-common";
import { ReactComponent as CloseIcon } from "src/assets/icons/close.svg";
import config from "src/config";
import "./Dialog.css";
import consts from "src/constants/consts";
import { args, handleTransactionResponse } from "src/helpers/transaction";
import typeUrl from "src/constants/typeurl";
import typeSend from "src/constants/typeSend";
import { walletStation } from "src/lib/walletStation";
import { notification } from "antd";
import { handleErrorMessage } from "../../../../lib/scripts";
import styles from "./Dialog.module.scss";
const cx = cn.bind(styles);

yup.addMethod(yup.string, "lessThanNumber", function(amount) {
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
	{
		name: "Send AIRI",
		id: 3,
	},
	// {
	// 	name: "Multisend CW20",
	// 	id: 4,
	// },
];

const FormDialog = memo(({ show, handleClose, address, amount, amountAiri }) => {
	const [activeTabId, setActiveTabId] = useState(1);
	const [multiSendData, handleInputMulti] = useState(null);
	const [loadingTransaction, setLoadingTransaction] = useState(false);
	const [inputAmountValue, setInputAmountValue] = useState("");
	const [cw20TokenAddress, setCw20TokenAddress] = useState(ORAIX_CONTRACT);
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

	const { errors, setValue, getValues, trigger } = methods;
	const handleBigNumber = (amount = "0") => new BigNumber(amount.toString().replaceAll(",", "")).multipliedBy(consts.NUM.COSMOS_DECIMAL).toFixed(0);
	const onSubmit = async data => {
		try {
			setLoadingTransaction(true);
			let payload;
			let total_amount = 0;
			let typeSubmit = typeSend.SEND;
			if (activeTabId === 1) {
				let msg = [];
				if (multiSendData) {
					typeSubmit = typeSend.MULTISEND;
					msg = multiSendData.map(v => {
						total_amount = +v.amount * Math.pow(10, 6) + total_amount;
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
					payload = args({ msg, type: typeSubmit, fromAddress: address, totalAmount: total_amount.toFixed(0) });
				} else {
					msg = {
						amount: handleBigNumber(data.sendAmount),
						denom: consts.DENOM,
					};
					payload = { msg, type: typeSubmit, fromAddress: address, toAddress: data.recipientAddress };
				}
			} else if (activeTabId === 3) {
				typeSubmit = typeSend.CW20;
				const parseTransferAiri = (address, amount) => {
					return { transfer: { recipient: address, amount: handleBigNumber(amount) } };
				};
				let msgs = {};
				if (multiSendData) {
					let transferInfos = multiSendData.map(v => {
						return { recipient: v.address, amount: handleBigNumber(v.amount) };
					});
					msgs = { multi_transfer: { transfer_infos: transferInfos } };
				} else {
					msgs = parseTransferAiri(data.recipientAddress, data.sendAmount);
				}
				payload = args({ msg: msgs, type: typeSend.CW20, fromAddress: address, contractAddress: config.AIRI_ADDR });
			} else if (activeTabId === 4) {
				typeSubmit = typeSend.MULTISENDCW20;
				let msgs = {};
				if (multiSendData) {
					let transferInfos = multiSendData.map(v => {
						return {
							contractAddress: cw20TokenAddress,
							msg: {
								transfer: {
									recipient: v.address,
									amount: handleBigNumber(v.amount),
								},
							},
						};
					});
					console.log({ transferInfos });

					msgs = transferInfos;
				}
				payload = {
					type: typeSend.MULTISENDCW20,
					fromAddress: address,
					contractAddress: cw20TokenAddress,
					msg: msgs,
				};
			}
			const response = await walletStation.sendCoin(payload);
			handleClose();
			handleTransactionResponse(response, notification, history, setLoadingTransaction, typeSubmit);
		} catch (error) {
			setLoadingTransaction(false);
			notification.error({ message: handleErrorMessage(error) });
			console.log(error);
		}
	};

	useEffect(() => {
		const callBack = function(e) {
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
		if (id === 3) {
			return (
				<SendAiriTab
					address={address}
					amount={amountAiri}
					inputAmountValue={inputAmountValue}
					status={status}
					methods={methods}
					handleInputMulti={handleInputMulti}
				/>
			);
		}

		if (id === 4) {
			return (
				<SendCw20
					setCw20TokenAddress={setCw20TokenAddress}
					address={address}
					cw20TokenAddress={cw20TokenAddress}
					inputAmountValue={inputAmountValue}
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
