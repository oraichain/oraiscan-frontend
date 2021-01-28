import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {formatOrai} from "src/helpers/helper";
import {_} from "src/lib/scripts";
import Address from "src/components/common/Address";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./OracleScriptTable.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const oracleScriptHeaderCell = <div className={cx("header-cell", "align-left")}>Oracle Script</div>;
	const descriptionHeaderCell = <div className={cx("header-cell", "align-left")}>Description</div>;
	const requestAndResponseTimeHeaderCell = (
		<div className={cx("header-cell", "align-right")}>
			Request <br /> & Response time
		</div>
	);
	const ownerHeaderCell = <div className={cx("header-cell", "align-right")}>Owner</div>;
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

		const oracleScriptDataCell = (
			<div className={cx("oracle-script-data-cell", "align-left")}>
				<NavLink className={cx("oracle-script-data-cell-tag")} to={`${consts.PATH.ORACLE_SCRIPTS}/orai1234`}>
					#D2
				</NavLink>
				<span className={cx("oracle-script-data-cell-name")}>CoinGecko</span>
			</div>
		);

		const descriptionDataCell = (
			<div className={cx("description-data-cell", "align-left")}>
				Query latest cryptocurrency token prices from CoinGecko. Accepts multiple space-separated symbols.
			</div>
		);

		const requestAndResponseTimeDataCell = (
			<div className={cx("request-and-response-time-data-cell")}>
				<div className={cx("request-value", "align-right")}>181,139</div>
				<div className={cx("response-time-value", "align-right")}>(8.18 s)</div>
			</div>
		);

		const ownerDataCell = (
			<div className={cx("owner-data-cell")}>
				<Address address='orai1clmdwn4tjr27rlm9cn8t7vapu9zx5zsdc3efxq' size='md' showCopyIcon={false} />
			</div>
		);

		return [[oracleScriptDataCell, descriptionDataCell, requestAndResponseTimeDataCell, ownerDataCell]];

		// Bỏ comment này và xóa các dòng trên khi có data
		// return data.map(item => {
		// 	const oracleScriptDataCell = _.isNil(item?.name) ? (
		// 		<div className={cx("oracle-script-data-cell", "align-left")}>-</div>
		// 	) : (
		// 		<div className={cx("oracle-script-data-cell", "align-left")}>
		// 			<NavLink className={cx("oracle-script-data-cell-tag")} to={`${consts.PATH.ORACLE_SCRIPTS}/${item.tag}`}>
		// 				{item.tag}
		// 			</NavLink>
		// 			<span className={cx("oracle-script-data-cell-name")}>{item.name}</span>
		// 		</div>
		// 	);

		// 	const descriptionDataCell = _.isNil(item?.description) ? (
		// 		<div className={cx("description-data-cell", "align-left")}>-</div>
		// 	) : (
		// 		<div className={cx("description-data-cell", "align-left")}>{item.description}</div>
		// 	);

		// 	const requestAndResponseTimeDataCell = _.isNil(item?.requests) ? (
		// 		<div className={cx("request-and-response-time-data-cell")}>
		// 			<div className={cx("request-value", "align-right")}>-</div>
		// 			<div className={cx("response-time-value", "align-right")}>-</div>
		// 		</div>
		// 	) : (
		// 		<div className={cx("request-and-response-time-data-cell")}>
		// 			<div className={cx("request-value", "align-right")}>{item.requests}</div>
		// 			<div className={cx("response-time-value", "align-right")}>{item.response_time}</div>
		// 		</div>
		// 	);

		// 	const ownerDataCell = _.isNil(item?.owner) ? (
		// 		<div className={cx("owner-data-cell")}>-</div>
		// 	) : (
		// 		<div className={cx("owner-data-cell")}>
		// 			<Address address={item.owner} link={`${consts.PATH.ACCOUNT}/${item.owner}`} size='md' showCopyIcon={false} />
		// 		</div>
		// 	);

		// 	return [oracleScriptDataCell, descriptionDataCell, requestAndResponseTimeDataCell, ownerDataCell];
		// });
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default OracleScriptTable;
