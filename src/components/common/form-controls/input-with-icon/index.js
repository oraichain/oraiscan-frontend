import React from "react";
import {useFormContext, Controller} from "react-hook-form";
import {TextField, InputAdornment, IconButton} from "@material-ui/core";
import cn from "classnames/bind";

import {ReactComponent as OpenInNewTab} from "src/assets/icons/open-new-tab.svg";

import styles from "./index.scss";

const cx = cn.bind(styles);

function FormInput(props) {
	const {control} = useFormContext();
	const {name, placeholder, label, required, errorobj, onClickEndAdornment} = props;
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
			defaultValue={""}
			placeholder={placeholder || ""}
			label={label}
			fullWidth
			className={cx("input-text")}
			InputLabelProps={{
				className: cx({"required-label": required}),
				shrink: true,
			}}
			InputProps={{
				startAdornment: <InputAdornment position='start'></InputAdornment>,
				endAdornment: (
					<InputAdornment position='start'>
						<IconButton>
							<OpenInNewTab onClick={onClickEndAdornment} />
						</IconButton>
					</InputAdornment>
				),
			}}
			error={isError}
			helperText={errorMessage}
			{...props}
		/>
	);
}

export default FormInput;
