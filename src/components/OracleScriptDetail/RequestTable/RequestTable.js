import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import Address from "src/components/common/Address";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./RequestTable.scss";
import successIcon from "src/assets/oracleScripts/success_ic.svg";
import pedingIcon from "src/assets/oracleScripts/success_ic.svg";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const requestsHeaderCell = <div className={cx("header-cell", "align-left")}>Requests</div>;
	const txHashHeaderCell = <div className={cx("header-cell", "align-left")}>Tx Hash</div>;
	const reportStatusHeaderCell = <div className={cx("header-cell", "align-left")}>Report Status</div>;
	const statusHeaderCell = <div className={cx("header-cell", "align-center")}>Status</div>;
	const ownerHeaderCell = <div className={cx("header-cell", "align-right")}>Owner</div>;
	const headerCells = [requestsHeaderCell, txHashHeaderCell, reportStatusHeaderCell, statusHeaderCell, ownerHeaderCell];
	const headerCellStyles = [
		{minWidth: "100px"}, // Requests
		{minWidth: "200px"}, // Tx Hash
		{width: "366px", minWidth: "366px"}, // Report Status
		{width: "120", minWidth: "120"}, // Status
		{minWidth: "150px"}, // Owner
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const RequestTable = memo(({data = []}) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		const requestsDataCell = (
			<NavLink className={cx("requests-data-cell", "align-left")} to='/'>
				#R302424
			</NavLink>
		);

		const txHashDataCell = (
			<NavLink className={cx("tx-hash-data-cell", "align-left")} to='/'>
				324BEC04C4BA7DC04B1787B3C7458C8...
			</NavLink>
		);

		const reportStatusDataCell = (
			<div className={cx("report-status-data-cell")}>
				<div className={cx("info")}>
					<div className={cx("info-time")}>Min 10</div>
					<div className={cx("info-progress")}>16 of 16</div>
				</div>
				<div className={cx("graph")}>
					<div className={cx("graph-total")}></div>
					{/* <div className={cx("graph-done")} style={{width: "20%"}}></div> */}
					<div className={cx("graph-finished")}></div>
				</div>
			</div>
		);

		const statusDataCell = (
			<div className={cx("status-data-cell", "align-center")}>
				<div className={cx("status")}>
					<img src={successIcon} alt='' className={cx("status-icon")} />
					<span className={cx("status-text")}>Success</span>
				</div>
			</div>
		);

		const ownerDataCell = (
			<div className={cx("owner-data-cell")}>
				<Address address='orai1clmdwn4tjr27rlm9cn8t7vapu9zx5zsdc3efxq' size='md' showCopyIcon={false} />
			</div>
		);

		return [[requestsDataCell, txHashDataCell, reportStatusDataCell, statusDataCell, ownerDataCell]];
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default RequestTable;
