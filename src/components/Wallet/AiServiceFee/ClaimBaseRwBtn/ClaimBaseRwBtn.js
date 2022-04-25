// @ts-nocheck
import React, {memo, useState, useEffect} from "react";
import cn from "classnames/bind";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import BigNumber from "bignumber.js";
import * as yup from "yup";
import {myKeystation} from "src/lib/Keystation";
import styles from "./ClaimBaseRwBtn.scss";
import config from "src/config";
import {useHistory} from "react-router-dom";
import {payloadTransaction} from "src/helpers/transaction";
import {calculateAmount} from "src/helpers/calculateAmount";
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

const {GAS_DEFAULT} = amountConsts;

const ClaimRwAllBtn = memo(({withdrawable, BtnComponent, validatorName, pubkey}) => {
	const [open, setOpen] = useState(false);
	const [gas, setGas] = useState(GAS_DEFAULT);
	const {address, account} = useSelector(state => state.wallet);
	const minFee = useSelector(state => state.blockchain.minFee);
	const [fee, setFee] = useState(0);
	const history = useHistory();
	const dispatch = useDispatch();
	const balance = new BigNumber(withdrawable);

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
		const msg = JSON.stringify({
			claim_reward: {
				pubkey,
			},
		});
		const payload = payloadTransaction(
			"/cosmwasm.wasm.v1beta1.MsgExecuteContract",
			[
				{
					type: "/cosmwasm.wasm.v1beta1.MsgExecuteContract",
					value: {
						contract: config.PING_ADDR,
						msg,
						sender: address,
						sent_funds: [
							{
								denom: "orai",
								amount: !_.isNil(calculateAmount(balance, 100)) ? "0" : calculateAmount(balance, 100),
							},
						],
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
				warning={true}
				buttonName={"Claim base"}
				buttonSubmit={"Claim Base Reward"}
			/>
		</div>
	);
});

export default ClaimRwAllBtn;
