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
import styles from "./DataSourceTable.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const testCaseHeaderCell = <div className={cx("header-cell", "align-left")}>Data Source</div>;
	const descriptionHeaderCell = <div className={cx("header-cell", "align-left")}>Description</div>;
	const feeHeaderCell = <div className={cx("header-cell", "align-right")}>Fee</div>;
	const requestsHeaderCell = <div className={cx("header-cell", "align-right")}>Requests</div>;
	const ownerHeaderCell = <div className={cx("header-cell", "align-right")}>Owner</div>;
	const headerCells = [testCaseHeaderCell, descriptionHeaderCell, feeHeaderCell, requestsHeaderCell, ownerHeaderCell];
	const headerCellStyles = [
		{minWidth: "100px"}, // Test Case
		{minWidth: "200px"}, // Description
		{minWidth: "180px"}, // Fee
		{width: "110px", minWidth: "110px"}, // Requests
		{width: "150px", minWidth: "150px"}, // Owner
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
			console.log(item);
			const testCaseDataCell = _.isNil(item?.data_source) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("test-case-data-cell", "align-left")}>{item.data_source}</div>
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
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("request-data-cell", "align-right")}>{item.requests}</div>
			);

			const matchedLogoItem = logoBrand.find(logoBrandItem => item?.owner === logoBrandItem.operatorAddress);
			let ownerName;
			if (matchedLogoItem) {
				ownerName = matchedLogoItem?.name ?? "-";
			}
			// const ownerDataCell = _.isNil(ownerName) ? (
			// 	<div className={cx("align-right")}>-</div>
			// ) : (
			// 	<div className={cx("owner-data-cell", "align-right")}>
			// 		<NavLink className={cx("owner")} to={`${consts.PATH.VALIDATORS}/${item.owner}`}>
			// 			{ownerName}
			// 		</NavLink>
			// 	</div>
			// );

			const ownerDataCell = (
				<div className={cx("owner-data-cell", "align-right")}>
					<NavLink className={cx("owner")} to={`${consts.PATH.VALIDATORS}/${item.owner}`}>
						{item.owner}
					</NavLink>
				</div>
			);

			return [testCaseDataCell, descriptionHashDataCell, feeDataCell, requestsDataCell, ownerDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default TestCaseTable;
