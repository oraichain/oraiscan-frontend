import React, {useState, useEffect} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {useForm, FormProvider} from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import cn from "classnames/bind";
import _ from "lodash";
import Alert from "src/components/common/Alert/Alert";

import Keystation from "src/lib/Keystation";
import {InputText} from "src/components/common/form-controls";

import styles from "./Dialog.scss";

const cx = cn.bind(styles);

const validationSchema = yup.object().shape({
	recipientAddress: yup.string().required("Recipient Address Field is Required"),
	sendAmount: yup.number().required("Send Amount Field is Required"),
});

export default function FormDialog({show, handleClose, address, account, amount, reFetchAmount}) {
	const [fee, setFee] = useState(0);
	const [showTransactionSuccess, setShowTransactionSuccess] = useState(false);
	const methods = useForm({
		resolver: yupResolver(validationSchema),
	});
	const {handleSubmit, errors, register} = methods;

	const onSubmit = data => {
		const myKeystation = new Keystation({
			client: process.env.REACT_APP_WALLET_API,
			lcd: "https://lcd.orai.io",
			path: "44/118/0/0/0",
			keystationUrl: process.env.REACT_APP_WALLET_API,
		});

		const payload = {
			type: "cosmos-sdk/StdTx",
			value: {
				msg: [
					{
						type: "cosmos-sdk/MsgSend",
						value: {
							from_address: address,
							to_address: data.recipientAddress,
							amount: [
								{
									denom: "orai",
									amount: data.sendAmount,
								},
							],
						},
					},
				],
				fee: {
					amount: [fee],
					gas: 200000,
				},
				signatures: null,
				memo: data.memo,
			},
		};
		const popup = myKeystation.openWindow("transaction", payload, account);
		let popupTick = setInterval(function() {
			if (popup.closed) {
				clearInterval(popupTick);
			}
		}, 500);
	};

	useEffect(() => {
		const callBack = function(e) {
			if (e?.data?.txhash) {
				setShowTransactionSuccess(true);
				reFetchAmount();
				handleClose();
			}
		};
		window.addEventListener("message", callBack, false);
		return () => {
			window.removeEventListener("message", callBack);
		};
	}, [handleClose, reFetchAmount]);

	return (
		<div>
			<Alert show={showTransactionSuccess} handleClose={() => setShowTransactionSuccess(false)} message='Thực hiện thành công!' autoHideDuration={3000} />
			<Dialog open={show} onClose={handleClose} aria-labelledby='form-dialog-title'>
				<DialogTitle id='form-dialog-title'> Transfer </DialogTitle>
				<DialogContent>
					<FormProvider {...methods}>
						<form className={cx("form-dialog")}>
							<Grid container spacing={2}>
								<div className={cx("row-balance")}>
									<div className={cx("left")}> Available Amount </div>
									<div className={cx("right")}> {amount} Orai </div>
								</div>
								<Grid item xs={12} className={cx("form-input")}>
									<InputText name='recipientAddress' label='Recipient Address' required errorobj={errors} />
								</Grid>
								<Grid item xs={12} className={cx("form-input")}>
									<InputText name='sendAmount' label='Send Amount' required errorobj={errors} type='number' />
								</Grid>
								<Grid item xs={12} className={cx("form-input")}>
									<InputText name='memo' label='Memo' errorobj={errors} />
								</Grid>
								<div className={cx("row-balance")}>
									<div className={cx("left")}> Tx Fee </div>
									<div className={cx("right")}> {fee || 0} Orai </div>
								</div>
							</Grid>
						</form>
					</FormProvider>
					{/* <TextField
						autoFocus
						margin="dense"
						id="name"
						label="Email Address"
						type="email"
						fullWidth
					/> */}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Cancel
					</Button>
					<Button variant='contained' color='primary' onClick={handleSubmit(onSubmit)}>
						SUBMIT
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
