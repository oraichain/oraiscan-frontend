import React, {memo} from "react";
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
		const requestCell = <div className={cx("request-cell")}>{request}</div>;
		return [requestCell, oracleScript, reportStatus, status, owner];
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
