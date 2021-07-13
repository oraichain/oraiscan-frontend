// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {logoBrand} from "src/constants/logoBrand";
import {tableThemes} from "src/constants/tableThemes";
import {formatOrai} from "src/helpers/helper";
import {_} from "src/lib/scripts";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./DataSourceTableSkeletonTable.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const testCaseHeaderCell = <div className={cx("header-cell", "align-left")}> Data Source </div>;
	const descriptionHeaderCell = <div className={cx("header-cell", "align-left")}>Description</div>;
	const feeHeaderCell = <div className={cx("header-cell", "align-right")}>Fee</div>;
	const requestsHeaderCell = <div className={cx("header-cell", "align-right")}>Requests</div>;
	const ownerHeaderCell = <div className={cx("header-cell", "align-right")}>Owner</div>;
	const smartContractHeaderCell = <div className={cx("header-cell", "align-right")}>  Smart Contract</div>;
	const headerCells = [testCaseHeaderCell, descriptionHeaderCell, feeHeaderCell, requestsHeaderCell, ownerHeaderCell, smartContractHeaderCell];
	const headerCellStyles = [
		{minWidth: "50px"}, // Test Case
		{minWidth: "50px"}, // Description
		{minWidth: "50px"}, // Fee
		{width: "50px", minWidth: "50px"}, // Requests
		{width: "110px", minWidth: "110px"}, // Owner
		{width: "110px", minWidth: "110px"}, // Owner
	];
	return {
		headerCells,
		headerCellStyles,
	};
};
