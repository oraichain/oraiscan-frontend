import React from "react";
import {useFormContext, Controller} from "react-hook-form";
import {Checkbox, TextareaAutosize} from "@material-ui/core";
import cn from "classnames/bind";

import styles from "./index.scss";

const cx = cn.bind(styles);

const TextareaAutosizeWithErrorMessage = ({error, errorMessage, ...rest}) => {
	let props = {...rest};
	if (props.type && rest.value) {
		if (!+rest.value) {
			props = {...props, value: rest.value.slice(0, rest.value.length - 1)};
		}
	}
	return (
		<>
			<TextareaAutosize {...props} className={cx("input-text", {error})} />
			{error && <span className={cx("text-error")}> {errorMessage} </span>}
		</>
	);
};

function FormInput(props) {
	const {control} = useFormContext();
	const {name, placeholder, label, required, errorobj, rows} = props;
	let isError = false;
	let errorMessage = "";
	if (errorobj && errorobj.hasOwnProperty(name)) {
		isError = true;
		errorMessage = errorobj[name].message;
	}

	return (
		<Controller
			rows={rows}
			multiline
			as={TextareaAutosizeWithErrorMessage}
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
			errorMessage={errorMessage}
			{...props}
		/>
	);
}

export default FormInput;
