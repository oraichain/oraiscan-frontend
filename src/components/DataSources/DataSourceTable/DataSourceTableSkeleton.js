import React, {memo, useMemo} from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import Skeleton from "@material-ui/lab/Skeleton";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import {getHeaderRow} from "./DataSourceTableSkeletonTable";
import styles from "./DataSourceTable.scss";

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
				<div className={cx("align-right")}>
					<Skeleton variant='text' className={cx("skeleton")} width={60} height={21} />
				</div>
			);

			const requestsDataCell = (
				<div className={cx("align-right")}>
					<Skeleton variant='text' className={cx("skeleton")} width={10} height={21} />
				</div>
			);

			const ownerDataCell = (
				<div className={cx("align-right")}>
					<Skeleton variant='text' className={cx("skeleton")} width={60} height={21} />
				</div>
			);

			const ownerSmartContractCell = (
				<div className={cx("align-right")}>
					<Skeleton variant='text' className={cx("skeleton")} width={60} height={21} />
				</div>
			);

			dataRows.push([testCaseDataCell, descriptionHashDataCell, feeDataCell, requestsDataCell, ownerDataCell, ownerSmartContractCell]);
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
