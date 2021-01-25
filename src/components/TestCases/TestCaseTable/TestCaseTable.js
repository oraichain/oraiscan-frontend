import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {formatOrai} from "src/helpers/helper";
import {_} from "src/lib/scripts";
import Address from "src/components/common/Address";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./TestCaseTable.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const testCaseHeaderCell = <div className={cx("header-cell", "align-left")}>Test Case</div>;
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
			const testCaseDataCell = _.isNil(item?.name) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("data-cell", "color-blue", "align-left")} to={`${consts.PATH.TEST_CASES}/${item.name}`}>
					{item.name}
				</NavLink>
			);

			const descriptionHashDataCell = _.isNil(item?.description) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("data-cell", "align-left")}>{item.description}</div>
			);

			const feeDataCell =
				_.isNil(item?.fees?.amount?.[0]?.amount) || _.isNil(item?.fees?.amount?.[0]?.denom) ? (
					<div className={cx("align-right")}>-</div>
				) : (
					<div className={cx("fee-data-cell", "align-right")}>
						<span>{formatOrai(item.fees.amount[0].amount)}</span>
						<span>{item.fees.amount[0].denom}</span>
					</div>
				);

			const requestsDataCell = _.isNil(item?.requests) ? (
				<div className={cx("align-center")}>-</div>
			) : (
				<div className={cx("data-cell", "align-center")}>{item.requests}</div>
			);

			const ownerDataCell = _.isNil(item?.owner) ? <div className={cx("align-left")}>-</div> : <Address address={item.owner} size='md' showCopyIcon={false} />;

			return [testCaseDataCell, descriptionHashDataCell, feeDataCell, requestsDataCell, ownerDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default TestCaseTable;
