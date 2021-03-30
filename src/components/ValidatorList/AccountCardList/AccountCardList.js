// @ts-nocheck
import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import getTxType from "src/constants/getTxType";
import {_, reduceString, setAgoTime} from "src/lib/scripts";
import {formatFloat, formatOrai} from "src/helpers/helper";
import styles from "./AccountCardList.scss";
import successIcon from "src/assets/transactions/success_ic.svg";
import failureIcon from "src/assets/transactions/fail_ic.svg";
import moreIcon from "src/assets/transactions/tx_more_btn.svg";
import {useSelector} from "react-redux";

const AccountCardList = memo(({data = [], account}) => {
	const cx = classNames.bind(styles);
	const status = useSelector(state => state.blockchain.status);

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
									<td>
										<div className={cx("item-title")}>Address</div>
									</td>
									<td>
										{_.isNil(item?.address) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to={`${consts.PATH.TXLIST}/${item?.address}`}>
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
										{_.isNil(item?.nameTag) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("fee-data-cell", "align-right")}>
												<div className={cx("item-text")}>{item?.nameTag}</div>
											</div>
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
											<div className={cx("fee-data-cell", "align-right")}>
												<div className={cx("item-text")}>{item?.balance}</div>
											</div>
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
											<div className={cx("fee-data-cell", "align-right")}>
												<div className={cx("item-text")}>{item?.percentage}</div>
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

export default AccountCardList;
