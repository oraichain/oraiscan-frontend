import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useFormContext, Controller } from "react-hook-form";
import cn from "classnames/bind";
import { ReactComponent as ExchangeIcon } from "src/assets/icons/exchange.svg";

import styles from "./index.scss";
import { commafy, formatUSD } from "src/helpers/helper";

const cx = cn.bind(styles);

// const TextFieldCustom = (props) => <TextField  {...props} className={cx("input-text-exchange")} />

function validate(evt) {
	var theEvent = evt;

	var key = theEvent.keyCode || theEvent.which;
	key = String.fromCharCode(key);

	var regex = /[0-9\.]+/;
	if (!regex.test(key)) {
		theEvent.returnValue = false;
		if (theEvent.preventDefault) theEvent.preventDefault();
	}
}

function validatePaste(evt) {
	const theEvent = evt || window.ClipboardEvent;

	const clipboardData = evt.clipboardData || {};
	const pastedData = clipboardData.getData("Text") || "";

	var regex = /^[0-9\.]+$/;
	if (!regex.test(pastedData)) {
		theEvent.returnValue = false;
		if (theEvent.preventDefault) theEvent.preventDefault();
	}
}

function FormInput(props) {
	const orai2usd = useSelector(state => state.blockchain.status?.price);
	const { getValues, setValue, register, watch } = useFormContext();
	// const previousValueRef = useRef("");
	const { name = "sendAmount", placeholder, errorobj , typePrice} = props;

	let value = watch(name);

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
					placeholder={placeholder}
					value={value}
					onChange={e => {
						let amount = e.currentTarget.value.replace(/,/g, "");
						amount = commafy(amount);
						console.log({ amount , name });
						setValue(name, amount);
					}}
					onKeyPress={e => {
						validate(e);
					}}
					onPaste={e => {
						validatePaste(e);
					}}
				/>{" "}
				<div className={cx("to-usdt")}>
					{" "}
					<ExchangeIcon /> {typePrice === "airi" ? "" : formatUSD(getValues(name)?.replace(/,/g, "") || "0", orai2usd)} USD{" "}
				</div>
			</div>
			<div className={cx("required-label")}>{errorMessage}</div>
		</div>
	);
}

export default FormInput;

