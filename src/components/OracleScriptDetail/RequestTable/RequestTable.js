import React, {memo, useMemo} from "react";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import CheckIcon from "src/icons/CheckIcon";
import ClockIcon from "src/icons/ClockIcon";
import styles from "./RequestTable.module.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const requestsHeaderCell = <div className={cx("header-cell", "align-left")}>Requests</div>;
	const txHashHeaderCell = <div className={cx("header-cell", "align-left")}>Tx Hash</div>;
	const reportStatusHeaderCell = <div className={cx("header-cell", "align-left")}>Report Status</div>;
	const statusHeaderCell = <div className={cx("header-cell", "align-center")}>Status</div>;
	const ownerHeaderCell = <div className={cx("header-cell", "align-right")}>Owner</div>;
	const headerCells = [requestsHeaderCell, txHashHeaderCell, reportStatusHeaderCell, statusHeaderCell, ownerHeaderCell];
	const headerCellStyles = [
		{width: "auto"}, // Requests
		{width: "auto"}, // Tx Hash
		{width: "366px", minWidth: "366px"}, // Report Status
		{width: "auto"}, // Status
		{width: "auto"}, // Owner
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const RequestTable = memo(({data}) => {
	const validators = useSelector(state => state.blockchain.validators);

	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const requestsDataCell = _.isNil(item?.request) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("requests-data-cell", "align-left")} to='/'>
					{item.request}
				</NavLink>
			);

			const txHashDataCell = _.isNil(item?.tx_hash) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("tx-hash-data-cell", "align-left")} to={`${consts.PATH.TXLIST}/${item.tx_hash}`}>
					{item.tx_hash}
				</NavLink>
			);

			let minValue = _.isNil(item?.min) ? "-" : item.min;
			let finishedValue = _.isNil(item?.finished) ? "-" : item.finished;
			let totalValue = _.isNil(item?.total) ? "-" : item.total;
			let graphElement;

			if (isNaN(finishedValue) || isNaN(totalValue)) {
				graphElement = <div className={cx("graph-error")}>-</div>;
			} else {
				finishedValue = parseFloat(finishedValue);
				totalValue = parseFloat(totalValue);

				if (finishedValue === totalValue) {
					graphElement = <div className={cx("graph-success")}></div>;
				} else if (finishedValue < totalValue) {
					graphElement = <div className={cx("graph-pending")} style={{width: `${(finishedValue * 100) / totalValue}%`}}></div>;
				} else {
					graphElement = <div className={cx("graph-error")}>-</div>;
				}
			}

			const reportStatusDataCell = (
				<div className={cx("report-status-data-cell")}>
					<div className={cx("info")}>
						<div className={cx("info-time")}>Min {minValue}</div>
						<div className={cx("info-progress")}>
							{finishedValue} of {totalValue}
						</div>
					</div>
					<div className={cx("graph")}>
						<div className={cx("graph-total")}></div>
						{graphElement}
					</div>
				</div>
			);

			let statusElement;
			if (isNaN(finishedValue) || isNaN(totalValue) || finishedValue > totalValue) {
				statusElement = <div className={cx("status")}>-</div>;
			} else {
				if (finishedValue === totalValue) {
					statusElement = (
						<div className={cx("status")}>
							<CheckIcon className={cx("status-icon", "status-icon-success")} />
							<span className={cx("status-text")}>Success</span>
						</div>
					);
				} else {
					statusElement = (
						<div className={cx("status")}>
							<ClockIcon className={cx("status-icon", "status-icon-pending")} />
							<span className={cx("status-text")}>Pending</span>
						</div>
					);
				}
			}
			const statusDataCell = <div className={cx("status-data-cell", "align-center")}>{statusElement}</div>;

			const ownerNames = Object.keys(validators);
			let matchOwnerName = null;
			if (item?.owner_address) {
				for (let ownerName of ownerNames) {
					if (!_.isNil(validators?.[ownerName]?.operatorAddr) && validators[ownerName].operatorAddr === item.owner_address) {
						matchOwnerName = ownerName;
						break;
					}
				}
			}

			const ownerDataCell = _.isNil(matchOwnerName) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("owner-data-cell", "align-right")}>
					<NavLink className={cx("owner")} to={`${consts.PATH.VALIDATORS}/${item.owner_address}`}>
						{matchOwnerName}
					</NavLink>
				</div>
			);

			return [requestsDataCell, txHashDataCell, reportStatusDataCell, statusDataCell, ownerDataCell];
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
