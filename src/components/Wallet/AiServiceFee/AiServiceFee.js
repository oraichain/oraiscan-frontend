// @ts-nocheck
import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames/bind";
import copy from "copy-to-clipboard";
import { useGet } from "restful-react";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import { showAlert } from "src/store/modules/global";
import consts from "src/constants/consts";
import { myKeystation } from "src/lib/Keystation";
import { formatInteger, formatOrai, formatFloat } from "src/helpers/helper";
import styles from "./AiServiceFee.scss";
import editIcon from "src/assets/icons/edit.svg";
// import roleIcon from "src/assets/wallet/role.svg";
import copyIcon from "src/assets/common/copy_ic.svg";
import config from "src/config";
import { InputNumberOrai } from "src/components/common/form-controls";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BigNumber from "bignumber.js";

const cx = cn.bind(styles);

const AiServiceFee = memo(({ address }) => {
	const { account } = useSelector(state => state.wallet);
	const dispatch = useDispatch();

	const validationSchemaForm = yup.object().shape({
		amount: yup.string().required("Amount field is Required"),
	});

	const methods = useForm({
		resolver: yupResolver(validationSchemaForm),
	});

	const { handleSubmit, errors, register, setValue, getValues, setError, watch, trigger } = methods;

	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	const serviceFeeQuery = btoa(JSON.stringify({ get_service_fees: { addr: address } }));
	const path = `${consts.LCD_API_BASE}${consts.LCD_API.WASM}/${config.AIORACLE_SERVICE_FEES_ADDR}/smart/${serviceFeeQuery}`;
	const { data } = useGet({
		path: path,
	});

	const handleCopy = address => {
		copy(address);
		dispatch(
			showAlert({
				show: true,
				message: "Copied",
				autoHideDuration: 1500,
			})
		);
	};

	const updateFees = address => {
		const values = getValues();
		if (values.updateFeeAmount) {
			const msg = JSON.stringify({
				update_service_fees: {
					fees: {
						amount: new BigNumber(values.updateFeeAmount.replaceAll(",", "")).multipliedBy(1000000).toFixed(0).toString(),
						denom: "orai"
					}
				}
			})
			const payload = {
				type: "/cosmwasm.wasm.v1beta1.MsgExecuteContract",
				value: {
					msg: [
						{
							type: "/cosmwasm.wasm.v1beta1.MsgExecuteContract",
							value: {
								contract: config.AIORACLE_SERVICE_FEES_ADDR,
								msg,
								sender: address,
								sent_funds: null,
							},
						},
					],
					fee: {
						amount: [0],
						gas: 200000,
					},
					signatures: null,
					memo: "",
				},
			};

			const popup = myKeystation.openWindow("transaction", payload, account);
			let popupTick = setInterval(function () {
				if (popup.closed) {
					clearInterval(popupTick);
				}
			}, 500);
		} else {
			setError("updateFeeAmount", {
				type: "Invalid amount",
				message: "Update fees amount is invalid",
			});
			return;
		}
	};

	const currentFeesElement = data ? (
		<>
			<div className={cx("validator-title")}>Current fees</div>
			<div className={cx("validator-text")}>{formatOrai(parseInt(data?.data?.fees?.amount)) + data?.data?.fees?.denom.toUpperCase()}</div>
		</>
	) : (
		<>
			<div className={cx("validator-title")}>Current fees</div>
			<div className={cx("validator-text")}>{'-'}</div>
		</>
	);

	const UpdateFeesElement =
		<button
			className={cx("button")}
			onClick={() => {
				if (process.env.REACT_APP_WALLET_VERSION == 2) {
					console.log("Data: ", data);
					updateFees(address);
				}
			}}>
			Update Fees
		</button>;

	return (
		<FormProvider {...methods}>
			<div className={cx("your-validator-card")}>
				<div className={cx("your-validator-card-header")}>Your AI Oracle service fees</div>
				<div className={cx("your-validator-card-body")}>
					{isLargeScreen ? (
						<Grid container spacing={0}>
							<Grid item xs={6} className={cx("validator-detail")}>
								{currentFeesElement}
							</Grid>
							<Grid item xs={6} className={cx("validator-detail")}>
								{ }
							</Grid>
							<Grid item xs={6} className={cx("validator-detail")}>
								{UpdateFeesElement}
							</Grid>
							<Grid item xs={6} className={cx("validator-detail")}>
								<div className={cx("validator-title")}>
									<InputNumberOrai inputAmountValue={0} name='updateFeeAmount' errorobj={errors} placeholder={"0.0001 (in ORAI)"} />
								</div>
							</Grid>
						</Grid>
					) : (
						<Grid container spacing={0}>
							<Grid item xs={6} className={cx("validator-detail")}>
								{currentFeesElement}
							</Grid>
							<Grid item xs={6} className={cx("validator-detail")}>
								{ }
							</Grid>
							<Grid item xs={6} className={cx("validator-detail")}>
								{UpdateFeesElement}
							</Grid>
						</Grid>
					)}
				</div>
			</div>
		</FormProvider>
	);
});

export default AiServiceFee;
