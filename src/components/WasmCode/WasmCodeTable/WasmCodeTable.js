// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {tableThemes} from "src/constants/tableThemes";
import {_} from "src/lib/scripts";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./WasmCodeTable.module.scss";
import {storeWasmCode} from "src/store/modules/wasmcode";
import {useDispatch} from "react-redux";
import {formatDateTime} from "src/helpers/helper";
const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const codeIdHeaderCell = <div className={cx("header-cell", "align-center")}>Code id</div>;
	const creatorHeaderCell = <div className={cx("header-cell", "align-left")}>Creator</div>;
	const txHashHeaderCell = <div className={cx("header-cell", "align-left")}>TxHash</div>;
	const createdAtHeaderCell = <div className={cx("header-cell", "align-left")}>Created At</div>;
	const headerCells = [creatorHeaderCell, codeIdHeaderCell, txHashHeaderCell, createdAtHeaderCell];
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

const WasmCodeTable = memo(({data = []}) => {
	const dispatch = useDispatch();
	// const handleWasmCodeToStorage = item => {
	// 	dispatch(storeWasmCode(item));
	// };

	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map((item, index) => {
			const creatorDataCell = _.isNil(item?.creator) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("creator-data-cell", "align-left")} to={`${consts.PATH.ACCOUNT}/${item.creator}`}>
					{item.creator}
				</div>
			);

			const codeIdDataCell = _.isNil(item?.id) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("code-id-data-cell", "align-center")} to={`${consts.PATH.WASM_CODE}/${item.id}`}>
					{item.id}
				</NavLink>
			);

			const txHashDataCell = _.isNil(item?.tx_hash) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("txhash-data-cell", "align-left")} to={`${consts.PATH.TXLIST}/${item.tx_hash}`}>
					{item?.tx_hash}
				</NavLink>
			);

			const createdAtDataCell = _.isNil(item?.created_at) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("time-data-cell", "align-left")}>{formatDateTime(item?.created_at)}</div>
			);

			return [creatorDataCell, codeIdDataCell, txHashDataCell, createdAtDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default WasmCodeTable;
