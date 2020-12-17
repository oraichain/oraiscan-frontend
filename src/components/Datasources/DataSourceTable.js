import React, {memo} from "react";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import TableWithPagination from "src/components/common/TableWithPagination";
import styles from "./DataSourceTable.scss";

const cx = classNames.bind(styles);
const headerCells = ["Rank", "Validator", "Voting power", "Cumulative Share", "Uptime", "Commission"];
const DataSourceTable = memo(({dataRows, pages, onPageChange}) => {
	console.log(dataRows);
	return <TableWithPagination theme={tableThemes.LIGHT} headerCells={headerCells} dataRows={dataRows} pages={pages} onPageChange={onPageChange} />;
});

DataSourceTable.defaultProps = {};

export default DataSourceTable;
