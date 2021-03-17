import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import * as yup from "yup";
import cn from "classnames/bind";
import _, {add, constant} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import BigNumber from "bignumber.js";
import {Switch} from "antd";

import {reduceString} from "src/lib/scripts";
import {formatOrai} from "src/helpers/helper";
import {InputNumberOrai, TextArea, InputTextWithIcon} from "src/components/common/form-controls";
import {ReactComponent as ExchangeIcon} from "src/assets/icons/switch-blue.svg";
import SelectFile from "./SelectFile";
import "./SendOraiTab.css";
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

export default function FormDialog({address, amount, status, methods}) {
	const [fee, setFee] = useState(0);
	const [isMulti, setIsMulti] = useState(true);
	const [isChooseFile, setIsChooseFile] = useState(true);

	const {errors, setValue} = methods;

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

	const priceInUSD = new BigNumber(amount)
		.dividedBy(1000000)
		.multipliedBy(status?.price || 0)
		.toFormat(2);

	const switchMultiSend = checked => {
		setIsMulti(checked);
	};

	const handleSelectFile = lines => {
		for (let i = 0; i < lines.length; i++) {
			const lineArr = lines[i].split(",");
			console.log("address = ", lineArr[0]);
			console.log("amount = ", lineArr[1]);
		}
	};

	const toogleChooseFile = () => {
		setIsChooseFile(prev => !prev);
	};

	const renderSelectMulti = () => {
		return (
			<>
				{isChooseFile && (
					<div>
						{" "}
						<SelectFile handleSelectFile={handleSelectFile} />{" "}
					</div>
				)}
				<div className={cx("row-balance", "switch-control")}>
					<div className={cx("left")}>
						<div className={cx("title", "switch-blue")} onClick={toogleChooseFile}>
							{isChooseFile ? "Insert manually" : "Using file"} <ExchangeIcon />
						</div>
					</div>
					<div className={cx("right")}>
						<div className={cx("title", "title-right", "switch-blue")}> Show example </div>
					</div>
				</div>
			</>
		);
	};

	return (
		<form className={cx("form-dialog")}>
			<div className={cx("switch-multisend")}>
				Multisend <Switch onChange={switchMultiSend} />
			</div>
			{!isMulti && (
				<Grid container spacing={2} className={cx("transaction-content")}>
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
						<InputTextWithIcon name='recipientAddress' required errorobj={errors} />
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
			)}
			{isMulti && renderSelectMulti()}
		</form>
	);
}
