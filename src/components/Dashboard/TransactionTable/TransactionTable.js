// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import { _, reduceString, setAgoTime } from "src/lib/scripts";
import { tableThemes } from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./TransactionTable.scss";

const cx = classNames.bind(styles);

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

export const getHeaderRow = () => {
	const txHashHeaderCell = <div className={cx("header-cell", "align-left")}>TxHash</div>;
	const typeHeaderCell = <div className={cx("header-cell", "align-left")}>Type</div>;
	const heightHeaderCell = <div className={cx("header-cell", "align-right")}>Height</div>;
	const timeHeaderCell = <div className={cx("header-cell", "align-right")}>Time</div>;
	const headerCells = [txHashHeaderCell, typeHeaderCell, heightHeaderCell, timeHeaderCell];
	const headerCellStyles = [
		{ width: "auto" }, // TxHash
		{ width: "auto" }, // Type
		{ width: "auto" }, // Height
		{ width: "auto" }, // Time
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const TransactionTable = memo(({ data = [], rowMotions = [], account }) => {
	const status = useSelector(state => state.blockchain.status);
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

			const typeDataCell = _.isNil(item?.messages?.[item?.messages.length - 1]?.["@type"]) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("type-data-cell")}>
					<div className={cx("first-message-type")}>{getTxTypeNew(item.messages[item?.messages.length - 1]["@type"], item?.raw_log, item?.result)}</div>
					{item.messages.length > 1 && <div className={cx("number-of-message")}>+{item.messages.length - 1}</div>}
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
			return [txHashDataCell, typeDataCell, heightDataCell, timeDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return (
		<ThemedTable
			theme={tableThemes.DARK}
			headerCellStyles={headerRow.headerCellStyles}
			headerCells={headerRow.headerCells}
			dataRows={dataRows}
			rowMotions={rowMotions}
		/>
	);
});

export default TransactionTable;
