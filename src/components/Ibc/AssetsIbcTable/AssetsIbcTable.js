// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useMemo } from "react";
import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import { logoBrand } from "src/constants/logoBrand";
import { tableThemes } from "src/constants/tableThemes";
import { formatOrai, formatNumber } from "src/helpers/helper";
import { _ } from "src/lib/scripts";
import ThemedTable from "src/components/common/ThemedTable";
import { Tooltip } from "@material-ui/core";
import styles from "./AssetsIbcTable.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const nameHeaderCell = <div className={cx("header-cell", "align-left")}>Name</div>;
	const priceHeaderCell = <div className={cx("header-cell", "align-left")}>Price</div>;
	const supplyHeaderCell = <div className={cx("header-cell", "align-left")}>Supply</div>;
	const totalValueHeaderCell = <div className={cx("header-cell", "align-left")}>Total Value</div>;
	const headerCells = [nameHeaderCell, priceHeaderCell, supplyHeaderCell, totalValueHeaderCell];
	const headerCellStyles = [
		{ minWidth: "250px" }, // Name
		{ minWidth: "100px" }, // Price
		{ minWidth: "100px" }, // Supply
		{ minWidth: "100px" }, // Total Value
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const TestCaseTable = memo(({ data = [] }) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const logoURL = item?.images?.thumb;
			const nameDataCell = _.isNil(item?.channelId) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				// <div className={cx("name-data-cell", "align-left")}>{item.channelId}</div>
				<div
					className={cx("data-cell", "color-blue", "align-left", "logo-brand-custom")}
				>
					{logoURL && <img src={logoURL} height={32} width={32} alt='/' className={cx("logo")} />}
					{/* {!logoURL && <div className={cx("logo-custom")}>{item.channelId} </div>} */}
					<div className={cx("name-data")}>
						<div className={cx("name-data-cell", "align-left","symbol")}>{item?.symbol}</div>
						<div className={cx("name-data-cell", "align-left","channel")}>{item?.channelId}</div>
					</div>
				</div>
			);

			const priceHashDataCell = _.isNil(item?.prices) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("price-data-cell", "align-left")}>$ {item?.prices?.price}</div>
			);

			const supplyDataCell = _.isNil(item?.prices) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("supply-data-cell", "align-left")}>
					<div className={cx("supply")}>
						<span className={cx("supply-value")}>{formatNumber(item?.prices?.supply)}</span>
						{/* <span className={cx("supply-denom")}>ORAI</span> */}
					</div>
				</div>
			);

			const totalValueDataCell = _.isNil(item?.prices) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("total-value-data-cell", "align-left")}>$ {formatNumber(item?.prices?.TotalValue)}</div>
			);

			return [nameDataCell, priceHashDataCell, supplyDataCell, totalValueDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default TestCaseTable;
