// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo} from "react";
import {Tooltip} from "@material-ui/core";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import {formatOrai} from "src/helpers/helper";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./AccountTable.scss";
import {useSelector} from "react-redux";
import "./AccountTable.css";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const rankHeaderCell = <div className={cx("header-cell", "align-center")}>Rank</div>;
	const addressHeaderCell = <div className={cx("header-cell", "align-left")}>Address</div>;
	const nameTagHeaderCell = <div className={cx("header-cell", "align-left")}>Name Tag</div>;
	const balanceHeaderCell = <div className={cx("header-cell", "align-left")}>Balance</div>;
	const percentageHeaderCell = <div className={cx("header-cell", "align-left")}>Percentage</div>;
	const txnCountHeaderCell = <div className={cx("header-cell", "align-left")}>Txn Count</div>;
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

const AccountTable = memo(({data = []}) => {
	const contactStorageData = useSelector(state => state.contact);
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const rankDataCell = _.isNil(item?.rank) ? (
				<div className={cx("align-center")}>-</div>
			) : (
				<div className={cx("rank-data-cell", "align-center")}>{item?.rank}</div>
			);

			let addressDataCell = <div></div>;
			if (!item?.address) {
				addressDataCell = <div className={cx("align-left")}>-</div>;
			} else {
				let name = contactStorageData?.[item?.address] ? contactStorageData?.[item?.address]?.name : null;
				addressDataCell = name ? (
					<Tooltip title={`${name} (${item?.address})`} arrow placement='top-start'>
						<NavLink className={cx("address-data-cell", "align-left")} to={`${consts.PATH.ACCOUNT}/${item?.address}`}>
							{name ? name : item?.address}
						</NavLink>
					</Tooltip>
				) : (
					<NavLink className={cx("address-data-cell", "align-left")} to={`${consts.PATH.ACCOUNT}/${item?.address}`}>
						{item?.address}
					</NavLink>
				);
			}

			const nameTagDataCell = !item?.name_tag ? <div className={cx("align-center")}>-</div> : <div className={cx("nameTag-data-cell")}>{item?.name_tag}</div>;

			const balanceDataCell = _.isNil(item?.balance) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("balance-data-cell")}>{`${formatOrai(item?.balance)} ORAI`}</div>
			);

			const percentageDataCell = _.isNil(item?.percentage) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("percentage-data-cell")}>{`${item?.percentage?.toFixed(6)}%`}</div>
			);

			const txnCountDataCell = _.isNil(item?.txnCount) ? (
				<div className={cx("align-center")}>-</div>
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
