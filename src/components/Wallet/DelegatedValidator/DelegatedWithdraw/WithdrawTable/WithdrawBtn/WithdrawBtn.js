// @ts-nocheck
import React, {memo, useState, useEffect} from "react";
import cn from "classnames/bind";
import {useForm, FormProvider} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import BigNumber from "bignumber.js";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {InputNumberOrai, TextArea} from "src/components/common/form-controls";
import {useHistory} from "react-router-dom";
import {payloadTransaction, minusFees, handleTransactionResponse} from "src/helpers/transaction";
import amountConsts from "src/constants/amount";
import DialogForm from "src/components/DialogForm";
import {calculateAmount} from "src/helpers/calculateAmount";
import {walletStation} from "src/lib/walletStation";
import {notification} from "antd";
import LoadingOverlay from "src/components/common/LoadingOverlay";
import {handleErrorMessage} from "../../../../../../lib/scripts";
import styles from "./WithdrawBtn.module.scss";

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

const {GAS_DEFAULT, PERCENTS} = amountConsts;

const WithdrawBtn = memo(({validatorAddress, withdrawable, BtnComponent, validatorName}) => {
	const [open, setOpen] = useState(false);
	const [gas, setGas] = useState(GAS_DEFAULT);
	const {address, account} = useSelector(state => state.wallet);
	const minFee = useSelector(state => state.blockchain.minFee);
	const percents = PERCENTS;
	const [fee, setFee] = useState(0);
	const history = useHistory();
	const dispatch = useDispatch();
	const balance = new BigNumber(withdrawable);
	const [loadingTransaction, setLoadingTransaction] = useState(false);

	const openDialog = () => {
		setOpen(true);
	};
	const closeDialog = () => {
		setOpen(false);
		setGas(GAS_DEFAULT);
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

	const onSubmit = async data => {
		// const minGasFee = (fee * 1000000 + "").split(".")[0];
		// let amount = minusFees(fee, data.amount);
		try {
			setLoadingTransaction(true);
			const response = await walletStation.undelegate(address, validatorAddress, new BigNumber(data.amount.replaceAll(",", "")).multipliedBy(1000000));
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
				validatorName={validatorName}
				fee={fee}
				minFee={minFee}
				setFee={setFee}
				onChangeGas={onChangeGas}
				gas={gas}
				handleClick={handleSubmit(onSubmit)}
				warning={true}
				buttonName={"Withdraw tokens"}>
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
			</DialogForm>
			{loadingTransaction && <LoadingOverlay />}
		</div>
	);
});

export default WithdrawBtn;
