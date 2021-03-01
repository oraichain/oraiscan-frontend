/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import getTxType from "src/constants/getTxType";
import {_, reduceString, setAgoTime} from "src/lib/scripts";
import {formatOrai} from "src/helpers/helper";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./TransactionTable.scss";
import successIcon from "src/assets/transactions/success_ic.svg";
import failureIcon from "src/assets/transactions/fail_ic.svg";
import moreIcon from "src/assets/transactions/tx_more_btn.svg";
import txTypes from "src/constants/txTypes";

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
		{width: "18%", minWidth: "140px"}, // TxHash
		{width: "18%", minWidth: "180px"}, // Type
		{width: "10%", minWidth: "100px"}, // Result
		{width: "16%", minWidth: "160px"}, // Amount
		{width: "16%", minWidth: "160px"}, // Fee
		{width: "10%", minWidth: "100px"}, // Height
		{width: "12%", minWidth: "100px"}, // Time
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const TransactionTable = memo(({data = [], account}) => {
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

			const resultDataCell = _.isNil(item?.result) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("result-data-cell")}>
					{item?.result ? (
						<>
							<img src={successIcon} alt='success' />
							<p>Success</p>
						</>
					) : (
						<>
							<img src={failureIcon} alt='failure' />
							<p>Failure</p>
						</>
					)}
				</div>
			);

			let transferStatus = <></>;
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

			const amountDataCell =
				_.isNil(item?.messages?.[0]?.value?.amount?.[0]?.denom) || _.isNil(item?.messages?.[0]?.value?.amount?.[0]?.amount) ? (
					<NavLink to={`${consts.PATH.TXLIST}/${item.tx_hash}`} className={cx("amount-data-cell")}>
						<p>More</p>
						<img src={moreIcon} alt='more' />
					</NavLink>
				) : (
					<div className={cx("amount-data-cell")}>
						{transferStatus}
						<span className={cx("amount")}>{formatOrai(item.messages[0].value.amount[0].amount)} </span>
						<span className={cx("denom")}>{item.messages[0].value.amount[0].denom}</span>
					</div>
				);

			const feeDataCell =
				_.isNil(item?.fee?.amount?.[0]?.amount) || _.isNil(item?.fee?.amount?.[0]?.denom) ? (
					<div className={cx("align-right")}>-</div>
				) : (
					<div className={cx("fee-data-cell", "align-right")}>
						<span>{formatOrai(item.fee.amount[0].amount)}</span>
						<span>{item.fee.amount[0].denom}</span>
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

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default TransactionTable;
