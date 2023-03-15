/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import {isNil} from "lodash-es";
import {_} from "src/lib/scripts";
import consts from "src/constants/consts";
import {formatDateTime, formatOrai} from "src/helpers/helper";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import {setAgoTime} from "src/lib/scripts";

import PassedIcon from "src/icons/Proposals/PassedIcon";
import DepositPeriodIcon from "src/icons/Proposals/DepositPeriodIcon";
import FailedIcon from "src/icons/Proposals/FailedIcon";
import RejectedIcon from "src/icons/Proposals/RejectedIcon";
import UnspecifiedIcon from "src/icons/Proposals/UnspecifiedIcon";
import VotingPeriodIcon from "src/icons/Proposals/VotingPeriodIcon";
import styles from "./ProposalsTable.module.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const idHeaderCell = <div className={cx("header-cell", "align-left")}>#ID</div>;
	const titleHeaderCell = <div className={cx("header-cell", "align-left")}>Title</div>;
	const statusHeaderCell = <div className={cx("header-cell", "align-center")}>Status</div>;
	const votingStartHeaderCell = <div className={cx("header-cell", "align-left")}>Voting Start</div>;
	const submitTimeHeaderCell = <div className={cx("header-cell", "align-left")}>Submit Time</div>;
	const totalDepositHeaderCell = <div className={cx("header-cell", "align-left")}>Total Deposit</div>;
	const voteHeaderCell = <div className={cx("header-cell", "align-right")}>Vote</div>;
	const headerCells = [idHeaderCell, titleHeaderCell, statusHeaderCell, votingStartHeaderCell, submitTimeHeaderCell, totalDepositHeaderCell, voteHeaderCell];
	const headerCellStyles = [
		{width: "5%"}, // ID
		{width: "27.5%"}, // Title
		{width: "10.8%"}, // Status
		{width: "19.4%"}, // Voting Start
		{width: "19.4%"}, // Submit Time
		{width: "11.9%"}, // Total Deposit
		{width: "6%"}, // Vote
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const ProposalsTable = memo(({data = [], type = null}) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		console.log('data', data)

		return data.map(item => {
			const idDataCell = _.isNil(item?.proposal_id) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("id-data-cell", "align-left")}>#{item.proposal_id}</div>
			);

			const titleDataCell = _.isNil(item?.title) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink
					className={cx("title-data-cell", "align-left")}
					to={`${consts.PATH.PROPOSALS}/${item?.proposal_id ?? 0}${!isNil(type) ? "?type=" + type : ""}`}>
					{item.title}
				</NavLink>
			);

			let statusStateClassName;
			let statusIcon;
			let statusText;

			switch (item?.status) {
				case "PROPOSAL_STATUS_PASSED":
					statusStateClassName = "status-passed";
					statusIcon = <PassedIcon className={cx("status-icon-passed")}></PassedIcon>;
					statusText = "Passed";
					break;
				case "PROPOSAL_STATUS_REJECTED":
					statusStateClassName = "status-rejected";
					statusIcon = <RejectedIcon className={cx("status-icon-rejected")}></RejectedIcon>;
					statusText = "Rejected";
					break;
				case "PROPOSAL_STATUS_FAILED":
					statusStateClassName = "status-failed";
					statusIcon = <FailedIcon className={cx("status-icon-failed")}></FailedIcon>;
					statusText = "Failed";
					break;
				case "PROPOSAL_STATUS_DEPOSIT_PERIOD":
					statusStateClassName = "status-deposit-period";
					statusIcon = <DepositPeriodIcon className={cx("status-icon-deposit-period")}></DepositPeriodIcon>;
					statusText = "Deposit Period";
					break;
				case "PROPOSAL_STATUS_VOTING_PERIOD":
					statusStateClassName = "status-voting-period";
					statusIcon = <VotingPeriodIcon className={cx("status-icon-voting-period")}></VotingPeriodIcon>;
					statusText = "Voting Period";
					break;
				case "PROPOSAL_STATUS_REJECTED":
					statusStateClassName = "status-unspecified";
					statusIcon = <UnspecifiedIcon className={cx("status-icon-unspecified")}></UnspecifiedIcon>;
					statusText = "Unspecified";
					break;
				default:
					break;
			}

			const statusDataCell = _.isNil(item?.status) ? (
				<div className={cx("align-center")}>-</div>
			) : (
				<div className={cx("status-data-cell", "align-left")}>
					<div className={cx("status", statusStateClassName)}>
						{statusIcon}
						<span className={cx("status-text")}>{statusText}</span>
					</div>
				</div>
			);

			const votingStartDataCell =
				_.isNil(item?.voting_start_time) || item.status === "PROPOSAL_STATUS_DEPOSIT_PERIOD" ? (
					<div >-</div>
				) : (
					<div className={cx("voting-start-data-cell")}>
						{" "}
						{setAgoTime(item.voting_start_time)} <br /> ({formatDateTime(item.voting_start_time)} )
					</div>
				);

			const submitTimeDataCell = _.isNil(item?.submit_time) ? (
				<div>-</div>
			) : (
				<div className={cx("submit-time-data-cell")}>
					{" "}
					{setAgoTime(item.submit_time)} <br /> ({formatDateTime(item.submit_time)})
				</div>
			);

			const totalDepositDataCell = _.isNil(item?.total_deposit) ? (
				<div>-</div>
			) : (
				<div className={cx("total-deposit-data-cell")}>
					<div className={cx("amount")}>
						<span className={cx("amount-value")}>{formatOrai(item.total_deposit)}</span>
						<div className={cx("amount-denom")}>ORAI</div>
					</div>
				</div>
			);

			const voteDataCell = _.isNil(item.yes_percentage) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("total-deposit-data-cell", "align-right")}>
					<div className={cx("amount")}>
						<span className={cx("amount-value")}>YES</span>
						<span className={cx("amount-denom")}>{item.yes_percentage}%</span>
					</div>
				</div>
			);
			return [idDataCell, titleDataCell, statusDataCell, votingStartDataCell, submitTimeDataCell, totalDepositDataCell, voteDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default ProposalsTable;
