import React from "react";
import {useFormContext, Controller} from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import cn from "classnames/bind";
import NumberFormat from "react-number-format";

import styles from "./index.scss";

const cx = cn.bind(styles);

const NumberFormatCustom = ({onChange, value, ...rest}) => (
	<NumberFormat customInput={TextField} thousandSeparator value={value} onValueChange={v => onChange(v.floatValue)} {...rest} />
);

function FormInput(props) {
	const {control} = useFormContext();
	const {name, placeholder, label, required, errorobj} = props;
	let isError = false;
	let errorMessage = "";
	if (errorobj && errorobj.hasOwnProperty(name)) {
		isError = true;
		errorMessage = errorobj[name].message;
	}

	return (
		<Controller
			as={NumberFormatCustom}
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
