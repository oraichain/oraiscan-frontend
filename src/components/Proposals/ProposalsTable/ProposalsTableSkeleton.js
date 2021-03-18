import React, {memo, useMemo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import {getHeaderRow} from "src/components/Proposals/ProposalsTable/ProposalsTable";
import styles from "./ProposalsTable.scss";

const ProposalsTableSkeleton = memo(({rows = 10}) => {
	const cx = classNames.bind(styles);
	const getDataRows = rows => {
		let dataRows = [];
		for (let i = 1; i <= rows; i++) {
			const idDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' width={25} height={21} className={cx("skeleton")} />
				</div>
			);

			const titleDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' height={24} />
				</div>
			);

			const statusDataCell = (
				<div className={cx("align-center")}>
					<Skeleton variant='text' width={70} height={24} className={cx("skeleton")} />
				</div>
			);

			const votingStartDataCell = (
				<div className={cx("align-right")}>
					<Skeleton variant='text' width={130} height={21} className={cx("skeleton")} />
				</div>
			);

			const submitTimeDataCell = (
				<div className={cx("align-right")}>
					<Skeleton variant='text' width={130} height={21} className={cx("skeleton")} />
				</div>
			);

			const totalDepositDataCell = (
				<div className={cx("align-right")}>
					<Skeleton variant='text' width={100} height={21} className={cx("skeleton")} />
				</div>
			);

			dataRows.push([idDataCell, titleDataCell, statusDataCell, votingStartDataCell, submitTimeDataCell, totalDepositDataCell]);
		}
		return dataRows;
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default ProposalsTableSkeleton;
