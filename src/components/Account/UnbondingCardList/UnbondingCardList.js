import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import {calRemainingTime, formatDateTime, formatOrai} from "src/helpers/helper";
import {_, reduceString} from "src/lib/scripts";
import consts from "src/constants/consts";
import styles from "./UnbondingCardList.module.scss";

const cx = classNames.bind(styles);

const UnbondingCardList = memo(({data = []}) => {
	return (
		<div className='unbonding-card-list'>
			{data.map((item, index) => {
				return (
					<div className={cx("unbonding-card-list-item")} key={"unbonding-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Address</div>
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
										<div className={cx("item-title")}>Height</div>
									</td>
									<td>
										{_.isNil(item?.entries[0].creation_height) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("item-text")}>{item?.entries[0].creation_height}</div>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Amount</div>
									</td>
									<td>
										<div className={cx("item-title")}>Completion Time</div>
									</td>
								</tr>

								<tr>
									<td>
										{_.isNil(item?.entries?.[0]?.balance) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("amount")}>
												<span className={cx("amount-value")}>{formatOrai(item.entries[0].balance)}</span>
												<span className={cx("amount-denom")}>ORAI</span>
											</div>
										)}
									</td>
									<td>
										{_.isNil(item?.entries?.[0]?.completion_time) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("completion-time")}>
												<div className={cx("date-time")}>{formatDateTime(item.entries[0].completion_time)}</div>
												<span className={cx("remaining")}>{calRemainingTime(item.entries[0].completion_time)}</span>
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

export default UnbondingCardList;
