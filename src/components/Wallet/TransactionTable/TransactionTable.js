import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_, reduceString, setAgoTime} from "src/lib/scripts";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./TransactionTable.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const heightHeaderCell = <div className={cx("header-cell", "align-center")}>Height</div>;
	const parentHashHeaderCell = <div className={cx("header-cell", "align-left")}>Parent Hash</div>;
	const nodeHeaderCell = <div className={cx("header-cell", "align-left")}>Node</div>;
	const txsHeaderCell = <div className={cx("header-cell", "align-right")}>Txs</div>;
	const timeHeaderCell = <div className={cx("header-cell", "align-right")}>Time</div>;
	const headerCells = [heightHeaderCell, parentHashHeaderCell, nodeHeaderCell, txsHeaderCell, timeHeaderCell];
	const headerCellStyles = [
		{width: "172px", minWidth: "160px"},
		{width: "388px", minWidth: "300px"},
		{width: "360px", minWidth: "280px"},
		{width: "109px"},
		{width: "170px"},
		{width: "151px"},
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const TransactionTable = memo(({data = []}) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const parentHashDataCell = _.isNil(item?.parent_hash) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("parent-hash-data-cell", "align-left")} to={`${consts.API.TXLIST}/${item.parent_hash}`}>
					{reduceString(item.parent_hash, 6, 6)}
				</NavLink>
			);

			const nodeDataCell = _.isNil(item?.node) ? <div className={cx("align-left")}>-</div> : <div className={cx("node-data-cell")}>{item.node}</div>;

			const txsDataCell = _.isNil(item?.txs) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("txs-data-cell", "align-right")}>{item.txs}</div>
			);

			const heightDataCell = _.isNil(item?.height) ? (
				<div className={cx("align-center")}>-</div>
			) : (
				<NavLink className={cx("height-data-cell", "align-center")} to={`${consts.API.BLOCKLIST}/${item.height}`}>
					{item.height}
				</NavLink>
			);
			const timeDataCell = _.isNil(item?.timestamp) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("time-data-cell", "align-right")}>{setAgoTime(item.timestamp)}</div>
			);
			return [heightDataCell, parentHashDataCell, nodeDataCell, txsDataCell, timeDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default TransactionTable;
