// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import { _, setAgoTime } from "src/lib/scripts";
import { tableThemes } from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./BlockTable.scss";
import { logoBrand } from "src/constants/logoBrand";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const heightHeaderCell = <div className={cx("header-cell", "align-left")}>Height</div>;
	const proposerHeaderCell = <div className={cx("header-cell", "align-left")}>Proposer</div>;
	const txsHeaderCell = <div className={cx("header-cell", "align-right")}>Txs</div>;
	const timeHeaderCell = <div className={cx("header-cell", "align-right")}>Time</div>;
	const headerCells = [heightHeaderCell, proposerHeaderCell, txsHeaderCell, timeHeaderCell];
	const headerCellStyles = [
		{ width: "auto" }, // Height
		{ width: "auto" }, // Proposer
		{ width: "auto" }, // Txs
		{ width: "auto" }, // Time
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const BlockTable = memo(({ data = [], rowMotions = [] }) => {
	const validators = useSelector(state => state.blockchain.validators);
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const logoItem = logoBrand.find(it => it.operatorAddress === validators[item?.moniker]?.operatorAddr) || { customLogo: "" };
			const logoURL = logoItem.customLogo ? false : logoItem.logo;
			const logoName = item?.moniker || "";

			const heightDataCell = _.isNil(item?.height) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("data-cell", "color-blue", "align-left")} to={`${consts.PATH.BLOCKLIST}/${item.height}`}>
					{item.height}
				</NavLink>
			);

			const proposerDataCell = _.isNil(item?.moniker) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink
					className={cx("data-cell", "color-blue", "align-left", "logo-brand-custom")}
					to={`${consts.PATH.VALIDATORS}/${validators[item?.moniker]?.operatorAddr ?? 0}`}>
					{logoURL && <img src={logoURL} height={32} width={32} alt='/' className={cx("logo")} />}
					{!logoURL && <div className={cx("logo-custom")}> {logoName.substring(0, 3).toUpperCase()} </div>}
					{item.moniker}
				</NavLink>
			);

			const txsDataCell = _.isNil(item?.num_txs) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("data-cell", "color-black", "align-right")}>{item.num_txs}</div>
			);

			const timeDataCell = _.isNil(item?.timestamp) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("data-cell", "color-black", "align-right")}>{setAgoTime(item.timestamp)}</div>
			);

			return [heightDataCell, proposerDataCell, txsDataCell, timeDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return (
		<ThemedTable
			theme={tableThemes.DARK}
			headerCellStyles={headerRow.headerCellStyles}
			headerCells={headerRow.headerCells}
			dataRows={dataRows}
			rowMotions={rowMotions}
		/>
	);
});

export default BlockTable;
