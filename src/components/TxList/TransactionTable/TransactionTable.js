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

const TransactionTable = memo(({data = []}) => {
	const cx = classNames.bind(styles);
	const txHashHeaderCell = <div className={cx("header-cell", "align-left")}>TxHash</div>;
	const typeHeaderCell = <div className={cx("header-cell", "align-left")}>Type</div>;
	const resultHeaderCell = <div className={cx("header-cell", "align-center")}>Result</div>;
	const amountHeaderCell = <div className={cx("header-cell", "align-right")}>Amount</div>;
	const feeHeaderCell = <div className={cx("header-cell", "align-right")}>Fee</div>;
	const heightHeaderCell = <div className={cx("header-cell", "align-right")}>Height</div>;
	const timeHeaderCell = <div className={cx("header-cell", "align-right")}>Time</div>;
	const headerCells = [txHashHeaderCell, typeHeaderCell, resultHeaderCell, amountHeaderCell, feeHeaderCell, heightHeaderCell, timeHeaderCell];
	const headerCellStyles = [
		{width: "160px", minWidth: "160px"}, // TxHash
		{minWidth: "100px"}, // Type
		{width: "160px", minWidth: "160px"}, // Result
		{minWidth: "180px"}, // Amount
		{minWidth: "170px"}, // Fee
		{minWidth: "120px"}, // Height
		{width: "150px", minWidth: "150px"}, // Time
	];
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const txHashDataCell = _.isNil(item?.tx_hash) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("tx-hash-data-cell", "align-left")} to={`${consts.API.TXLIST}/${item.tx_hash}`}>
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

			const amountDataCell =
				_.isNil(item?.messages?.[0]?.value?.amount?.[0]?.denom) || _.isNil(item?.messages?.[0]?.value?.amount?.[0]?.amount) ? (
					<NavLink to={`${consts.API.TXLIST}/${item.tx_hash}`} className={cx("amount-data-cell")}>
						<p>More</p>
						<img src={moreIcon} alt='more' />
					</NavLink>
				) : (
					<div className={cx("amount-data-cell")}>
						<span>{formatOrai(item.messages[0].value.amount[0].amount)} </span>
						<span>{item.messages[0].value.amount[0].denom}</span>
					</div>
				);

			const feeDataCell =
				_.isNil(item?.fee?.amount?.[0]?.amount) || _.isNil(item?.fee?.amount?.[0]?.denom) ? (
					<div className={cx("align-right")}>-</div>
				) : (
					<div className={cx("fee-data-cell", "align-right")}>
						<span>{formatOrai(item.fee.amount[0].amount)}</span>
						<span className={cx("uppercase")}>{item.fee.amount[0].denom}</span>
					</div>
				);

			const heightDataCell = _.isNil(item?.height) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<NavLink className={cx("height-data-cell", "align-right")} to={`${consts.API.BLOCKLIST}/${item.height}`}>
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

	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);
	// const dataRows = useMemo(() => {
	// 	setTimeout(getDataRows(data), 3000);
	// }, [data]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCells={headerCells} dataRows={dataRows} headerCellStyles={headerCellStyles} />;
});

export default TransactionTable;
