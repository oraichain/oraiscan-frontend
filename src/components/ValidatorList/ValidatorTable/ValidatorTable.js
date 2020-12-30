/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {tableThemes} from "src/constants/tableThemes";
import {formatPercentage, formatInteger, formatFloat} from "src/helpers/helper";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./ValidatorTable.scss";
import sortIcon from "src/assets/common/sort_ic.svg";
import aiIcon from "src/assets/common/ai_ic.svg";

const ValidatorTable = memo(({data = []}) => {
	const cx = classNames.bind(styles);

	const [sortField, setSortField] = useState("voting_power");
	const [sortDirection, setSortDirection] = useState("desc");

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

	const rankHeaderCell = <div className={cx("rank-header-cell")}>Rank</div>;
	const validatorHeaderCell = (
		<div className={cx("validator-header-cell")}>
			Validator
			<button type='button' className={cx("sort-button")} onClick={() => {}}>
				<img src={sortIcon} />
			</button>
		</div>
	);
	const votingPowerHeaderCell = (
		<div className={cx("voting-power-header-cell")}>
			Voting power
			<button type='button' className={cx("sort-button")} onClick={() => {}}>
				<img src={sortIcon} />
			</button>
		</div>
	);
	const cumulativeShareHeaderCell = <div className={cx("cumulative-share-header-cell")}>Cumulative Share %</div>;
	const uptimeHeaderCell = (
		<div className={cx("uptime-header-cell")}>
			Uptime
			<button type='button' className={cx("sort-button")} onClick={() => {}}>
				<img src={sortIcon} />
			</button>
		</div>
	);
	const commissionHeaderCell = (
		<div className={cx("commission-header-cell")}>
			Commission
			<button type='button' className={cx("sort-button")} onClick={() => {}}>
				<img src={sortIcon} />
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
		{width: "145px"}, // Voting Power
		{width: "250px"}, // Cumulative Share
		{width: "180px"}, // Uptime
		{width: "150px"}, // Commission
	];

	const sortData = (data, sortField, sortDirection, extraSortField = "id") => {
		if (!data) {
			return [];
		}

		return [...data].sort(function(a, b) {
			if (parseFloat(b[sortField]) === parseFloat(a[sortField])) {
				if (sortDirection === "asc") {
					return parseFloat(a[extraSortField]) - parseFloat(b[extraSortField]);
				}
				return parseFloat(b[extraSortField]) - parseFloat(a[extraSortField]);
			}

			if (sortDirection === "asc") {
				return parseFloat(a[sortField]) - parseFloat(b[sortField]);
			}
			return parseFloat(b[sortField]) - parseFloat(a[sortField]);
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
		return data.map((item, index) => {
			const rankDataCell = <div className={cx("rank-data-cell")}>{index + 1}</div>;
			const validatorDataCell = item?.moniker ? (
				<NavLink className={cx("validator-data-cell")} to={`/validators/${item.operator_address}`}>
					<img src={aiIcon} alt='' />
					{item.moniker}
				</NavLink>
			) : (
				"-"
			);

			let currentVotingPower = 0;
			let votingPowerDataCell = (
				<div className={cx("voting-power-data-cell")}>
					<div>-</div>
					<div>- %</div>
				</div>
			);
			if (item?.voting_power && totalVotingPower > 0) {
				currentVotingPower = parseFloat(item.voting_power);
				votingPowerDataCell = (
					<div className={cx("voting-power-data-cell")}>
						<div>{formatInteger(currentVotingPower)}</div>
						<div>{formatPercentage(currentVotingPower / totalVotingPower, 2)}%</div>
					</div>
				);
			}

			const cumulativeShareDataCell = getCumulativeShareCell(previousVotingPower, currentVotingPower, totalVotingPower);
			previousVotingPower += currentVotingPower;
			const uptimeDataCell = <div className={cx("uptime-data-cell")}>{item?.uptime ? formatPercentage(item.uptime, 2) + "%" : "-"}</div>;
			const commissionDataCell = (
				<div className={cx("commission-data-cell")}>{item?.commission_rate ? formatPercentage(item.commission_rate, 2) + "%" : "-"}</div>
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
	return <ThemedTable theme={tableThemes.LIGHT} headerCells={headerCells} dataRows={dataRows} headerCellStyles={headerCellStyles} />;
});

export default ValidatorTable;
