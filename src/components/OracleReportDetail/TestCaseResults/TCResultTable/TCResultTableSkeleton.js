import React, {memo, useMemo} from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import Skeleton from "@material-ui/lab/Skeleton";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import {getHeaderRow} from "./TCResultTable";
import styles from "./TCResultTable.module.scss";

const TCResultTableSkeleton = memo(({rows}) => {
	const cx = classNames.bind(styles);
	const getDataRows = rows => {
		let dataRows = [];
		for (let i = 1; i <= rows; i++) {
			const nameDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' width={150} height={21} className={cx("skeleton")} />
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

			dataRows.push([nameDataCell, resultDataCell, statusDataCell]);
		}
		return dataRows;
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

TCResultTableSkeleton.propTypes = {
	rows: PropTypes.number,
};
TCResultTableSkeleton.defaultProps = {
	rows: 5,
};

export default TCResultTableSkeleton;
