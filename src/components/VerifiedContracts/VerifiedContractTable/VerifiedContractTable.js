// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useMemo } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import { tableThemes } from "src/constants/tableThemes";
import { _ } from "src/lib/scripts";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./VerifiedContractTable.module.scss";
import { storeWasmCode } from "src/store/modules/wasmcode";
import { useDispatch } from "react-redux";
import { formatDateTime } from "src/helpers/helper";
import SuccessIcon from "src/icons/SuccessIcon";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const codeIdHeaderCell = <div className={cx("header-cell", "align-center")}>Code id</div>;
	const nameHeaderCell = <div className={cx("header-cell", "align-left")}>Name</div>;
	const verifiedAtHeaderCell = <div className={cx("header-cell", "align-left")}>Verified</div>;
	const contractAddressHeaderCell = <div className={cx("header-cell", "align-left")}>Address</div>;
	const creatorHeaderCell = <div className={cx("header-cell", "align-left")}>Creator</div>;
	const txHashHeaderCell = <div className={cx("header-cell", "align-left")}>TxHash</div>;
	const createdAtHeaderCell = <div className={cx("header-cell", "align-left")}>Created At</div>;
	const headerCells = [contractAddressHeaderCell, nameHeaderCell, creatorHeaderCell, codeIdHeaderCell, verifiedAtHeaderCell, txHashHeaderCell, createdAtHeaderCell];
	const headerCellStyles = [
		{ minWidth: "200px" },
		{ minWidth: "240px" },
		{ minWidth: "150px" },
		{ minWidth: "120px" },
		{ minWidth: "200px" },
		{ minWidth: "200px" },
		{ minWidth: "200px" },
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const VerifiedContractTable = memo(({ data = [] }) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map((item, index) => {
			const nameDataCell = _.isNil(item?.contract_name) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<>{item.contract_name}</>
			);
			const contractAddressDataCell = _.isNil(item?.contract_address) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("address-data-cell", "align-left")} to={`${consts.PATH.VERIFIED_CONTRACT}/${item.contract_address}`}>
					<SuccessIcon /> {item.contract_address}
				</NavLink>
			);
			const creatorDataCell = _.isNil(item?.creator_address) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("creator-data-cell", "align-left")} to={`${consts.PATH.ACCOUNT}/${item.creator_address}`}>
					{item.creator_address}
				</NavLink>
			);

			const codeIdDataCell = _.isNil(item?.code_id) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("code-id-data-cell", "align-center")} to={`${consts.PATH.WASM_CODE}/${item?.code_id}`}>
					{item?.code_id}
				</NavLink>
			);

			const verifiedAtDataCell = _.isNil(item?.verified_at) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("time-data-cell", "align-left")}>{formatDateTime(item?.verified_at)}</div>
			);


			const txHashDataCell = _.isNil(item?.contract_hash) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("txhash-data-cell", "align-left")} to={`${consts.PATH.TXLIST}/${item?.contract_hash}`}>
					{item?.contract_hash}
				</NavLink>
			);

			const createdAtDataCell = _.isNil(item?.created_at) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("time-data-cell", "align-left")}>{formatDateTime(item?.created_at)}</div>
			);

			return [contractAddressDataCell, nameDataCell, creatorDataCell, codeIdDataCell, verifiedAtDataCell, txHashDataCell, createdAtDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default VerifiedContractTable;
