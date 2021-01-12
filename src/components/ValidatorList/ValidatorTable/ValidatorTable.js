/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useHistory} from "react-router-dom";
import Skeleton from "react-skeleton-loader";

import {_} from "src/lib/scripts";
import {tableThemes} from "src/constants/tableThemes";
import {formatPercentage, formatInteger} from "src/helpers/helper";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./ValidatorTable.scss";
import sortNoneIcon from "src/assets/common/sort_none_ic.svg";
import sortAscIcon from "src/assets/common/sort_asc_ic.svg";
import sortDescIcon from "src/assets/common/sort_desc_ic.svg";
import aiIcon from "src/assets/common/ai_ic.svg";

const cx = classNames.bind(styles);

const ValidatorTableMobile = ({data}) => {
	const history = useHistory();
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
					</div>
				);
			})}
		</div>
	);
};

const ValidatorTable = memo(({data = []}) => {
	const isDesktop = useMediaQuery("(min-width:500px)");
	const sortFields = {
		RANK: "rank",
		VALIDATOR: "moniker",
		VOTING_POWER: "voting_power",
		UPTIME: "uptime",
		COMMISSION: "commission_rate",
	};

	const sortDirections = {
		ASC: "asc",
		DESC: "desc",
	};

	const [sortField, setSortField] = useState(sortFields.RANK);
	const [sortDirection, setSortDirection] = useState(sortDirections.ASC);

	const getSortIcon = field => {
		if (field === sortField) {
			if (sortDirection === sortDirections.ASC) {
				return sortAscIcon;
			} else {
				return sortDescIcon;
			}
		}

		return sortNoneIcon;
	};

	const toggleDirection = direction => {
		if (direction === sortDirections.ASC) {
			return sortDirections.DESC;
		} else {
			return sortDirections.ASC;
		}
	};

	const sortBy = field => {
		if (field === sortField) {
			setSortDirection(toggleDirection(sortDirection));
		} else {
			setSortDirection(sortDirections.ASC);
		}
		setSortField(field);
	};

	const computeTotalVotingPower = data => {
		if (!data || !Array.isArray(data)) {
			return 0;
		}

		let total = 0;
		for (let item of data) {
			total += parseFloat(item?.voting_power ?? 0);
		}
		return total;
	};
	const totalVotingPower = useMemo(() => computeTotalVotingPower(data), [data]);
	const rankHeaderCell = <div className={cx("rank-header-cell", "align-center")}>Rank</div>;
	const validatorHeaderCell = (
		<div className={cx("header-cell", "align-left")}>
			Validator
			<button
				type='button'
				className={cx("sort-button")}
				onClick={() => {
					sortBy(sortFields.VALIDATOR);
				}}>
				<img src={getSortIcon(sortFields.VALIDATOR)} alt='' />
			</button>
		</div>
	);
	const votingPowerHeaderCell = (
		<div className={cx("header-cell", "align-right")}>
			Voting power
			<button
				type='button'
				className={cx("sort-button")}
				onClick={() => {
					sortBy(sortFields.VOTING_POWER);
				}}>
				<img src={getSortIcon(sortFields.VOTING_POWER)} alt='' />
			</button>
		</div>
	);
	const cumulativeShareHeaderCell = <div className={cx("header-cell", "align-right")}>Cumulative Share %</div>;
	const uptimeHeaderCell = (
		<div className={cx("header-cell", "align-right")}>
			Uptime
			<button
				type='button'
				className={cx("sort-button")}
				onClick={() => {
					sortBy(sortFields.UPTIME);
				}}>
				<img src={getSortIcon(sortFields.UPTIME)} alt='' />
			</button>
		</div>
	);
	const commissionHeaderCell = (
		<div className={cx("header-cell", "align-right")}>
			Commission
			<button
				type='button'
				className={cx("sort-button")}
				onClick={() => {
					sortBy(sortFields.COMMISSION);
				}}>
				<img src={getSortIcon(sortFields.COMMISSION)} alt='' />
			</button>
		</div>
	);
	const getCumulativeShareCell = (previousValue, currentValue, totalValue) => {
		const previousPercent = formatPercentage(previousValue / totalValue);
		const currentPercent = formatPercentage(currentValue / totalValue);
		const totalPercent = formatPercentage((previousValue + currentValue) / totalValue, 2);

		return (
			<>
				<div className={cx("previous-graph")} style={{width: previousPercent + "%"}}></div>
				<div className={cx("current-graph")} style={{left: previousPercent + "%", width: currentPercent + "%"}}></div>
				<div className={cx("total-value")}>{totalPercent} %</div>
			</>
		);
	};
	const headerCells = [rankHeaderCell, validatorHeaderCell, votingPowerHeaderCell, cumulativeShareHeaderCell, uptimeHeaderCell, commissionHeaderCell];
	const headerCellStyles = [
		{width: "80px"}, // Rank
		{minWidth: "200px"}, // Validator
		{width: "155px"}, // Voting Power
		{width: "250px"}, // Cumulative Share
		{width: "180px"}, // Uptime
		{width: "150px"}, // Commission
	];

	const isGreater = (value1, value2) => {
		if (!isNaN(value1) && !isNaN(value2)) {
			return parseFloat(value1) > parseFloat(value2);
		}

		return value1.toString().toLowerCase() > value2.toString().toLowerCase();
	};

	const isLess = (value1, value2) => {
		if (!isNaN(value1) && !isNaN(value2)) {
			return parseFloat(value1) < parseFloat(value2);
		}

		return value1.toString().toLowerCase() < value2.toString().toLowerCase();
	};

	const compareTwoValues = (value1, value2, direction = sortDirections.ASC) => {
		if (direction === sortDirections.ASC) {
			if (isGreater(value1, value2)) {
				return 1;
			} else if (isLess(value1, value2)) {
				return -1;
			} else {
				return 0;
			}
		} else {
			if (isLess(value1, value2)) {
				return 1;
			} else if (isGreater(value1, value2)) {
				return -1;
			} else {
				return 0;
			}
		}
	};

	const sortData = (data, sortField, sortDirection, extraSortField = sortFields.RANK) => {
		if (!data) {
			return [];
		}

		return [...data].sort(function(a, b) {
			if (a[sortField] === b[sortField]) {
				return compareTwoValues(a[extraSortField], b[extraSortField], toggleDirection(sortDirection));
			} else {
				return compareTwoValues(a[sortField], b[sortField], sortDirection);
			}
		});
	};

	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		let previousVotingPower = 0;
		if (!data) {
			return null;
		}
		return data.map(item => {
			const rankDataCell = <div className={cx("rank-data-cell", "align-center")}>{item?.rank ? item.rank : "-"}</div>;
			const validatorDataCell = item?.moniker ? (
				<NavLink className={cx("validator-data-cell", "align-left")} to={`/validators/${item.operator_address}`}>
					<img src={aiIcon} alt='' />
					{item.moniker}
				</NavLink>
			) : (
				<div className={cx("align-left")}>-</div>
			);

			let currentVotingPower = 0;
			let votingPowerDataCell = (
				<div className={cx("voting-power-data-cell", "align-right")}>
					<div>-</div>
					<div>- %</div>
				</div>
			);
			if (item?.voting_power && totalVotingPower > 0) {
				currentVotingPower = parseFloat(item.voting_power);
				votingPowerDataCell = (
					<div className={cx("voting-power-data-cell", "align-right")}>
						<div>{formatInteger(currentVotingPower)}</div>
						<div>{formatPercentage(currentVotingPower / totalVotingPower, 2)}%</div>
					</div>
				);
			}

			const cumulativeShareDataCell = getCumulativeShareCell(previousVotingPower, currentVotingPower, totalVotingPower);
			previousVotingPower += currentVotingPower;
			const uptimeDataCell = <div className={cx("uptime-data-cell", "align-right")}>{item?.uptime ? formatPercentage(item.uptime, 2) + "%" : "-"}</div>;
			const commissionDataCell = (
				<div className={cx("commission-data-cell", "align-right")}>{item?.commission_rate ? formatPercentage(item.commission_rate, 2) + "%" : "-"}</div>
			);

			return [
				rankDataCell, //Rank
				validatorDataCell, //Validator
				votingPowerDataCell, // Voting Power
				cumulativeShareDataCell, // Cumulative Share
				uptimeDataCell, // Uptime
				commissionDataCell, // Commission
			];
		});
	};

	const sortedData = useMemo(() => sortData(data, sortField, sortDirection), [data, sortField, sortDirection]);
	const dataRows = useMemo(() => getDataRows(sortedData), [sortedData]);
	if (isDesktop) {
		return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerCellStyles} headerCells={headerCells} dataRows={dataRows} />;
	}
	return <ValidatorTableMobile data={dataRows} />;
});

export default ValidatorTable;
