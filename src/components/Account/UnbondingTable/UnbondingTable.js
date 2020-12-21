import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {formatFloat} from "src/helpers/helper";
import {_, reduceString} from "src/lib/scripts";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./UnbondingTable.scss";

const UnbondingTable = memo(() => {
	const cx = classNames.bind(styles);

	const validatorHeaderCell = <div className={cx("validator-header-cell", "align-left")}>Validator</div>;
	const heightHeaderCell = <div className={cx("height-header-cell", "align-right")}>Height</div>;
	const amountHeaderCell = <div className={cx("amount-header-cell", "align-right")}>Amount</div>;
	const completionTimeHeaderCell = <div className={cx("completion-time-header-cell", "align-right")}>Completion Time</div>;
	const headerCells = [validatorHeaderCell, heightHeaderCell, amountHeaderCell, completionTimeHeaderCell];
	const headerCellStyles = [
		// {minWidth: "100px"}, // Validator
		// {width: "150px", minWidth: "120px"}, // Height
		// {width: "150px", minWidth: "140px"}, // Amount
		// {width: "150px"}, // Completion Time
	];

	const validatorDataCell = (
		<NavLink className={cx("validator-data-cell", "align-left")} to='/'>
			{reduceString("orai1zpeyaa3cnnwtqzw05xcaa5jzfkqzu8xd4fr3ad", 6, 6)}
		</NavLink>
	);

	const heightDataCell = (
		<div className={cx("height-data-cell", "align-right")}>
			<span>{formatFloat(1000, 3)}</span>
			<span>orai</span>
		</div>
	);

	const amountDataCell = (
		<div className={cx("amount-data-cell", "align-right")}>
			<span>{formatFloat(1000, 3)}</span>
			<span>orai</span>
		</div>
	);

	const completionTimeDataCell = (
		<div className={cx("completion-time-data-cell", "align-right")}>
			<span>2020-12-15 18:33:08</span>
			<span>(4days remaining)</span>
		</div>
	);

	const dataRows = [[validatorDataCell, heightDataCell, amountDataCell, completionTimeDataCell]];
	return <ThemedTable theme={tableThemes.DARK} headerCells={headerCells} dataRows={dataRows} headerCellStyles={headerCellStyles} />;
});

export default UnbondingTable;
