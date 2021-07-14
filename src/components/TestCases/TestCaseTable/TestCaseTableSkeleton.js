import React, {memo, useMemo} from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import Skeleton from "@material-ui/lab/Skeleton";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import {getHeaderRow} from "src/components/TestCases/TestCaseTable/TestCaseTable";
import styles from "./TestCaseTable.scss";

const TestCaseTableSkeleton = memo(({rows}) => {
	const cx = classNames.bind(styles);
	const getDataRows = rows => {
		let dataRows = [];
		for (let i = 1; i <= rows; i++) {
			const testCaseDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' className={cx("skeleton")} width={100} height={21} />
				</div>
			);

			const descriptionHashDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' className={cx("skeleton")} width={120} height={21} />
				</div>
			);

			const feeDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' className={cx("skeleton")} width={60} height={21} />
				</div>
			);

			const requestsDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' className={cx("skeleton")} width={40} height={21} />
				</div>
			);

			const ownerDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' className={cx("skeleton")} width={120} height={21} />
				</div>
			);

			const contractDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' className={cx("skeleton")} width={200} height={21} />
				</div>
			);

			dataRows.push([testCaseDataCell, descriptionHashDataCell, feeDataCell, requestsDataCell, ownerDataCell, contractDataCell]);
		}
		return dataRows;
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

TestCaseTableSkeleton.propTypes = {
	rows: PropTypes.number,
};
TestCaseTableSkeleton.defaultProps = {
	rows: 10,
};

export default TestCaseTableSkeleton;
