import React, {memo, useMemo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {_} from "src/lib/scripts";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import sortNoneIcon from "src/assets/common/sort_none_ic.svg";
import styles from "./ValidatorTable.module.scss";

const cx = classNames.bind(styles);

const getHeaderRow = () => {
	const rankHeaderCell = <div className={cx("rank-header-cell", "align-center")}>Rank</div>;
	const validatorHeaderCell = (
		<div className={cx("header-cell", "align-left")}>
			Validator
			<button type='button' className={cx("sort-button")} onClick={() => {}}>
				<img src={sortNoneIcon} alt='' />
			</button>
		</div>
	);
	const votingPowerHeaderCell = (
		<div className={cx("header-cell", "align-right")}>
			Voting power
			<button type='button' className={cx("sort-button")} onClick={() => {}}>
				<img src={sortNoneIcon} alt='' />
			</button>
		</div>
	);
	const cumulativeShareHeaderCell = <div className={cx("header-cell", "align-right")}>Cumulative Share %</div>;
	const uptimeHeaderCell = (
		<div className={cx("header-cell", "align-right")}>
			Uptime
			<button type='button' className={cx("sort-button")} onClick={() => {}}>
				<img src={sortNoneIcon} alt='' />
			</button>
		</div>
	);
	const commissionHeaderCell = (
		<div className={cx("header-cell", "align-right")}>
			Commission
			<button type='button' className={cx("sort-button")} onClick={() => {}}>
				<img src={sortNoneIcon} alt='' />
			</button>
		</div>
	);

	const estAPRHeaderCell = (
		<div className={cx("header-cell", "align-right")}>
			Est APR <QuestionCircleOutlined />
		</div>
	);

	const delegateHeaderCell = <div className={cx("header-cell", "align-center")}>Delegate</div>;

	const headerCells = [
		rankHeaderCell,
		validatorHeaderCell,
		votingPowerHeaderCell,
		cumulativeShareHeaderCell,
		uptimeHeaderCell,
		commissionHeaderCell,
		estAPRHeaderCell,
		delegateHeaderCell,
	];
	const headerCellStyles = [
		{width: "5.4%"}, // Rank
		{width: "17.7%"}, // Validator
		{width: "11.8%"}, // Voting Power
		{width: "13.1%"}, // Self Bonded
		{width: "12.3%"}, // Cumulative Share
		{width: "9%"}, // Uptime
		{width: "11.7%"}, // Commission
		{width: "9%"}, // EstAPRCell
		{width: "10%"}, // Delegate
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const getDataRows = rows => {
	let dataRows = [];
	for (let i = 1; i <= rows; i++) {
		const rankDataCell = (
			<div className={cx("skeleton-data-cell", "align-center")}>
				<Skeleton />
			</div>
		);

		const validatorDataCell = (
			<div className={cx("skeleton-data-cell", "align-left")}>
				<Skeleton />
			</div>
		);

		let votingPowerDataCell = (
			<div className={cx("skeleton-data-cell", "align-right")}>
				<Skeleton />
			</div>
		);

		const cumulativeShareDataCell = (
			<div className={cx("skeleton-data-cell", "align-center")}>
				<Skeleton />
			</div>
		);

		const uptimeDataCell = (
			<div className={cx("skeleton-data-cell", "align-right")}>
				<Skeleton />
			</div>
		);

		const commissionDataCell = (
			<div className={cx("skeleton-data-cell", "align-right")}>
				<Skeleton />
			</div>
		);

		const estAPRnDataCell = (
			<div className={cx("skeleton-data-cell", "align-right")}>
				<Skeleton />
			</div>
		);

		const delegateDataCell = (
			<div className={cx("skeleton-data-cell", "align-center")}>
				<Skeleton />
			</div>
		);

		dataRows.push([
			rankDataCell,
			validatorDataCell,
			votingPowerDataCell,
			cumulativeShareDataCell,
			uptimeDataCell,
			commissionDataCell,
			estAPRnDataCell,
			delegateDataCell,
		]);
	}
	return dataRows;
};

const ValidatorTableSkeleton = memo(({rows = 10}) => {
	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(rows), [rows]);
	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default ValidatorTableSkeleton;
