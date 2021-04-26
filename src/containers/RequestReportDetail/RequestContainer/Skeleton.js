import React, {memo, useMemo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./RequestContainer.scss";

const DelegationTableSkeleton = memo(({rows = 5}) => {
	const cx = classNames.bind(styles);
	const getDataRows = rows => {
		let dataRows = [];
		for (let i = 1; i <= rows; i++) {
			const validatorDataCell = (
				<div className={cx("skeleton-data-cell", "align-left")}>
					<Skeleton />
				</div>
			);

			const amountDataCell = (
				<div className={cx("skeleton-data-cell", "align-right")}>
					<Skeleton />
				</div>
			);

			const rewardDataCell = (
				<div className={cx("skeleton-data-cell", "center")}>
					<Skeleton />
				</div>
			);

			dataRows.push([validatorDataCell, amountDataCell, rewardDataCell]);
		}
		return dataRows;
	};

	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	const validatorHeaderCell = <div className={cx("header-cell", "align-left")}> Name </div>;
	const amountHeaderCell = <div className={cx("header-cell", "align-right")}> Blockhash </div>;
	const rewardHeaderCell = <div className={cx("header-cell", "align-right")}> Txs </div>;
	const headerCells = [validatorHeaderCell, amountHeaderCell, rewardHeaderCell];
	const headerCellStyles = [
		{minWidth: "100px"}, // Validator
		{minWidth: "100px"}, // Amount
		{minWidth: "100px"}, // Reward
	];

	return <ThemedTable theme={tableThemes.DARK} headerCellStyles={headerCellStyles} headerCells={headerCells} dataRows={dataRows} />;
});

export default DelegationTableSkeleton;
