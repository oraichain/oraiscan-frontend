import React, {isValidElement, memo, useState, useEffect} from "react";
import cn from "classnames/bind";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {withStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import BigNumber from "bignumber.js";
import styles from "./Claim.scss";
import {formatOrai} from "src/helpers/helper";
import consts from "src/constants/consts";
import {useFetch} from "src/hooks";
import {myKeystation} from "src/lib/Keystation";

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
	return (percent * balance) / 100;
};

const Claim = memo(({validatorAddress, BtnComponent}) => {
	const [open, setOpen] = useState(false);
	const {address, account} = useSelector(state => state.wallet);
	const [balanceInfo, , , , setUrl] = useFetch();
	const percents = [25, 50, 75, 100];

	const balance = balanceInfo?.data?.balances?.[0]?.amount ?? 0;
	const denom = balanceInfo?.data?.balances?.[0]?.denom ?? "ORAI";

	useEffect(() => {
		address && setUrl(`${consts.LCD_API_BASE}${consts.LCD_API.BALANCES}/${address}?t=${Date.now()}`);
	}, [address, setUrl]);

	const openDialog = () => {
		setOpen(true);
	};
	const closeDialog = () => {
		setOpen(false);
	};

	const methods = useForm();
	const {handleSubmit, register, setValue, errors, setError, clearErrors} = methods;

	const onSubmit = data => {
		if (data.amount * 1000000 - Math.floor(data.amount * 1000000) !== 0) {
			setError("amount", {
				type: "too_many_digit",
				message: "Maximum 6 digits after decimal",
			});
			return;
		}

		const payload = {
			type: "/cosmos.staking.v1beta1.MsgDelegate",
			value: {
				msg: [
					{
						type: "/cosmos.staking.v1beta1.MsgDelegate",
						value: {
							delegator_address: address,
							validator_address: validatorAddress,
							amount: {
								denom: "orai",
								amount: new BigNumber(data.amount.replaceAll(",", "")).multipliedBy(1000000).toString(),
							},
						},
					},
				],
				fee: {
					amount: [0],
					gas: 200000,
				},
				signatures: null,
				memo: data.memo || "",
			},
		};

		const popup = myKeystation.openWindow("transaction", payload, account);
		let popupTick = setInterval(function() {
			if (popup.closed) {
				closeDialog();
				clearInterval(popupTick);
			}
		}, 500);
	};

	useEffect(() => {
		const callBack = function(e) {
			if (e && e.data === "deny") {
				return closeDialog();
			}
			if (e?.data?.txhash) {
				closeDialog();
			}
		};
		window.addEventListener("message", callBack, false);
		return () => {
			window.removeEventListener("message", callBack);
		};
	}, []);

	return (
		<div className={cx("delegate")}>
			<BtnComponent onClick={openDialog} />

			<Dialog onClose={closeDialog} aria-labelledby='delegate-dialog' open={open} maxWidth='sm' fullWidth={true}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogTitle id='delegate-dialog' onClose={closeDialog}>
						Delegate for this validator
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
											setValue("amount", formatOrai(calculateAmount(balance, value)));
											clearErrors();
										}}>
										{value + "%"}
									</button>
								))}
							</div>
						</div>
						<div className={cx("form-field")}>
							<input
								type='text'
								className={cx("text-field")}
								ref={register({
									required: {
										value: true,
										message: "The amount field is required.",
									},
									validate: {
										numeric: value => !isNaN(value) || "The amount field must be a number.",
										between: value => {
											const amount = parseFloat(value);
											if (amount > 0 && amount <= balance) {
												return true;
											}
											return `The amount must be greater than 0 and less than or equal ${balance}`;
										},
									},
								})}
								name='amount'
								id='amount'
								defaultValue={0}
							/>
							<ErrorMessage errors={errors} name='amount' render={({message}) => <p className={cx("error-message")}>{message}</p>} />
						</div>
					</DialogContent>
					<DialogActions>
						<button type='submit' className={cx("btn", "btn-primary", "m-2")}>
							Delegate
						</button>
						<button type='button' className={cx("btn", "btn-outline-secondary")} onClick={closeDialog}>
							Cancel
						</button>
					</DialogActions>
				</form>
			</Dialog>
		</div>
	);
});

export default Claim;
