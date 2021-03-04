/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_, reduceString} from "src/lib/scripts";
import {formatOrai} from "src/helpers/helper";
import styles from "./WithdrawCardList.scss";
import arrowIcon from "src/assets/wallet/arrow_down.svg";

const cx = classNames.bind(styles);

const WithdrawCardList = memo(({data = []}) => {
	if (!Array.isArray(data)) {
		return <></>;
	}

	return (
		<div className='withdraw-card-list'>
			{data.map((item, index) => {
				return (
					<div className={cx("withdraw-card-list-item")} key={"withdraw-card-list-item-" + index}>
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
										<div className={cx("item-title")}>Withdrawable (ORAI)</div>
									</td>
								</tr>
								<tr>
									<td>
										{_.isNil(item?.staked) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{formatOrai(item?.staked)}</div>}
									</td>
									<td>
										{_.isNil(item?.withdrawable) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("item-text")}>{formatOrai(item.withdrawable)}</div>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Unbounded (ORAI)</div>
									</td>
									<td>
										<div className={cx("item-title")}>Reward</div>
									</td>
								</tr>
								<tr>
									<td>
										{_.isNil(item?.unbonded) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{formatOrai(item.unbonded)}</div>}
									</td>
									<td>
										{_.isNil(item?.rewards) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{formatOrai(item?.rewards)}</div>}
									</td>
								</tr>

								<tr>
									<td colSpan={2}>
										<div className={cx("withdraw-data-cell")}>
											<button className={cx("button")}>
												Withdraw
												<img className={cx("button-icon")} src={arrowIcon} />
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

export default WithdrawCardList;
