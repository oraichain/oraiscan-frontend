// @ts-nocheck
import React, { memo, useState, useEffect } from "react";
import cn from "classnames/bind";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import BigNumber from "bignumber.js";
import * as yup from "yup";
import { showAlert } from "src/store/modules/global";
import styles from "./ClaimRwBtn.scss";
import { useHistory } from "react-router-dom";
import { payloadTransaction } from "src/helpers/transaction";
import amountConsts from "src/constants/amount";
import { calculateAmount } from "src/helpers/calculateAmount";
import DialogForm from "src/components/DialogForm";
import { walletStation } from "src/lib/walletStation";

const cx = cn.bind(styles);

yup.addMethod(yup.string, "lessThanNumber", function (amount) {
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

const { GAS_DEFAULT } = amountConsts;

const ClaimRwBtn = memo(({ validatorAddress, withdrawable, BtnComponent, validatorName, handleClickClaim }) => {
	const [open, setOpen] = useState(false);
	const [gas, setGas] = useState(GAS_DEFAULT);
	const { address, account } = useSelector(state => state.wallet);
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
	const { handleSubmit, setValue, errors, setError, clearErrors, getValues } = methods;
	console.log({ withdrawable, balance });
	const onSubmit = async data => {
		if (parseFloat(withdrawable) <= 0 || !parseFloat(withdrawable)) {
			return dispatch(
				showAlert({
					show: true,
					message: "Claimable Rewards ORAI must greater than 0",
					autoHideDuration: 1500,
					type: "error",
				})
			);
		}
		// const minGasFee = (fee * 1000000 + "").split(".")[0];

		const response = await walletStation.withdrawDelegatorReward([{
			delegator_address: address, validator_address: validatorAddress
		}])

		console.log("response claim delegator reward single: ", response);
	};

	useEffect(() => {
		const callBack = function (e) {
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
				buttonName={"Claim"}
			/>
		</div>
	);
});

export default ClaimRwBtn;
