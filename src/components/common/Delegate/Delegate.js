// @ts-nocheck
import React, { memo, useState, useEffect } from "react";
import cn from "classnames/bind";
import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useForm, FormProvider } from "react-hook-form";
import { withStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { Divider, Input, Spin } from "antd";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "lodash";
import BigNumber from "bignumber.js";

import { InputNumberOrai } from "src/components/common/form-controls";
import LoadingOverlay from "src/components/common/LoadingOverlay";
import { Fee, Gas } from "src/components/common/Fee";
import { ReactComponent as ExchangeIconGrey } from "src/assets/icons/exchange-grey.svg";
import consts from "src/constants/consts";
import { useFetch } from "src/hooks";
import { myKeystation } from "src/lib/Keystation";
import styles from "./Delegate.scss";
import "./Delegate.css";
import { formatOrai, formatPercentage } from "src/helpers/helper";
import { walletStation } from "src/lib/walletStation";

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

yup.addMethod(yup.string, "lessThanNumber", function (amount) {
	return this.test({
		name: "validate-delegate",
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

const displayBalance = balance => {
	let result = balance.dividedBy(1000000).toString();
	return result;
};

const Delegate = memo(({ a, openButtonText = "Delegate for this validator", operatorAddress, estAPR = 0, delegateText = "Delegate for this validator" }) => {
	const [open, setOpen] = useState(false);
	const [inputAmountValue, setInputAmountValue] = useState("");
	const { address, account } = useSelector(state => state.wallet);
	const orai2usd = useSelector(state => state.blockchain.status?.price);
	const minFee = useSelector(state => state.blockchain.minFee);
	const [balanceInfo, , , , setUrl] = useFetch();
	const [activeTabId, setActiveTabId] = useState(1);
	const [fee, setFee] = useState(0);
	const [gas, setGas] = useState(200000);
	const [rewardCalculator, setRewardCalculator] = useState({
		amount: 0,
		monthlyORAI: 0,
		yearlyORAI: 0,
	});
	const percents = [25, 50, 75, 100];

	const denom = consts.DENOM;
	const balance = new BigNumber(balanceInfo?.data?.balances.find(balance => balance.denom === denom)?.amount ?? 0);
	// const balance = new BigNumber("38172");
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
		open && address && setUrl(`${consts.LCD_API_BASE}${consts.LCD_API.BALANCES}/${address}?t=${Date.now()}`);
	}, [address, setUrl, open]);

	const openDialog = () => {
		setOpen(true);
	};
	const closeDialog = () => {
		setOpen(false);
	};

	const validationSchemaForm = yup.object().shape({
		recipientAddress: yup.string().required("Recipient Address Field is Required"),
		sendAmount: yup
			.string()
			.required("Send Amount Field is Required")
			.lessThanNumber(balance / 1000000, "lessThanNumber"),
		freeMessage: yup.string().required("Recipient Address Field is Required"),
	});

	const methods = useForm({
		resolver: yupResolver(validationSchemaForm),
	});
	const { handleSubmit, setValue, errors, setError, clearErrors, watch, getValues, register, trigger } = methods;
	// let values = watch() || "";

	const handleClickDelegate = async () => {
		await trigger();
		console.log(Object.values(errors), "ERRORRRRR");
		if (Object.values(errors).length === 0) return onSubmit(getValues());
		else return;
	};

	const onSubmit = async data => {
		// if ((data && (parseFloat(data.sendAmount) <= 0 || parseFloat(data.sendAmount) > balance / 1000000)) || data.sendAmount === "") {
		// 	return;
		// }

		// const minFee = (fee * 1000000 + "").split(".")[0];

		const response = await walletStation.delegate(address, operatorAddress, new BigNumber(data.sendAmount.replaceAll(",", "")).multipliedBy(1000000))
	};

	useEffect(() => {
		const callBack = function (e) {
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
						<div className={cx("delegate-title")}> {delegateText} </div>
						<div className={cx("space-between", "commission-row")}>
							<div className={cx("left")}>
								{"Commission max rate: "}
								<Tooltip
									title='The maximum commission this validator can set. This parameter cannot be modified.'
									className={cx("tooltip-header-cell")}
									zIndex={9999999999999}>
									<QuestionCircleOutlined />
								</Tooltip>
							</div>
							<div className={cx("right")}>
								{" "}
								<span className={cx("percentage")}> {formatPercentage(a.commission_max_rate, 2)} %</span>
							</div>
						</div>
						<div className={cx("space-between", "commission-row")}>
							<div className={cx("left")}>
								{"Commission max change rate: "}
								<Tooltip
									title='The maximum change rate this validator can set. Eg: If the maximum commission change rate is 2%, then a validator can only increase his commission from 1% to maximum 3% per day. This parameter cannot be modified.'
									className={cx("tooltip-header-cell")}
									zIndex={9999999999999}>
									<QuestionCircleOutlined />
								</Tooltip>
							</div>
							<div className={cx("right")}>
								<span className={cx("percentage")}> {formatPercentage(a.commission_max_change_rate, 2)} %</span>
							</div>
						</div>
						<div className={cx("space-between", "commission-row")}>
							<div className={cx("left")}>
								{" "}
								{"Min self delegation: "}
								<Tooltip
									title="The minimum number of ORAIs this validator must self-delegate to be bonded. If the validator's self delegated tokens fall below this value, all delegators\' tokens will automatically undelegate (move to unbonding state). This parameter can be increased only."
									className={cx("tooltip-header-cell")}
									zIndex={9999999999999}>
									<QuestionCircleOutlined />
								</Tooltip>
							</div>
							<div className={cx("right")}>
								{" "}
								<span className={cx("percentage")}>
									{" "}
									{formatOrai(a.min_self_delegation)} <span className={cx("percentage-denom")}>ORAI</span>
								</span>
							</div>
						</div>
						<div className={cx("balance-title")}>Your balance</div>
						<div className={cx("space-between", "balance-row")}>
							<div className={cx("left", "uppercase")}>
								{" "}
								{displayBalance(balance)} {denom}{" "}
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
											setValue("sendAmount", calculateAmount(balance, value));
											clearErrors();
										}}>
										{value + "%"}
									</button>
								))}
							</div>
						</div>
						<div className={cx("form-field")}>
							<InputNumberOrai inputAmountValue={inputAmountValue} name='sendAmount' errorobj={errors} />
						</div>
						<div className={cx("balance-title")}> Fee </div>
						<Fee handleChooseFee={setFee} minFee={minFee} className={cx("custom-fee")} />
						<Gas gas={gas} onChangeGas={setGas} />
					</DialogContent>
					<DialogActions>
						<button type='button' className={cx("btn", "btn-outline-secondary")} onClick={closeDialog}>
							Cancel
						</button>
						<button type='button' className={cx("btn", "btn-primary", "m-2")} onClick={handleClickDelegate}>
							Delegate
						</button>
					</DialogActions>
				</form>
			);
		}

		if (id === 2) {
			const { amount, monthlyORAI, yearlyORAI } = rewardCalculator;
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

	if (balanceInfo.loading && open) {
		return <LoadingOverlay />;
	}

	return (
		<div className={cx("delegate")}>
			<button type='button' className={cx("btn", "btn-outline-primary")} onClick={openDialog} disabled={!operatorAddress || operatorAddress === "--"}>
				{openButtonText}
			</button>

			<Dialog onClose={closeDialog} aria-labelledby='delegate-dialog' open={open} maxWidth='sm' fullWidth={true}>
				<div className={cx("tab-wrapper")}>
					{TABS.map(({ id, name }, index) => {
						return (
							<button className={cx({ selected: id === activeTabId })} onClick={() => setActiveTabId(id)} key={"tab-" + index}>
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
