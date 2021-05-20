/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo} from "react";
import {NavLink, useParams} from "react-router-dom";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import {_} from "src/lib/scripts";
import {formatOrai} from "src/helpers/helper";
import consts from "src/constants/consts";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import CheckIcon from "src/icons/Validators/CheckIcon";
import ClockIcon from "src/icons/ClockIcon";
import TimesIcon from "src/icons/TimesIcon";
import styles from "./ReportTable.module.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const nameHeaderCell = <div className={cx("header-cell", "align-left")}>Name</div>;
	const validatorAddressHeaderCell = <div className={cx("header-cell", "align-left")}>Validator Address</div>;
	const heightHeaderCell = <div className={cx("header-cell", "align-left")}>Height</div>;
	const resultHeaderCell = <div className={cx("header-cell", "align-left")}>Result</div>;
	const feeHeaderCell = <div className={cx("header-cell", "align-left")}>Fee</div>;
	const statusHeaderCell = <div className={cx("header-cell", "align-right")}>Status</div>;
	const moreHeaderCell = <div className={cx("header-cell", "align-right")}></div>;
	const headerCells = [nameHeaderCell, validatorAddressHeaderCell, heightHeaderCell, resultHeaderCell, feeHeaderCell, statusHeaderCell, moreHeaderCell];
	const headerCellStyles = [
		{width: "auto"}, // Name
		{width: "auto"}, // Test Case Results
		{width: "auto"}, // Height
		{width: "auto"}, // Result
		{width: "auto"}, // Fee
		{width: "auto"}, // Status
		{width: "auto"}, // More
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const ReportTable = memo(({data}) => {
	const params = useParams();
	const requestId = params?.["id"];
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			let statusElement;
			if (_.isNil(item?.status)) {
				statusElement = <div className={cx("status")}>-</div>;
			} else {
				switch (item?.status) {
					case "success":
						statusElement = (
							<div className={cx("status")}>
								<CheckIcon className={cx("status-icon", "status-icon-success")} />
								<span className={cx("status-text")}>Success</span>
							</div>
						);
						break;
					case "pending":
						statusElement = (
							<div className={cx("status")}>
								<ClockIcon className={cx("status-icon", "status-icon-pending")} />
								<span className={cx("status-text")}>Pending</span>
							</div>
						);
						break;
					case "fail":
						statusElement = (
							<div className={cx("status")}>
								<TimesIcon className={cx("status-icon", "status-icon-fail")} />
								<span className={cx("status-text")}>Failed</span>
							</div>
						);
						break;
					default:
						break;
				}
			}

			const nameDataCell = _.isNil(item?.validator_name) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("name-data-cell", "align-left")}>{item?.validator_name}</div>
			);

			const validatorAddressDataCell = _.isNil(item?.validator_address) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("test-case-results-data-cell", "align-left")}>{item?.validator_address}</div>
			);

			const heightDataCell = _.isNil(item?.height) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("height-data-cell", "align-left")}>{item.height}</div>
			);

			const resultDataCell = _.isNil(item?.height) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("height-data-cell", "align-left")}>{item?.result}</div>
			);

			const feeDataCell = _.isNil(item?.fee) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("result-data-cell", "align-left")}>
					<div className={cx("amount")}>
						<span className={cx("amount-value")}>{formatOrai(item?.fee)}</span>
						<span className={cx("amount-denom")}>ORAI</span>
					</div>
				</div>
			);

			const statusDataCell = <div className={cx("status-data-cell", "align-right")}>{statusElement}</div>;

			const moreDataCell = _.isNil(item?.validator_address) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("more-data-cell", "align-right")}>
					<NavLink
						className={cx("more")}
						to={`${consts.PATH.REQUESTS}/${requestId}/report?validator_address=${item?.validator_address ? item?.validator_address : ""}`}>
						View more
					</NavLink>
				</div>
			);

			return [nameDataCell, validatorAddressDataCell, heightDataCell, resultDataCell, feeDataCell, statusDataCell, moreDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

ReportTable.propTypes = {
	data: PropTypes.array,
};
ReportTable.defaultProps = {
	data: [],
};

export default ReportTable;
