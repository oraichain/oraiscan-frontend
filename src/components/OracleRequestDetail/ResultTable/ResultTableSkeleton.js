import React, {memo, useMemo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import {getHeaderRow} from "src/components/RequestDetails/ResultTable/ResultTable";
import styles from "./ResultTable.module.scss";

const ResultTableSkeleton = memo(({rows = 5}) => {
	const cx = classNames.bind(styles);
	const getDataRows = rows => {
		let dataRows = [];
		for (let i = 1; i <= rows; i++) {
			const validatorDataCell = (
				<div className={cx("validator-data-cell", "align-left")}>
					<div className={cx("validator")}>
						<Skeleton className={cx("validator-icon")} variant='circle' width={40} height={40} />
						<span className={cx("validator-name")}>
							<Skeleton variant='text' width={60} height={21} className={cx("skeleton")} />
						</span>
					</div>
				</div>
			);

			const addressDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' width={150} height={21} className={cx("skeleton")} />
				</div>
			);

			const resultDataCell = (
				<div className={cx("align-left")}>
					<Skeleton variant='text' width={90} height={21} className={cx("skeleton")} />
				</div>
			);

			const votingPowerDataCell = (
				<div className={cx("voting-power-data-cell", "align-left")}>
					<div className={cx("voting-power")}>
						<div className={cx("voting-power-value")}>
							<Skeleton variant='text' width={70} height={21} className={cx("skeleton")} />
						</div>
					</div>
				</div>
			);

			const statusDataCell = (
				<div className={cx("status-data-cell", "align-right")}>
					<div className={cx("status")}>
						<Skeleton variant='rect' width={11} height={8} className={cx("skeleton", "status-icon")} />
						<span className={cx("status-text")}>
							<Skeleton variant='text' width={50} height={21} className={cx("skeleton")} />
						</span>
					</div>
				</div>
			);

			dataRows.push([validatorDataCell, addressDataCell, resultDataCell, votingPowerDataCell, statusDataCell]);
		}
		return dataRows;
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default ResultTableSkeleton;
