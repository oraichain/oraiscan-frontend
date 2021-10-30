// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo} from "react";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_, reduceString, setAgoTime} from "src/lib/scripts";
import {formatOrai, formatFloat} from "src/helpers/helper";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import CheckIcon from "src/icons/CheckIcon";
import TimesIcon from "src/icons/TimesIcon";
import RedoIcon from "src/icons/RedoIcon";
import styles from "./TransactionTable.module.scss";

const cx = classNames.bind(styles);

const handleRoyaltyPercentage = royalty => {
	royalty = (royalty / consts.ROYALTY_DECIMAL_POINT_PERCENT).toFixed(9);
	let zeroCount = 0;
	for (let i = royalty.length - 1; i >= 0; i--) {
		if (royalty[i] == "0") zeroCount++;
		if (royalty[i] === ".") {
			zeroCount++;
			break;
		}
		if (royalty[i] != "0") break;
	}
	royalty = royalty.substring(0, royalty.length - zeroCount) + "%";
	return royalty;
};

export const getHeaderRow = (royalty = false) => {
	const txHashHeaderCell = <div className={cx("header-cell", "align-left")}>TxHash</div>;
	const typeHeaderCell = <div className={cx("header-cell", "align-left")}>Type</div>;
	const resultHeaderCell = <div className={cx("header-cell", "align-center")}>Result</div>;
	let amountHeaderCell = <div className={cx("header-cell", "align-right")}>{royalty ? "Royalty Amount" : "Amount"}</div>;
	const feeHeaderCell = <div className={cx("header-cell", "align-right")}>Fee</div>;
	const heightHeaderCell = <div className={cx("header-cell", "align-right")}>Height</div>;
	const timeHeaderCell = <div className={cx("header-cell", "align-right")}>Time</div>;
	let headerCells = [txHashHeaderCell, typeHeaderCell, resultHeaderCell, amountHeaderCell, feeHeaderCell, heightHeaderCell, timeHeaderCell];
	let headerCellStyles = [
		{width: "14%", minWidth: "140px"}, // TxHash
		{width: "18%", minWidth: "180px"}, // Type
		{width: "10%", minWidth: "100px"}, // Result
		{width: "24%", minWidth: "240px"}, // Amount
		{width: "14%", minWidth: "140px"}, // Fee
		{width: "10%", minWidth: "100px"}, // Height
		{width: "10%", minWidth: "100px"}, // Time
	];

	if (royalty) {
		const newRoyaltyHeaderCell = <div className={cx("header-cell", "align-right")}>New Royalty</div>;
		headerCells.push(newRoyaltyHeaderCell);
		headerCellStyles = [
			{width: "12%", minWidth: "120px"}, // TxHash
			{width: "18%", minWidth: "180px"}, // Type
			{width: "10%", minWidth: "100px"}, // Result
			{width: "16%", minWidth: "160px"}, // Royalty Amount
			{width: "14%", minWidth: "120px"}, // Fee
			{width: "10%", minWidth: "100px"}, // Height
			{width: "10%", minWidth: "100px"}, // Time
			{width: "10%", minWidth: "120px"}, // New Royalty
		];
	}

	return {
		headerCells,
		headerCellStyles,
	};
};

export const getNewRoyalty = (account, rawLog = "[]", result = "") => {
	let newRoyalty = "-";
	if (result === "Failure") {
		return newRoyalty;
	}

	let rawLogArr = JSON.parse(rawLog);
	let checkRoyalty = false;
	let checkAccount = false;
	for (let event of rawLogArr[0].events) {
		if (event["type"] === "wasm") {
			for (let att of event["attributes"]) {
				if (att["key"] === "action" && att["value"] === "update_ai_royalty") {
					checkRoyalty = true;
					continue;
				}

				if (checkRoyalty && att["key"] === "creator" && att["value"] === account) {
					checkAccount = true;
					continue;
				}

				if (checkAccount && att["key"] === "new_royalty") {
					newRoyalty = att["value"];
					break;
				}
			}

			break;
		}
	}

	return handleRoyaltyPercentage(newRoyalty);
};

export const getRoyaltyAmount = (account, rawLog = "[]", result = "") => {
	let royaltyAmount = "0";
	if (result === "Failure") {
		return royaltyAmount;
	}

	let rawLogArr = JSON.parse(rawLog);
	let checkRoyalty = false;
	let checkRoyaltyAmount = false;
	for (let index = rawLogArr[0].events.length - 1; index > -1; index--) {
		const event = rawLogArr[0].events[index];
		if (event["type"] === "wasm") {
			for (let att of event["attributes"]) {
				if (att["key"] === "royalty" && att["value"] === "true") {
					checkRoyalty = true;
					break;
				}
			}

			if (!checkRoyalty) {
				break;
			}

			continue;
		}

		if (event["type"] === "transfer" && checkRoyalty) {
			for (let att of event["attributes"]) {
				if (att["key"] === "recipient" && att["value"] === account) {
					checkRoyaltyAmount = true;
					continue;
				}

				if (checkRoyaltyAmount && att["key"] === "amount") {
					royaltyAmount = att["value"].split("orai")[0];
					break;
				}
			}

			break;
		}
	}

	const obj = {royalty: checkRoyalty, amount: royaltyAmount};
	return obj;
};

const TransactionTable = memo(({data, rowMotions, account, royalty = false}) => {
	const status = useSelector(state => state.blockchain.status);
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

	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const txHashDataCell = _.isNil(item?.tx_hash) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("tx-hash-data-cell", "align-left")} to={`${consts.PATH.TXLIST}/${item.tx_hash}`}>
					{reduceString(item.tx_hash, 6, 6)}
				</NavLink>
			);

			const typeDataCell = _.isNil(item?.messages?.[0]?.["@type"]) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("type-data-cell")}>
					<div className={cx("first-message-type")}>{getTxTypeNew(item.messages[0]["@type"], item?.raw_log, item?.result)}</div>
					{item.messages.length > 1 && <div className={cx("number-of-message")}>+{item.messages.length - 1}</div>}
				</div>
			);

			let resultDataCellContent;
			if (item?.result?.toLowerCase?.() === "success") {
				resultDataCellContent = (
					<div className={cx("result")}>
						<CheckIcon className={cx("result-icon", "result-icon-success")} />
						<span className={cx("result-text")}>Success</span>
					</div>
				);
			} else if (item?.result?.toLowerCase?.() === "failure") {
				resultDataCellContent = (
					<div className={cx("result")}>
						<TimesIcon className={cx("result-icon", "result-icon-failed")} />
						<span className={cx("result-text")}>Failure</span>
					</div>
				);
			} else if (item?.result?.toLowerCase?.() === "pending") {
				resultDataCellContent = (
					<div className={cx("result")}>
						<RedoIcon className={cx("result-icon", "result-icon-pending")} />
						<span className={cx("result-text")}>Pending</span>
					</div>
				);
			}

			const resultDataCell = _.isNil(item?.result) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("result-data-cell")}>{resultDataCellContent}</div>
			);

			let transferStatus = null;
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
			}

			let amountDataCell;
			const objRoyaltyAmount = getRoyaltyAmount(account, item?.raw_log, item?.result);
			if (royalty && objRoyaltyAmount.royalty) {
				amountDataCell = (
					<div className={cx("amount-data-cell", {"amount-data-cell-with-transfer-status": transferStatus}, "align-right")}>
						{transferStatus && transferStatus}
						<div className={cx("amount")}>
							<span className={cx("amount-value")}>{formatOrai(objRoyaltyAmount.amount)}</span>
							<span className={cx("amount-denom")}>ORAI</span>
							<div className={cx("amount-usd")}>{status?.price ? " ($" + formatFloat(status.price * (objRoyaltyAmount.amount / 1000000), 4) + ")" : ""}</div>
						</div>
					</div>
				);
			} else {
				let amount;
				let denom;
				if (!_.isNil(item?.amount?.[0]?.denom) && !_.isNil(item?.amount?.[0]?.amount)) {
					amount = item.amount[0].amount;
					denom = item.amount[0].denom;
				} else if (!_.isNil(item?.amount?.[0]?.denom) && !_.isNil(item?.amount?.[0]?.amount)) {
					amount = item.amount[0].amount;
					denom = item.amount[0].denom;
				}

				amountDataCell =
					_.isNil(amount) || _.isNil(denom) ? (
						<div className={cx("amount-data-cell", "align-right")}>
							<div className={cx("amount")}>
								<span className={cx("amount-value")}>0</span>
								<span className={cx("amount-denom")}>ORAI</span>
								<div className={cx("amount-usd")}>($0)</div>
							</div>
						</div>
					) : (
						<div className={cx("amount-data-cell", {"amount-data-cell-with-transfer-status": transferStatus}, "align-right")}>
							{transferStatus && transferStatus}
							<div className={cx("amount")}>
								<span className={cx("amount-value")}>{formatOrai(amount)}</span>
								<span className={cx("amount-denom")}>{denom}</span>
								<div className={cx("amount-usd")}>{status?.price ? " ($" + formatFloat(status.price * (amount / 1000000), 4) + ")" : ""}</div>
							</div>
						</div>
					);
			}

			const feeDataCell = _.isNil(item?.fee?.amount) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("fee-data-cell", "align-right")}>
					<div className={cx("fee")}>
						<span className={cx("fee-value")}>{formatOrai(item.fee.amount[0] || 0)}</span>
						<span className={cx("fee-denom")}>ORAI</span>
						{/* <span className={cx("fee-usd")}>
								{status?.price ? "($" + (status?.price * Number(formatOrai(item.fee.amount[0].amount))).toFixed(8) + ")" : ""}
							</span> */}
					</div>
				</div>
			);

			const heightDataCell = _.isNil(item?.height) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<NavLink className={cx("height-data-cell", "align-right")} to={`${consts.PATH.BLOCKLIST}/${item.height}`}>
					{item.height}
				</NavLink>
			);

			const timeDataCell = _.isNil(item?.timestamp) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("time-data-cell", "align-right")}>{setAgoTime(item.timestamp)}</div>
			);

			const newRoyaltyDataCell = <div className={cx("time-data-cell", "align-right")}>{getNewRoyalty(account, item?.raw_log, item?.result)}</div>;

			if (royalty) {
				return [txHashDataCell, typeDataCell, resultDataCell, amountDataCell, feeDataCell, heightDataCell, timeDataCell, newRoyaltyDataCell];
			}

			return [txHashDataCell, typeDataCell, resultDataCell, amountDataCell, feeDataCell, heightDataCell, timeDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(royalty), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return (
		<ThemedTable
			theme={tableThemes.LIGHT}
			headerCellStyles={headerRow.headerCellStyles}
			headerCells={headerRow.headerCells}
			dataRows={dataRows}
			rowMotions={rowMotions}
		/>
	);
});

TransactionTable.propTypes = {
	data: PropTypes.array,
	rowMotions: PropTypes.array,
	account: PropTypes.string,
	pending: PropTypes.bool,
};

TransactionTable.defaultProps = {
	data: [],
	rowMotions: [],
	pending: false,
};

export default TransactionTable;
