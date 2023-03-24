import React, {memo, useMemo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import {getHeaderRow} from "src/components/Proposals/ProposalsTable/ProposalsTable";
import styles from "./ProposalsTable.module.scss";

const ProposalsTableSkeleton = memo(({rows = 10}) => {
	const cx = classNames.bind(styles);
	const getDataRows = rows => {
		let dataRows = [];
		for (let i = 1; i <= rows; i++) {
			const idDataCell = (
				<div style={{height: 43}} className={cx("skeleton-data-cell", "align-left")}>
					<Skeleton />
				</div>
			);

			const titleDataCell = (
				<div style={{height: 43}} className={cx("skeleton-data-cell", "align-left")}>
					<Skeleton  />
				</div>
			);

			const statusDataCell = (
				<div style={{height: 43}} className={cx("skeleton-data-cell", "align-center")}>
					<Skeleton/>
				</div>
			);

			const votingStartDataCell = (
				<div style={{height: 43}} className={cx("skeleton-data-cell", "align-right")}>
					<Skeleton />
				</div>
			);

			const submitTimeDataCell = (
				<div style={{height: 43}} className={cx("skeleton-data-cell", "align-right")}>
					<Skeleton />
				</div>
			);

			const totalDepositDataCell = (
				<div style={{height: 43}} className={cx("skeleton-data-cell", "align-right")}>
					<Skeleton />
				</div>
			);

			const voteDepositDataCell = (
				<div style={{height: 43}} className={cx("skeleton-data-cell", "align-right")}>
					<Skeleton />
				</div>
			);

			dataRows.push([idDataCell, titleDataCell, statusDataCell, votingStartDataCell, submitTimeDataCell, totalDepositDataCell, voteDepositDataCell]);
		}
		return dataRows;
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default ProposalsTableSkeleton;
