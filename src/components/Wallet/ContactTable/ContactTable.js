/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./ContactTable.scss";
import _ from "lodash";
import consts from "src/constants/consts";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const txHashHeaderCell = <div className={cx("header-cell", "align-left")}>Name</div>;
	const typeHeaderCell = <div className={cx("header-cell", "align-left")}>Address</div>;
	const headerCells = [txHashHeaderCell, typeHeaderCell];
	const headerCellStyles = [
		{width: "41%", minWidth: "470px"}, // Name
		{width: "59%", minWidth: "670px"}, // Address
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const ContactTable = memo(({data = []}) => {
	const getDataRows = data => {
		if (_.isNil(data)) {
			return [];
		}

		return data.map(item => {
			const nameDataCell = _.isNil(item?.name) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("name-data-cell", "align-left")} to={`${consts.PATH.VALIDATORS}/${item?.address}`}>
					{item?.name}
				</NavLink>
			);

			const addressDataCell = _.isNil(item?.address) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("address-data-cell")}>{item?.address}</div>
			);
			return [nameDataCell, addressDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default ContactTable;
