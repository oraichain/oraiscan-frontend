// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import classNames from "classnames/bind";
import styles from "./DataSourceTableSkeletonTable.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const testCaseHeaderCell = <div className={cx("header-cell", "align-left")}> Data Source </div>;
	const descriptionHeaderCell = <div className={cx("header-cell", "align-left")}>Description</div>;
	const feeHeaderCell = <div className={cx("header-cell", "align-left")}>Fee</div>;
	const requestsHeaderCell = <div className={cx("header-cell", "align-left")}>Requests</div>;
	const ownerHeaderCell = <div className={cx("header-cell", "align-left")}>Owner</div>;
	const smartContractHeaderCell = <div className={cx("header-cell", "align-left")}>Smart Contract</div>;
	const headerCells = [testCaseHeaderCell, descriptionHeaderCell, feeHeaderCell, requestsHeaderCell, ownerHeaderCell, smartContractHeaderCell];
	const headerCellStyles = [
		{minWidth: "160px"}, // Data Source
		{minWidth: "220px"}, // Description
		{minWidth: "100px"}, // Fee
		{minWidth: "60px"}, // Requests
		{minWidth: "160px"}, // Owner
		{minWidth: "320px"}, // Smart Contract
	];
	return {
		headerCells,
		headerCellStyles,
	};
};
