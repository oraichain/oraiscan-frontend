import React, {memo, useMemo} from "react";
import Skeleton from "react-loading-skeleton";
import classNames from "classnames/bind";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useTheme} from "@material-ui/core/styles";
import {_} from "src/lib/scripts";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./ValidatorTable.scss";
import sortNoneIcon from "src/assets/common/sort_none_ic.svg";

const cx = classNames.bind(styles);

const ValidatorTableMobileSkeleton = ({data}) => {
	return (
		<div className={cx("block-table")}>
			{_.map(data, (dataRow, i) => {
				return (
					<div className={cx("block-row-wrapper")} key={i}>
						<div className={cx("block-row")}>
							<div className={cx("left")}> Rank </div>
							<div className={cx("right", "link")}>{dataRow[0]}</div>
						</div>
						<div className={cx("block-row")}>
							<div className={cx("left")}> Validator </div>
							<div className={cx("right")}>{dataRow[1]}</div>
						</div>
						<div className={cx("block-row-power")}>
							<div className={cx("left")}> Voting Power </div>
							<div className={cx("right")}>{dataRow[2]}</div>
						</div>
						<div className={cx("block-row-cumulative")}>
							<div className={cx("left")}> Cumulative Share % </div>
							<div className={cx("right")}>{dataRow[3]}</div>
						</div>
						<div className={cx("block-row")}>
							<div className={cx("left-two-line")}>
								<div className={cx("title")}> Uptime </div>
								<div className={cx("value")}> {dataRow[4]} </div>
							</div>
							<div className={cx("right-two-line")}>
								<div className={cx("title")}> Commission </div>
								{dataRow[5]}
							</div>
						</div>
						<div className={cx("block-row-delegate")}>{dataRow[6]}</div>
					</div>
				);
			})}
		</div>
	);
};

const ValidatorTableSkeleton = memo(({rows = 10}) => {
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

	const cx = classNames.bind(styles);
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
	const delegateHeaderCell = <div className={cx("header-cell", "align-center")}>Delegate</div>;
	const headerCells = [
		rankHeaderCell,
		validatorHeaderCell,
		votingPowerHeaderCell,
		cumulativeShareHeaderCell,
		uptimeHeaderCell,
		commissionHeaderCell,
		delegateHeaderCell,
	];
	const headerCellStyles = [
		{width: "80px"}, // Rank
		{minWidth: "200px"}, // Validator
		{width: "155px"}, // Voting Power
		{width: "250px"}, // Cumulative Share
		{width: "180px"}, // Uptime
		{width: "150px"}, // Commission
		{width: "100px"}, // Delegate
	];
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

			const delegateDataCell = (
				<div className={cx("skeleton-data-cell", "align-center")}>
					<Skeleton />
				</div>
			);

			dataRows.push([rankDataCell, validatorDataCell, votingPowerDataCell, cumulativeShareDataCell, uptimeDataCell, commissionDataCell, delegateDataCell]);
		}
		return dataRows;
	};

	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	if (isDesktop) {
		return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerCellStyles} headerCells={headerCells} dataRows={dataRows} />;
	}
	return <ValidatorTableMobileSkeleton data={dataRows} />;
});

export default ValidatorTableSkeleton;
