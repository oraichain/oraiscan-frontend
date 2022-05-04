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
import styles from "./YourValidatorCard.scss";
import editIcon from "src/assets/icons/edit.svg";
import {_,  reduceStringAssets } from "src/lib/scripts";
// import roleIcon from "src/assets/wallet/role.svg";
import copyIcon from "src/assets/common/copy_ic.svg";
import {payloadTransaction} from "src/helpers/transaction";
import WithdrawBtn from "./WithdrawBtn";
import arrowIcon from "src/assets/wallet/arrow_down.svg";

const cx = cn.bind(styles);

const BtnComponent = ({ handleClick, buttonName }) => {
	return (
		<div className={cx("withdraw-data-cell", "align-center")}>
			<button className={cx("button")} onClick={handleClick}>
				{buttonName}
				<img alt='/' className={cx("button-icon")} src={arrowIcon} />
			</button>
		</div>
	);
};

const YourValidatorCard = memo(({validatorAddress}) => {
	const {account} = useSelector(state => state.wallet);
	const dispatch = useDispatch();

	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const isLargeScreenMd = useMediaQuery(theme.breakpoints.up("md"));
	const path = consts.API.WALLET.VALIDATOR + "/" + validatorAddress;
	const {data} = useGet({
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

	const validatorNameElement = data ? (
		<>
			<div className={cx("validator-title")}>Validator name</div>
			<div className={cx("validator-name")}>
				<NavLink className={cx("nav-link")} to={`${consts.PATH.VALIDATORS}/${data?.validator_address ?? ""}`}>
					<span className={cx("validator-link")}>{data?.validator_name ?? "-"}</span>
				</NavLink>
				<NavLink className={cx("nav-link")} to='/'>
					<img className={cx("validator-icon", "validator-icon-right")} src={editIcon} />
				</NavLink>
			</div>
		</>
	) : (
		<>
			<div className={cx("validator-title")}>Validator name</div>
			<div className={cx("validator-name")}>
				<Skeleton variant='text' width={100} height={27} className={cx("skeleton")} />
			</div>
		</>
	);

	const totalDelegatorsElement = data ? (
		<>
			<div className={cx("validator-title")}>Total Delegators</div>
			<div className={cx("validator-text")}>{formatInteger(data?.total_delegators ?? "-")}</div>
		</>
	) : (
		<>
			<div className={cx("validator-title")}>Total Delegators</div>
			<div className={cx("validator-text")}>
				<Skeleton variant='text' width={100} height={27} className={cx("skeleton")} />
			</div>
		</>
	);

	const validatorAddressElement = data ? (
		<>
			<div className={cx("validator-title")}>
				Validator address
				<img
					alt='/'
					className={cx("validator-icon", "validator-icon-clickable", "validator-icon-right")}
					src={copyIcon}
					onClick={() => {
						handleCopy(data?.validator_address ?? "-");
					}}
				/>
			</div>
			<div className={cx("validator-text")}>{isLargeScreenMd ? data?.validator_address : reduceStringAssets(data?.validator_address,30,10) ?? "-"}</div>
		</>
	) : (
		<>
			<div className={cx("validator-title")}>
				Validator address
				<Skeleton variant='text' width={16} height={27} className={cx("skeleton")} />
			</div>
			<Skeleton variant='text' width={100} height={27} className={cx("skeleton")} />
		</>
	);

	const totalStakeAmountElement = data ? (
		<>
			<div className={cx("validator-title")}>Total Stake Amount</div>
			<div className={cx("validator-text")}>{formatOrai(data?.total_stake_amount) ?? "-"} ORAI</div>
		</>
	) : (
		<>
			<div className={cx("validator-title")}>Total Stake Amount</div>
			<div className={cx("validator-text")}>
				<Skeleton variant='text' width={50} height={27} className={cx("skeleton")} />
			</div>
		</>
	);

	const statusElement = data ? (
		<>
			<div className={cx("validator-title")}>Status</div>
			<div className={cx("validator-status", "validator-status-active")}>{data?.status ?? "-"}</div>
		</>
	) : (
		<>
			<div className={cx("validator-title")}>Status</div>
			<div className={cx("validator-status", "validator-status-active")}>
				<Skeleton variant='text' width={50} height={27} className={cx("skeleton")} />
			</div>
		</>
	);

	const missingBlockElement = data ? (
		<>
			<div className={cx("validator-title")}>Missing Block</div>
			<div className={cx("validator-text")}>{data?.missing_block ?? "-"}</div>
		</>
	) : (
		<>
			<div className={cx("validator-title")}>Missing Block</div>
			<div className={cx("validator-text")}>
				<Skeleton variant='text' width={20} height={27} className={cx("skeleton")} />
			</div>
		</>
	);

	const commissionRateElement = data ? (
		<>
			<div className={cx("validator-title")}>Commission Rate</div>
			<div className={cx("validator-text", {"validator-text-blue": !isLargeScreen})}>
				{data?.commission_rate ? formatFloat(data.commission_rate) + "%" : "-"}
			</div>
		</>
	) : (
		<>
			<div className={cx("validator-title")}>Commission Rate</div>
			<div className={cx("validator-text")}>
				<Skeleton variant='text' width={20} height={27} className={cx("skeleton")} />
			</div>
		</>
	);

	const claimableCommissionRewardElement = data ? (
		<>
			<div className={cx("validator-title")}>Claimable Commission Reward</div>
			<div className={cx("validator-text")}>{data?.claimable_commission_reward ? formatOrai(data.claimable_commission_reward) : "-"} ORAI</div>
		</>
	) : (
		<>
			<div className={cx("validator-title")}>Claimable Commission Reward</div>
			<div className={cx("validator-text")}>
				<Skeleton variant='text' width={50} height={27} className={cx("skeleton")} />
			</div>
		</>
	);

	const maxCommissionRateElement = data ? (
		<>
			<div className={cx("validator-title")}>Max Commission Rate</div>
			<div className={cx("validator-text", {"validator-text-blue": !isLargeScreen})}>
				{data?.max_commission_rate ? formatFloat(data.max_commission_rate) + "%" : "-"}
			</div>
		</>
	) : (
		<>
			<div className={cx("validator-title")}>Max Commission Rate</div>
			<div className={cx("validator-text")}>
				<Skeleton variant='text' width={50} height={27} className={cx("skeleton")} />
			</div>
		</>
	);

	const maxChangeCommissionRateElement = data ? (
		<>
			<div className={cx("validator-title")}>Max Change Commission Rate</div>
			<div className={cx("validator-text", {"validator-text-blue": !isLargeScreen})}>
				{data?.max_change_commission_rate ? formatFloat(data.max_change_commission_rate) + "%" : "-"}
			</div>
		</>
	) : (
		<>
			<div className={cx("validator-title")}>Max Change Commission Rate</div>
			<div className={cx("validator-text")}>
				<Skeleton variant='text' width={50} height={27} className={cx("skeleton")} />
			</div>
		</>
	);

	const withdrawElement = data ? (
		<WithdrawBtn validatorAddress={data?.validator_address} BtnComponent={({ handleClick }) => BtnComponent({ handleClick, buttonName: "Withdraw" })} validatorName={data.validator_name} />
	) : (
		<Skeleton variant='text' width={96} height={36} className={cx("skeleton")} />
	);

	return (
		<div className={cx("your-validator-card")}>
			<div className={cx("your-validator-card-header")}>Your Validator</div>
			<div className={cx("your-validator-card-body")}>
				{isLargeScreen ? (
					<Grid container spacing={0}>
						<Grid item xs={6} className={cx("validator-detail")}>
							{validatorNameElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{totalDelegatorsElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{validatorAddressElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{totalStakeAmountElement}
						</Grid>

						<Grid item xs={6} className={cx("validator-detail")}>
							{statusElement}
						</Grid>

						<Grid item xs={6} className={cx("validator-detail")}>
							{missingBlockElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{commissionRateElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{claimableCommissionRewardElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{maxCommissionRateElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{withdrawElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{maxChangeCommissionRateElement}
						</Grid>
					</Grid>
				) : (
					<Grid container spacing={0}>
						<Grid item xs={12} className={cx("validator-detail")}>
							{validatorNameElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{validatorAddressElement}
						</Grid>

						<Grid item xs={12} className={cx("validator-detail")}>
							{commissionRateElement}
						</Grid>
						<Grid item xs={12} className={cx("validator-detail")}>
							{maxCommissionRateElement}
						</Grid>
						<Grid item xs={12} className={cx("validator-detail")}>
							{maxChangeCommissionRateElement}
						</Grid>
						<Grid item xs={12} className={cx("validator-detail")}>
							{totalDelegatorsElement}
						</Grid>
						<Grid item xs={12} className={cx("validator-detail")}>
							{totalStakeAmountElement}
						</Grid>
						<Grid item xs={12} className={cx("validator-detail")}>
							{statusElement}
						</Grid>
						<Grid item xs={12} className={cx("validator-detail")}>
							{missingBlockElement}
						</Grid>
						<Grid item xs={12} className={cx("validator-detail")}>
							{claimableCommissionRewardElement}
							{withdrawElement}
						</Grid>
					</Grid>
				)}
			</div>
		</div>
	);
});

export default YourValidatorCard;
