import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_, reduceString, setAgoTime} from "src/lib/scripts";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./BlockTable.scss";

const BlockTable = memo(({data = []}) => {
	const cx = classNames.bind(styles);
	const heightHeaderCell = <div className={cx("header-cell", "align-left")}>Height</div>;
	const parentHashHeaderCell = <div className={cx("header-cell", "align-left")}>Parent Hash</div>;
	const nodeHeaderCell = <div className={cx("header-cell", "align-left")}>Node</div>;
	const txsHeaderCell = <div className={cx("header-cell", "align-right")}>Txs</div>;
	const timeHeaderCell = <div className={cx("header-cell", "align-right")}>Time</div>;
	const headerCells = [heightHeaderCell, parentHashHeaderCell, nodeHeaderCell, txsHeaderCell, timeHeaderCell];
	const headerCellStyles = [
		{minWidth: "50px"}, // Height
		{width: "200px", minWidth: "200px"}, // Parent Hash
		{minWidth: "180px"}, // Node
		{width: "110px", minWidth: "110px"}, // Txs
		{width: "150px", minWidth: "150px"}, // Time
	];
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const heightDataCell = _.isNil(item?.height) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("data-cell", "color-blue", "align-left")} to={`${consts.API.BLOCKLIST}/${item.height}`}>
					{item.height}
				</NavLink>
			);

			const parentHashDataCell = _.isNil(item?.parent_hash) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("data-cell", "color-blue", "align-left")} to={`${consts.API.BLOCKLIST}/${item.parent_hash}`}>
					{reduceString(item.parent_hash, 8, 8)}
				</NavLink>
			);

			const nodeDataCell = _.isNil(item?.moniker) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("data-cell", "color-black", "align-left")} to={`/validators/${item.moniker}`}>
					{item.moniker}
				</NavLink>
			);

			const txsDataCell = _.isNil(item?.num_txs) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("data-cell", "color-black", "align-right")}>{item.num_txs}</div>
			);

			const timeDataCell = _.isNil(item?.timestamp) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("data-cell", "color-black", "align-right")}>{setAgoTime(item.timestamp)}</div>
			);

			return [heightDataCell, parentHashDataCell, nodeDataCell, txsDataCell, timeDataCell];
		});
	};

	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);
	// const dataRows = useMemo(() => {
	// 	setTimeout(getDataRows(data), 3000);
	// }, [data]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCells={headerCells} dataRows={dataRows} headerCellStyles={headerCellStyles} />;
});

export default BlockTable;
