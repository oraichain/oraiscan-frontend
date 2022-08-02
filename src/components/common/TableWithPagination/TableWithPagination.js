import React, {memo, useEffect} from "react";
import classNames from "classnames/bind";
import _ from "lodash";
import {InputBase} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useTheme} from "@material-ui/core/styles";

import {tableThemes} from "src/constants/tableThemes";
import {useDebounce} from "src/hooks";
import SearchIcon from "src/assets/common/search-icon.svg";

import DataSourceTableMobile from "./DataSourceTableMobile";
import Pagination from "../Pagination";
import ThemedTable from "../ThemedTable";
import styleTableWithPagination from "./TableWithPagination.module.scss";

const cxTableWithPagination = classNames.bind(styleTableWithPagination);

const TableWithPagination = memo(
	({
		theme = tableThemes.LIGHT,
		headerCells,
		headerCellStyles,
		dataRows,
		pages,
		onPageChange,
		textSearchPlaceholder,
		handleSearch,
		isActiveSearch,
		screenType,
	}) => {
		const [value, setValue] = React.useState(null);
		const themeHook = useTheme();
		const isDesktop = useMediaQuery(themeHook.breakpoints.up("lg"));
		const valueDebounce = useDebounce(value, 500);
		const onChange = React.useCallback(e => {
			setValue(e.target.value);
		}, []);

		const clickSearch = React.useCallback(
			e => {
				e.preventDefault();
				handleSearch && handleSearch(value);
			},
			[handleSearch, value]
		);

		const onKeyDown = React.useCallback(
			e => {
				if (e.keyCode === 13) {
					handleSearch && handleSearch(value);
				}
			},
			[handleSearch, value]
		);

		useEffect(() => {
			!_.isNil(valueDebounce) && handleSearch && handleSearch(valueDebounce);
		}, [handleSearch, valueDebounce]);

		const renderInputBase = React.useMemo(
			() => (
				<div className={cxTableWithPagination("search")}>
					<InputBase
						className={cxTableWithPagination("input")}
						placeholder={textSearchPlaceholder || "Search ... "}
						onChange={onChange}
						onKeyDown={onKeyDown}
						value={value}
					/>
					<button className={cxTableWithPagination("searchBtn")} onClick={clickSearch}>
						<img className={cxTableWithPagination("searchIcon")} src={SearchIcon} alt={"search"} />
					</button>
				</div>
			),
			[textSearchPlaceholder, onChange, onKeyDown, value, clickSearch]
		);

		const renderTableMobile = () => {
			if (screenType === "data-source") {
				return <DataSourceTableMobile data={dataRows} />;
			}
			return null;
		};

		return (
			<>
				{handleSearch && renderInputBase}

				{isDesktop ? (
					<ThemedTable
						customClassNames={cxTableWithPagination("table-data-source")}
						theme={theme}
						headerCells={headerCells}
						headerCellStyles={headerCellStyles}
						dataRows={dataRows}
					/>
				) : (
					renderTableMobile()
				)}

				{isDesktop && <Pagination pages={pages} onChange={(e, page) => onPageChange(page)} />}
			</>
		);
	}
);

TableWithPagination.defaultProps = {
	isActiveSearch: true,
};

export default TableWithPagination;
