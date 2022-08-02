// @ts-nocheck
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
import {formatPercentage, formatInteger, formatOrai} from "src/helpers/helper";
import {compareTwoValues} from "src/helpers/compare";
import Delegate from "src/components/common/Delegate";
import ThemedTable from "src/components/common/ThemedTable";
import sortNoneIcon from "src/assets/common/sort_none_ic.svg";
import sortAscIcon from "src/assets/common/sort_asc_ic.svg";
import sortDescIcon from "src/assets/common/sort_desc_ic.svg";
import aiIcon from "src/assets/common/ai_ic.svg";
import {css} from "highcharts";
import {logoBrand} from "src/constants/logoBrand";
import {Progress} from "antd";
import styles from "./ValidatorTable.module.scss";
import "./style.css";

const cx = classNames.bind(styles);

const sortFields = {
	RANK: "rank",
	VALIDATOR: "moniker",
	VOTING_POWER: "voting_power",
	UPTIME: "uptime",
	COMMISSION: "commission_rate",
	SELFBONDED: "self_bonded",
};

export const computeTotalVotingPower = data => {
	if (!data || !Array.isArray(data)) {
		return 0;
	}

	let total = 0;
	for (let item of data) {
		total += parseFloat(item?.voting_power ?? 0) || 0;
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
	const [sortField, setSortField] = useState(sortFields.SELFBONDED);
	const [sortDirection, setSortDirection] = useState(sortDirections.DESC);
	const [canSort, setCanSort] = useState(false);

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
		// trigger can sort to true so the list can be sorted
		if (!canSort) setCanSort(true);
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
		const selfBondedHeaderCell = (
			<div className={cx("header-cell", "align-right")}>
				Self Bonded
				<Tooltip
					style={{paddingLeft: "10px"}}
					title='The self bonded value is the number of tokens this validator self-delegates. A trustworthy validator will have a high self-bonded value'
					className={cx("tooltip-header-cell")}>
					<QuestionCircleOutlined />
				</Tooltip>
				<button
					type='button'
					className={cx("sort-button")}
					onClick={() => {
						sortBy(sortFields.SELFBONDED);
					}}>
					<img src={getSortIcon(sortFields.SELFBONDED)} alt='' />
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
			selfBondedHeaderCell,
			cumulativeShareHeaderCell,
			uptimeHeaderCell,
			commissionHeaderCell,
			EstAPRCell,
			delegateHeaderCell,
		];
		const headerCellStyles = [
			{width: "30px"}, // Rank
			{minWidth: "180px"}, // Validator
			{width: "150px"}, // Voting Power
			{width: "160px"}, // Self Bonded
			{width: "160px"}, // Cumulative Share
			{width: "110px"}, // Uptime
			{width: "140px"}, // Commission
			{width: "110px"}, // EstAPRCell
			{width: "60px"}, // Delegate
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

		if (canSort) {
			return [...data].sort(function(a, b) {
				if (a[sortField] === b[sortField]) {
					return compareTwoValues(a[extraSortField], b[extraSortField], toggleDirection(sortDirection));
				} else {
					return compareTwoValues(a[sortField], b[sortField], sortDirection);
				}
			});
		}
		return data;
	};

	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		let previousVotingPower = 0;

		return data.map(item => {
			// const logoItem = logoBrand.find(it => item.operator_address === it.operatorAddress) || {};
			// const logoURL = logoItem.customLogo ? false : logoItem.logo;
			const logoItem = logoBrand.find(it => it.operatorAddress === item?.operator_address) || {customLogo: ""};
			// const logoURL = logoItem.customLogo ? false : logoItem.logo;
			const logoURL = item?.image ? item.image : logoItem.customLogo ? false : logoItem.logo;
			const logoName = item?.moniker || "";

			const rankDataCell = <div className={cx("rank-data-cell", "align-center")}>{item?.rankCustom ?? "-"}</div>;
			const validatorDataCell = item?.moniker ? (
				<NavLink className={cx("validator-data-cell", "align-left")} to={`${consts.PATH.VALIDATORS}/${item.operator_address}`}>
					<div className={cx("logo-brand")}>
						{logoURL && <img alt='/' src={logoURL} width={32} height={32} className={cx("logo")} />}
						{!logoURL && <div className={cx("logo-custom")}> {logoName.substring(0, 3).toUpperCase()} </div>}
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

			let selfBonded = (
				<div className={cx("voting-power-data-cell", "align-right")}>
					<div>{formatOrai(item?.self_bonded)}</div>
					<div>ORAI</div>
				</div>
			);

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
								strokeColor={formatPercentage(item.uptime, 2) === 100 ? "#37cc6e" : "#7664E4"}
								trailColor='#bfbfbf'
							/>
						)}
					</div>
				</div>
			);

			const commissionDataCell = (
				<div className={cx("commission-data-cell", "align-right")}>{item?.commission_rate ? formatPercentage(item.commission_rate, 2) + "%" : "-"}</div>
			);

			// const estAPR = (29 * (1 - parseFloat(item?.commission_rate || 0))).toFixed(2);
			const estAPR = item?.apr.toFixed(2);

			const estAPRnDataCell = <div className={cx("commission-data-cell", "align-right")}>{estAPR} %</div>;

			const delegateDataCell = (
				<div className={cx("delegate-data-cell", "align-center")}>
					<Delegate
						a={item}
						operatorAddress={item.operator_address}
						openButtonText='Delegate'
						delegateText={`Delegate for "${item?.moniker}"`}
						estAPR={estAPR / 100}
					/>
				</div>
			);

			return [
				rankDataCell, //Rank
				validatorDataCell, //Validator
				votingPowerDataCell, // Voting Power
				selfBonded,
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
