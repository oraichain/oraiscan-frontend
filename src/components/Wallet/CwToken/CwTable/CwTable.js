import React, {memo, useMemo} from "react";
import classNames from "classnames/bind";
import {NavLink} from "react-router-dom";
import consts from "src/constants/consts";
import {_, reduceString, setAgoTime} from "src/lib/scripts";
import {formatOrai} from "src/helpers/helper";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./CwTable.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const txHashHeaderCell = <div className={cx("header-cell", "align-left")}>TxHash</div>;
	const ageHeaderCell = <div className={cx("header-cell", "align-left")}>Time</div>;
	const fromHeaderCell = <div className={cx("header-cell", "align-left")}>From</div>;
	const statusHeaderCell = <div className={cx("header-cell", "align-left")}>Status</div>;
	const toHeaderCell = <div className={cx("header-cell", "align-right")}>To</div>;
	const valueHeaderCell = <div className={cx("header-cell", "align-right")}>Amount</div>;
	const tokenHeaderCell = <div className={cx("header-cell", "align-right")}>Token</div>;

	let headerCells = [txHashHeaderCell, ageHeaderCell, fromHeaderCell, statusHeaderCell, toHeaderCell, valueHeaderCell, tokenHeaderCell];
	let headerCellStyles = [
		{width: "14%", minWidth: "180px"}, // TxHash
		{width: "12%", minWidth: "120px"}, // Age
		{width: "14%", minWidth: "180px"}, // From
		{width: "5%", minWidth: "80px"}, // Status
		{width: "14%", minWidth: "180px"}, // To
		{width: "14%", minWidth: "180px"}, // Value
		{width: "14%", minWidth: "180px"}, // Token
	];

	return {
		headerCells,
		headerCellStyles,
	};
};

export const checkStatus = (status, address, receiverAddress) => {
	if (status === 0) {
		if (receiverAddress === address) {
			return <div className={cx("transfer-status", "transfer-status-in")}>In</div>;
		}
		return <div className={cx("transfer-status", "transfer-status-out")}>OUT</div>;
	}
};


const reduceStringAdress = (value, toHref = "", isStyle) => {
	const result = _.isNil(value) ? (
		<div className={cx("align-left")}>-</div>
	) : (
		<NavLink className={cx("sm-contract-data-cell")} to={toHref}>
			{isStyle === 1 ?
			<div className={cx("align-right")}>{reduceString(value, 6, 6)}</div> :
			reduceString(value, 6, 6)}
		</NavLink>
	);
	return result;
};

const CwTable = memo(({data = [], address}) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const txHashDataCell = reduceStringAdress(item?.tx_hash, `${consts.PATH.TXLIST}/${item.tx_hash}`);

			const timeDataCell = _.isNil(item?.transaction_time) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("time-data-cell", "align-left")}>{setAgoTime(item.transaction_time)}</div>
			);

			const fromDataCell = reduceStringAdress(item?.sender, `${consts.PATH.ACCOUNT}/${item?.sender}`);

			const statusDataCell = checkStatus(item?.status_code, address, item?.receiver);

			const toDataCell = reduceStringAdress(item?.receiver, `${consts.PATH.ACCOUNT}/${item?.receiver}`, 1);

			const amountDataCell = _.isNil(item?.amount) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("txs-data-cell", "align-right")}>
					{formatOrai(item?.amount)} <span>{item?.symbol.toUpperCase()}</span>
				</div>
			);

			const tokenDataCell = reduceStringAdress(item?.name, `${consts.PATH.SMART_CONTRACT}/${item?.contract_address}`, 1);

			return [txHashDataCell, timeDataCell, fromDataCell, statusDataCell, toDataCell, amountDataCell, tokenDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default CwTable;
