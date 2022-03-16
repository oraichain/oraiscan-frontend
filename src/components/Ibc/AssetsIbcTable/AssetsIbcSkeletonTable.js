// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import classNames from "classnames/bind";
import styles from "./AssetsIbcSkeletonTable.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const nameHeaderCell = <div className={cx("header-cell", "align-left")}> Name</div>;
	const priceHeaderCell = <div className={cx("header-cell", "align-left")}>Price</div>;
	const supplyHeaderCell = <div className={cx("header-cell", "align-left")}>Supply</div>;
	const totalValueHeaderCell = <div className={cx("header-cell", "align-left")}>Total Value</div>;
	const headerCells = [nameHeaderCell, priceHeaderCell, supplyHeaderCell, totalValueHeaderCell];
	const headerCellStyles = [
		{minWidth: "250px"}, // Name
		{minWidth: "100px"}, // Price
		{minWidth: "100px"}, // Supply
		{minWidth: "100px"}, // Total Value
	];
	return {
		headerCells,
		headerCellStyles,
	};
};
