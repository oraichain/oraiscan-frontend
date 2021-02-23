import React from "react";
import {useFormContext, Controller} from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import cn from "classnames/bind";

import styles from "./index.scss";

const cx = cn.bind(styles);

function FormInput(props) {
	const {control} = useFormContext();
	const {name, placeholder, label, required, errorobj, classNameCustom} = props;
	let isError = false;
	let errorMessage = "";
	if (errorobj && errorobj.hasOwnProperty(name)) {
		isError = true;
		errorMessage = errorobj[name].message;
	}

	return (
		<Controller
			as={TextField}
			name={name}
			control={control}
			placeholder={placeholder || ""}
			label={label}
			fullWidth
			className={cx("input-text", classNameCustom)}
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
