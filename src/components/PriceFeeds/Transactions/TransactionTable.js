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
import styles from "./TransactionTable.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const requestHeaderCell = <div className={cx("header-cell", "align-left")}> Request ID </div>;
	const blockHeightHeaderCell = <div className={cx("header-cell", "align-left")}> Block Height </div>;
	const txHeaderCell = <div className={cx("header-cell", "align-left")}>Tx</div>;
	const headerCells = [requestHeaderCell, blockHeightHeaderCell, txHeaderCell];
	const headerCellStyles = [
		{minWidth: "100px"}, // Report ID
		{minWidth: "100px"}, // Block Height
		{minWidth: "130px"}, // Tx
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
			const requestCell = _.isNil(item?.requestID) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("test-case-data-cell", "align-left")} to={`${consts.PATH.REQUESTS}/${item.requestID}`} target='_blank' rel='noopener noreferrer'>
					{item.requestID}
				</NavLink>
			);

			const blockHeightCell = _.isNil(item?.blockHeight) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink
					className={cx("test-case-data-cell", "align-left")}
					to={`${consts.PATH.BLOCKLIST}/${item.blockHeight}`}
					target='_blank'
					rel='noopener noreferrer'>
					{item.blockHeight}
				</NavLink>
			);

			const txCell = _.isNil(item?.txhash) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("test-case-data-cell", "align-left")} to={`${consts.PATH.TXLIST}/${item.txhash}`} target='_blank' rel='noopener noreferrer'>
					{item.txhash}
				</NavLink>
			);

			return [requestCell, blockHeightCell, txCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default TestCaseTable;
