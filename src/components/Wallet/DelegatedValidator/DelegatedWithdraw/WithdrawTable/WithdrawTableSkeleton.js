import React, {memo, useMemo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import {getHeaderRow} from "src/components/Wallet/DelegatedValidator/DelegatedWithdraw/WithdrawTable/WithdrawTable";
import styles from "./WithdrawTable.scss";

const WithdrawTableSkeleton = memo(({rows = 5}) => {
	const cx = classNames.bind(styles);
	const getDataRows = rows => {
		let dataRows = [];
		for (let i = 1; i <= rows; i++) {
			const validatorDataCell = (
				<div className={cx("align-left")}>
					<Skeleton />
				</div>
			);
			const stakedDataCell = (
				<div className={cx("align-left")}>
					<Skeleton />
				</div>
			);

			const rewardsDataCell = (
				<div className={cx("align-left")}>
					<Skeleton />
				</div>
			);

			const unbondedDataCell = (
				<div className={cx("align-left")}>
					<Skeleton />
				</div>
			);

			const withdrawableDataCell = (
				<div className={cx("align-left")}>
					<Skeleton />
				</div>
			);

			const withdrawDataCell = (
				<div className={cx("align-left")}>
					<Skeleton />
				</div>
			);

			dataRows.push([validatorDataCell, stakedDataCell, rewardsDataCell, unbondedDataCell, withdrawableDataCell, withdrawDataCell]);
		}
		return dataRows;
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default WithdrawTableSkeleton;
