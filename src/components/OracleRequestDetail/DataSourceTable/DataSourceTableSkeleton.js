import React, {memo, useMemo} from "react";
import PropTypes from "prop-types";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import {getHeaderRow} from "src/components/OracleRequestDetail/DataSourceTable/DataSourceTable";
import styles from "./DataSourceTable.module.scss";

const cx = classNames.bind(styles);

const DataSourceTableSkeleton = memo(({rows}) => {
	const getDataRows = rows => {
		let dataRows = [];
		for (let i = 1; i <= rows; i++) {
			const nameDataCell = (
				<div className={cx("name-data-cell", "align-left")}>
					<Skeleton className={cx("skeleton")} variant='text' width={80} height={21} />
				</div>
			);

			const contractDataCell = (
				<div className={cx("contract-data-cell", "align-left")}>
					<Skeleton className={cx("skeleton")} variant='text' width={150} height={21} />
				</div>
			);

			const ownerDataCell = (
				<div className={cx("owner-data-cell", "align-left")}>
					<Skeleton className={cx("skeleton")} variant='text' width={230} height={21} />
				</div>
			);

			const descriptionDataCell = (
				<div className={cx("description-data-cell", "align-left")}>
					<Skeleton className={cx("skeleton")} variant='text' width={150} height={21} />
				</div>
			);

			const feesDataCell = (
				<div className={cx("fees-data-cell", "align-right")}>
					<Skeleton className={cx("skeleton")} variant='text' width={50} height={21} />
				</div>
			);

			dataRows.push([nameDataCell, contractDataCell, ownerDataCell, descriptionDataCell, feesDataCell]);
		}
		return dataRows;
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

DataSourceTableSkeleton.propTypes = {
	rows: PropTypes.number,
};
DataSourceTableSkeleton.defaultProps = {
	rows: 5,
};

export default DataSourceTableSkeleton;
