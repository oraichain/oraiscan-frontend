// @ts-nocheck
import React, {memo, useState} from "react";
import cn from "classnames/bind";
import {useForm, FormProvider} from "react-hook-form";
import {withStyles} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";
import BigNumber from "bignumber.js";
import * as yup from "yup";
import styles from "./RandomnessPopup.scss";
import MemoFee from "src/components/common/MemoFee";
import {showAlert} from "src/store/modules/global";
import {getTxResponse} from "src/lib/drand/drand";
import { useDispatch } from "react-redux";
const cx = cn.bind(styles);

yup.addMethod(yup.string, "lessThanNumber", function(amount) {
	return this.test({
		name: "validate-withdraw",
		exclusive: false,
		message: "Transfer amount must be greater than 0 and less than your account's amount",
		test(value) {
			if (_.isNaN(value)) {
				return true;
			}
			return parseFloat(value) > 0 && parseFloat(value) <= parseFloat(amount);
		},
	});
});

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
	const {children, classes, onClose, ...other} = props;
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


const RandomnessPopup = memo(({open, closeDialog, eventHandleGetRamdomValue, validatorName, withdrawable, userInput, setLoadingPopup,minFee = {estimate_fee: 0}}) => {
	const [fee, setFee] = useState(0);
	const [gas, setGas] = useState(200000);
	const dispatch = useDispatch();

	const methods = useForm({
		resolver: undefined,
	});

	const onSubmit = async data => {
		try {
			closeDialog();
			const {response, contract} = await getTxResponse(new BigNumber(data.amount).multipliedBy(1000000).toString() || "0", fee, gas, userInput, setLoadingPopup);
			if (response.tx_response && response.tx_response.code === 0) {
				setLoadingPopup(false);
				await eventHandleGetRamdomValue(response, contract);
			}
		} catch (error) {
			setLoadingPopup(false);
			dispatch(
				showAlert({
					show: true,
					message: error.message,
					autoHideDuration: 3000,
				})
			);
			console.log(error);
		}
	};

	const onChangeGas = value => {
		setGas(value);
	};
	const {handleSubmit, setValue, errors, clearErrors, getValues} = methods;

	return (
		<div className={cx("delegate")}>
			<Dialog onClose={closeDialog} aria-labelledby='delegate-dialog' open={open} maxWidth='sm' fullWidth={true}>
				<FormProvider {...methods}>
					<form>
						<DialogTitle id='delegate-dialog' onClose={closeDialog}>
							Randomness from {validatorName}
							<p className={cx("note")}>new randomness</p>
						</DialogTitle>
						<DialogContent dividers>
							<MemoFee fee={fee} minFee={minFee} setFee={setFee} onChangeGas={onChangeGas} gas={gas} />
						</DialogContent>
						<DialogActions>
							<button type='button' className={cx("btn", "btn-outline-secondary")} onClick={closeDialog}>
								Cancel
							</button>
							<button type='submit' className={cx("btn", "btn-primary", "m-2")} onClick={handleSubmit(onSubmit)}>
								Next
							</button>
						</DialogActions>
					</form>
				</FormProvider>
			</Dialog>
		</div>
	);
});

export default RandomnessPopup;
