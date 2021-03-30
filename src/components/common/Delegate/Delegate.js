// @ts-nocheck
import React, {memo, useState, useEffect} from "react";
import cn from "classnames/bind";
import {useForm, FormProvider} from "react-hook-form";
import {withStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import {Divider, Input} from "antd";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import _ from "lodash";
import BigNumber from "bignumber.js";

import {InputNumberOrai} from "src/components/common/form-controls";
import {ReactComponent as ExchangeIconGrey} from "src/assets/icons/exchange-grey.svg";
import consts from "src/constants/consts";
import {useFetch} from "src/hooks";
import {myKeystation} from "src/lib/Keystation";
import styles from "./Delegate.scss";
import "./Delegate.css";

const cx = cn.bind(styles);

const TABS = [
	{
		name: "Delegate",
		id: 1,
	},
	{
		name: "Reward Calculator",
		id: 2,
	},
];

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

const calculateAmount = (balance, percent) => {
	let result = balance.multipliedBy(percent).dividedBy(1000000) + "";
	result = result.split(".")[0];
	result = new BigNumber(result).dividedBy(100).toString();
	return result;
};

const Delegate = memo(({openButtonText = "Delegate for this validator", operatorAddress, estAPR = 0}) => {
	const [open, setOpen] = useState(false);
	const {address, account} = useSelector(state => state.wallet);
	const orai2usd = useSelector(state => state.blockchain.status?.price);
	const [balanceInfo, , , , setUrl] = useFetch();
	const [activeTabId, setActiveTabId] = useState(1);
	const [rewardCalculator, setRewardCalculator] = useState({
		amount: 0,
		monthlyORAI: 0,
		yearlyORAI: 0,
	});
	const percents = [25, 50, 75, 100];

	const balance = new BigNumber(balanceInfo?.data?.balances?.[0]?.amount ?? 0);
	// const balance = new BigNumber("3817852419082");
	const denom = balanceInfo?.data?.balances?.[0]?.denom ?? "ORAI";
	const formatUSD = (orai, divide = false) => {
		if (divide) {
			return new BigNumber(orai)
				.dividedBy(1000000)
				.multipliedBy(orai2usd)
				.toFormat(2);
		}
		return new BigNumber(orai).multipliedBy(orai2usd).toFormat(2);
	};

	useEffect(() => {
		address && setUrl(`${consts.LCD_API_BASE}${consts.LCD_API.BALANCES}/${address}?t=${Date.now()}`);
	}, [address, setUrl]);

	const openDialog = () => {
		setOpen(true);
	};
	const closeDialog = () => {
		setOpen(false);
	};

	const validationSchemaForm = yup.object().shape({
		amount: yup
			.number()
			.required("Send Amount Field is Required")
			.lessThanNumber(balance.dividedBy(1000000), "lessThanNumber"),
		// freeMessage: yup.string().required("Recipient Address Field is Required"),
	});

	const methods = useForm({
		resolver: yupResolver(validationSchemaForm),
	});
	const {handleSubmit, setValue, errors, setError, clearErrors} = methods;

	const onSubmit = data => {
		data.amount = data.amount * 100 + "";
		data.amount = new BigNumber(data.amount.split(".")[0]).multipliedBy(10000);
		if (data.amount === 0 || data.amount === "0") {
			setError("amount", {
				type: "zero",
				message: "Transfer amount must be greater than 0 and less than your account's amount",
			});
			return;
		}

		const payload = {
			type: "cosmos-sdk/MsgDelegate",
			value: {
				msg: [
					{
						type: "cosmos-sdk/MsgDelegate",
						value: {
							delegator_address: address,
							validator_address: operatorAddress,
							amount: {
								denom: "orai",
								amount: String(data.amount),
							},
						},
					},
				],
				fee: {
					amount: [0],
					gas: 200000,
				},
				signatures: null,
				memo: data.memo || "",
			},
		};

		const popup = myKeystation.openWindow("transaction", payload, account);
		let popupTick = setInterval(function() {
			if (popup.closed) {
				closeDialog();
				clearInterval(popupTick);
			}
		}, 500);
	};

	useEffect(() => {
		const callBack = function(e) {
			if (e && e.data === "deny") {
				return closeDialog();
			}
			if (e?.data?.txhash) {
				closeDialog();
			}
		};
		window.addEventListener("message", callBack, false);
		return () => {
			window.removeEventListener("message", callBack);
		};
	}, []);

	const handleRewardCalculate = e => {
		const amount = e.target.value;
		setRewardCalculator({
			amount,
			monthlyORAI: ((amount * estAPR * 30) / 365).toFixed(2),
			yearlyORAI: (amount * estAPR).toFixed(2),
		});
	};

	const renderTab = id => {
		if (id === 1) {
			return (
				<form>
					<DialogContent>
						<div className={cx("delegate-title")}>Delegate for this validator</div>
						<div className={cx("balance-title")}>Balance</div>
						<div className={cx("space-between", "balance-row")}>
							<div className={cx("left", "uppercase")}>
								{" "}
								{calculateAmount(balance, 100)} {denom}{" "}
							</div>
							<div className={cx("right")}>
								{" "}
								<ExchangeIconGrey /> <span className={cx("dollar")}>$ {formatUSD(balance, true)} </span>
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
											setValue("amount", calculateAmount(balance, value));
											clearErrors();
										}}>
										{value + "%"}
									</button>
								))}
							</div>
						</div>
						<div className={cx("form-field")}>
							<InputNumberOrai name='amount' required errorobj={errors} />
						</div>
					</DialogContent>
					<DialogActions>
						<button type='button' className={cx("btn", "btn-outline-secondary")} onClick={closeDialog}>
							Cancel
						</button>
						<button type='submit' className={cx("btn", "btn-primary", "m-2")} onClick={handleSubmit(onSubmit)}>
							Delegate
						</button>
					</DialogActions>
				</form>
			);
		}

		if (id === 2) {
			const {amount, monthlyORAI, yearlyORAI} = rewardCalculator;
			return (
				<>
					<DialogContent>
						<div className={cx("delegate-title")}> Enter your ORAI amount </div>
						<div className={cx("space-between", "amount-row")}>
							<div className={cx("left")}>Amount (ORAI)</div>
							<div className={cx("right")}>
								{" "}
								<ExchangeIconGrey /> <span className={cx("dollar")}>$ {formatUSD(amount)} </span>
							</div>
						</div>
						<div className={cx("amount-reward")}>
							<Input className={cx("input")} onChange={handleRewardCalculate} />
						</div>
						<div className={cx("space-between", "earning-row")}>
							<div className={cx("left")}> Monthly Earning </div>
							<div className={cx("right")}> Yearly Earning </div>
						</div>
						<div className={cx("space-between", "estimate-orai-row")}>
							<div className={cx("left")}> {monthlyORAI} ORAI </div>
							<div className={cx("right")}> {yearlyORAI} ORAI </div>
						</div>
						<div className={cx("space-between", "estimate-dollar-row")}>
							<div className={cx("left")}>
								{" "}
								<ExchangeIconGrey /> <span className={cx("dollar")}>$ {formatUSD(monthlyORAI)} </span>{" "}
							</div>
							<div className={cx("right")}>
								{" "}
								<ExchangeIconGrey /> <span className={cx("dollar")}>$ {formatUSD(yearlyORAI)} </span>{" "}
							</div>
						</div>
					</DialogContent>
				</>
			);
		}
	};

	return (
		<div className={cx("delegate")}>
			<button type='button' className={cx("btn", "btn-outline-primary")} onClick={openDialog} disabled={!operatorAddress || operatorAddress === "--"}>
				{openButtonText}
			</button>

			<Dialog onClose={closeDialog} aria-labelledby='delegate-dialog' open={open} maxWidth='sm' fullWidth={true}>
				<div className={cx("tab-wrapper")}>
					{TABS.map(({id, name}, index) => {
						return (
							<button className={cx({selected: id === activeTabId})} onClick={() => setActiveTabId(id)} key={"tab-" + index}>
								<p> {name} </p>
							</button>
						);
					})}
				</div>
				<div className={cx("content-tab", "delegate-dialog")}>
					<FormProvider {...methods}>{renderTab(activeTabId)}</FormProvider>
				</div>
			</Dialog>
		</div>
	);
});

export default Delegate;
