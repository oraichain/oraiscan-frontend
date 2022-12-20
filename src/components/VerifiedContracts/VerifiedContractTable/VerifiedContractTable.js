// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useMemo } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import { tableThemes } from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./VerifiedContractTable.module.scss";
import { formatDateTime } from "src/helpers/helper";
import SuccessIcon from "src/icons/SuccessIcon";
import {_ , reduceStringAssets} from "src/lib/scripts";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const codeIdHeaderCell = <div className={cx("header-cell", "align-left")}>Code id</div>;
	const nameHeaderCell = <div className={cx("header-cell", "align-left")}>Contract Name</div>;
	const verifiedAtHeaderCell = <div className={cx("header-cell", "align-left")}>Verified</div>;
	const contractAddressHeaderCell = <div className={cx("header-cell", "align-left")}>Address</div>;
	const creatorHeaderCell = <div className={cx("header-cell", "align-left")}>Creator</div>;
	const txHashHeaderCell = <div className={cx("header-cell", "align-left")}>TxHash</div>;
	const headerCells = [contractAddressHeaderCell, nameHeaderCell, codeIdHeaderCell, verifiedAtHeaderCell, txHashHeaderCell , creatorHeaderCell];
	const headerCellStyles = [
		{ minWidth: "200px" },
		{ minWidth: "240px" },
		{ minWidth: "150px" },
		{ minWidth: "120px" },
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
			const status = item?.contract_verification == 'VERIFIED' ? <><SuccessIcon /> <span style={{ width: 2 }} /></> : <span style={{ width: 26 }} />
			const nameDataCell = _.isNil(item?.contract_name) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<>{item.contract_name}</>
			);
			const contractAddressDataCell = _.isNil(item?.contract_address) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("address-data-cell", "align-left")} to={`${consts.PATH.VERIFIED_CONTRACT}/${item.contract_address}`}>
					{status} {reduceStringAssets(item?.contract_address, 8, 8)}
				</NavLink>
			);
			
			const codeIdDataCell = _.isNil(item?.code_id) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("code-id-data-cell", "align-left")} to={`${consts.PATH.WASM_CODE}/${item?.code_id}`}>
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
					{reduceStringAssets(item?.contract_hash, 8, 8)}
				</NavLink>
			);

			const creatorDataCell = _.isNil(item?.creator_address) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("creator-data-cell", "align-left")} to={`${consts.PATH.ACCOUNT}/${item.creator_address}`}>
					{reduceStringAssets(item?.creator_address, 8, 8)}
				</NavLink>
			);


			return [contractAddressDataCell, nameDataCell, codeIdDataCell, verifiedAtDataCell, txHashDataCell , creatorDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default VerifiedContractTable;
