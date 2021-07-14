// @ts-nocheck
import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import {formatOrai} from "src/helpers/helper";
import styles from "./AccountCardList.scss";
import {useSelector} from "react-redux";

const AccountCardList = memo(({data = []}) => {
	const cx = classNames.bind(styles);

	return (
		<div className='account-card-list'>
			{data.map((item, index) => {
				return (
					<div className={cx("account-card-list-item")} key={"account-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Rank</div>
									</td>
									<td>{_.isNil(item?.rank) ? <div className={cx("item-link")}>-</div> : <div className={cx("item-text")}>{item?.rank}</div>}</td>
								</tr>

								<tr>
									<td colSpan={2}>
										<div className={cx("item-title")}>Address</div>
										{_.isNil(item?.address) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to={`${consts.PATH.ACCOUNT}/${item?.address}`}>
												{item?.address}
											</NavLink>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Name Tag</div>
									</td>
									<td>
										{_.isNil(item?.name_tag) || item?.name_tag === "" ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("item-text")}>{item?.name_tag}</div>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Balance</div>
									</td>
									<td>
										{_.isNil(item?.balance) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("item-text")}>{`${formatOrai(item?.balance)} ORAI`}</div>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Percentage</div>
									</td>
									<td>
										{_.isNil(item?.percentage) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("item-text")}>{`${(item?.percentage * 100)?.toFixed(6)}%`}</div>
										)}
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("item-title")}>Txn Count</div>
									</td>
									<td>{_.isNil(item?.txn_count) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{item?.txn_count}</div>}</td>
								</tr>
							</tbody>
						</table>
					</div>
				);
			})}
		</div>
	);
});

export default AccountCardList;
