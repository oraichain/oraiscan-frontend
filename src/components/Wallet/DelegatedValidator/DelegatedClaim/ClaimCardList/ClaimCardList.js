/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_, reduceString} from "src/lib/scripts";
import {formatOrai} from "src/helpers/helper";
import {myKeystation} from "src/lib/Keystation";
import {showAlert} from "src/store/modules/global";
import styles from "./ClaimCardList.scss";
import giftIcon from "src/assets/wallet/gift.svg";

const cx = classNames.bind(styles);

const ClaimCardList = memo(({data = []}) => {
	const {address, account} = useSelector(state => state.wallet);
	const dispatch = useDispatch();

	const handleClickClaim = (validatorAddress, claimableRewards) => {
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

		const payload = {
			type: "cosmos-sdk/MsgWithdrawDelegationReward",
			value: {
				msg: [
					{
						type: "cosmos-sdk/MsgWithdrawDelegationReward",
						value: {
							delegator_address: address,
							validator_address: validatorAddress,
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
	};

	if (!Array.isArray(data)) {
		return <></>;
	}

	return (
		<div className='claim-card-list'>
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
										<div className={cx("item-title")}>Staked (ORAI)</div>
									</td>
									<td>
										<div className={cx("item-title")}>Claimable Reward (ORAI)</div>
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
										<div className={cx("claim-data-cell")}>
											<button className={cx("button")} onClick={() => handleClickClaim(item?.validator_address, item.claimable_rewards)}>
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
