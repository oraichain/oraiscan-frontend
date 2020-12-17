import React, {memo} from "react";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import TableWithPagination from "src/components/common/TableWithPagination";
import styles from "./DataSourceTable.scss";

const headerCells = ["Data Source", "Description", "Fee", "Requests", "Timestamp"];
const DataSourceTable = memo(({dataRows, pages, onPageChange}) => {
	console.log(dataRows);
	return <TableWithPagination theme={tableThemes.LIGHT} headerCells={headerCells} dataRows={dataRows} pages={pages} onPageChange={onPageChange} />;
});

DataSourceTable.defaultProps = {};

export default DataSourceTable;
