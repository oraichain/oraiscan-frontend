/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import getTxType from "src/constants/getTxType";
import {useSelector} from "react-redux";
import {_, reduceString, setAgoTime} from "src/lib/scripts";
import {formatOrai, formatFloat} from "src/helpers/helper";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./TransactionTable.scss";
import successIcon from "src/assets/transactions/success_ic.svg";
import failureIcon from "src/assets/transactions/fail_ic.svg";

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

const TransactionTable = memo(({data = [], rowMotions = [], account}) => {
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

			const typeDataCell = _.isNil(item?.type) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("type-data-cell")}>
					<div className={cx("first-message-type")}>{getTxType(item.type)}</div>
				</div>
			);

			const resultDataCell = _.isNil(item?.result) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("result-data-cell")}>
					{item?.result ? (
						<div className={cx("result")}>
							<img className={cx("result-icon")} src={successIcon} alt='success' />
							<span className={cx("result-text")}>Success</span>
						</div>
					) : (
						<div className={cx("result")}>
							<img className={cx("result-icon")} src={failureIcon} alt='failure' />
							<span className={cx("result-text")}>Failure</span>
						</div>
					)}
				</div>
			);

			let transferStatus = null;
			if (
				account &&
				// item?.type == txTypes.COSMOS_SDK.MSG_SEND &&
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

			const amountDataCell = _.isNil(item?.amount) ? (
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
						<span className={cx("amount-value")}>{formatOrai(item.amount)}</span>
						<span className={cx("amount-denom")}>ORAI</span>
						<div className={cx("amount-usd")}>{status?.price ? " ($" + formatFloat(status.price * (item.amount / 1000000), 4) + ")" : ""}</div>
					</div>
				</div>
			);

			const feeDataCell = _.isNil(item?.fee) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("fee-data-cell", "align-right")}>
					<div className={cx("fee")}>
						<span className={cx("fee-value")}>{formatOrai(item.fee)}</span>
						<span className={cx("fee-denom")}>ORAI</span>
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
			const timeDataCell = _.isNil(item?.time) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("time-data-cell", "align-right")}>{setAgoTime(item.time)}</div>
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

export default TransactionTable;
