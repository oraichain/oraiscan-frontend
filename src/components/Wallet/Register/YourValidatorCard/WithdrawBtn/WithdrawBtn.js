// @ts-nocheck
import React, {memo, useState, useEffect} from "react";
import cn from "classnames/bind";
import {useForm, FormProvider} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import styles from "./WithdrawBtn.scss";
import {useHistory} from "react-router-dom";
import {handleTransactionResponse, payloadTransaction} from "src/helpers/transaction";
import amountConsts from "src/constants/amount";
import DialogForm from "src/components/DialogForm";
import {walletStation} from "src/lib/walletStation";
import {notification} from "antd";
import LoadingOverlay from "src/components/common/LoadingOverlay";
const cx = cn.bind(styles);

const {GAS_DEFAULT} = amountConsts;

const WithdrawBtn = memo(({validatorAddress, BtnComponent, validatorName}) => {
	const [open, setOpen] = useState(false);
	const [gas, setGas] = useState(GAS_DEFAULT);
	const [loadingTransaction, setLoadingTransaction] = useState(false);
	const {account} = useSelector(state => state.wallet);
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
	const {handleSubmit, getValues} = methods;

	const onSubmit = async data => {
		try {
			setLoadingTransaction(true);
			const minGasFee = (fee * 1000000 + "").split(".")[0];

			const response = await walletStation.withdrawCommission(validatorAddress);
			console.log("response withdraw commission reward: ", response);
			handleTransactionResponse(response, notification, history, setLoadingTransaction);
		} catch (error) {
			setLoadingTransaction(false);
			notification.error({message: `Transaction failed with message: ${error?.toString()}`});
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
			{process.env.REACT_APP_WALLET_VERSION == 2 && (
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
					buttonName={"Withdraw"}></DialogForm>
			)}
			{loadingTransaction && <LoadingOverlay />}
		</div>
	);
});

export default WithdrawBtn;
