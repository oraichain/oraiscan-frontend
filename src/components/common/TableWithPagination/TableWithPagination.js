import React, {memo, useEffect} from "react";
import classNames from "classnames/bind";
import _ from "lodash";

import {InputBase} from "@material-ui/core";
import {tableThemes} from "src/constants/tableThemes";
import {useDebounce} from "src/hooks";
import SearchIcon from "src/assets/common/search-icon.svg";
import Pagination from "../Pagination";
import ThemedTable from "../ThemedTable";
import styleTableWithPagination from "./TableWithPagination.scss";

const cxTableWithPagination = classNames.bind(styleTableWithPagination);

const TableWithPagination = memo(({theme = tableThemes.LIGHT, headerCells, dataRows, pages, onPageChange, handleSearch}) => {
	const [value, setValue] = React.useState(null);
	const valueDebounce = useDebounce(value, 500);
	const onChange = React.useCallback(e => {
		setValue(e.target.value);
	}, []);

	const clickSearch = React.useCallback(
		e => {
			e.preventDefault();
			handleSearch(value);
		},
		[handleSearch, value]
	);

	const onKeyDown = React.useCallback(
		e => {
			if (e.keyCode === 13) {
				handleSearch(value);
			}
		},
		[handleSearch, value]
	);

	useEffect(() => {
		!_.isNil(valueDebounce) && handleSearch(valueDebounce);
	}, [handleSearch, valueDebounce]);

	const renderInputBase = React.useMemo(
		() => (
			<div className={cxTableWithPagination("search")}>
				<InputBase className={cxTableWithPagination("input")} placeholder='Search data sources' onChange={onChange} onKeyDown={onKeyDown} value={value} />
				<button className={cxTableWithPagination("searchBtn")} onClick={clickSearch}>
					<img className={cxTableWithPagination("searchIcon")} src={SearchIcon} alt={"search"} />
				</button>
			</div>
		),
		[onChange, onKeyDown, value, clickSearch]
	);

	return (
		<>
			{renderInputBase}
			<ThemedTable customClassNames={cxTableWithPagination("table-data-source")} theme={theme} headerCells={headerCells} dataRows={dataRows} />
			<Pagination pages={pages} onChange={(e, page) => onPageChange(page)} />
		</>
	);
});

export default TableWithPagination;
