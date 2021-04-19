import React, {useRef, useState} from "react";
import {useSelector} from "react-redux";
import {useFormContext, Controller} from "react-hook-form";
import cn from "classnames/bind";
import {ReactComponent as ExchangeIcon} from "src/assets/icons/exchange.svg";

import styles from "./index.scss";
import {commafy, formatUSD} from "src/helpers/helper";

const cx = cn.bind(styles);

// const TextFieldCustom = (props) => <TextField  {...props} className={cx("input-text-exchange")} />

function validate(evt) {
	var theEvent = evt || window.ClipboardEvent;

	var key = theEvent.keyCode || theEvent.which;
	key = String.fromCharCode(key);

	var regex = /[0-9]|\./;
	if (!regex.test(key)) {
		theEvent.returnValue = false;
		if (theEvent.preventDefault) theEvent.preventDefault();
	}
}

function FormInput(props) {
	const orai2usd = useSelector(state => state.blockchain.status?.price);
	const [amountValue, setAmountValue] = useState("");
	const {getValues, setValue, register} = useFormContext();
	const previousValueRef = useRef("");
	const {name, placeholder, label, errorobj, inputAmountValue = ""} = props;
	if (previousValueRef.current !== inputAmountValue) {
		previousValueRef.current = inputAmountValue;
		setAmountValue(previousValueRef.current);
	}

	let value = getValues(name);

	let isError = false;
	let errorMessage = "";
	if (errorobj && errorobj.hasOwnProperty(name)) {
		isError = true;
		errorMessage = errorobj[name].message;
	}

	return (
		<div className={cx("input-text")}>
			<div className={cx("input-exchange")}>
				<input
					className={cx("input-amount")}
					ref={register}
					name={name}
					defaultValue={""}
					value={value}
					onChange={e => {
						let amount = e.currentTarget.value.replace(/,/g, "");
						amount = commafy(amount);
						console.log(amount);
						setAmountValue(amount);
					}}
					onKeyPress={e => {
						validate(e);
					}}
					onPaste={e => {
						validate(e);
					}}
				/>{" "}
				<div className={cx("to-usdt")}>
					{" "}
					<ExchangeIcon /> {formatUSD(getValues("sendAmount")?.replace(/,/g, "") || "0", orai2usd)} USD{" "}
				</div>
			</div>
			<div className={cx("required-label")}>{errorMessage}</div>
		</div>
	);
}

export default FormInput;
