import React, {memo, useMemo} from "react";
import classNames from "classnames/bind";
import Skeleton from "@material-ui/lab/Skeleton";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import {getHeaderRow} from "src/components/OracleScripts/OracleScriptTable/OracleScriptTable";
import styles from "./OracleScriptTable.module.scss";

const OracleScriptTableSkeleton = memo(({rows = 10}) => {
	const cx = classNames.bind(styles);
	const getDataRows = rows => {
		let dataRows = [];
		for (let i = 1; i <= rows; i++) {
			const oracleScriptDataCell = (
				<div className={cx("oracle-script-data-cell", "align-left")}>
					<Skeleton className={cx("skeleton")} variant='text' width={97} height={21} />
				</div>
			);

			const descriptionDataCell = (
				<div className={cx("description-data-cell", "align-left")}>
					<Skeleton className={cx("skeleton")} variant='text' width={200} height={21} />
				</div>
			);

			const requestAndResponseTimeDataCell = (
				<div className={cx("request-and-response-time-data-cell")}>
					<div className={cx("request-value", "align-right")}>
						<Skeleton className={cx("skeleton")} variant='text' width={50} height={21} />
					</div>
				</div>
			);

			const ownerDataCell = (
				<div className={cx("owner-data-cell", "align-right")}>
					<Skeleton className={cx("skeleton")} variant='text' width={70} height={21} />
				</div>
			);

			dataRows.push([oracleScriptDataCell, descriptionDataCell, requestAndResponseTimeDataCell, ownerDataCell]);
		}
		return dataRows;
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default OracleScriptTableSkeleton;
