/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_, reduceString} from "src/lib/scripts";
import {formatOrai} from "src/helpers/helper";
import styles from "./DelegatorCardList.scss";

const cx = classNames.bind(styles);

const DelegatorCardList = memo(({data = [], address = ""}) => {
	if (!Array.isArray(data)) {
		return <></>;
	}

	return (
		<div className='delegator-card-list'>
			{data.map((item, index) => {
				let ownerBadge = null;

				if (item?.address && item.address == address) {
					ownerBadge = <span className={cx("owner-badge")}>Owner</span>;
				}

				return (
					<div className={cx("delegator-card-list-item")} key={"delegator-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Address</div>
									</td>
									<td>
										{item?.address ? (
											<div className={cx("address-data-cell", {"address-data-cell-with-owner-badge": ownerBadge})}>
												{ownerBadge && ownerBadge}
												<NavLink className={cx("address")} to={`${consts.PATH.VALIDATORS}/${item.address}`}>
													{reduceString(item.address, 4, 3)}
												</NavLink>
											</div>
										) : (
											<div className={cx("item-link")}>-</div>
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
							</tbody>
						</table>
					</div>
				);
			})}
		</div>
	);
});

export default DelegatorCardList;
