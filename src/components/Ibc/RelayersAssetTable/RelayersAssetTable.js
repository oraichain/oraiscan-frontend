import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {formatOrai, formatNumber, parseIbc} from "src/helpers/helper";
import {_, reduceString, reduceStringAssets} from "src/lib/scripts";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./RelayersAssetTable.module.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const nameHeaderCell = <div className={cx("header-cell", "align-left")}>Name</div>;
	const totalTxsHeaderCell = <div className={cx("header-cell", "align-right")}>Total Txs</div>;
	const totalAmountHeaderCell = <div className={cx("header-cell", "align-right")}>Total Amount</div>;
	const totalValueHeaderCell = <div className={cx("header-cell", "align-right")}>Total Value</div>;
	const headerCells = [nameHeaderCell, totalTxsHeaderCell, totalAmountHeaderCell, totalValueHeaderCell];
	const headerCellStyles = [
		{minWidth: "140px"}, // Name
		{minWidth: "60px"}, // Total Txs
		{minWidth: "60px"}, // Total Amount
		{minWidth: "60px"}, // Total Value
	];

	return {
		headerCells,
		headerCellStyles,
	};
};

const RelayersAssetTable = memo(({data = []}) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const logoURL = item?.images?.thumb;
			const nameDataCell = _.isNil(item?.channel_id) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("data-cell", "color-blue", "align-left", "logo-brand-custom")}>
					{logoURL && <img src={logoURL} height={32} width={32} alt='/' className={cx("logo")} />}
					{!logoURL && <div className={cx("logo-custom")}> {item?.denom.substring(0, 3).toUpperCase()} </div>}
					<div className={cx("name-data")}>
						<div className={cx("name-data-cell", "align-left", "denom")}>{parseIbc(item?.denom)}</div>
						<div className={cx("name-data-cell", "align-left", "channel")}>{item?.channel_id}</div>
					</div>
				</div>
			);
			const totalTxsDataCell = _.isNil(item?.total_txs) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("align-right")}>{formatNumber(item.total_txs)}</div>
			);

			const totalAmountDataCell = _.isNil(item?.amount) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("align-right")}>{formatNumber(item.amount.toFixed(6))}</div>
			);

			const totalValueDataCell = _.isNil(item?.total_value) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("align-right")}>$ {formatNumber(item.total_value.toFixed(6))}</div>
			);

			return [nameDataCell, totalTxsDataCell, totalAmountDataCell, totalValueDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default RelayersAssetTable;
