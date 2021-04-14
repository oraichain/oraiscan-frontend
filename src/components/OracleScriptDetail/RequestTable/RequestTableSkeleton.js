import React, {memo, useMemo} from "react";
import classNames from "classnames/bind";
import Skeleton from "@material-ui/lab/Skeleton";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import {getHeaderRow} from "src/components/OracleScriptDetail/RequestTable/RequestTable";
import styles from "./RequestTable.module.scss";

const RequestTableSkeleton = memo(({rows = 10}) => {
	const cx = classNames.bind(styles);
	const getDataRows = rows => {
		let dataRows = [];
		for (let i = 1; i <= rows; i++) {
			const testCaseDataCell = (
				<div className={cx("skeleton-data-cell", "align-left")}>
					<Skeleton className={cx("skeleton")} width={100} height={21} />
				</div>
			);

			const descriptionHashDataCell = (
				<div className={cx("skeleton-data-cell", "align-left")}>
					<Skeleton className={cx("skeleton")} width={100} height={21} />
				</div>
			);

			const feeDataCell = (
				<div className={cx("skeleton-data-cell", "align-left")}>
					<Skeleton className={cx("skeleton")} width={100} height={21} />
				</div>
			);

			const requestsDataCell = (
				<div className={cx("skeleton-data-cell", "align-center")}>
					<Skeleton className={cx("skeleton")} width={100} height={21} />
				</div>
			);

			const ownerDataCell = (
				<div className={cx("skeleton-data-cell", "align-right")}>
					<Skeleton className={cx("skeleton")} width={100} height={21} />
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
