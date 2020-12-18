import React, {memo} from "react";
import {useHistory} from "react-router-dom";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import TableWithPagination from "src/components/common/TableWithPagination";
import styles from "./DataSourceTable.scss";

const cx = classNames.bind(styles);

const headerCells = ["Data Source", "Description", "Fee", "Requests", "Owner"];
const DataSourceTable = memo(({dataSources, pages, onPageChange, handleSearch}) => {
	const history = useHistory();
	const dataRows = dataSources.map(({name, code, description, owner, fee, requests}) => {
		const nameCell = (
			<div>
				<a
					href='code'
					onClick={e => {
						e.preventDefault();
						history.push(`/data-source/${code}`);
					}}
					className={cx("table-link")}>
					{" "}
					{name}
				</a>
			</div>
		);
		const ownerCell = (
			<div>
				<a
					href='code'
					onClick={e => {
						e.preventDefault();
						history.push(`/account/${owner}`);
					}}
					className={cx("table-link")}>
					{" "}
					{owner}
				</a>
			</div>
		);

		return [nameCell, description, fee, requests, ownerCell];
	});
	return (
		<TableWithPagination
			theme={tableThemes.LIGHT}
			headerCells={headerCells}
			dataRows={dataRows}
			pages={pages}
			onPageChange={onPageChange}
			handleSearch={handleSearch}
		/>
	);
});

export default DataSourceTable;
