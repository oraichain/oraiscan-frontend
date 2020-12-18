import React, {memo} from "react";
import classNames from "classnames/bind";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {InputBase} from "@material-ui/core";
import {tableThemes} from "src/constants/tableThemes";
import SearchIcon from "src/assets/common/search-icon.svg";
import Pagination from "../Pagination";
import ThemedTable from "../ThemedTable";
import styles from "../ThemedTable/ThemedTable.scss";
import styleTableWithPagination from "./TableWithPagination.scss";

const cx = classNames.bind(styles);
const cxTableWithPagination = classNames.bind(styleTableWithPagination);

const TableWithPagination = memo(({theme = tableThemes.LIGHT, headerCells, dataRows, pages, onPageChange, isActiveSearch}) => {
	const [value, setValue] = React.useState("");
	const onChange = React.useCallback(e => {
		setValue(e.target.value);
	}, []);

	const clickSearch = React.useCallback(e => {
		e.preventDefault();
		setValue("");
	}, []);

	const renderInputBase = React.useMemo(
		() => (
			<div className={cxTableWithPagination("search")}>
				<InputBase className={cxTableWithPagination("input")} placeholder='Search data sources' onChange={onChange} value={value} />
				<button className={cxTableWithPagination("searchBtn")} onClick={clickSearch}>
					<img className={cxTableWithPagination("searchIcon")} src={SearchIcon} alt={"search"} />
				</button>
			</div>
		),
		[onChange, clickSearch, value]
	);

	return (
		<>
			{isActiveSearch && renderInputBase}

			<ThemedTable customClassNames={cxTableWithPagination("table-data-source")} theme={theme} headerCells={headerCells} dataRows={dataRows} />

			<Pagination pages={pages} onChange={(e, page) => onPageChange(page)} />
		</>
	);
});

TableWithPagination.defaultProps = {
	isActiveSearch: true,
};

export default TableWithPagination;
