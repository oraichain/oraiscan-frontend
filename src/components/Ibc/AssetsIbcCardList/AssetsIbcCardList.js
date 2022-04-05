// @ts-nocheck
import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import { logoBrand } from "src/constants/logoBrand";
import { formatOrai, formatNumber } from "src/helpers/helper";
import { _ } from "src/lib/scripts";
import { Tooltip } from "@material-ui/core";
import styles from "./AssetsIbcCardList.scss";

const TestCaseCardList = memo(({ data = [] }) => {
	const cx = classNames.bind(styles);

	return (
		<div className='test-case-card-list'>
			{data.map((item, index) => {
				// const matchedLogoItem = logoBrand.find(logoBrandItem => item?.owner === logoBrandItem.operatorAddress);
				// let ownerName;
				// if (matchedLogoItem) {
				// 	ownerName = matchedLogoItem?.name ?? "-";
				// }

				return (
					<div className={cx("test-case-card-list-item")} key={"test-case-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Name</div>
									</td>
									<td>{_.isNil(item?.channelId) ? <div className={cx("item-link")}>-</div> : <>
									<div className={cx("item-symbol")}>{item.symbol}</div>
									<div className={cx("item-link")}>{item.channelId}</div></>}</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Price</div>
										{_.isNil(item?.prices) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("price")}>
												<span className={cx("price-value")}>$ {item?.prices?.price}</span>
												{/* <span className={cx("price-denom")}>ORAI</span> */}
											</div>
										)}
									</td>
									<td>
										<div className={cx("item-title")}>Supply</div>
										{_.isNil(item?.prices) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{formatNumber(item?.prices?.supply)}</div>}
									</td>
								</tr>

								<tr>
									<td colSpan={2}>
										<div className={cx("item-title")}>Total Value</div>
										{_.isNil(item?.prices) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{formatNumber(item?.prices?.TotalValue)}</div>}
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

export default TestCaseCardList;
