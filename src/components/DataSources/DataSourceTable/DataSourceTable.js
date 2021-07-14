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
import {Tooltip} from "@material-ui/core";
import styles from "./DataSourceTable.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const testCaseHeaderCell = <div className={cx("header-cell", "align-left")}>Data Source</div>;
	const descriptionHeaderCell = <div className={cx("header-cell", "align-left")}>Description</div>;
	const feeHeaderCell = <div className={cx("header-cell", "align-left")}>Fee</div>;
	const requestsHeaderCell = <div className={cx("header-cell", "align-left")}>Requests</div>;
	const ownerHeaderCell = <div className={cx("header-cell", "align-left")}>Owner</div>;
	const smartContractCell = <div className={cx("header-cell", "align-left")}>Smart Contract</div>;
	const headerCells = [testCaseHeaderCell, descriptionHeaderCell, feeHeaderCell, requestsHeaderCell, ownerHeaderCell, smartContractCell];
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
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("fee-data-cell", "align-left")}>
					<div className={cx("fee")}>
						<span className={cx("fee-value")}>{formatOrai(item.fee)}</span>
						<span className={cx("fee-denom")}>ORAI</span>
					</div>
				</div>
			);

			const requestsDataCell = _.isNil(item?.requests) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("request-data-cell", "align-left")}>{item.requests}</div>
			);

			// const matchedLogoItem = logoBrand.find(logoBrandItem => item?.owner === logoBrandItem.operatorAddress);
			// let ownerName;
			// if (matchedLogoItem) {
			// 	ownerName = matchedLogoItem?.name ?? "-";
			// }
			// const ownerDataCell = _.isNil(ownerName) ? (
			// 	<div className={cx("align-left")}>-</div>
			// ) : (
			// 	<div className={cx("owner-data-cell", "align-left")}>
			// 		<NavLink className={cx("owner")} to={`${consts.PATH.VALIDATORS}/${item.owner}`}>
			// 			{ownerName}
			// 		</NavLink>
			// 	</div>
			// );

			const ownerDataCell = (
				<div className={cx("owner-data-cell", "align-left")}>
					<Tooltip title={`${item.owner}`} arrow placement='top-start'>
						<NavLink className={cx("owner")} to={`${consts.PATH.ACCOUNT}/${item.owner}`}>
							{`${item.owner.slice(0, 10)}...${item.owner.slice(item.owner.length - 10)}`}
						</NavLink>
					</Tooltip>
				</div>
			);

			const smartContractDataCell = (
				<div className={cx("owner-data-cell", "align-left")}>
					<NavLink className={cx("owner")} to={`${consts.PATH.SMART_CONTRACT}/${item.contract}`}>
						{item.contract}
					</NavLink>
				</div>
			);

			return [testCaseDataCell, descriptionHashDataCell, feeDataCell, requestsDataCell, ownerDataCell, smartContractDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default TestCaseTable;
