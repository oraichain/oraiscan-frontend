import React, {memo} from "react";
import {useHistory} from "react-router-dom";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import Address from "src/components/common/Address";
import TableWithPagination from "src/components/common/TableWithPagination";
import styles from "./DataSourceTable.scss";

const cx = classNames.bind(styles);

const headerCells = ["Data Source", "Description", "Fee", "Requests", "Owner"];
const headerCellStyles = [{}, {}, {width: "150px", textAlign: "right"}, {textAlign: "right"}, {textAlign: "right"}];
const DataSourceTable = memo(({dataSources, pages, onPageChange, handleSearch}) => {
	const history = useHistory();
	const dataRows = dataSources.map(({name, code, description, owner, fees, requests}) => {
		const nameCell = (
			<div>
				<a
					href='code'
					onClick={e => {
						e.preventDefault();
						history.push(`/data-sources/${name}`);
					}}
					className={cx("table-link")}>
					{" "}
					{name}
				</a>
			</div>
		);
		const ownerCell = (
			<div>
				{" "}
				<Address address={owner} link={`/account/${owner}`} size='sm' showCopyIcon={false} />
			</div>
		);

		const feeCell = fees.map(({amount, denom}) => (
			<>
				{" "}
				<div className={cx("text-right")}> {`${amount} ${denom.toUpperCase()}`} </div> <br />{" "}
			</>
		));

		return [nameCell, description, feeCell, requests, ownerCell];
	});
	return (
		<TableWithPagination
			theme={tableThemes.LIGHT}
			headerCells={headerCells}
			dataRows={dataRows}
			pages={pages}
			onPageChange={onPageChange}
			textSearchPlaceholder='Search data sources'
			handleSearch={handleSearch}
			headerCellStyles={headerCellStyles}
		/>
	);
});

export default DataSourceTable;
