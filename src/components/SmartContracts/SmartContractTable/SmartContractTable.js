// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useMemo } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import { tableThemes } from "src/constants/tableThemes";
import { _ } from "src/lib/scripts";
import TableCustom from "src/components/common/TableCustom";
import SourceViewer from "src/components/common/SourceViewer";
import styles from "./SmartContractTable.module.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const codeIdHeaderCell = <div className={cx("header-cell", "align-center")}>Code id</div>;
	const wasmHeaderCell = <div className={cx("header-cell", "align-left")}>Wasm Byte Code</div>;
	const sourceHeaderCell = <div className={cx("header-cell", "align-left")}>Source</div>;
	const headerCells = [codeIdHeaderCell, wasmHeaderCell, sourceHeaderCell];
	const headerCellStyles = [
		{ minWidth: "80px" }, // Code id
		{ minWidth: "320px" },// Wasm Byte Code
		{ minWidth: "320px" },// Source
	];

	const labelHeaderCell = <div className={cx("header-cell", "align-center")}>Label</div>;
	const addressHeaderCell = <div className={cx("header-cell", "align-left")}>Address</div>;
	const adminHeaderCell = <div className={cx("header-cell", "align-left")}>Admin</div>;
	const creatorHeaderCell = <div className={cx("header-cell", "align-left")}>Creator</div>;
	const headerCellsChil = [labelHeaderCell, addressHeaderCell, adminHeaderCell, creatorHeaderCell];

	const headerCellStylesChil = [
		{ minWidth: "120px" },
		{ minWidth: "140px" },
		{ minWidth: "160px" },
		{ minWidth: "160px" },
	];

	return {
		headerCells,
		headerCellsChil,
		headerCellStyles,
		headerCellStylesChil,
	};
};

const SmartContractTable = memo(({ data = []  }) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map((item, index) => {
			const codeIdDataCell = _.isNil(item?.code_id) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("code-id-data-cell", "align-center")}>{item?.code_id}</div>
			);

			const sourceDataCell = _.isNil(item?.source) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("admin-data-cell", "align-left")}>{item?.source}</div>
			);

			const wasmDataCell = _.isNil(item?.wasm_byte_code) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("admin-data-cell", "align-left")}>{item?.wasm_byte_code}</div>
			);

			return [codeIdDataCell, sourceDataCell, wasmDataCell];
		});
	};


	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <TableCustom theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles}  headerCellStylesChil={headerRow.headerCellStylesChil} data={data} headerCellsChil={headerRow.headerCellsChil} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default SmartContractTable;
