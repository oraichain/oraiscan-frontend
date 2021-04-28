import React, {memo, useMemo} from "react";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./RequestTable.module.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const requestsHeaderCell = <div className={cx("header-cell", "align-left")}>Requests</div>;
	const feeHeaderCell = <div className={cx("header-cell", "align-left")}>Fees</div>;
	const blockHeightHeaderCell = <div className={cx("header-cell", "align-left")}>Block Height</div>;
	const creatorHeaderCell = <div className={cx("header-cell", "align-left")}>Creator</div>;
	const headerCells = [requestsHeaderCell, feeHeaderCell, blockHeightHeaderCell, creatorHeaderCell];
	const headerCellStyles = [
		{width: "auto"}, // Requests
		{width: "auto"}, // Fee
		{width: "auto"}, // Block Height
		{width: "auto"}, // Creator
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const RequestTable = memo(({data}) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const requestsDataCell = _.isNil(item?.request) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("requests-data-cell", "align-left")} to={`${consts.PATH.REQUESTS}/${item?.request}`}>
					{item?.request}
				</NavLink>
			);

			const feeDataCell = _.isNil(item?.fees) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("fee-data-cell", "align-left")}>{item?.fees}</div>
			);

			const blockHeightDataCell = _.isNil(item?.block_height) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("block-height-data-cell", "align-left")} to={`${consts.PATH.BLOCKLIST}/${item?.block_height}`}>
					{item?.block_height}
				</NavLink>
			);

			const creatorDataCell = _.isNil(item?.creator) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("creator-data-cell", "align-left")} to={`${consts.PATH.ACCOUNT}/${item?.creator}`}>
					{item?.creator}
				</NavLink>
			);
			return [requestsDataCell, feeDataCell, blockHeightDataCell, creatorDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

RequestTable.propTypes = {
	data: PropTypes.any,
};
RequestTable.defaultProps = {
	data: [],
};

export default RequestTable;
