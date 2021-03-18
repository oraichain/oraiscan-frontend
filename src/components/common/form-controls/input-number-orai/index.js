import React from "react";
import {useSelector} from "react-redux";
import {useFormContext, Controller} from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import cn from "classnames/bind";
import NumberFormat from "react-number-format";
import {useFetch} from "src/hooks";
import BigNumber from "bignumber.js";
import {ReactComponent as ExchangeIcon} from "src/assets/icons/exchange.svg";

import styles from "./index.scss";

const cx = cn.bind(styles);

// const TextFieldCustom = (props) => <TextField  {...props} className={cx("input-text-exchange")} />

const NumberFormatCustom = ({onChange, value, orai2usd, ...rest}) => {
	value = ((value || 0) + "").replaceAll(",", "");
	const formatUSD = () => {
		// console.log(new BigNumber(valueParse).multipliedBy(orai2usd).toFormat(2))
		return new BigNumber(value).multipliedBy(orai2usd).toFormat(2);
		// const result = ((value || 0) * orai2usdt).toFixed(6);
		// return isNaN(result) ? 0 : result;
		// return 0;
	};
	return (
		<div className={cx("input-exchange")}>
			<NumberFormat customInput={TextField} thousandSeparator value={value} onValueChange={v => onChange(v.floatValue)} {...rest} />
			<div className={cx("to-usdt")}>
				{" "}
				<ExchangeIcon /> {formatUSD()} USD{" "}
			</div>
		</div>
	);
};

function FormInput(props) {
	const {control} = useFormContext();
	const {name, placeholder, label, required, errorobj} = props;
	const orai2usd = useSelector(state => state.blockchain.status?.price);
	let isError = false;
	let errorMessage = "";
	if (errorobj && errorobj.hasOwnProperty(name)) {
		isError = true;
		errorMessage = errorobj[name].message;
	}

	return (
		<Controller
			as={props => <NumberFormatCustom {...props} orai2usd={orai2usd} />}
			name={name}
			control={control}
			placeholder={placeholder || ""}
			label={label}
			fullWidth
			className={cx("input-text")}
			InputLabelProps={{
				className: cx({"required-label": required}),
				required: required || false,
				shrink: true,
			}}
			error={isError}
			helperText={errorMessage}
			{...props}
		/>
	);
}

export default FormInput;
