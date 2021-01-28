import React, {memo, useMemo} from "react";
import Skeleton from "react-loading-skeleton";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import {getHeaderRow} from "src/components/OracleScriptDetail/RequestTable/RequestTable";
import styles from "./RequestTable.scss";

const RequestTableSkeleton = memo(({rows = 10}) => {
	const cx = classNames.bind(styles);
	const getDataRows = rows => {
		let dataRows = [];
		for (let i = 1; i <= rows; i++) {
			const testCaseDataCell = (
				<div className={cx("skeleton-data-cell", "align-left")}>
					<Skeleton />
				</div>
			);

			const descriptionHashDataCell = (
				<div className={cx("skeleton-data-cell", "align-left")}>
					<Skeleton />
				</div>
			);

			const feeDataCell = (
				<div className={cx("skeleton-data-cell", "align-right")}>
					<Skeleton />
				</div>
			);

			const requestsDataCell = (
				<div className={cx("skeleton-data-cell", "align-center")}>
					<Skeleton />
				</div>
			);

			const ownerDataCell = (
				<div className={cx("skeleton-data-cell", "align-left")}>
					<Skeleton />
				</div>
			);

			dataRows.push([testCaseDataCell, descriptionHashDataCell, feeDataCell, requestsDataCell, ownerDataCell]);
		}
		return dataRows;
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default RequestTableSkeleton;
