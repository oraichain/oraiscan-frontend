// @ts-nocheck
import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import consts from "src/constants/consts";
import {formatFloat, formatOrai} from "src/helpers/helper";
import {getNewRoyalty, getRoyaltyAmount, getTokenId} from "src/components/TxList/TransactionTable/TransactionTable";
import {_, reduceString, setAgoTime, parseIbcMsgTransfer, parseIbcMsgRecvPacket} from "src/lib/scripts";
import CheckIcon from "src/icons/CheckIcon";
import TimesIcon from "src/icons/TimesIcon";
import RedoIcon from "src/icons/RedoIcon";
import styles from "./TransactionCardList.scss";
import {Tooltip} from "@material-ui/core";

const getTxTypeNew = (type, rawLog = "[]", result = "") => {
	const typeArr = type.split(".");
	let typeMsg = typeArr[typeArr.length - 1];
	if (typeMsg === "MsgExecuteContract" && result === "Success") {
		let rawLogArr = JSON.parse(rawLog);
		for (let event of rawLogArr[0].events) {
			if (event["type"] === "wasm") {
				for (let att of event["attributes"]) {
					if (att["key"] === "action") {
						let attValue = att["value"]
							.split("_")
							.map(word => word.charAt(0).toUpperCase() + word.slice(1))
							.join("");
						typeMsg += "/" + attValue;
						break;
					}
				}

				break;
			}
		}
	}

	return typeMsg;
};

const TransactionCardList = memo(({data = [], account, royalty = false}) => {
	const cx = classNames.bind(styles);
	const status = useSelector(state => state.blockchain.status);

	return (
		<div className='transaction-card-list'>
			{data.map((item, index) => {
				let transferStatus = null;
				let amountDataCell;
				const objRoyaltyAmount = getRoyaltyAmount(account, item?.raw_log, item?.result);
				if (objRoyaltyAmount.royalty) {
					amountDataCell = (
						<div className={cx("amount-data-cell", {"amount-data-cell-with-transfer-status": transferStatus})}>
							{transferStatus && transferStatus}
							<div className={cx("amount")}>
								<span className={cx("amount-value")}>{formatOrai(objRoyaltyAmount.amount)} </span>
								<span className={cx("amount-denom")}>ORAI</span>
								<div className={cx("amount-usd")}>{status?.price ? "($" + formatFloat(status?.price * (objRoyaltyAmount.amount / 1000000), 4) + ")" : ""}</div>
							</div>
						</div>
					);
				} else {
					let amount;
					let denom;
					let denom_name;
					if (!_.isNil(item?.messages?.[0]?.amount?.[0]?.denom) && !_.isNil(item?.messages?.[0]?.amount?.[0]?.amount)) {
						amount = item.messages[0].amount[0].amount;
						denom = item.messages[0].amount[0].denom;
						denom_name = item.messages[0].amount[0]?.denom_name;
					} else if (!_.isNil(item?.messages?.[0]?.amount?.denom) && !_.isNil(item?.messages?.[0]?.amount?.amount)) {
						amount = item.messages[0].amount.amount;
						denom = item.messages[0].amount.denom;
						denom_name = item.messages[0].amount[0]?.denom_name;
					}

					amountDataCell =
						_.isNil(denom_name) || _.isNil(denom) || _.isNil(amount) ? (
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
									<span className={cx("amount-denom")}>{denom_name || denom}</span>
									{(denom_name === consts.DENOM_ORAI || denom === consts.DENOM_ORAI) && (
										<div className={cx("amount-usd")}>{status?.price ? "($" + formatFloat(status?.price * (amount / 1000000), 4) + ")" : ""}</div>
									)}
								</div>
							</div>
						);
				}

				if (
					account &&
					(getTxTypeNew(item?.messages?.[0]["@type"]) === "MsgSend" || getTxTypeNew(item?.messages?.[0]["@type"]) === "MsgMultiSend") &&
					item?.amount?.[0]?.amount &&
					item?.messages?.[0]?.from_address &&
					item?.messages?.[0]?.to_address
				) {
					if (account === item.messages[0].from_address) {
						transferStatus = <div className={cx("transfer-status", "transfer-status-out")}>OUT</div>;
					} else if (account === item.messages[0].to_address) {
						transferStatus = <div className={cx("transfer-status", "transfer-status-in")}>IN</div>;
					}
				} else if (account && item?.messages?.find(msg => getTxTypeNew(msg["@type"]) === "MsgRecvPacket")) {
					let message = item?.messages?.find(msg => getTxTypeNew(msg["@type"]) === "MsgRecvPacket");
					if (message?.packet?.data) {
						const data = JSON.parse(atob(message?.packet?.data));
						if (account === data.receiver) {
							transferStatus = <div className={cx("transfer-status", "transfer-status-out")}>IN</div>;
						}
					}
				} else if (account && item?.messages?.find(msg => getTxTypeNew(msg["@type"]) === "MsgTransfer")) {
					let message = item?.messages?.find(msg => getTxTypeNew(msg["@type"]) === "MsgTransfer");
					if (account === message.sender) {
						transferStatus = <div className={cx("transfer-status", "transfer-status-out")}>OUT</div>;
					}
				}

				let resultDataCellContent;
				if (item.result.toLowerCase() === consts.RESULT_STATUS.SUCCESS) {
					resultDataCellContent = (
						<div className={cx("result")}>
							<CheckIcon className={cx("result-icon", "result-icon-success")} />
							<span className={cx("result-text")}>Success</span>
						</div>
					);
				} else if (item.result.toLowerCase() === consts.RESULT_STATUS.FAILURE) {
					resultDataCellContent = (
						<div className={cx("result")}>
							<TimesIcon className={cx("result-icon", "result-icon-fail")} />
							<span className={cx("result-text")}>Failure</span>
						</div>
					);
				} else if (item.result.toLowerCase() === consts.RESULT_STATUS.PENDING) {
					resultDataCellContent = (
						<div className={cx("result")}>
							<RedoIcon className={cx("result-icon", "result-icon-pending")} />
							<span className={cx("result-text")}>Pending</span>
						</div>
					);
				}

				let ibcAmountDataCell = null;
				if (account && item?.messages?.find(msg => getTxTypeNew(msg["@type"]) === "MsgRecvPacket")) {
					let message = item?.messages?.find(msg => getTxTypeNew(msg["@type"]) === "MsgRecvPacket");
					if (message?.packet?.data) {
						const msgRec = JSON.parse(atob(message?.packet?.data));
						const port = message?.packet?.destination_port;
						const channel = message?.packet?.destination_channel;
						ibcAmountDataCell = _.isNil(message?.packet) ? (
							<div className={cx("align-left")}>-</div>
						) : (
							<div className={cx("ibc-data-cell", "align-right")}>
								<div className={cx("ibc-value")}>{formatOrai(msgRec?.amount, 1000000, 1) + " " + parseIbcMsgRecvPacket(msgRec?.denom)}</div>
								<div className={cx("ibc-denom")}>{"(" + port + "/" + channel + "/" + msgRec?.denom + ")"}</div>
							</div>
						);
					}
				} else if (account && item?.messages?.find(msg => getTxTypeNew(msg["@type"]) === "MsgTransfer")) {
					const rawLog = JSON.parse(item?.raw_log);
					const rawLogParse = parseIbcMsgTransfer(rawLog);
					const rawLogDenomSplit = rawLogParse?.denom?.split("/");
					ibcAmountDataCell = _.isNil(item?.raw_log) ? (
						<div className={cx("align-left")}>-</div>
					) : (
						<div className={cx("ibc-data-cell", "align-right")}>
							<div className={cx("ibc-value")}>
								{formatOrai(rawLogParse?.amount, 1000000, 1) + " " + parseIbcMsgRecvPacket(rawLogDenomSplit?.[rawLogDenomSplit.length - 1])}
							</div>
							<div className={cx("ibc-denom")}>{"(" + parseIbcMsgTransfer(rawLog)?.denom + ")"}</div>
						</div>
					);
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
										{_.isNil(item?.messages?.[0]?.["@type"]) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<Tooltip title={getTxTypeNew(item.messages[0]["@type"], item?.raw_log, item?.result)} arrow placement='top-start'>
												<div className={cx("type-data-cell")}>
													<div className={cx("first-message-type")}>{getTxTypeNew(item.messages[0]["@type"], item?.raw_log, item?.result)}</div>
													{item.messages.length > 1 && <div className={cx("number-of-message")}>+{item.messages.length - 1}</div>}
												</div>
											</Tooltip>
										)}
									</td>
								</tr>

								{/* <tr>
									<td>
										<div className={cx("item-title")}>IBC Amount</div>
									</td>
									<td>
										{ibcAmountDataCell}
									</td>
								</tr> */}

								<tr>
									<td>
										<div className={cx("item-title")}>Result</div>
										{_.isNil(item?.result) ? <div className={cx("item-text")}>-</div> : <div className={cx("result-data-cell")}>{resultDataCellContent}</div>}
									</td>
									<td>
										<div className={cx("item-title")}>{royalty ? "Royalty Amount" : "Amount"}</div>
										{amountDataCell}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>{royalty ? "Token Id" : "Fee"}</div>
									</td>
									<td>
										{royalty ? (
											<div className={cx("item-text")}>{getTokenId(item?.raw_log, item?.result)}</div>
										) : _.isNil(item?.fee?.amount?.[0]?.amount) || _.isNil(item?.fee?.amount?.[0]?.denom) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("fee-data-cell", "align-right")}>
												<div className={cx("fee")}>
													<span className={cx("fee-value")}>{formatOrai(item.fee.amount[0].amount)}</span>
													<span className={cx("fee-denom")}>{reduceString(item.fee.amount[0].denom)}</span>
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
								{!royalty || (
									<tr>
										<td>
											<div className={cx("item-title")}>New Royalty</div>
										</td>
										<td>
											{_.isNil(item?.fee?.amount?.[0]?.amount) || _.isNil(item?.fee?.amount?.[0]?.denom) ? (
												<div className={cx("item-text")}>-</div>
											) : (
												<div className={cx("item-text", "align-right")}>{getNewRoyalty(account, item?.raw_log, item?.result)}</div>
											)}
										</td>
									</tr>
								)}
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
	royalty: PropTypes.bool,
};

TransactionCardList.defaultProps = {
	data: [],
	pending: false,
};

export default TransactionCardList;
