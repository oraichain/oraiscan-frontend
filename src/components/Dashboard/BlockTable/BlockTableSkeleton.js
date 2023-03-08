import React, {memo, useMemo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import {getHeaderRow} from "./BlockTable";
import styles from "./BlockTable.module.scss";

const BlockTableSkeleton = memo(({rows = 10}) => {
	const cx = classNames.bind(styles);
	const getDataRows = rows => {
		let dataRows = [];
		for (let i = 1; i <= rows; i++) {
			const heightDataCell = (
				<div className={cx("skeleton-data-cell", "align-left")}>
					<Skeleton className={cx("skeleton-inline-block")} variant='text'  />
				</div>
			);

			const nodeDataCell = (
				<div className={cx("skeleton-data-cell", "align-left")}>
					<Skeleton className={cx("skeleton-inline-block")} variant='text'  />
				</div>
			);

			const txsDataCell = (
				<div className={cx("skeleton-data-cell", "align-right")}>
					<Skeleton className={cx("skeleton-inline-block")} variant='text'  />
				</div>
			);

			const timeDataCell = (
				<div className={cx("skeleton-data-cell", "align-right")}>
					<Skeleton className={cx("skeleton-inline-block")} variant='text'  />
				</div>
			);

			dataRows.push([heightDataCell, nodeDataCell, txsDataCell, timeDataCell]);
		}
		return dataRows;
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	return <ThemedTable theme={tableThemes.DARK} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default BlockTableSkeleton;
