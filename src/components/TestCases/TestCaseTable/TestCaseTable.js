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
import styles from "./TestCaseTable.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const testCaseHeaderCell = <div className={cx("header-cell", "align-left")}>Test Case</div>;
	const descriptionHeaderCell = <div className={cx("header-cell", "align-left")}>Description</div>;
	const feeHeaderCell = <div className={cx("header-cell", "align-right")}>Fee</div>;
	const requestsHeaderCell = <div className={cx("header-cell", "align-right")}>Requests</div>;
	const contractHeaderCell = <div className={cx("header-cell", "align-right")}>Contract</div>;
	const ownerHeaderCell = <div className={cx("header-cell", "align-right")}>Owner</div>;
	const headerCells = [testCaseHeaderCell, ownerHeaderCell, contractHeaderCell, descriptionHeaderCell, feeHeaderCell, requestsHeaderCell];
	const headerCellStyles = [
		{minWidth: "100px"}, // Test Case
		{width: "150px", minWidth: "150px"}, // Owner
		{width: "150px", minWidth: "150px"}, // Contract
		{minWidth: "130px"}, // Description
		{minWidth: "100px"}, // Fee
		{width: "40px", minWidth: "40px"}, // Requests
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const TestCaseTable = memo(({data = []}) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const testCaseDataCell = _.isNil(item?.name) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("test-case-data-cell", "align-left")}>{item?.name}</div>
			);

			const descriptionHashDataCell = _.isNil(item?.description) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("description-data-cell", "align-left")}>{item.description}</div>
			);

			const feeDataCell = _.isNil(item?.fee) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("fee-data-cell", "align-right")}>
					<div className={cx("fee")}>
						<span className={cx("fee-value")}>{formatOrai(item.fee)}</span>
						<span className={cx("fee-denom")}>ORAI</span>
					</div>
				</div>
			);

			const requestsDataCell = _.isNil(item?.requests) ? (
				<div className={cx("align-center")}>-</div>
			) : (
				<div className={cx("request-data-cell", "align-center")}>{item.requests}</div>
			);

			const ownerDataCell = _.isNil(item?.owner) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("owner-data-cell", "align-right")}>
					<NavLink className={cx("owner")} to={`${consts.PATH.ACCOUNT}/${item?.owner}`}>
						{item?.owner}
					</NavLink>
				</div>
			);

			const contractDataCell = _.isNil(item?.contract) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("contract-data-cell", "align-right")}>
					<NavLink className={cx("contract")} to={`${consts.PATH.SMART_CONTRACT}/${item?.contract}`}>
						{item?.contract}
					</NavLink>
				</div>
			);

			return [testCaseDataCell, ownerDataCell, contractDataCell, descriptionHashDataCell, feeDataCell, requestsDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default TestCaseTable;
