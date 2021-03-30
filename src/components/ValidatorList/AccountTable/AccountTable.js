// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import getTxType from "src/constants/getTxType";
import {_, reduceString, setAgoTime} from "src/lib/scripts";
import {formatOrai, formatFloat} from "src/helpers/helper";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./AccountTable.scss";
import {useSelector} from "react-redux";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const rankHeaderCell = <div className={cx("header-cell", "align-left")}>Rank</div>;
	const addressHeaderCell = <div className={cx("header-cell", "align-left")}>Address</div>;
	const nameTagHeaderCell = <div className={cx("header-cell", "align-center")}>Name Tag</div>;
	const balanceHeaderCell = <div className={cx("header-cell", "align-right")}>Balance</div>;
	const percentageHeaderCell = <div className={cx("header-cell", "align-right")}>Percentage</div>;
	const txnCountHeaderCell = <div className={cx("header-cell", "align-right")}>Txn Count</div>;
	const headerCells = [rankHeaderCell, addressHeaderCell, nameTagHeaderCell, balanceHeaderCell, percentageHeaderCell, txnCountHeaderCell];
	const headerCellStyles = [
		{width: "6%", minWidth: "76px"}, // Rank
		{width: "29%", minWidth: "341px"}, // Address
		{width: "23%", minWidth: "268px"}, // Name Tag
		{width: "16%", minWidth: "184px"}, // Balance
		{width: "11%", minWidth: "137px"}, // Percentage
		{width: "15%", minWidth: "174px"}, // Txn Count
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const AccountTable = memo(({data = [], account}) => {
	// let mockData = [
	// 	{
	// 		rank: "2",
	// 		address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
	// 		nameTag: "Wrapped ORAI",
	// 		balance: "	7,061,209.169 ORAI",
	// 		percentage: "3.101%",
	// 		txnCount: "214",
	// 	},
	// 	{
	// 		rank: "2",
	// 		address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
	// 		nameTag: "Wrapped ORAI",
	// 		balance: "	7,061,209.169 ORAI",
	// 		percentage: "3.101%",
	// 		txnCount: "214",
	// 	},
	// 	{
	// 		rank: "2",
	// 		address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
	// 		nameTag: "Wrapped ORAI",
	// 		balance: "	7,061,209.169 ORAI",
	// 		percentage: "3.101%",
	// 		txnCount: "214",
	// 	},
	// ];
	const status = useSelector(state => state.blockchain.status);
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const rankDataCell = _.isNil(item?.rank) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("name-data-cell", "align-left")}>{item?.rank}</div>
			);

			const addressDataCell = _.isNil(item?.address) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("address-data-cell")}>{item?.address}</div>
			);

			const nameTagDataCell = _.isNil(item?.nameTag) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("nameTag-data-cell")}>{item?.nameTag}</div>
			);

			const balanceDataCell = _.isNil(item?.balance) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("balance-data-cell")}>{item?.balance}</div>
			);

			const percentageDataCell = _.isNil(item?.percentage) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("percentage-data-cell")}>{item?.percentage}</div>
			);

			const txnCountDataCell = _.isNil(item?.txnCount) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("txnCount-data-cell")}>{item?.txnCount}</div>
			);

			return [rankDataCell, addressDataCell, nameTagDataCell, balanceDataCell, percentageDataCell, txnCountDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default AccountTable;
