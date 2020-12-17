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
import styles from "../ThemedTable/ThemedTable.scss";
import styleSearch from "./TableWithPagination.scss";

const cx = classNames.bind(styles);
const cxSearch = classNames.bind(styleSearch);

const TableWithPagination = memo(({theme = tableThemes.LIGHT, headerCells, dataRows, pages, onPageChange}) => {
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
			<div className={cxSearch("search")}>
				<InputBase className={cxSearch("input")} placeholder='Search data sources' onChange={onChange} value={value} />
				<button className={cxSearch("searchBtn")} onClick={clickSearch}>
					<img className={cxSearch("searchIcon")} src={SearchIcon} alt={"search"} />
				</button>
			</div>
		),
		[onChange, clickSearch, value]
	);

	return (
		<>
			{renderInputBase}
			<TableContainer className={cx("table-container")}>
				<Table className={cx(theme)}>
					<TableHead>
						<TableRow key='header-row' className={cx("header-row")}>
							{headerCells.map((headerCell, cellIndex) => (
								<TableCell key={"header-cell-" + cellIndex} className={cx("header-cell")}>
									{headerCell}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{dataRows.map((dataRow, rowIndex) => (
							<TableRow key={"data-row-" + rowIndex} className={cx("data-row")}>
								{dataRow.map((dataCell, cellIndex) => (
									<TableCell key={"data-cell-" + rowIndex + "-" + cellIndex} className={cx("data-cell")}>
										{dataCell}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Pagination pages={pages} onChange={(e, page) => onPageChange(page)} />
		</>
	);
});

export default TableWithPagination;
