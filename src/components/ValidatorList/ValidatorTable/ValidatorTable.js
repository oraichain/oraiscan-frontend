/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import {Tooltip} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
import classNames from "classnames/bind";
import {_} from "src/lib/scripts";
import {tableThemes} from "src/constants/tableThemes";
import {sortDirections} from "src/constants/sortDirections";
import consts from "src/constants/consts";
import {formatPercentage, formatInteger} from "src/helpers/helper";
import {compareTwoValues} from "src/helpers/compare";
import Delegate from "src/components/common/Delegate";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./ValidatorTable.scss";
import sortNoneIcon from "src/assets/common/sort_none_ic.svg";
import sortAscIcon from "src/assets/common/sort_asc_ic.svg";
import sortDescIcon from "src/assets/common/sort_desc_ic.svg";
import aiIcon from "src/assets/common/ai_ic.svg";
import rikkeiLogo from "src/assets/validators/rikkeiLogo.png";
import kadiaChain from "src/assets/validators/kardia.png";
import {css} from "highcharts";
import {logoBrand} from "src/constants/logoBrand";
import {Progress} from "antd";
import "./style.css";

const cx = classNames.bind(styles);

const sortFields = {
	RANK: "rank",
	VALIDATOR: "moniker",
	VOTING_POWER: "voting_power",
	UPTIME: "uptime",
	COMMISSION: "commission_rate",
};

export const computeTotalVotingPower = data => {
	if (!data || !Array.isArray(data)) {
		return 0;
	}

	let total = 0;
	for (let item of data) {
		total += parseFloat(item?.voting_power ?? 0);
	}
	return total;
};

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

const toggleDirection = direction => {
	if (direction === sortDirections.ASC) {
		return sortDirections.DESC;
	} else {
		return sortDirections.ASC;
	}
};

const ValidatorTable = memo(({data = []}) => {
	const [sortField, setSortField] = useState(sortFields.RANK);
	const [sortDirection, setSortDirection] = useState(sortDirections.ASC);

	const totalVotingPower = useMemo(() => computeTotalVotingPower(data), [data]);

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

	const sortBy = field => {
		if (field === sortField) {
			setSortDirection(toggleDirection(sortDirection));
		} else {
			setSortDirection(sortDirections.ASC);
		}
		setSortField(field);
	};

	const getHeaderRow = () => {
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

		const EstAPRCell = (
			<div className={cx("header-cell", "align-right")}>
				Est APR
				<Tooltip title='The APR is calculated assuming the node uptime is 100%.' className={cx("tooltip-header-cell")}>
					<QuestionCircleOutlined />
				</Tooltip>
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
			EstAPRCell,
			delegateHeaderCell,
		];
		const headerCellStyles = [
			{width: "40px"}, // Rank
			{minWidth: "180px"}, // Validator
			{width: "160px"}, // Voting Power
			{width: "240px"}, // Cumulative Share
			{width: "110px"}, // Uptime
			{width: "140px"}, // Commission
			{width: "110px"}, // EstAPRCell
			{width: "80px"}, // Delegate
		];
		return {
			headerCells,
			headerCellStyles,
		};
	};

	const sortData = (data, extraSortField = sortFields.RANK) => {
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

		if (!data) {
			return null;
		}

		let previousVotingPower = 0;

		return data.map(item => {
			const rankDataCell = <div className={cx("rank-data-cell", "align-center")}>{item?.rank ?? "-"}</div>;
			const validatorDataCell = item?.moniker ? (
				<NavLink className={cx("validator-data-cell", "align-left")} to={`${consts.PATH.VALIDATORS}/${item.operator_address}`}>
					<div className={cx("logo-brand")}>
						<img src={logoBrand.filter(it => item.operator_address === it.operatorAddress)[0]?.logo} width={32} height={32} className={cx("logo")} />
						<div className={cx("brand")}>{item.moniker}</div>
					</div>
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
			const uptimeDataCell = (
				<div className={cx("uptime-data-cell", "align-right")}>
					<div>{item?.uptime ? formatPercentage(item.uptime, 2) + "%" : "-"}</div>
					<div>
						{item?.uptime && (
							<Progress
								percent={formatPercentage(item.uptime, 2)}
								showInfo={false}
								strokeColor={formatPercentage(item.uptime, 2) == 100 ? "#52c41a" : "#1890ff"}
								trailColor='#bfbfbf'
							/>
						)}
					</div>
				</div>
			);

			const commissionDataCell = (
				<div className={cx("commission-data-cell", "align-right")}>{item?.commission_rate ? formatPercentage(item.commission_rate, 2) + "%" : "-"}</div>
			);

			const estAPRnDataCell = (
				<div className={cx("commission-data-cell", "align-right")}>{(29 * (1 - parseFloat(item?.commission_rate || 0))).toFixed(2)} %</div>
			);

			const delegateDataCell = (
				<div className={cx("commission-data-cell", "align-center")}>
					<Delegate operatorAddress={item.operator_address} openButtonText='Delegate' />
				</div>
			);

			return [
				rankDataCell, //Rank
				validatorDataCell, //Validator
				votingPowerDataCell, // Voting Power
				cumulativeShareDataCell, // Cumulative Share
				uptimeDataCell, // Uptime
				commissionDataCell, // Commission
				estAPRnDataCell, // estAPRnDataCell
				delegateDataCell, // Delegate
			];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), [sortField, sortDirection]);
	const sortedData = useMemo(() => sortData(data), [data, sortField, sortDirection]);
	const dataRows = useMemo(() => getDataRows(sortedData), [sortedData]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default ValidatorTable;
