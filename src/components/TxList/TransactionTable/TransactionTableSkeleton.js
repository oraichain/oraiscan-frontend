import React, {memo, useMemo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import {getHeaderRow} from "src/components/TxList/TransactionTable/TransactionTable";
import styles from "./TransactionTable.module.scss";

const TransactionTableSkeleton = memo(({rows = 5}) => {
	const cx = classNames.bind(styles);
	const getDataRows = rows => {
		let dataRows = [];
		for (let i = 1; i <= rows; i++) {
			const txHashDataCell = (
				<div className={cx("skeleton-data-cell", "align-left")}>
					<Skeleton />
				</div>
			);

			const typeDataCell = (
				<div className={cx("skeleton-data-cell", "align-left")}>
					<Skeleton />
				</div>
			);

			const resultDataCell = (
				<div className={cx("skeleton-data-cell", "align-left")}>
					<Skeleton />
				</div>
			);

			const amountDataCell = (
				<div className={cx("skeleton-data-cell", "align-right")}>
					<Skeleton />
				</div>
			);

			const feeDataCell = (
				<div className={cx("skeleton-data-cell", "align-right")}>
					<Skeleton />
				</div>
			);

			const heightDataCell = (
				<div className={cx("skeleton-data-cell", "align-right")}>
					<Skeleton />
				</div>
			);
			const timeDataCell = (
				<div className={cx("skeleton-data-cell", "align-right")}>
					<Skeleton />
				</div>
			);
			dataRows.push([txHashDataCell, typeDataCell, resultDataCell, amountDataCell, feeDataCell, heightDataCell, timeDataCell]);
		}
		return dataRows;
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default TransactionTableSkeleton;
