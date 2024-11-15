/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo} from "react";
import {NavLink, useParams} from "react-router-dom";
import {Tooltip} from "@material-ui/core";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import {Base64} from "js-base64";
import {_} from "src/lib/scripts";
import {formatOrai} from "src/helpers/helper";
import {logoBrand} from "src/constants/logoBrand";
import consts from "src/constants/consts";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import CheckIcon from "src/icons/Validators/CheckIcon";
import ClockIcon from "src/icons/ClockIcon";
import TimesIcon from "src/icons/TimesIcon";
import aiIcon from "src/assets/common/ai_ic.svg";
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
		{width: "16%"}, // Name
		{width: "auto"}, // Address
		{width: "auto"}, // Height
		{width: "50%"}, // Result
		{width: "auto"}, // Fee
		{width: "auto"}, // Status
		{width: "10%"}, // More
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
			let validatorName;
			let validatorIcon;
			if (!_.isNil(item?.reporter?.validator)) {
				const matchedLogoItem = logoBrand.find(logoBrandItem => item?.reporter?.validator === logoBrandItem.operatorAddress);

				if (matchedLogoItem) {
					validatorName = matchedLogoItem?.name ?? "-";
					validatorIcon = matchedLogoItem?.logo ?? aiIcon;
				}
			}

			if (_.isNil(item?.resultStatus)) {
				statusElement = <div className={cx("status")}>-</div>;
			} else {
				switch (item?.resultStatus) {
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

			const nameDataCell = _.isNil(item?.reporter?.name) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("validator-data-cell", "align-left")}>
					<div className={cx("validator")}>
						<img className={cx("validator-icon")} src={validatorIcon} alt='' />
						<NavLink className={cx("validator-name")} to={`${consts.PATH.VALIDATORS}/${item?.reporter?.validator}`}>
							{item?.reporter?.name?.length > 10 ? item?.reporter?.name?.substring(0, 10) + "...." : item?.reporter?.name}
						</NavLink>
					</div>
				</div>
			);

			const validatorAddressDataCell = _.isNil(item?.reporter?.validator) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<Tooltip title={item?.reporter?.validator} arrow placement='top-start'>
					<div className={cx("address-data-cell", "align-left")}>
						<NavLink className={cx("address-data-cell-value")} to={`${consts.PATH.VALIDATORS}/${item?.reporter?.validator}`}>
							{`${item?.reporter?.validator.slice(0, 11)}...${item?.reporter?.validator.slice(-11)}`}{" "}
						</NavLink>
					</div>
				</Tooltip>
			);

			const heightDataCell = _.isNil(item?.blockHeight) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("height-data-cell", "align-left")}>{item?.blockHeight}</div>
			);

			const resultDataCell = _.isNil(item?.aggregatedResult) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("result-data-cell", "align-left")}>{Base64.decode(item?.aggregatedResult)}</div>
			);

			const feeDataCell = _.isNil(item?.fees) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("fees-data-cell", "align-left")}>
					<div className={cx("amount")}>
						<span className={cx("amount-value")}>{formatOrai(item?.fees)}</span>
						<span className={cx("amount-denom")}>ORAI</span>
					</div>
				</div>
			);

			const statusDataCell = <div className={cx("status-data-cell", "align-right")}>{statusElement}</div>;

			const moreDataCell = _.isNil(item?.reporter?.validator) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("more-data-cell", "align-right")}>
					<NavLink
						className={cx("more")}
						to={`${consts.PATH.REQUESTS}/${requestId}/report?validator_address=${item?.reporter?.validator ? item?.reporter?.validator : ""}`}>
						View more
					</NavLink>
				</div>
			);

			return [nameDataCell, validatorAddressDataCell, heightDataCell, resultDataCell, feeDataCell, statusDataCell, moreDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return (
		<ThemedTable
			theme={tableThemes.LIGHT}
			headerCellStyles={headerRow.headerCellStyles}
			headerCells={headerRow.headerCells}
			dataRows={dataRows}
			dataCellStyles={"result-data-cell"}
		/>
	);
});

ReportTable.propTypes = {
	data: PropTypes.array,
};
ReportTable.defaultProps = {
	data: [],
};

export default ReportTable;
