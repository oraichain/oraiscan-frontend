// @ts-nocheck
import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import cn from "classnames/bind";
import copy from "copy-to-clipboard";
import {useGet} from "restful-react";
import {useSelector, useDispatch} from "react-redux";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import {showAlert} from "src/store/modules/global";
import consts from "src/constants/consts";
import {myKeystation} from "src/lib/Keystation";
import {formatInteger, formatOrai, formatFloat} from "src/helpers/helper";
import styles from "./AiServiceFee.scss";
import editIcon from "src/assets/icons/edit.svg";
// import roleIcon from "src/assets/wallet/role.svg";
import copyIcon from "src/assets/common/copy_ic.svg";
import config from "src/config";
import {InputNumberOrai} from "src/components/common/form-controls";
import {useForm, FormProvider} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import BigNumber from "bignumber.js";
import ClaimBaseRwBtn from "./ClaimBaseRwBtn";
import WithdrawRwBtn from "./WithdrawRwBtn";

const cx = cn.bind(styles);

const REWARD_POOL_STATUS = {
	BONDED: "Bonded",
	UNBONDING: "Unbonding",
	UNBONDED: "Unbonded",
};

const BtnComponent = ({handleClick, buttonName}) => {
	return (
		<div className={cx("claim-data-cell", "align-center", "claim-btn")}>
			<button className={cx("button")} onClick={handleClick}>
				{buttonName}
				{/* <img alt='/' className={cx("button-icon")} src={giftIcon} /> */}
			</button>
		</div>
	);
};

const AiServiceFee = memo(({moniker, address, pubkey}) => {
	const {account} = useSelector(state => state.wallet);
	const dispatch = useDispatch();

	const validationSchemaForm = yup.object().shape({
		amount: yup.string().required("Amount field is Required"),
	});

	const methods = useForm({
		resolver: yupResolver(validationSchemaForm),
	});

	const {handleSubmit, errors, register, setValue, getValues, setError, watch, trigger} = methods;

	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	const serviceFeeQuery = btoa(JSON.stringify({get_service_fees: {addr: address}}));
	const maxExecutorFeeQuery = btoa(JSON.stringify({get_bound_executor_fee: {}}));
	const pingQuery = btoa(JSON.stringify({get_ping_info: pubkey}));
	const baseRewardQuery = btoa(JSON.stringify({get_state: {}}));

	const path = `${consts.LCD_API_BASE}${consts.LCD_API.WASM}/${config.AIORACLE_SERVICE_FEES_ADDR}/smart/${serviceFeeQuery}`;
	const {data } = useGet({
		path: path,
	});

	const executorFeePath = `${consts.LCD_API_BASE}${consts.LCD_API.WASM}/${config.AIORACLE_CONTRACT_ADDR}/smart/${maxExecutorFeeQuery}`;
	const {data: executorFeeData} = useGet({
		path: executorFeePath,
	});

	const currentRewardPoolQuery = btoa(JSON.stringify({get_trusting_pool: {pubkey}}));
	const currentRewardPoolPath = `${consts.LCD_API_BASE}${consts.LCD_API.WASM}/${config.AIORACLE_CONTRACT_ADDR}/smart/${currentRewardPoolQuery}`;
	const {data: currentRewardPoolData} = useGet({
		path: currentRewardPoolPath,
	});

	const pingQueryPath = `${consts.LCD_API_BASE}${consts.LCD_API.WASM}/${config.PING_ADDR}/smart/${pingQuery}`;
	const {data: currentPingData} = useGet({
		path: pingQueryPath,
	});

	const baseRewardPath = `${consts.LCD_API_BASE}${consts.LCD_API.WASM}/${config.PING_ADDR}/smart/${baseRewardQuery}`;
	const {data: baseRewardData} = useGet({
		path: baseRewardPath,
	});

	const rewardStatus =
		currentRewardPoolData?.data?.trusting_pool?.withdraw_height === 0
			? REWARD_POOL_STATUS.BONDED
			: currentRewardPoolData?.data?.trusting_pool?.withdraw_height + currentRewardPoolData?.data?.trusting_period > currentRewardPoolData?.data?.current_height
			? REWARD_POOL_STATUS.UNBONDING
			: REWARD_POOL_STATUS.UNBONDED;

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
						amount: new BigNumber(values.updateFeeAmount.replaceAll(",", ""))
							.multipliedBy(1000000)
							.toFixed(0)
							.toString(),
						denom: "orai",
					},
				},
			});
			const payload = {
				type: "/cosmwasm.wasm.v1beta1.MsgExecuteContract",
				gasType: "auto",
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
			let popupTick = setInterval(function() {
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
			<div className={cx("validator-text")}>{formatOrai(parseInt(data?.data?.fees?.amount)) + " " + data?.data?.fees?.denom.toUpperCase()}</div>
		</>
	) : (
		<>
			<div className={cx("validator-title")}>Current fees</div>
			<div className={cx("validator-text")}>{"-"}</div>
		</>
	);

	const maxExecutorFeeElement = executorFeeData ? (
		<>
			<div className={cx("validator-title")}>Minimum executor fees for requesters</div>
			<div className={cx("validator-text")}>{formatOrai(parseInt(executorFeeData?.data?.amount)) + " " + executorFeeData?.data?.denom.toUpperCase()}</div>
		</>
	) : (
		<>
			<div className={cx("validator-title")}>Minimum executor fees for requesters</div>
			<div className={cx("validator-text")}>{"-"}</div>
		</>
	);

	const pingDataElement = currentPingData ? (
		<>
			<div className={cx("validator-title")}>Current number of ping rounds</div>
			<div className={cx("validator-text")}>{parseInt(currentPingData?.data?.ping_info?.total_ping)}</div>
		</>
	) : (
		<>
			<div className={cx("validator-title")}>Current number of ping rounds</div>
			<div className={cx("validator-text")}>{"-"}</div>
		</>
	);

	const baseRewardDataElement = baseRewardData ? (
		<>
			<div className={cx("validator-title")}>Base reward</div>
			<div className={cx("validator-text")}>
				{formatOrai(parseInt(baseRewardData?.data?.base_reward?.amount)) + " " + baseRewardData?.data?.base_reward?.denom.toUpperCase()}
			</div>
		</>
	) : (
		<>
			<div className={cx("validator-title")}>Base reward</div>
			<div className={cx("validator-text")}>{"-"}</div>
		</>
	);

	const currentRewardPoolElement = currentRewardPoolData ? (
		<>
			<div className={cx("validator-title")}>Your current reward pool</div>
			<div className={cx("validator-text")}>
				{formatOrai(parseInt(currentRewardPoolData?.data?.trusting_pool?.amount_coin?.amount)) +
					" " +
					currentRewardPoolData?.data?.trusting_pool?.amount_coin?.denom.toUpperCase()}
			</div>
		</>
	) : (
		<>
			<div className={cx("validator-title")}>Your current reward pool</div>
			<div className={cx("validator-text")}>{"-"}</div>
		</>
	);

	const currentRewardPoolStatusElement = currentRewardPoolData ? (
		<>
			<div className={cx("validator-title")}>Status</div>
			<div className={cx("validator-status", "validator-status-active")}>{rewardStatus}</div>
			{rewardStatus === REWARD_POOL_STATUS.UNBONDING ? (
				<div className={cx("validator-title")}>
					Bonding height remaining:{" "}
					{currentRewardPoolData?.data?.trusting_pool?.withdraw_height +
						currentRewardPoolData?.data?.trusting_period -
						currentRewardPoolData?.data?.current_height}
				</div>
			) : null}
		</>
	) : (
		<>
			<div className={cx("validator-title")}>Status</div>
			<div className={cx("validator-status", "validator-status-active")}>-</div>
		</>
	);

	const withdrawPoolButtonElement =
		rewardStatus === REWARD_POOL_STATUS.BONDED ? (
			<WithdrawRwBtn
				BtnComponent={({handleClick}) => {
					if(process.env.REACT_APP_WALLET_VERSION == 2) {
						return BtnComponent({handleClick, buttonName: "Unbond"})
					}
					return;
				}}
				buttonName="Unbond"
				validatorName={moniker}
			/>
		) : rewardStatus === REWARD_POOL_STATUS.UNBONDED ? (
			<WithdrawRwBtn
				BtnComponent={({handleClick}) => {
					if(process.env.REACT_APP_WALLET_VERSION == 2) {
						return BtnComponent({handleClick, buttonName: "Withdraw"})
					}
					return;
				}}
				buttonName="Withdraw"
				validatorName={moniker}
			/>
		) : null;

	const UpdateFeesElement = (
		<button
			className={cx("button")}
			onClick={() => {
				if (process.env.REACT_APP_WALLET_VERSION == 2) {
					updateFees(address);
				}
			}}>
			Update Fees
		</button>
	);

	const claimRewardElement = (
		<ClaimBaseRwBtn
			withdrawable={baseRewardData?.data?.base_reward?.amount}
			BtnComponent={({handleClick}) => {
				if(process.env.REACT_APP_WALLET_VERSION == 2) {
					return BtnComponent({handleClick, buttonName: "Claim Base Reward"})
				}
				return;
			}}
			validatorName={moniker}
		/>
	);

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
								{maxExecutorFeeElement}
							</Grid>
							<Grid item xs={6} className={cx("validator-detail")}>
								{UpdateFeesElement}
							</Grid>
							<Grid item xs={6} className={cx("validator-detail")}>
								<div className={cx("validator-title")}>
									<InputNumberOrai inputAmountValue={0} name='updateFeeAmount' errorobj={errors} placeholder={"0.0001 (in ORAI)"} />
								</div>
							</Grid>
							<Grid item xs={6} className={cx("validator-detail")}>
								{currentRewardPoolElement}
							</Grid>
							<Grid item xs={6} className={cx("validator-detail")}>
								{currentRewardPoolStatusElement}
							</Grid>
							<Grid item xs={6} className={cx("validator-detail")}>
								{withdrawPoolButtonElement}
							</Grid>
							<Grid item xs={6} className={cx("validator-detail")}>
								{pingDataElement}
							</Grid>
							<Grid item xs={6} className={cx("validator-detail")}>
								{baseRewardDataElement}
							</Grid>
							<Grid item xs={6} className={cx("validator-detail")}>
								{claimRewardElement}
							</Grid>
						</Grid>
					) : (
						<Grid container spacing={0}>
							<Grid item xs={6} className={cx("validator-detail")}>
								{currentFeesElement}
							</Grid>
							<Grid item xs={6} className={cx("validator-detail")}>
								{maxExecutorFeeElement}
							</Grid>
							<Grid item xs={6} className={cx("validator-detail")}>
								{UpdateFeesElement}
							</Grid>
							<Grid item xs={6} className={cx("validator-detail")}>
								{currentRewardPoolElement}
							</Grid>
							<Grid item xs={6} className={cx("validator-detail")}>
								{currentRewardPoolStatusElement}
							</Grid>
							<Grid item xs={6} className={cx("validator-detail")}>
								{withdrawPoolButtonElement}
							</Grid>
							<Grid item xs={6} className={cx("validator-detail")}>
								{pingDataElement}
							</Grid>
							<Grid item xs={6} className={cx("validator-detail")}>
								{baseRewardDataElement}
							</Grid>
							<Grid item xs={6} className={cx("validator-detail")}>
								{claimRewardElement}
							</Grid>
						</Grid>
					)}
				</div>
			</div>
		</FormProvider>
	);
});

export default AiServiceFee;
