/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo} from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import {_} from "src/lib/scripts";
import {tableThemes} from "src/constants/tableThemes";
import {formatOrai} from "src/helpers/helper";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./DataSourceTable.module.scss";
import consts from "src/constants/consts";
import {NavLink} from "react-router-dom";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const nameHeaderCell = <div className={cx("header-cell", "align-left")}>Language</div>;
	const contractHeaderCell = <div className={cx("header-cell", "align-left")}>Contract</div>;
	const ownerHeaderCell = <div className={cx("header-cell", "align-left")}>Source Code</div>;
	const descriptionHeaderCell = <div className={cx("header-cell", "align-left")}>Parameters</div>;
	const feesHeaderCell = <div className={cx("header-cell", "align-right")}>Fees</div>;
	const headerCells = [nameHeaderCell, contractHeaderCell, ownerHeaderCell, descriptionHeaderCell, feesHeaderCell];
	const headerCellStyles = [
		{width: "auto"}, // Name
		{width: "auto"}, // Contract
		{width: "auto"}, // Owner
		{width: "auto"}, // Description
		{width: "auto"}, // Fees
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const DataSourceTable = memo(({data}) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const nameDataCell = _.isNil(item?.language) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("name-data-cell", "align-left")}>{item?.language}</div>
			);

			const contractDataCell = _.isNil(item?.contract) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("contract-data-cell", "align-left")} to={`${consts.PATH.SMART_CONTRACT}/${item?.contract}`}>
					{item?.contract}
				</NavLink>
			);

			const ownerDataCell = _.isNil(item?.script_url) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<a target='_blank' href={item?.script_url} className={cx("owner-data-cell", "align-left")}>
					{item?.script_url}
				</a>
			);

			const descriptionDataCell = _.isNil(item?.parameters) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("description-data-cell", "align-left")}>{item?.parameters.toString()}</div>
			);

			const feesDataCell = _.isNil(item?.fees) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("fees-data-cell", "align-right")}>{item?.fees.amount !== "" ? formatOrai(item?.fees.amount) : ""}</div>
			);

			return [nameDataCell, contractDataCell, ownerDataCell, descriptionDataCell, feesDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

DataSourceTable.propTypes = {
	data: PropTypes.array,
};
DataSourceTable.defaultProps = {
	data: [],
};

export default DataSourceTable;
