// @ts-nocheck
import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {formatOrai, formatNumber, parseIbc} from "src/helpers/helper";
import {_, reduceString, reduceStringAssets} from "src/lib/scripts";
import styles from "./RelayersAssetsTableCardList.module.scss";

const cx = classNames.bind(styles);

const RelayersAssetsTableCardList = memo(({data = []}) => {
	return (
		<div className='delegation-card-list'>
			{data.map((item, index) => {
				return (
					<div className={cx("delegation-card-list-item")} key={"delegation-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Name</div>
									</td>
									<td>
										{_.isNil(item?.total_txs) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<div className={cx("name-data")}>
												<div className={cx("name-data-cell", "align-left", "denom")}>{parseIbc(item?.denom)}</div>
												<div className={cx("name-data-cell", "align-left", "channel")}>{item?.channel_id}</div>
											</div>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Total Txs</div>
										{_.isNil(item?.total_txs) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<div className={cx("txs-data")}>
												<div className={cx("align-left")}>{formatNumber(item.total_txs)}</div>
											</div>
										)}
									</td>
									<td>
										<div className={cx("item-title")}>Total Amount</div>
										{_.isNil(item?.amount) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<div className={cx("amount-data")}>
												<div className={cx("align-left")}>{formatNumber(item.amount)}</div>
											</div>
										)}
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("item-title")}>Total Value</div>
									</td>
									<td>
										{_.isNil(item?.total_value) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<div className={cx("value-data")}>
												<div className={cx("align-left")}>$ {formatNumber(item.total_value)}</div>
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

export default RelayersAssetsTableCardList;
