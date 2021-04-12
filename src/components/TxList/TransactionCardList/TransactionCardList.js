// @ts-nocheck
import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import consts from "src/constants/consts";
import getTxType from "src/constants/getTxType";
import {_, reduceString, setAgoTime} from "src/lib/scripts";
import {formatFloat, formatOrai} from "src/helpers/helper";
import CheckIcon from "src/icons/CheckIcon";
import TimesIcon from "src/icons/TimesIcon";
import RedoIcon from "src/icons/RedoIcon";
import styles from "./TransactionCardList.scss";

import MoreIcon from "src/icons/Transactions/MoreIcon";
import SuccessIcon from "src/icons/Transactions/SuccessIcon";
import FailedIcon from "src/icons/Transactions/FailedIcon";

const TransactionCardList = memo(({data = [], account}) => {
	const cx = classNames.bind(styles);
	const status = useSelector(state => state.blockchain.status);

	return (
		<div className='transaction-card-list'>
			{data.map((item, index) => {
				let transferStatus = null;
				if (
					account &&
					// item?.messages?.[0]?.type == txTypes.COSMOS_SDK.MSG_SEND &&
					item?.messages?.[0]?.value &&
					item?.messages?.[0]?.value?.amount &&
					item?.messages?.[0]?.value?.from_address &&
					item?.messages?.[0]?.value?.to_address
				) {
					if (account === item.messages[0].value.from_address) {
						transferStatus = <span className={cx("transfer-status", "transfer-status-out")}>OUT</span>;
					} else if (account === item.messages[0].value.to_address) {
						transferStatus = <span className={cx("transfer-status", "transfer-status-in")}>IN</span>;
					}
				}

				let resultDataCellContent;
				if (item.result === true) {
					resultDataCellContent = (
						<div className={cx("result")}>
							<CheckIcon className={cx("result-icon", "result-icon-success")} />
							<span className={cx("result-text")}>Success</span>
						</div>
					);
				} else if (item.result === false) {
					resultDataCellContent = (
						<div className={cx("result")}>
							<TimesIcon className={cx("result-icon", "result-icon-fail")} />
							<span className={cx("result-text")}>Failure</span>
						</div>
					);
				} else if (item.result === "pending") {
					resultDataCellContent = (
						<div className={cx("result")}>
							<RedoIcon className={cx("result-icon", "result-icon-pending")} />
							<span className={cx("result-text")}>Pending</span>
						</div>
					);
				}

				let amount;
				let denom;
				if (!_.isNil(item?.messages?.[0]?.value?.amount?.[0]?.denom) && !_.isNil(item?.messages?.[0]?.value?.amount?.[0]?.amount)) {
					amount = item.messages[0].value.amount[0].amount;
					denom = item.messages[0].value.amount[0].denom;
				} else if (!_.isNil(item?.messages?.[0]?.value?.amount?.denom) && !_.isNil(item?.messages?.[0]?.value?.amount?.amount)) {
					amount = item.messages[0].value.amount.amount;
					denom = item.messages[0].value.amount.denom;
				}

				return (
					<div className={cx("transaction-card-list-item")} key={"transaction-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>TxHash</div>
									</td>
									<td>
										{_.isNil(item?.tx_hash) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to={`${consts.PATH.TXLIST}/${item.tx_hash}`}>
												{reduceString(item.tx_hash, 6, 6)}
											</NavLink>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Type</div>
									</td>
									<td>
										{_.isNil(item?.messages?.[0]?.type) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("type-data-cell")}>
												<div className={cx("first-message-type")}>{getTxType(item.messages[0].type)}</div>
												{item.messages.length > 1 && <div className={cx("number-of-message")}>+{item.messages.length - 1}</div>}
											</div>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Result</div>
										{_.isNil(item?.result) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("result-data-cell")}>
												{item?.result ? (
													<div className={cx("result")}>
														<SuccessIcon className={cx("result-icon-success")}></SuccessIcon>
														<span className={cx("result-text")}>Success</span>
													</div>
												) : (
													<div className={cx("result")}>
														<FailedIcon className={cx("result-icon-failed")}></FailedIcon>
														<span className={cx("result-text")}>Failure</span>
													</div>
												)}
											</div>
										)}
									</td>
									<td>
										<div className={cx("item-title")}>Amount</div>
										{_.isNil(denom) || _.isNil(amount) ? (
											<div className={cx("amount-data-cell")}>
												<div className={cx("amount")}>
													<span className={cx("amount-value")}>0</span>
													<span className={cx("amount-denom")}>ORAI</span>
													<div className={cx("amount-usd")}>($0)</div>
												</div>
											</div>
										) : (
											<div className={cx("amount-data-cell", {"amount-data-cell-with-transfer-status": transferStatus})}>
												{transferStatus && transferStatus}
												<div className={cx("amount")}>
													<span className={cx("amount-value")}>{formatOrai(amount)} </span>
													<span className={cx("amount-denom")}>{denom}</span>
													<div className={cx("amount-usd")}>{status?.price ? "($" + formatFloat(status?.price * (amount / 1000000), 4) + ")" : ""}</div>
												</div>
											</div>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Fee</div>
									</td>
									<td>
										{_.isNil(item?.fee?.amount?.[0]?.amount) || _.isNil(item?.fee?.amount?.[0]?.denom) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("fee-data-cell", "align-right")}>
												<div className={cx("fee")}>
													<span className={cx("fee-value")}>{formatOrai(item.fee.amount[0].amount)}</span>
													<span className={cx("fee-denom")}>{item.fee.amount[0].denom}</span>
													{/* <span className={cx("fee-usd")}>
														{status?.price ? "($" + (status?.price * Number(formatOrai(item.fee.amount[0].amount))).toFixed(8) + ")" : ""}
													</span> */}
												</div>
											</div>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Height</div>
										{_.isNil(item?.height) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to={`${consts.PATH.BLOCKLIST}/${item.height}`}>
												{item.height}
											</NavLink>
										)}
									</td>
									<td>
										<div className={cx("item-title")}>Time</div>
										{_.isNil(item?.timestamp) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{setAgoTime(item.timestamp)}</div>}
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

TransactionCardList.propTypes = {
	data: PropTypes.array,
	account: PropTypes.string,
	pending: PropTypes.bool,
};

TransactionCardList.defaultProps = {
	data: [],
	pending: false,
};

export default TransactionCardList;
