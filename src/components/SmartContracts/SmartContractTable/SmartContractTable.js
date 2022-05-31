// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {tableThemes} from "src/constants/tableThemes";
import {_} from "src/lib/scripts";
import ThemedTable from "src/components/common/ThemedTable";
import SourceViewer from "src/components/common/SourceViewer";
import styles from "./SmartContractTable.module.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const addressHeaderCell = <div className={cx("header-cell", "align-left")}>Address</div>;
	const codeIdHeaderCell = <div className={cx("header-cell", "align-center")}>Code id</div>;
	const creatorHeaderCell = <div className={cx("header-cell", "align-left")}>Creator</div>;
	const adminHeaderCell = <div className={cx("header-cell", "align-left")}>Admin</div>;
	const labelHeaderCell = <div className={cx("header-cell", "align-left")}>Label</div>;
	const sourceHeaderCell = <div className={cx("header-cell", "align-left")}>Source</div>;
	const headerCells = [addressHeaderCell, codeIdHeaderCell, creatorHeaderCell, adminHeaderCell, labelHeaderCell, sourceHeaderCell];
	const headerCellStyles = [
		{minWidth: "320px"}, // Address
		{minWidth: "80px"}, // Code id
		{minWidth: "320px"}, // Creator
		{minWidth: "50px"}, // Admin
		{minWidth: "160px"}, // Label
		{minWidth: "50px"}, // Source
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const SmartContractTable = memo(({data = []}) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map((item, index) => {
			const addressDataCell = _.isNil(item?.address) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("address-data-cell", "align-left")} to={`${consts.PATH.SMART_CONTRACT}/${item.address}`}>
					{item.address}
				</NavLink>
			);

			const codeIdDataCell = _.isNil(item?.code_id) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("code-id-data-cell", "align-center")}>{item?.code_id}</div>
			);

			const creatorDataCell = _.isNil(item?.creator) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("creator-data-cell", "align-left")} to={`${consts.PATH.ACCOUNT}/${item.creator}`}>
					{item.creator}
				</NavLink>
			);

			const adminDataCell = _.isNil(item?.admin) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("admin-data-cell", "align-left")} to={`${consts.PATH.ACCOUNT}/${item?.admin}`}>
				{item?.admin}
			</NavLink>
			);

			const labelDataCell = _.isNil(item?.label) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("label-data-cell", "align-left")}>{item?.label}</div>
			);

			const sourceDataCell = _.isNil(item?.source) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("source-data-cell", "align-left")}>
					<SourceViewer title='View' data={item} key={`source-viewer-` + index} />
				</div>
			);

			return [addressDataCell, codeIdDataCell, creatorDataCell, adminDataCell, labelDataCell, sourceDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default SmartContractTable;
