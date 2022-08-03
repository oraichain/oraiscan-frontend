import React, {memo, useMemo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./ClaimTable.module.scss";

const cx = classNames.bind(styles);

const getHeaderRow = () => {
	const validatorHeaderCell = <div className={cx("header-cell", "align-left")}>Validator</div>;
	const stakedHeaderCell = <div className={cx("header-cell", "align-left")}>Staked (ORAI)</div>;
	const claimableRewardsHeaderCell = <div className={cx("header-cell", "align-left")}>Claimable Rewards (ORAI)</div>;
	const claimHeaderCell = <div className={cx("header-cell", "align-center")}> </div>;
	const headerCells = [validatorHeaderCell, stakedHeaderCell, claimableRewardsHeaderCell, claimHeaderCell];
	const headerCellStyles = [{width: "auto"}, {width: "auto"}, {width: "auto"}, {width: "140px"}];
	return {
		headerCells,
		headerCellStyles,
	};
};

const ClaimTableSkeleton = memo(({rows = 5}) => {
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

			const claimableRewardsDataCell = (
				<div className={cx("align-left")}>
					<Skeleton />
				</div>
			);

			const claimDataCell = (
				<div className={cx("align-left")}>
					<Skeleton />
				</div>
			);

			dataRows.push([validatorDataCell, stakedDataCell, claimableRewardsDataCell, claimDataCell]);
		}
		return dataRows;
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default ClaimTableSkeleton;
