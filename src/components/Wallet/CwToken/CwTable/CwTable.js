import React, {memo, useMemo} from "react";
import classNames from "classnames/bind";
import {NavLink} from "react-router-dom";
import consts from "src/constants/consts";
import {_, reduceString, setAgoTime} from "src/lib/scripts";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./CwTable.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const txHashHeaderCell = <div className={cx("header-cell", "align-left")}>TxHash</div>;
	const ageHeaderCell = <div className={cx("header-cell", "align-left")}>Age</div>;
	const fromHeaderCell = <div className={cx("header-cell", "align-left")}>From</div>;
	const statusHeaderCell = <div className={cx("header-cell", "align-left")}>Status</div>;
	const toHeaderCell = <div className={cx("header-cell", "align-left")}>To</div>;
	const valueHeaderCell = <div className={cx("header-cell", "align-left")}>Amount</div>;
	const tokenHeaderCell = <div className={cx("header-cell", "align-left")}>Token</div>;

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

const reduceStringAdress = (value, toHref = "") => {
	const result = _.isNil(value) ? (
		<div className={cx("align-left")}>-</div>
	) : (
		<NavLink className={cx("sm-contract-data-cell", "align-left")} to={toHref}>
			{reduceString(value, 6, 6)}
		</NavLink>
	);
	return result;
};

const CwTable = memo(({data = []}) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		const checkStatus = value => {
			if (value) {
				return <div className={cx("transfer-status", "transfer-status-in")}>In</div>;
			}
			return <div className={cx("transfer-status", "transfer-status-out")}>OUT</div>;
		};

		return data.map(item => {
			const txHashDataCell = reduceStringAdress(item?.tx_hash, `${consts.PATH.TXLIST}/${item.tx_hash}`);

			const timeDataCell = _.isNil(item?.age) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("time-data-cell", "align-left")}>{setAgoTime(item.age)}</div>
			);

			const fromDataCell = reduceStringAdress(item?.from, `${consts.PATH.ACCOUNT}/${item?.from}`);

			const statusDataCell = checkStatus(item?.status);

			const toDataCell = reduceStringAdress(item?.to, `${consts.PATH.ACCOUNT}/${item?.to}`);

			const amountDataCell = _.isNil(item?.amount) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("txs-data-cell", "align-left")}>{item?.amount}</div>
			);

			const tokenDataCell = _.isNil(item?.token) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("sm-contract-data-cell", "align-left")} to=''>
					{item?.token} <span>({item?.token.toUpperCase()})</span>
				</NavLink>
			);

			return [txHashDataCell, timeDataCell, fromDataCell, statusDataCell, toDataCell, amountDataCell, tokenDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default CwTable;
