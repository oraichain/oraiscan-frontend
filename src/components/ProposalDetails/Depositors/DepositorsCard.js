// @ts-nocheck
import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import { _, reduceString, setAgoTime } from "src/lib/scripts";
import { formatOrai } from "src/helpers/helper";
import styles from "../TransactionCardList/TransactionCardList.module.scss";

let itemAmount;
const DepositorsCard = memo(({ data = [] }) => {
	const cx = classNames.bind(styles);

	return (
		<div className='transaction-card-list'>
			{data.map((item, index) => {
				if (item?.amount) {
					const denom = item?.amount.slice(-4)
					const amount = item?.amount.slice(0, -4)
					itemAmount = {
						amount,
						denom
					}
				}

				return (
					<div className={cx("transaction-card-list-item")} key={"transaction-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Depositor</div>
									</td>
									<td>
										{!item?.account_address ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to={`${consts.PATH.ACCOUNT}/${item?.account_address}`}>
												{reduceString(item?.account_address, 6, 6)}
											</NavLink>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>TxHash</div>
									</td>
									<td>
										{!item?.tx_hash ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to={`${consts.PATH.TXLIST}/${item.tx_hash}`}>
												{reduceString(item.tx_hash, 6, 6)}
											</NavLink>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Amount</div>
										<div className={cx("item-text")}>
											{formatOrai(itemAmount[0]?.amount)} {itemAmount[0]?.denom.toUpperCase()}
										</div>
									</td>
									<td>
										<div className={cx("item-title")}>Time</div>
										<div className={cx("item-text")}>{setAgoTime(item?.time_vote) || "-"}</div>
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

export default DepositorsCard;
