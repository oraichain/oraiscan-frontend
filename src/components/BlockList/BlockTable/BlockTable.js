import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_, reduceString, setAgoTime} from "src/lib/scripts";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./BlockTable.scss";
import aiIcon from "src/assets/common/ai_ic.svg";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const heightHeaderCell = <div className={cx("header-cell", "align-left")}>Height</div>;
	const parentHashHeaderCell = <div className={cx("header-cell", "align-left")}>Block Hash</div>;
	const proposerHeaderCell = <div className={cx("header-cell", "align-left")}>Proposer</div>;
	const txsHeaderCell = <div className={cx("header-cell", "align-right")}>Txs</div>;
	const timeHeaderCell = <div className={cx("header-cell", "align-right")}>Time</div>;
	const headerCells = [heightHeaderCell, parentHashHeaderCell, proposerHeaderCell, txsHeaderCell, timeHeaderCell];
	const headerCellStyles = [
		{minWidth: "50px"}, // Height
		{width: "200px", minWidth: "200px"}, // Block Hash
		{minWidth: "180px"}, // Proposer
		{width: "110px", minWidth: "110px"}, // Txs
		{width: "150px", minWidth: "150px"}, // Time
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const BlockTable = memo(({data = []}) => {
	const validators = useSelector(state => state.blockchain.validators);
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const heightDataCell = _.isNil(item?.height) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("data-cell", "color-blue", "align-left")} to={`${consts.PATH.BLOCKLIST}/${item.height}`}>
					{item.height}
				</NavLink>
			);

			const parentHashDataCell = _.isNil(item?.block_hash) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("data-cell", "color-blue", "align-left")} to={`${consts.PATH.BLOCKLIST}/${item.block_hash}`}>
					{reduceString(item.block_hash, 8, 8)}
				</NavLink>
			);

			const proposerDataCell = _.isNil(item?.moniker) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("data-cell", "color-blue", "align-left")} to={`${consts.PATH.VALIDATORS}/${validators[item?.moniker]?.operatorAddr ?? 0}`}>
					<img src={aiIcon} alt='' className={cx("ai-icon")} />
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

			return [heightDataCell, parentHashDataCell, proposerDataCell, txsDataCell, timeDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default BlockTable;
