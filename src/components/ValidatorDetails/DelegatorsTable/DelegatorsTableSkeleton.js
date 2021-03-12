import React, {memo, useMemo} from "react";
import classNames from "classnames/bind";
import Skeleton from "@material-ui/lab/Skeleton";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import {getHeaderRow} from "src/components/ValidatorDetails/DelegatorsTable/DelegatorsTable";
import styles from "./DelegatorsTable.scss";

const DelegatorsTableSkeleton = memo(({rows = 10}) => {
	const cx = classNames.bind(styles);
	const getDataRows = rows => {
		let dataRows = [];
		for (let i = 1; i <= rows; i++) {
			const delegatorAddressDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' height={21} />
				</div>
			);

			const amountDataCell = (
				<div className={cx("align-right")}>
					<Skeleton variant='text' height={21} />
				</div>
			);

			const shareDataCell = (
				<div className={cx("align-right")}>
					<Skeleton variant='text' height={21} />
				</div>
			);

			dataRows.push([delegatorAddressDataCell, amountDataCell, shareDataCell]);
		}
		return dataRows;
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	return <ThemedTable theme={tableThemes.DARK} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default DelegatorsTableSkeleton;
