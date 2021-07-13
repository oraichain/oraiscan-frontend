import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {formatOrai} from "src/helpers/helper";
import {_} from "src/lib/scripts";
import Address from "src/components/common/Address";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./OracleScriptTable.module.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const oracleScriptHeaderCell = <div className={cx("header-cell", "align-left")}>Oracle Script</div>;
	const descriptionHeaderCell = <div className={cx("header-cell", "align-left")}>Description</div>;
	const requestAndResponseTimeHeaderCell = (
		<div className={cx("header-cell", "align-left")}>
			Request <br />
		</div>
	);
	const ownerHeaderCell = <div className={cx("header-cell", "align-left")}>Owner</div>;
	const headerCells = [oracleScriptHeaderCell, descriptionHeaderCell, requestAndResponseTimeHeaderCell, ownerHeaderCell];
	const headerCellStyles = [
		{minWidth: "100px"}, // Oracle Script
		{minWidth: "200px"}, // Description
		{minWidth: "180px"}, // Time
		{width: "150px", minWidth: "150px"}, // Owner
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const OracleScriptTable = memo(({data = []}) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const oracleScriptDataCell = _.isNil(item?.name) ? (
				<div className={cx("oracle-script-data-cell", "align-left")}>-</div>
			) : (
				<div className={cx("oracle-script-data-cell", "align-left")}>
					{/* <div className={cx("oracle-script-data-cell-tag")}>{item?.tag || "#D2"}</div> */}
					<NavLink className={cx("oracle-script-data-cell-name")} to={`${consts.PATH.ORACLE_SCRIPTS}/${item?.name}`}>
						{item?.name}
					</NavLink>
				</div>
			);

			const descriptionDataCell = _.isNil(item?.description) ? (
				<div className={cx("description-data-cell", "align-left")}>-</div>
			) : (
				<div className={cx("description-data-cell", "align-left")}>{item?.description}</div>
			);

			const requestAndResponseTimeDataCell = _.isNil(item?.request) ? (
				<div className={cx("request-and-response-time-data-cell")}>
					<div className={cx("request-value", "align-left")}>-</div>
					<div className={cx("response-time-value", "align-left")}>-</div>
				</div>
			) : (
				<div className={cx("request-and-response-time-data-cell")}>
					<div className={cx("request-value", "align-left")}>{item?.request}</div>
				</div>
			);

			const ownerDataCell = _.isNil(item?.owner) ? (
				<div className={cx("owner-data-cell")}>-</div>
			) : (
				<div className={cx("owner-data-cell")}>
					<Address address={item?.owner} link={`${consts.PATH.ACCOUNT}/${item.owner}`} size='md' showCopyIcon={false} />
				</div>
			);

			return [oracleScriptDataCell, descriptionDataCell, requestAndResponseTimeDataCell, ownerDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default OracleScriptTable;
