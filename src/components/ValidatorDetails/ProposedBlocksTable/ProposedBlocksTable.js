import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {formatOrai} from "src/helpers/helper";
import {_, reduceString, setAgoTime} from "src/lib/scripts";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./ProposedBlocksTable.module.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const heightHeaderCell = <div className={cx("header-cell", "align-left")}>Height</div>;
	const blockHashHeaderCell = <div className={cx("header-cell", "align-left")}>Blockhash</div>;
	const txsHeaderCell = <div className={cx("header-cell", "align-right")}>Txs</div>;
	const timeHeaderCell = <div className={cx("header-cell", "align-right")}>Time</div>;
	const headerCells = [heightHeaderCell, blockHashHeaderCell, txsHeaderCell, timeHeaderCell];
	const headerCellStyles = [
		{width: "auto"}, // Height
		{width: "auto"}, // Blockhash
		{width: "auto"}, // Txs
		{width: "auto"}, // Time
	];

	return {
		headerCells,
		headerCellStyles,
	};
};

const ProposedBlocksTable = memo(({data = []}) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const heightDataCell = _.isNil(item?.height) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("height-data-cell", "align-left")} to={`${consts.PATH.BLOCKLIST}/${item.height}`}>
					{item.height}
				</NavLink>
			);

			const blockHashDataCell = _.isNil(item?.block_hash) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("block-hash-data-cell", "align-left")} to={`${consts.PATH.BLOCKLIST}/${item.height}`}>
					{reduceString(item.block_hash, 6, 6)}
				</NavLink>
			);

			const txsDataCell = _.isNil(item?.num_txs) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("txs-data-cell", "align-right")}>{item?.num_txs}</div>
			);

			const timeDataCell = _.isNil(item?.timestamp) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("time-data-cell", "align-right")}>{setAgoTime(item.timestamp)}</div>
			);

			return [heightDataCell, blockHashDataCell, txsDataCell, timeDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data]);

	return <ThemedTable theme={tableThemes.DARK} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default ProposedBlocksTable;
