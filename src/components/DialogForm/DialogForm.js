// @ts-nocheck
import React, { memo } from "react";
import cn from "classnames/bind";
import { FormProvider } from "react-hook-form";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";
import styles from "./DialogForm.scss";
import MemoFee from "src/components/common/MemoFee";

const cx = cn.bind(styles);

const dialogStyles = theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
});

const DialogTitle = withStyles(dialogStyles)(props => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant='h5'>{children}</Typography>
			{onClose ? (
				<IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles(theme => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

const DialogForm = memo(props => {
	const {
		children,
		closeDialog,
		open,
		fee,
		minFee,
		setFee,
		onChangeGas,
		gas,
		handleClick,
		methods,
		validatorName,
		warning,
		buttonName,
		buttonSubmit,
		...rest
	} = props;
	return (
		<Dialog onClose={closeDialog} aria-labelledby='delegate-dialog' open={open} maxWidth='sm' fullWidth={true}>
			<FormProvider {...methods}>
				<form>
					<DialogTitle id='delegate-dialog' onClose={closeDialog}>
						{buttonName} {validatorName ? `from ${validatorName}` : ""}
						{warning && <p className={cx("note")}>Please be aware that you have to wait 14 days to complete unbonding your funds from validators.</p>}
					</DialogTitle>
					<DialogContent dividers>
						{children}
						<MemoFee fee={fee} minFee={minFee} setFee={setFee} onChangeGas={onChangeGas} gas={gas} />
					</DialogContent>
					<DialogActions>
						<button type='button' className={cx("btn", "btn-outline-secondary")} onClick={closeDialog}>
							Cancel
						</button>
						<button type='submit' className={cx("btn", "btn-primary", "m-2")} onClick={handleClick}>
							{buttonSubmit ? buttonSubmit : buttonName}
						</button>
					</DialogActions>
				</form>
			</FormProvider>
		</Dialog>
	);
});

export default DialogForm;
