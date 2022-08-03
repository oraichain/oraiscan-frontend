import React, {memo, useMemo} from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import Skeleton from "@material-ui/lab/Skeleton";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import {getHeaderRow} from "./AssetsIbcSkeletonTable";
import styles from "./AssetsIbcTable.module.scss";

const AssetsIbcTableSkeleton = memo(({rows}) => {
	const cx = classNames.bind(styles);
	const getDataRows = rows => {
		let dataRows = [];
		for (let i = 1; i <= rows; i++) {
			const nameDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' className={cx("skeleton")} width={250} height={21} />
				</div>
			);

			const priceHashDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' className={cx("skeleton")} width={100} height={21} />
				</div>
			);

			const supplyDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' className={cx("skeleton")} width={100} height={21} />
				</div>
			);

			const totalValueDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' className={cx("skeleton")} width={100} height={21} />
				</div>
			);
			dataRows.push([nameDataCell, priceHashDataCell, supplyDataCell, totalValueDataCell]);
		}
		return dataRows;
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

AssetsIbcTableSkeleton.propTypes = {
	rows: PropTypes.number,
};
AssetsIbcTableSkeleton.defaultProps = {
	rows: 10,
};

export default AssetsIbcTableSkeleton;
