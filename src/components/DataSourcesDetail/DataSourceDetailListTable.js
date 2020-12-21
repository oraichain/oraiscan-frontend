import React, {memo, useState} from "react";
import {useHistory} from "react-router-dom";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import TableWithPagination from "src/components/common/TableWithPagination";
import styles from "./DataSourceDetailListTable.scss";

const cx = classNames.bind(styles);
const headerCells = ["Requests", "Oracle Script", "Report Status", "Status", "Owner"];
const DataSourceDetailListTable = memo(({dataSources, pages, onPageChange}) => {
	const history = useHistory();

	const dataRows = dataSources.map(({request, oracleScript, reportStatus, status, owner}) => {
		const [isFull, setFull] = useState(false);
		const [percent, setPercent] = useState(70);
		const [isSuccess, setSuccess] = useState(false);
		const requestCell = <div className={cx("request-cell")}>{request}</div>;
		const oracleScriptCell = (
			<div className={cx("oracle-script")}>
				<span>{oracleScript}</span>
				{oracleScript}
			</div>
		);
		const reportStatusCell = (
			<div className={cx("report-status")}>
				<div className={cx("report-status__title")}>
					<span>Min 10</span>
					<span>16 of 16</span>
				</div>
				{isFull && <div className={cx("report-status__progress-bar")}></div>}
				{!isFull && (
					<div
						className={cx("report-status__progress-bar", "report-status__progress-bar--not-full")}
						style={{
							width: `${percent}%`,
						}}></div>
				)}
			</div>
		);
		const statusCell = isSuccess ? (
			<div className={cx("status")}>
				<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M15.5917 6.00822C15.5142 5.93011 15.4221 5.86811 15.3205 5.82581C15.219 5.7835 15.11 5.76172 15 5.76172C14.89 5.76172 14.7811 5.7835 14.6796 5.82581C14.578 5.86811 14.4858 5.93011 14.4084 6.00822L8.20004 12.2249L5.59171 9.60822C5.51127 9.53052 5.41632 9.46942 5.31227 9.42842C5.20823 9.38742 5.09713 9.36731 4.98531 9.36924C4.87349 9.37118 4.76315 9.39512 4.66058 9.4397C4.55802 9.48427 4.46524 9.54862 4.38754 9.62905C4.30984 9.70949 4.24875 9.80444 4.20774 9.90848C4.16674 10.0125 4.14663 10.1236 4.14856 10.2354C4.1505 10.3473 4.17444 10.4576 4.21902 10.5602C4.2636 10.6627 4.32794 10.7555 4.40837 10.8332L7.60837 14.0332C7.68584 14.1113 7.77801 14.1733 7.87956 14.2156C7.98111 14.2579 8.09003 14.2797 8.20004 14.2797C8.31005 14.2797 8.41897 14.2579 8.52052 14.2156C8.62207 14.1733 8.71424 14.1113 8.79171 14.0332L15.5917 7.23322C15.6763 7.15518 15.7438 7.06047 15.79 6.95506C15.8361 6.84964 15.86 6.7358 15.86 6.62072C15.86 6.50563 15.8361 6.3918 15.79 6.28638C15.7438 6.18096 15.6763 6.08625 15.5917 6.00822Z'
						fill='#3FCC28'
					/>
				</svg>

				<span>Success</span>
			</div>
		) : (
			<div className={cx("status")}>
				<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M12.5003 9.16675H10.8337V5.83342C10.8337 5.6124 10.7459 5.40044 10.5896 5.24416C10.4333 5.08788 10.2213 5.00008 10.0003 5.00008C9.77932 5.00008 9.56735 5.08788 9.41107 5.24416C9.25479 5.40044 9.167 5.6124 9.167 5.83342V10.0001C9.167 10.2211 9.25479 10.4331 9.41107 10.5893C9.56735 10.7456 9.77932 10.8334 10.0003 10.8334H12.5003C12.7213 10.8334 12.9333 10.7456 13.0896 10.5893C13.2459 10.4331 13.3337 10.2211 13.3337 10.0001C13.3337 9.77907 13.2459 9.56711 13.0896 9.41083C12.9333 9.25455 12.7213 9.16675 12.5003 9.16675ZM10.0003 1.66675C8.35215 1.66675 6.74099 2.15549 5.37058 3.07117C4.00017 3.98685 2.93206 5.28834 2.30133 6.81105C1.6706 8.33377 1.50558 10.0093 1.82712 11.6258C2.14866 13.2423 2.94234 14.7272 4.10777 15.8926C5.27321 17.0581 6.75807 17.8517 8.37458 18.1733C9.99109 18.4948 11.6666 18.3298 13.1894 17.6991C14.7121 17.0683 16.0136 16.0002 16.9292 14.6298C17.8449 13.2594 18.3337 11.6483 18.3337 10.0001C18.3337 8.90573 18.1181 7.8221 17.6993 6.81105C17.2805 5.80001 16.6667 4.88135 15.8929 4.10752C15.1191 3.3337 14.2004 2.71987 13.1894 2.30109C12.1783 1.8823 11.0947 1.66675 10.0003 1.66675ZM10.0003 16.6667C8.68179 16.6667 7.39286 16.2758 6.29653 15.5432C5.2002 14.8107 4.34572 13.7695 3.84113 12.5513C3.33655 11.3331 3.20453 9.99269 3.46176 8.69948C3.719 7.40627 4.35393 6.21839 5.28628 5.28604C6.21863 4.35369 7.40652 3.71875 8.69973 3.46151C9.99293 3.20428 11.3334 3.3363 12.5516 3.84088C13.7697 4.34547 14.8109 5.19995 15.5435 6.29628C16.276 7.39261 16.667 8.68154 16.667 10.0001C16.667 11.7682 15.9646 13.4639 14.7144 14.7141C13.4641 15.9644 11.7684 16.6667 10.0003 16.6667Z'
						fill='#FFAE74'
					/>
				</svg>

				<span>Pending</span>
			</div>
		);
		const ownerCell = <div className={cx("owner")}>{owner}</div>;
		return [requestCell, oracleScriptCell, reportStatusCell, statusCell, ownerCell];
	});

	return (
		<div className={cx("container")}>
			<div className={cx("head-table")}>
				<div className={cx("request")}>
					<strong>Request</strong>
					<span>(186,194)</span>
				</div>

				<button>
					Get Code
					<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M7.84467 4.03033C7.55178 3.73744 7.55178 3.26256 7.84467 2.96967C8.13756 2.67678 8.61244 2.67678 8.90533 2.96967L13.4053 7.46967C13.6982 7.76256 13.6982 8.23744 13.4053 8.53033L8.90533 13.0303C8.61244 13.3232 8.13756 13.3232 7.84467 13.0303C7.55178 12.7374 7.55178 12.2626 7.84467 11.9697L11.0643 8.75H3.125C2.71079 8.75 2.375 8.41421 2.375 8C2.375 7.58579 2.71079 7.25 3.125 7.25H11.0643L7.84467 4.03033Z'
							fill='#1B57F0'
						/>
					</svg>
				</button>
			</div>
			<TableWithPagination
				theme={tableThemes.LIGHT}
				headerCells={headerCells}
				dataRows={dataRows}
				pages={pages}
				onPageChange={onPageChange}
				isActiveSearch={false}
			/>
		</div>
	);
});

DataSourceDetailListTable.defaultProps = {
	dataSources: [
		{
			request: "xxx",
			oracleScript: "xxx",
			reportStatus: "xxx",
			status: "xxx",
			owner: "xxx",
		},
		{
			request: "xxx",
			oracleScript: "xxx",
			reportStatus: "xxx",
			status: "xxx",
			owner: "xxx",
		},
		{
			request: "xxx",
			oracleScript: "xxx",
			reportStatus: "xxx",
			status: "xxx",
			owner: "xxx",
		},
		{
			request: "xxx",
			oracleScript: "xxx",
			reportStatus: "xxx",
			status: "xxx",
			owner: "xxx",
		},
		{
			request: "xxx",
			oracleScript: "xxx",
			reportStatus: "xxx",
			status: "xxx",
			owner: "xxx",
		},
	],
};

export default DataSourceDetailListTable;
