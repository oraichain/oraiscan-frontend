import React from "react";
import {useFormContext, Controller} from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import cn from "classnames/bind";
import NumberFormat from "react-number-format";
import {useFetch} from "src/hooks";
import {ReactComponent as ExchangeIcon} from "src/assets/icons/exchange.svg";

import styles from "./index.scss";

const cx = cn.bind(styles);

// const TextFieldCustom = (props) => <TextField  {...props} className={cx("input-text-exchange")} />

const NumberFormatCustom = ({onChange, value, orai2usdt, ...rest}) => {
	const formatUSDT = () => {
		const result = ((value || 0) * orai2usdt).toFixed(6);
		return isNaN(result) ? 0 : result;
	};
	return (
		<div className={cx("input-exchange")}>
			<NumberFormat customInput={TextField} thousandSeparator value={value} onValueChange={v => onChange(v.floatValue)} {...rest} />
			<div className={cx("to-usdt")}>
				{" "}
				<ExchangeIcon /> {formatUSDT()} USD{" "}
			</div>
		</div>
	);
};

function FormInput(props) {
	const {control} = useFormContext();
	const {name, placeholder, label, required, errorobj} = props;
	const [price, , , , setUrl] = useFetch(process.env.REACT_APP_CONVERT_TO_USDT_API);
	const orai2usdt = price?.data?.["oraichain-token"]?.usd;
	let isError = false;
	let errorMessage = "";
	if (errorobj && errorobj.hasOwnProperty(name)) {
		isError = true;
		errorMessage = errorobj[name].message;
	}

	return (
		<Controller
			as={props => <NumberFormatCustom {...props} orai2usdt={orai2usdt} />}
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
