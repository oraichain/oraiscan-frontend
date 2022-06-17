// @ts-nocheck
import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import { formatOrai } from "src/helpers/helper";
import { _, reduceString, reduceStringAssets } from "src/lib/scripts";
import styles from "./AssetsTableCardList.scss";

const cx = classNames.bind(styles);

const AssetsTableCardList = memo(({ data = [] }) => {
	return (
		<div className='delegation-card-list'>
			{data.map((item, index) => {
				return (
					<div className={cx("delegation-card-list-item")} key={"delegation-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Denom</div>
									</td>
									<td>
										{_.isNil(item?.validator_address) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											// <NavLink className={cx("item-link")} to={`${consts.PATH.VALIDATORS}/${item.validator_address}`}>
											// 	{reduceStringAssets(item.validator_address, 6, 6)}
											// </NavLink>
											<div className={cx("align-left")}>
												{reduceStringAssets(item.validator_address, 6, 6)}
											</div>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Amount</div>
										{_.isNil(item?.amount) || _.isNil(item?.denom) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("amount")}>
												<span className={cx("amount-value")}>{formatOrai(item.amount)}</span>
												<span className={cx("amount-denom")}>{reduceStringAssets(item.denom,7,3)}</span>
											</div>
										)}
									</td>
									<td>
										<div className={cx("item-title")}>Total Value</div>
										{_.isNil(item?.reward) || _.isNil(item?.denom_reward) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("reward")}>
												<span className={cx("reward-value")}>{formatOrai(item.reward)}</span>
												<span className={cx("reward-denom")}>{item.denom_reward}</span>
											</div>
										)}
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

export default AssetsTableCardList;
