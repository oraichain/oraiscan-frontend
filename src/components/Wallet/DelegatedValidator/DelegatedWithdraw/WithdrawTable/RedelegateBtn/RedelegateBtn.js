// @ts-nocheck
import React, {memo, useState, useEffect} from "react";
import cn from "classnames/bind";
import {useForm, FormProvider} from "react-hook-form";
import {withStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
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
import consts from "src/constants/consts";
import {Gas, Fee} from "src/components/common/Fee";
import {myKeystation} from "src/lib/Keystation";
import {InputNumberOrai, InputTextWithIcon, TextArea} from "src/components/common/form-controls";
import styles from "./RedelegateBtn.scss";
import {useHistory} from "react-router-dom";
import MemoFee from "src/components/common/MemoFee";
import amountConsts from "src/constants/amount";
import DialogForm from "src/components/DialogForm";
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

const {PERCENTS} = amountConsts;

const RedelegateBtn = memo(({validatorAddress, withdrawable, BtnComponent, validatorName}) => {
	const [open, setOpen] = useState(false);
	const {address, account} = useSelector(state => state.wallet);
	const percents = PERCENTS;
	const minFee = useSelector(state => state.blockchain.minFee);
	const history = useHistory();
	const [fee, setFee] = useState(0);
	const dispatch = useDispatch();
	const [gas, setGas] = useState(500000);
	const balance = new BigNumber(withdrawable);
	// const balance = new BigNumber("3817852419082");

	const openDialog = () => {
		setOpen(true);
	};
	const closeDialog = () => {
		setOpen(false);
	};

	const validationSchemaForm = yup.object().shape({
		amount: yup
			.string()
			.required("Send Amount Field is Required")
			.lessThanNumber(balance.dividedBy(1000000), "lessThanNumber"),
		desValidatorAddr: yup
			.string()
			.required("Desitnation Validator Operator Address Field is Required")
			.notOneOf([validatorAddress]),
		// freeMessage: yup.string().required("Recipient Address Field is Required"),
	});

	const methods = useForm({
		resolver: yupResolver(validationSchemaForm),
	});
	const {handleSubmit, setValue, errors, setError, clearErrors, getValues} = methods;

	const onSubmit = data => {
		// if ((data && (parseFloat(data.sendAmount) <= 0 || parseFloat(data.sendAmount) > balance / 1000000)) || data.sendAmount === "") {
		// 	return;
		// }
		const minGasFee = (fee * 1000000 + "").split(".")[0];
		const payload = {
			type: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
			value: {
				msg: [
					{
						type: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
						value: {
							validator_src_address: validatorAddress,
							validator_dst_address: data.desValidatorAddr,
							amount: {
								denom: "orai",
								amount: new BigNumber(data.amount).multipliedBy(1000000).toString(),
							},
						},
					},
				],
				fee: {
					amount: [minGasFee],
					gas,
				},
				signatures: null,
				memo: (data && data.memo) || "",
			},
		};

		const popup = myKeystation.openWindow("transaction", payload, account);
		let popupTick = setInterval(function() {
			if (popup.closed) {
				clearInterval(popupTick);
			}
		}, 500);
	};

	const handleClickEndAdornment = () => {
		const form = getValues();
		if (form.desValidatorAddr) {
			const url = `${consts.DOMAIN}validators/${form.desValidatorAddr}`;
			let newWindow = window.open(url);
			if (newWindow) {
				newWindow.opener = null;
				newWindow = null;
			}
		}
	};

	const onChangeGas = value => {
		setGas(value);
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

	return (
		<div className={cx("delegate")}>
			<BtnComponent handleClick={openDialog} />
			<DialogForm
				closeDialog={closeDialog}
				open={open}
				methods={methods}
				validatorName={validatorName}
				fee={fee}
				minFee={minFee}
				setFee={setFee}
				onChangeGas={onChangeGas}
				gas={gas}
				handleClick={handleSubmit(onSubmit)}
				warning={false}
				buttonName={"1"}>
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
					<InputTextWithIcon name='desValidatorAddr' errorobj={errors} onClickEndAdornment={handleClickEndAdornment} />
				</div>
			</DialogForm>
		</div>
	);
});

export default RedelegateBtn;
