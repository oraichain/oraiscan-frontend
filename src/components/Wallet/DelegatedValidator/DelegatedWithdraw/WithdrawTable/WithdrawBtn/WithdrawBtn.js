// @ts-nocheck
import React, {memo, useState, useEffect} from "react";
import cn from "classnames/bind";
import {useForm, FormProvider} from "react-hook-form";
import {withStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
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
import {yupResolver} from "@hookform/resolvers/yup";
import {myKeystation} from "src/lib/Keystation";
import {InputNumberOrai, TextArea} from "src/components/common/form-controls";
import styles from "./WithdrawBtn.scss";
import {useHistory} from "react-router-dom";
import {payloadTransaction} from "src/helpers/transaction";
import MemoFee from "src/components/common/MemoFee";
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

const calculateAmount = (balance, percent) => {
	let result = balance.multipliedBy(percent).dividedBy(1000000) + "";
	result = result.split(".")[0];
	result = new BigNumber(result).dividedBy(100).toString();
	return result;
};

const WithdrawBtn = memo(({validatorAddress, withdrawable, BtnComponent, validatorName}) => {
	const [open, setOpen] = useState(false);
	const [gas, setGas] = useState(200000);
	const {address, account} = useSelector(state => state.wallet);
	const minFee = useSelector(state => state.blockchain.minFee);
	const percents = [25, 50, 75, 100];
	const [fee, setFee] = useState(0);
	const history = useHistory();
	const dispatch = useDispatch();
	const balance = new BigNumber(withdrawable);

	const openDialog = () => {
		setOpen(true);
	};
	const closeDialog = () => {
		setOpen(false);
		setGas(200000);
	};

	const validationSchemaForm = yup.object().shape({
		amount: yup
			.string()
			.required("Send Amount Field is Required")
			.lessThanNumber(balance.dividedBy(1000000), "lessThanNumber"),
		// freeMessage: yup.string().required("Recipient Address Field is Required"),
	});

	const methods = useForm({
		resolver: yupResolver(validationSchemaForm),
	});
	const {handleSubmit, setValue, errors, setError, clearErrors, getValues} = methods;

	const onSubmit = data => {
		const minGasFee = (fee * 1000000 + "").split(".")[0];
		const msg = [
			{
				type: "/cosmos.staking.v1beta1.MsgUndelegate",
				value: {
					delegator_address: address,
					validator_address: validatorAddress,
					amount: {
						denom: "orai",
						amount: new BigNumber(data.amount).multipliedBy(1000000).toString() || "0",
					},
				},
			},
		];
		const payload = payloadTransaction("/cosmos.staking.v1beta1.MsgUndelegate", msg, minGasFee, gas, (data && data.memo) || getValues("memo") || "");
		const popup = myKeystation.openWindow("transaction", payload, account);
		let popupTick = setInterval(function() {
			if (popup.closed) {
				clearInterval(popupTick);
			}
		}, 500);
	};

	useEffect(() => {
		const callBack = function(e) {
			if (e && e.data === "deny") {
				return closeDialog();
			}
			if (e?.data?.res?.txhash) {
				closeDialog();
			}
		};
		window.addEventListener("message", callBack, false);
		return () => {
			window.removeEventListener("message", callBack);
		};
	}, [dispatch, closeDialog, history]);

	const onChangeGas = value => {
		setGas(value);
	};

	return (
		<div className={cx("delegate")}>
			<BtnComponent handleClick={openDialog} />

			<Dialog onClose={closeDialog} aria-labelledby='delegate-dialog' open={open} maxWidth='sm' fullWidth={true}>
				<FormProvider {...methods}>
					<form>
						<DialogTitle id='delegate-dialog' onClose={closeDialog}>
							Withdraw from {validatorName}
							<p className={cx("note")}>Please be aware that you have to wait 14 days to complete unbonding your funds from validators.</p>
						</DialogTitle>
						<DialogContent dividers>
							<div className={cx("space-between")}>
								<label htmlFor='amount' className={cx("label")}>
									Amount (ORAI)
								</label>
								<div className={cx("percent-buttons")}>
									{percents.map(value => (
										<button
											type='button'
											className={cx("btn", "btn-outline-primary", "m-2")}
											onClick={() => {
												setValue("amount", calculateAmount(balance, value));
												clearErrors();
											}}>
											{value + "%"}
										</button>
									))}
								</div>
							</div>
							<div className={cx("form-field")}>
								<InputNumberOrai name='amount' required errorobj={errors} />
							</div>
							<MemoFee fee={fee} minFee={minFee} setFee={setFee} onChangeGas={onChangeGas} gas={gas} />
						</DialogContent>
						<DialogActions>
							<button type='button' className={cx("btn", "btn-outline-secondary")} onClick={closeDialog}>
								Cancel
							</button>
							<button type='submit' className={cx("btn", "btn-primary", "m-2")} onClick={handleSubmit(onSubmit)}>
								Withdraw
							</button>
						</DialogActions>
					</form>
				</FormProvider>
			</Dialog>
		</div>
	);
});

export default WithdrawBtn;
