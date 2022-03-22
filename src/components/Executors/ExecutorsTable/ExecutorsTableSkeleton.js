import React, { memo, useMemo } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import { tableThemes } from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import { getHeaderRow } from "src/components/Executors/ExecutorsTable/ExecutorsTable";
import styles from "./ExecutorsTable.scss";

const ExecutorsTableSkeleton = memo(({ rows = 2 }) => {
	const cx = classNames.bind(styles);
	const getDataRows = rows => {
		let dataRows = [];
		for (let i = 1; i <= rows; i++) {
			const publicKeyDataCell = (
				<div className={cx("skeleton-data-cell", "align-left")}>
					<Skeleton />
				</div>
			);

			const activeDataCell = (
				<div className={cx("skeleton-data-cell", "align-right")}>
					<Skeleton />
				</div>
			);


			dataRows.push([publicKeyDataCell, activeDataCell]);
		}
		return dataRows;
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	return <ThemedTable theme={tableThemes.DARK} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default ExecutorsTableSkeleton;
