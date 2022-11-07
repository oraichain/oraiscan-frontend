// @ts-nocheck
import React, {memo, useState, useEffect} from "react";
import cn from "classnames/bind";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import * as yup from "yup";
import {useHistory} from "react-router-dom";
import {handleTransactionResponse, payloadTransaction} from "src/helpers/transaction";
import amountConsts from "src/constants/amount";
import DialogForm from "src/components/DialogForm";
import {walletStation} from "src/lib/walletStation";
import {notification} from "antd";
import LoadingOverlay from "src/components/common/LoadingOverlay";
import {handleErrorMessage} from "../../../../../../lib/scripts";
import styles from "../ClaimRwBtn/ClaimRwBtn.module.scss";

const cx = cn.bind(styles);
const {GAS_DEFAULT} = amountConsts;

const ClaimRwAllBtn = memo(({withdrawable, BtnComponent, delegatedData}) => {
	const [open, setOpen] = useState(false);
	const [gas, setGas] = useState(GAS_DEFAULT);
	const {address, account} = useSelector(state => state.wallet);
	const minFee = useSelector(state => state.blockchain.minFee);
	const [fee, setFee] = useState(0);
	const [loadingTransaction, setLoadingTransaction] = useState(false);
	const history = useHistory();
	const dispatch = useDispatch();
	// const balance = new BigNumber(withdrawable);

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
	const {handleSubmit, setValue, errors, setError, clearErrors, getValues} = methods;

	const onSubmit = async data => {
		try {
			setLoadingTransaction(true);
			let msg = [];
			delegatedData.forEach(element => {
				if (parseFloat(element.claimable_rewards) && parseFloat(element.claimable_rewards) > 0) {
					msg.push({
						delegator_address: address,
						validator_address: element.validator_address,
					});
				}
			});
			// const minGasFee = (fee * 1000000 + "").split(".")[0];

			const response = await walletStation.withdrawDelegatorReward(msg);
			console.log("response claim rewards: ", response);
			handleTransactionResponse(response, notification, history, setLoadingTransaction);
		} catch (error) {
			setLoadingTransaction(false);
			notification.error({message: handleErrorMessage(error)});
			console.log(error);
		}
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
				// validatorName={validatorName}
				fee={fee}
				minFee={minFee}
				setFee={setFee}
				onChangeGas={onChangeGas}
				gas={gas}
				handleClick={handleSubmit(onSubmit)}
				warning={true}
				buttonName={"Claim all token rewards"}
			/>
			{loadingTransaction && <LoadingOverlay />}
		</div>
	);
});

export default ClaimRwAllBtn;
