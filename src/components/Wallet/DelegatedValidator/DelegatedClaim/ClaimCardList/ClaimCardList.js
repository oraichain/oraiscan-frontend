/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_, reduceString} from "src/lib/scripts";
import {useSelector, useDispatch} from "react-redux";
import {formatOrai} from "src/helpers/helper";
import styles from "./ClaimCardList.scss";
import giftIcon from "src/assets/wallet/gift.svg";
import {showAlert} from "src/store/modules/global";
import { walletStation } from "src/lib/walletStation";

const cx = classNames.bind(styles);

const ClaimCardList = memo(({data = [], totalStaked, totalRewards}) => {
	const {address, account} = useSelector(state => state.wallet);
	const dispatch = useDispatch();
	if (!Array.isArray(data)) {
		return <></>;
	}

	const handleClickClaim = async (validatorAddress, claimableRewards) => {
		if (parseFloat(claimableRewards) <= 0 || !parseFloat(claimableRewards)) {
			return dispatch(
				showAlert({
					show: true,
					message: "Claimable Rewards ORAI must greater than 0",
					autoHideDuration: 1500,
					type: "error",
				})
			);
		}
		
		const response = await walletStation.withdrawDelegatorReward([{
			delegator_address: address, validator_address: validatorAddress
		}]);
		console.log("response claim rewards: ", response);
	}

	const handleClickClaimAll = async (validatorAddress, claimableRewards) => {
		let msg = [];
		data.forEach(element => {
			if (parseFloat(element.claimable_rewards) && parseFloat(element.claimable_rewards) > 0) {
				msg.push({
					delegator_address: address,
					validator_address: element.validator_address,
				});
			}			
		});

		const response = await walletStation.withdrawDelegatorReward(msg);
		console.log("result withdraw delegator reward: ", response);

	};

	return (
		<div className='claim-card-list'>
			<div className={cx("claim-card-list-claim")} key={"claim-card-list-item-11"}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("claim-data-cell", "align-center", "claim-btn")} onClick={() => handleClickClaimAll()}>
									<button className={cx("button")}>
										Claim All
										<img alt='/' className={cx("button-icon")} src={giftIcon} />
									</button>
								</div>
							</td>
						</tr>
						<td>
							<div className={cx("item-title")}></div>
						</td>
					</tbody>
				</table>
			</div>
			{data.map((item, index) => {
				return (
					<div className={cx("claim-card-list-item")} key={"claim-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Validator</div>
									</td>
									<td>
										{item?.validator ? (
											<NavLink className={cx("item-link")} to={`${consts.PATH.VALIDATORS}/${item.validator}`}>
												{reduceString(item.validator, 6, 6)}
											</NavLink>
										) : (
											<div className={cx("item-text")}>-</div>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Staked ({totalStaked} ORAI)</div>
									</td>
									<td>
										<div className={cx("item-title")}>Claimable Reward ({totalRewards} ORAI)</div>
									</td>
								</tr>

								<tr>
									<td>
										{_.isNil(item?.staked) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{formatOrai(item?.staked)}</div>}
									</td>
									<td>
										{_.isNil(item?.claimable_rewards) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("item-text")}>{formatOrai(item.claimable_rewards)}</div>
										)}
									</td>
								</tr>

								<tr>
									<td colSpan={2}>
										<div className={cx("claim-data-cell")} onClick={() => handleClickClaim(item?.validator_address, item.claimable_rewards)}>
											<button className={cx("button")}>
												Claim
												<img className={cx("button-icon")} src={giftIcon} />
											</button>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				);
			})}
		</div>
	);
});

export default ClaimCardList;
