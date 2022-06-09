// @ts-nocheck
import React, {memo, useState, useEffect, useMemo, useCallback, useReducer} from "react";
import cn from "classnames/bind";
import {useForm, FormProvider} from "react-hook-form";
import {withStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import {Divider, Input, Spin} from "antd";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import _ from "lodash";
import BigNumber from "bignumber.js";

import {InputNumberOrai} from "src/components/common/form-controls";
import LoadingOverlay from "src/components/common/LoadingOverlay";
import {Fee, Gas} from "src/components/common/Fee";
import {ReactComponent as ExchangeIconGrey} from "src/assets/icons/exchange-grey.svg";
import consts from "src/constants/consts";
import {useFetch} from "src/hooks";
import {myKeystation} from "src/lib/Keystation";
import styles from "./ProposalModal.module.scss";
import Long from "long";
import axios from "axios";

const cx = cn.bind(styles);

yup.addMethod(yup.string, "lessThanNumber", function(amount) {
	return this.test({
		name: "validate-deposit",
		exclusive: false,
		message: "Deposit amount must be greater than 0 and less than your account's amount",
		test(value) {
			if (_.isNaN(value)) {
				return true;
			}
			return parseFloat(value) > 0 && parseFloat(value) <= parseFloat(amount);
		},
	});
});

const DialogContent = withStyles(theme => ({
	root: {
		padding: "0 30px",
	},
	"root:fist-child": {
		"padding-top": "0",
	},
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

const ProposalDepositModal = memo(({open, onClose, data}) => {
	const {address, account} = useSelector(state => state.wallet);
	const orai2usd = useSelector(state => state.blockchain.status.price);
	const minFee = useSelector(state => state.blockchain.minFee);
	// const [balanceInfo, , , , ,] = useFetch(`${consts.LCD_API_BASE}${consts.LCD_API.BALANCES}/${address}?t=${Date.now()}`);
	const [balanceInfo, setBalanceInfo] = useState({});
	const [fee, setFee] = useState(0);
	const [gas, setGas] = useState(200000);
	const percents = [25, 50, 75, 100];
	const [percent, setPercent] = useState(0);
	const [amount, setAmount] = useState(0);

	// this one is used to fetch balance info
	useEffect(() => {
		let source = axios.CancelToken.source();
		const getBalanceInfo = async () => {
			try {
				const result = await axios["get"](`${consts.LCD_API_BASE}${consts.LCD_API.BALANCES}/${address}?t=${Date.now()}`, {
					cancelToken: source.token,
				});
				setBalanceInfo(result);
			} catch (error) {
				console.log("error: ", error);
			}
		};
		getBalanceInfo();
	}, []);

	const getAmount = balanceInfo => {
		if (balanceInfo?.data) {
			const balance = balanceInfo?.data?.balances?.find(balance => balance.denom === "orai");
			return new BigNumber(balance?.amount);
		}
		return new BigNumber(0);
	};

	const parseAmount = (balance, percent) => {
		let result = balance.multipliedBy(percent).dividedBy(1000000) + "";
		result = result.split(".")[0];
		result = new BigNumber(result).dividedBy(100).toString();
		return result;
	};

	// this one is used to set state for the true balance of an account (100% percent)
	useEffect(() => {
		const balance = getAmount(balanceInfo);
		setAmount(parseAmount(balance, 100));
	}, [balanceInfo]);

	// this one is used to set value for the deposit amount (<= 100% percent)
	useEffect(() => {
		const balance = getAmount(balanceInfo);
		setValue("sendAmount", parseAmount(balance, percent));
		return;
	}, [balanceInfo, percent]);

	const formatUSD = useMemo(() => {
		const balance = getAmount(balanceInfo);
		return new BigNumber(balance)
			.dividedBy(1000000)
			.multipliedBy(orai2usd)
			.toFormat(2);
	}, [balanceInfo]);

	const validationSchemaForm = yup.object().shape({
		sendAmount: yup
			.string()
			.required("Send Amount Field is Required")
			.lessThanNumber(getAmount(balanceInfo) / 1000000, "lessThanNumber"),
	});

	const methods = useForm({
		resolver: yupResolver(validationSchemaForm),
	});
	const {handleSubmit, setValue, errors, setError, clearErrors, watch, getValues, register, trigger} = methods;
	// let values = watch() || "";

	const handleClickDeposit = async () => {
		await trigger();
		console.log(Object.values(errors), "ERRORRRRR");
		if (Object.values(errors).length === 0) return onDeposit(getValues());
		else return;
	};

	// TODO: DEPOSIT & VOTING
	const onDeposit = input => {
		// truncate all figures after 6 decimal
		const amount = parseFloat(input.sendAmount).toPrecision(6);
		const minFee = (fee * 1000000 + "").split(".")[0];
		const payload = {
			type: "/cosmos.gov.v1beta1.MsgDeposit",
			value: {
				msg: {
					type: "/cosmos.gov.v1beta1.MsgDeposit",
					value: {
						proposal_id: new Long(data.proposal_id),
						depositor: address,
						amount: [{denom: "orai", amount: new BigNumber(amount).multipliedBy(1000000).toString()}],
					},
				},
				fee: {
					amount: [minFee],
					gas,
				},
				signatures: null,
				memo: data.memo || "",
			},
		};

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
				return onClose();
			}
			if (e?.data?.txhash) {
				onClose();
			}
		};
		window.addEventListener("message", callBack, false);
		return () => {
			window.removeEventListener("message", callBack);
		};
	}, []);

	const render = () => {
		return (
			<form>
				<DialogContent>
					<div className={cx("deposit-title")}> Deposit ORAI for proposal id {data.proposal_id} </div>
					<div className={cx("balance-title")}>Balance</div>
					<div className={cx("space-between", "balance-row")}>
						<div className={cx("left", "uppercase")}> {amount} ORAI </div>
						<div className={cx("right")}>
							{" "}
							<ExchangeIconGrey /> <span className={cx("dollar")}>$ {formatUSD} </span>
						</div>
					</div>
					<Divider />
					<div className={cx("space-between")}>
						<label htmlFor='amount' className={cx("label")}>
							Amount (ORAI)
						</label>
						<div className={cx("percent-buttons")}>
							{percents.map(value => (
								<button
									type='button'
									className={cx("btn", "btn-outline-primary", "m-2")}
									onClick={() => {
										setPercent(value);
										// setValue("sendAmount", calculateAmount(value));
										clearErrors();
									}}>
									{value + "%"}
								</button>
							))}
						</div>
					</div>
					<div className={cx("form-field")}>
						<InputNumberOrai name='sendAmount' errorobj={errors} />
					</div>
					<div className={cx("balance-title")}> Fee </div>
					<Fee handleChooseFee={setFee} minFee={minFee} className={cx("custom-fee")} />
					<Gas gas={gas} onChangeGas={setGas} />
				</DialogContent>
				<DialogActions>
					<button type='button' className={cx("btn", "btn-outline-secondary")} onClick={onClose}>
						Cancel
					</button>
					<button type='button' className={cx("btn", "btn-primary", "m-2")} onClick={handleClickDeposit}>
						Deposit
					</button>
				</DialogActions>
			</form>
		);
	};

	if (balanceInfo.loading && open) {
		return <LoadingOverlay />;
	}

	return (
		<div className={cx("deposit")}>
			<Dialog onClose={onClose} aria-labelledby='deposit-dialog' open={open} maxWidth='sm' fullWidth={true}>
				<div className={cx("content-tab", "deposit-dialog")}>
					<FormProvider {...methods}>{render()}</FormProvider>
				</div>
			</Dialog>
		</div>
	);
});

export default ProposalDepositModal;
