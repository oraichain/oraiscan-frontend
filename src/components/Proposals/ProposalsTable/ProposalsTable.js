/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import {_} from "src/lib/scripts";
import consts from "src/constants/consts";
import {formatDateTime, formatOrai} from "src/helpers/helper";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./ProposalsTable.scss";
import passedIcon from "src/assets/proposals/passed.svg";
import rejectedIcon from "src/assets/proposals/rejected.svg";
import unspecifiedIcon from "src/assets/proposals/unspecified.svg";
import votingPeriodIcon from "src/assets/proposals/voting_period.svg";
import depositPeriodIcon from "src/assets/proposals/deposit_period.svg";
import failedIcon from "src/assets/proposals/fail.svg";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const idHeaderCell = <div className={cx("header-cell", "align-left")}>#ID</div>;
	const titleHeaderCell = <div className={cx("header-cell", "align-left")}>Title</div>;
	const statusHeaderCell = <div className={cx("header-cell", "align-center")}>Status</div>;
	const votingStartHeaderCell = <div className={cx("header-cell", "align-right")}>Voting Start</div>;
	const submitTimeHeaderCell = <div className={cx("header-cell", "align-right")}>Submit Time</div>;
	const totalDepositHeaderCell = <div className={cx("header-cell", "align-right")}>Total Deposit</div>;
	const headerCells = [idHeaderCell, titleHeaderCell, statusHeaderCell, votingStartHeaderCell, submitTimeHeaderCell, totalDepositHeaderCell];
	const headerCellStyles = [
		{width: "auto"}, // ID
		{width: "auto"}, // Title
		{width: "auto"}, // Status
		{width: "auto"}, // Voting Start
		{width: "auto"}, // Submit Time
		{width: "auto"}, // Total Deposit
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const ProposalsTable = memo(({data = []}) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const idDataCell = _.isNil(item?.proposal_id) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("id-data-cell", "align-left")}>#{item.proposal_id}</div>
			);

			const titleDataCell = _.isNil(item?.title) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("title-data-cell", "align-left")} to={`${consts.PATH.PROPOSALS}/${item?.proposal_id ?? 0}`}>
					{item.title}
				</NavLink>
			);

			let statusStateClassName;
			let statusIcon;
			let statusText;

			switch (item?.status) {
				case "PROPOSAL_STATUS_PASSED":
					statusStateClassName = "status-passed";
					statusIcon = passedIcon;
					statusText = "Passed";
					break;
				case "PROPOSAL_STATUS_REJECTED":
					statusStateClassName = "status-rejected";
					statusIcon = rejectedIcon;
					statusText = "Rejected";
					break;
				case "PROPOSAL_STATUS_FAILED":
					statusStateClassName = "status-failed";
					statusIcon = failedIcon;
					statusText = "Failed";
					break;
				case "PROPOSAL_STATUS_DEPOSIT_PERIOD":
					statusStateClassName = "status-deposit-period";
					statusIcon = depositPeriodIcon;
					statusText = "Deposit Period";
					break;
				case "PROPOSAL_STATUS_VOTING_PERIOD":
					statusStateClassName = "status-voting-period";
					statusIcon = votingPeriodIcon;
					statusText = "Voting Period";
					break;
				case "PROPOSAL_STATUS_REJECTED":
					statusStateClassName = "status-unspecified";
					statusIcon = unspecifiedIcon;
					statusText = "Unspecified";
					break;
				default:
					break;
			}

			const statusDataCell = _.isNil(item?.status) ? (
				<div className={cx("align-center")}>-</div>
			) : (
				<div className={cx("status-data-cell", "align-center")}>
					<div className={cx("status", statusStateClassName)}>
						<img className={cx("status-icon")} src={statusIcon} alt='' />
						<span className={cx("status-text")}>{statusText}</span>
					</div>
				</div>
			);

			const votingStartDataCell = _.isNil(item?.voting_start_time) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("voting-start-data-cell", "align-right")}>{formatDateTime(item.voting_start_time)}</div>
			);

			const submitTimeDataCell = _.isNil(item?.submit_time) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("submit-time-data-cell", "align-right")}>{formatDateTime(item.submit_time)}</div>
			);

			const totalDepositDataCell = _.isNil(item?.total_deposit) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("total-deposit-data-cell", "align-right")}>
					<div className={cx("amount")}>
						<span className={cx("amount-value")}>{formatOrai(item.total_deposit)}</span>
						<span className={cx("amount-denom")}>ORAI</span>
					</div>
				</div>
			);
			return [idDataCell, titleDataCell, statusDataCell, votingStartDataCell, submitTimeDataCell, totalDepositDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default ProposalsTable;
