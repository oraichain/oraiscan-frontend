// @ts-nocheck
import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {formatOrai, parseIbc, fromNowMoment} from "src/helpers/helper";
import {_, reduceString} from "src/lib/scripts";
import styles from "./DelegationCardList.scss";
import CheckIcon from "src/icons/CheckIcon";
import TimesIcon from "src/icons/TimesIcon";
import RedoIcon from "src/icons/RedoIcon";
const cx = classNames.bind(styles);

const DelegationCardList = memo(({data = []}) => {
	return (
		<div className='delegation-card-list'>
			{data.map((item, index) => {
				let resultDataCellContent;
				if (!item?.transaction?.code) {
					resultDataCellContent = (
						<div className={cx("result")}>
							<CheckIcon className={cx("result-icon", "result-icon-success")} />
							<span className={cx("result-text")}>Success</span>
						</div>
					);
				} else if (item?.transaction?.code) {
					resultDataCellContent = (
						<div className={cx("result")}>
							<TimesIcon className={cx("result-icon", "result-icon-fail")} />
							<span className={cx("result-text")}>Failure</span>
						</div>
					);
				} else if (item.transaction?.code === "pending") {
					resultDataCellContent = (
						<div className={cx("result")}>
							<RedoIcon className={cx("result-icon", "result-icon-pending")} />
							<span className={cx("result-text")}>Pending</span>
						</div>
					);
				}
				return (
					<div className={cx("delegation-card-list-item")} key={"delegation-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Tx Hash</div>
									</td>
									<td>
										{_.isNil(item?.transaction) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to={`${consts.PATH.VALIDATORS}/${item.transaction?.tx_hash}`}>
												{reduceString(item.transaction?.tx_hash, 6, 6)}
											</NavLink>
										)}
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("item-title")}>Type</div>
										{_.isNil(item?.tx_type) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<div className={cx("type-data-cell", "align-left")}>
												<div className={cx("type")}>
													<span className={cx("type-text")}>{item.tx_type}</span>
												</div>
											</div>
										)}
									</td>
									<td>
										<div className={cx("item-title")}>Result</div>
										{_.isNil(item?.tx_type) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<div className={cx("result-data-cell", "align-left")}>{resultDataCellContent}</div>
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
												<span className={cx("amount-denom")}>{parseIbc(item.denom)}</span>
											</div>
										)}
									</td>
									<td>
										<div className={cx("item-title")}>Fee</div>
										{_.isNil(item?.transaction) || _.isNil(item?.transaction?.gas_wanted) ? (
											<div className={cx("align-right")}>-</div>
										) : (
											<div className={cx("amount-data-cell", "align-right")}>
												<div className={cx("amount")}>
													<span className={cx("amount-value")}>{formatOrai(item.transaction?.gas_wanted)}</span>
													<span className={cx("amount-denom")}> {JSON.parse(item?.transaction?.fee)?.amount?.[0]?.denom}</span>
												</div>
											</div>
										)}
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("item-title")}>Height</div>
										{_.isNil(item?.transaction) || _.isNil(item?.transaction?.height) ? (
											<div className={cx("align-right")}>-</div>
										) : (
											<div className={cx("amount-data-cell", "align-right")}>
												<div className={cx("amount")}>
													<span className={cx("amount-value")}>{item?.transaction?.height}</span>
												</div>
											</div>
										)}
									</td>
									<td>
										<div className={cx("item-title")}>Time</div>
										{_.isNil(item?.created_at) ? (
											<div className={cx("align-right")}>-</div>
										) : (
											<div className={cx("time-data-cell", "align-right")}>
												<div className={cx("time")}>
													<span className={cx("time-text")}>{fromNowMoment(item.created_at)}</span>
												</div>
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
