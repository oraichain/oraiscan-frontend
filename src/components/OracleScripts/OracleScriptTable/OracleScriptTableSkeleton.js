import React, {memo, useMemo} from "react";
import Skeleton from "react-loading-skeleton";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import {getHeaderRow} from "src/components/OracleScripts/OracleScriptTable/OracleScriptTable";
import styles from "./OracleScriptTable.scss";

const OracleScriptTableSkeleton = memo(({rows = 10}) => {
	const cx = classNames.bind(styles);
	const getDataRows = rows => {
		let dataRows = [];
		for (let i = 1; i <= rows; i++) {
			const oracleScriptDataCell = (
				<div className={cx("oracle-script-data-cell", "align-left")}>
					<Skeleton />
				</div>
			);

			const descriptionDataCell = (
				<div className={cx("description-data-cell", "align-left")}>
					<Skeleton />
				</div>
			);

			const requestAndResponseTimeDataCell = (
				<div className={cx("request-and-response-time-data-cell")}>
					<div className={cx("request-value", "align-right")}>
						<Skeleton />
					</div>
					<div className={cx("response-time-value", "align-right")}>
						<Skeleton />
					</div>
				</div>
			);

			const ownerDataCell = <Skeleton />;

			dataRows.push([oracleScriptDataCell, descriptionDataCell, requestAndResponseTimeDataCell, ownerDataCell]);
		}
		return dataRows;
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default OracleScriptTableSkeleton;
