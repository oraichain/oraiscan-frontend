/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useMemo } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import { calRemainingTime, formatDateTime, formatOrai } from "src/helpers/helper";
import { _, reduceString } from "src/lib/scripts";
import { tableThemes } from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./UnbondingTable.module.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const validatorHeaderCell = <div className={cx("validator-header-cell", "align-left")}>Validator</div>;
	const heightHeaderCell = <div className={cx("height-header-cell", "align-right")}>Height</div>;
	const amountHeaderCell = <div className={cx("amount-header-cell", "align-right")}>Amount</div>;
	const completionTimeHeaderCell = <div className={cx("completion-time-header-cell", "align-right")}>Completion Time</div>;
	const headerCells = [validatorHeaderCell, heightHeaderCell, amountHeaderCell, completionTimeHeaderCell];
	const headerCellStyles = [
		{ width: "auto" }, // Validator
		{ width: "auto" }, // Height
		{ width: "auto" }, // Amount
		{ width: "auto" }, // Completion Time
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const UnbondingTable = memo(({ data }) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			let balance = 0;
			if (item?.entries) {
				for (const iterator of item?.entries) {
					balance += +iterator.balance
				}
			}
			const validatorDataCell = _.isNil(item?.validator_address) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("validator-data-cell", "align-left")} to={`${consts.PATH.VALIDATORS}/${item.validator_address}`}>
					{reduceString(item.validator_address, 6, 6)}
				</NavLink>
			);

			const heightDataCell = _.isNil(item?.entries?.[0]?.creation_height) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("height-data-cell", "align-right")}>{item.entries[0].creation_height}</div>
			);

			const amountDataCell = _.isNil(balance) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("amount-data-cell", "align-right")}>
					<div className={cx("amount")}>
						<span className={cx("amount-value")}>{formatOrai(balance)}</span>
						<span className={cx("amount-denom")}>ORAI</span>
					</div>
				</div>
			);

			const completionTimeDataCell = _.isNil(item?.entries?.[0]?.completion_time) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("completion-time-data-cell", "align-right")}>
					<div className={cx("date-time")}>{formatDateTime(item.entries[0].completion_time)}</div>
					<span className={cx("remaining")}>{calRemainingTime(item.entries[0].completion_time)}</span>
				</div>
			);

			return [validatorDataCell, heightDataCell, amountDataCell, completionTimeDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.DARK} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default UnbondingTable;
