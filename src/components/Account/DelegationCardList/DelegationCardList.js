// @ts-nocheck
import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {formatOrai} from "src/helpers/helper";
import {_, reduceString} from "src/lib/scripts";
import styles from "./DelegationCardList.module.scss";

const cx = classNames.bind(styles);

const DelegationCardList = memo(({data = []}) => {
	return (
		<div className='delegation-card-list'>
			{data.map((item, index) => {
				return (
					<div className={cx("delegation-card-list-item")} key={"delegation-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Validator</div>
									</td>
									<td>
										{_.isNil(item?.validator_address) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to={`${consts.PATH.VALIDATORS}/${item.validator_address}`}>
												{reduceString(item.validator_address, 6, 6)}
											</NavLink>
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
												<span className={cx("amount-denom")}>{reduceString(item.denom)}</span>
											</div>
										)}
									</td>
									<td>
										<div className={cx("item-title")}>Reward</div>
										{_.isNil(item?.reward) || _.isNil(item?.denom) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("reward")}>
												<span className={cx("reward-value")}>{formatOrai(item.reward)}</span>
												<span className={cx("reward-denom")}>{reduceString(item.denom)}</span>
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

export default DelegationCardList;
