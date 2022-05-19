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
import {myKeystation} from "src/lib/Keystation";
import styles from "./JoinLeaveExecutorBtn.scss";
import config from "src/config";
import {useHistory} from "react-router-dom";
import {payloadTransaction} from "src/helpers/transaction";
import MemoFee from "src/components/common/MemoFee";
import {calculateAmount} from "src/helpers/calculateAmount";
import amountConsts from "src/constants/amount";
import consts from "src/constants/consts";
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

const {GAS_DEFAULT} = amountConsts;

const JoinLeaveExecutorBtn = memo(({BtnComponent, validatorName, pubkey, type}) => {
	const [open, setOpen] = useState(false);
	const [gas, setGas] = useState(GAS_DEFAULT);
	const {address, account} = useSelector(state => state.wallet);
	const minFee = useSelector(state => state.blockchain.minFee);
	const [fee, setFee] = useState(0);
	const history = useHistory();
	const dispatch = useDispatch();

	const openDialog = () => {
		setOpen(true);
	};
	const closeDialog = () => {
		setOpen(false);
		setGas(GAS_DEFAULT);
	};

	const methods = useForm({
		resolver: undefined,
	});
	const {handleSubmit, errors, getValues, setError, clearErrors} = methods;

	const onSubmit = data => {
		const minGasFee = (fee * 1000000 + "").split(".")[0];
		const msgExecutorJoin = JSON.stringify({
			executor_join: {
				executor: pubkey,
			},
		});
		const msgExecutorLeave = JSON.stringify({
			executor_leave: {
				executor: pubkey,
			},
		});
		const payload = payloadTransaction(
			"/cosmwasm.wasm.v1beta1.MsgExecuteContract",
			[
				{
					type: "/cosmwasm.wasm.v1beta1.MsgExecuteContract",
					value: {
						contract: config.AIORACLE_CONTRACT_ADDR,
						msg: type === "join" ? msgExecutorJoin : msgExecutorLeave,
						sender: address,
						sent_funds: null,
					},
				},
			],
			minGasFee,
			gas,
			(data && data.memo) || getValues("memo") || "",
			{gasType: "auto"}
		);

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
				// warning={true}
				buttonName={`${type === "join" ? "Joining" : "Leaving"} executor list`}
				buttonSubmit={"Join"}
			/>
		</div>
	);
});

export default JoinLeaveExecutorBtn;
