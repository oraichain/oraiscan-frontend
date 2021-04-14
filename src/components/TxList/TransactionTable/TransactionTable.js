// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo} from "react";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import getTxType from "src/constants/getTxType";
import {_, reduceString, setAgoTime} from "src/lib/scripts";
import {formatOrai, formatFloat} from "src/helpers/helper";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import CheckIcon from "src/icons/CheckIcon";
import TimesIcon from "src/icons/TimesIcon";
import RedoIcon from "src/icons/RedoIcon";
import styles from "./TransactionTable.module.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const txHashHeaderCell = <div className={cx("header-cell", "align-left")}>TxHash</div>;
	const typeHeaderCell = <div className={cx("header-cell", "align-left")}>Type</div>;
	const resultHeaderCell = <div className={cx("header-cell", "align-center")}>Result</div>;
	const amountHeaderCell = <div className={cx("header-cell", "align-right")}>Amount</div>;
	const feeHeaderCell = <div className={cx("header-cell", "align-right")}>Fee</div>;
	const heightHeaderCell = <div className={cx("header-cell", "align-right")}>Height</div>;
	const timeHeaderCell = <div className={cx("header-cell", "align-right")}>Time</div>;
	const headerCells = [txHashHeaderCell, typeHeaderCell, resultHeaderCell, amountHeaderCell, feeHeaderCell, heightHeaderCell, timeHeaderCell];
	const headerCellStyles = [
		{width: "14%", minWidth: "140px"}, // TxHash
		{width: "18%", minWidth: "180px"}, // Type
		{width: "10%", minWidth: "100px"}, // Result
		{width: "24%", minWidth: "240px"}, // Amount
		{width: "14%", minWidth: "140px"}, // Fee
		{width: "10%", minWidth: "100px"}, // Height
		{width: "10%", minWidth: "100px"}, // Time
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const TransactionTable = memo(({data, rowMotions, account}) => {
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

			const typeDataCell = _.isNil(item?.messages?.[0]?.type) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("type-data-cell")}>
					<div className={cx("first-message-type")}>{getTxType(item.messages[0].type)}</div>
					{item.messages.length > 1 && <div className={cx("number-of-message")}>+{item.messages.length - 1}</div>}
				</div>
			);

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
						<TimesIcon className={cx("result-icon", "result-icon-failed")} />
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

			const resultDataCell = _.isNil(item?.result) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("result-data-cell")}>{resultDataCellContent}</div>
			);

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
					transferStatus = <div className={cx("transfer-status", "transfer-status-out")}>OUT</div>;
				} else if (account === item.messages[0].value.to_address) {
					transferStatus = <div className={cx("transfer-status", "transfer-status-in")}>IN</div>;
				}
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

			const amountDataCell =
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

			const feeDataCell =
				_.isNil(item?.fee?.amount?.[0]?.amount) || _.isNil(item?.fee?.amount?.[0]?.denom) ? (
					<div className={cx("align-right")}>-</div>
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
			return [txHashDataCell, typeDataCell, resultDataCell, amountDataCell, feeDataCell, heightDataCell, timeDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
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
