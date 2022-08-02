// @ts-nocheck
import React, {memo, useMemo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import {getHeaderRow} from "src/components/Wallet/Register/DelegatorCard/DelegatorTable/DelegatorTable";
import styles from "./DelegatorTable.module.scss";

const DelegatorTableSkeleton = memo(({rows = 5}) => {
	const cx = classNames.bind(styles);
	const getDataRows = rows => {
		let dataRows = [];
		for (let i = 1; i <= rows; i++) {
			const addressDataCell = (
				<div className={cx("align-left")}>
					<Skeleton />
				</div>
			);
			const stakedDataCell = (
				<div className={cx("align-left")}>
					<Skeleton />
				</div>
			);

			const claimableRewardsDataCell = (
				<div className={cx("align-left")}>
					<Skeleton />
				</div>
			);

			dataRows.push([addressDataCell, stakedDataCell, claimableRewardsDataCell]);
		}
		return dataRows;
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default DelegatorTableSkeleton;
