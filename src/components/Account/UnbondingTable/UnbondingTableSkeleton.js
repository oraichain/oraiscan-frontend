import React, {memo, useMemo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import {getHeaderRow} from "src/components/Account/UnbondingTable/UnbondingTable";
import styles from "./UnbondingTable.scss";

const UnbondingTableSkeleton = memo(({rows = 5}) => {
	const cx = classNames.bind(styles);
	const getDataRows = rows => {
		let dataRows = [];
		for (let i = 1; i <= rows; i++) {
			const validatorDataCell = (
				<div className={cx("align-left")}>
					<Skeleton className={cx("skeleton-inline-block")} variant='text' width={50} height={21} />
				</div>
			);

			const heightDataCell = (
				<div className={cx("align-right")}>
					<Skeleton className={cx("skeleton-inline-block")} variant='text' width={50} height={21} />
				</div>
			);

			const amountDataCell = (
				<div className={cx("align-right")}>
					<Skeleton className={cx("skeleton-inline-block")} variant='text' width={50} height={21} />
				</div>
			);

			const completionTimeDataCell = (
				<div className={cx("align-right")}>
					<Skeleton className={cx("skeleton-block")} variant='text' height={21} />
					<Skeleton className={cx("skeleton-block")} variant='text' height={21} />
				</div>
			);

			dataRows.push([validatorDataCell, heightDataCell, amountDataCell, completionTimeDataCell]);
		}
		return dataRows;
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	return <ThemedTable theme={tableThemes.DARK} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default UnbondingTableSkeleton;
