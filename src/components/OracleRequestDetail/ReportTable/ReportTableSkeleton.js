import React, {memo, useMemo} from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import Skeleton from "@material-ui/lab/Skeleton";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import {getHeaderRow} from "src/components/RequestDetails/ReportTable/ReportTable";
import styles from "./ReportTable.module.scss";

const ReportTableSkeleton = memo(({rows}) => {
	const cx = classNames.bind(styles);
	const getDataRows = rows => {
		let dataRows = [];
		for (let i = 1; i <= rows; i++) {
			const nameDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' width={150} height={21} className={cx("skeleton")} />
				</div>
			);

			const testCaseResultsDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' width={90} height={21} className={cx("skeleton")} />
				</div>
			);

			const heightDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' width={48} height={21} className={cx("skeleton")} />
				</div>
			);

			const resultDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' width={75} height={21} className={cx("skeleton")} />
				</div>
			);

			const statusDataCell = (
				<div className={cx("align-right")}>
					<Skeleton variant='text' width={60} height={21} className={cx("skeleton")} />
				</div>
			);

			const moreDataCell = (
				<div className={cx("align-right")}>
					<Skeleton variant='text' width={65} height={21} className={cx("skeleton")} />
				</div>
			);

			dataRows.push([nameDataCell, testCaseResultsDataCell, heightDataCell, resultDataCell, statusDataCell, moreDataCell]);
		}
		return dataRows;
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

ReportTableSkeleton.propTypes = {
	rows: PropTypes.number,
};
ReportTableSkeleton.defaultProps = {
	rows: 5,
};

export default ReportTableSkeleton;
