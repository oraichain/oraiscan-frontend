import React, {memo, useMemo} from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import Skeleton from "@material-ui/lab/Skeleton";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import {getHeaderRow} from "src/components/SmartContracts/SmartContractTable/SmartContractTable";
import styles from "./SmartContractTable.module.scss";

const SmartContractTableSkeleton = memo(({rows}) => {
	const cx = classNames.bind(styles);
	const getDataRows = rows => {
		let dataRows = [];
		for (let i = 1; i <= rows; i++) {
			const addressDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' className={cx("skeleton")} width={320} height={21} />
				</div>
			);

			const codeIdDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' className={cx("skeleton")} width={80} height={21} />
				</div>
			);

			const creatorDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' className={cx("skeleton")} width={320} height={21} />
				</div>
			);

			const adminDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' className={cx("skeleton")} width={50} height={21} />
				</div>
			);

			const labelDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' className={cx("skeleton")} width={160} height={21} />
				</div>
			);

			const sourceDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' className={cx("skeleton")} width={50} height={21} />
				</div>
			);

			dataRows.push([addressDataCell, codeIdDataCell, creatorDataCell, adminDataCell, labelDataCell, sourceDataCell]);
		}
		return dataRows;
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

SmartContractTableSkeleton.propTypes = {
	rows: PropTypes.number,
};
SmartContractTableSkeleton.defaultProps = {
	rows: 10,
};

export default SmartContractTableSkeleton;
