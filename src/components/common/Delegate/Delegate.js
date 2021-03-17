import React, {isValidElement, memo, useState, useEffect} from "react";
import cn from "classnames/bind";
import {useForm, FormProvider} from "react-hook-form";
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
import NumberFormat from "react-number-format";
import TextField from "@material-ui/core/TextField";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import _ from "lodash";
import BigNumber from "bignumber.js";

import {InputNumberOrai, TextArea, InputTextWithIcon} from "src/components/common/form-controls";
import {formatOrai} from "src/helpers/helper";
import consts from "src/constants/consts";
import {useFetch} from "src/hooks";
import Keystation from "src/lib/Keystation";
import styles from "./Delegate.scss";

const cx = cn.bind(styles);

yup.addMethod(yup.number, "lessThanNumber", function(amount) {
	return this.test({
		name: "test-name",
		exclusive: false,
		message: "Transfer amount must be greater than 0 and less than your account's amount",
		test(value) {
			if (_.isNaN(value)) {
				return true;
			}
			return value >= 0 && value <= parseFloat(amount);
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
	// return balance.multipliedBy(percent).dividedBy(100);
	return (balance * percent) / 100;
};

const Delegate = memo(({openButtonText = "Delegate for this validator", operatorAddress}) => {
	const [open, setOpen] = useState(false);
	const {address, account} = useSelector(state => state.wallet);
	const [balanceInfo, , , , setUrl] = useFetch();
	const percents = [25, 50, 75, 100];

	const balance = balanceInfo?.data?.balances?.[0]?.amount ?? 0;
	// const balance = new BigNumber("3817852412082");
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

	const validationSchemaForm = yup.object().shape({
		amount: yup
			.number()
			.required("Send Amount Field is Required")
			.lessThanNumber(balance / 1000000, "lessThanNumber"),
		// freeMessage: yup.string().required("Recipient Address Field is Required"),
	});

	const methods = useForm({
		resolver: yupResolver(validationSchemaForm),
	});
	const {handleSubmit, register, setValue, errors, setError, clearErrors} = methods;

	const onSubmit = data => {
		data.amount = data.amount * 1000000 + "";
		data.amount = data.amount.split(".")[0];

		const myKeystation = new Keystation({
			client: process.env.REACT_APP_WALLET_API,
			lcd: "https://lcd.orai.io",
			path: "44/118/0/0/0",
			keystationUrl: process.env.REACT_APP_WALLET_API,
		});

		const payload = {
			type: "cosmos-sdk/MsgDelegate",
			value: {
				msg: [
					{
						type: "cosmos-sdk/MsgDelegate",
						value: {
							delegator_address: address,
							validator_address: operatorAddress,
							amount: {
								denom: "orai",
								amount: String(data.amount),
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
			<button type='button' className={cx("btn", "btn-outline-primary")} onClick={openDialog} disabled={!operatorAddress || operatorAddress === "--"}>
				{openButtonText}
			</button>

			<Dialog onClose={closeDialog} aria-labelledby='delegate-dialog' open={open} maxWidth='sm' fullWidth={true}>
				<FormProvider {...methods}>
					<form>
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
								<InputNumberOrai name='amount' required errorobj={errors} />
								{/* <input
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
								/> */}
								{/* <ErrorMessage errors={errors} name='amount' render={({message}) => <p className={cx("error-message")}>{message}</p>} /> */}
							</div>
						</DialogContent>
						<DialogActions>
							<button type='submit' className={cx("btn", "btn-primary", "m-2")} onClick={handleSubmit(onSubmit)}>
								Delegate
							</button>
							<button type='button' className={cx("btn", "btn-outline-secondary")} onClick={closeDialog}>
								Cancel
							</button>
						</DialogActions>
					</form>
				</FormProvider>
			</Dialog>
		</div>
	);
});

export default Delegate;
