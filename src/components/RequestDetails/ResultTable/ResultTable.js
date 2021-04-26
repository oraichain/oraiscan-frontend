/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {logoBrand} from "src/constants/logoBrand";
import {formatFloat, formatInteger} from "src/helpers/helper";
import {reduceString, _} from "src/lib/scripts";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import CheckIcon from "src/icons/Validators/CheckIcon";
import ClockIcon from "src/icons/ClockIcon";
import FailedIcon from "src/icons/Transactions/FailedIcon";
import styles from "./ResultTable.module.scss";
import aiIcon from "src/assets/common/ai_ic.svg";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const validatorHeaderCell = <div className={cx("header-cell", "align-left")}>Validator</div>;
	const addressHeaderCell = <div className={cx("header-cell", "align-left")}>Address</div>;
	const resultHeaderCell = <div className={cx("header-cell", "align-left")}>Result</div>;
	const votingPowerHeaderCell = <div className={cx("header-cell", "align-left")}>Voting Power</div>;
	const statusHeaderCell = <div className={cx("header-cell", "align-right")}>Status</div>;
	const headerCells = [validatorHeaderCell, addressHeaderCell, resultHeaderCell, votingPowerHeaderCell, statusHeaderCell];
	const headerCellStyles = [
		{width: "auto"}, // Validator
		{width: "auto"}, // Address
		{width: "auto"}, // Result
		{width: "auto"}, // Voting Power
		{width: "auto"}, // Status
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const ResultTable = memo(({data = []}) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			let validatorName;
			let validatorIcon;
			if (!_.isNil(item?.validator_address)) {
				const matchedLogoItem = logoBrand.find(logoBrandItem => item.validator_address === logoBrandItem.operatorAddress);

				if (matchedLogoItem) {
					validatorName = matchedLogoItem?.name ?? "-";
					validatorIcon = matchedLogoItem?.logo ?? aiIcon;
				}
			}
			const validatorDataCell = _.isNil(item?.validator_name) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("validator-data-cell", "align-left")}>
					<div className={cx("validator")}>
						<img className={cx("validator-icon")} src={validatorIcon} alt='' />
						<NavLink className={cx("validator-name")} to={`${consts.PATH.VALIDATORS}/${item?.validator_address}`}>
							{" "}
							{item?.validator_name?.length > 10 ? item?.validator_name?.substring(0, 10) + "...." : item?.validator_name}
						</NavLink>
					</div>
				</div>
			);

			const addressDataCell = _.isNil(item?.validator_address) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("address-data-cell", "align-left")}>{item?.validator_address}</div>
			);

			const resultDataCell = _.isNil(item?.result) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("result-data-cell", "align-left")}>{item?.result}</div>
			);

			const votingPowerDataCell =
				_.isNil(item?.voting_power) || _.isNil(item?.percentage_voting) ? (
					<div className={cx("align-left")}>-</div>
				) : (
					<div className={cx("voting-power-data-cell", "align-left")}>
						<div className={cx("voting-power")}>
							<div className={cx("voting-power-value")}>{formatInteger(item?.voting_power)}</div>
							<div className={cx("voting-power-percent")}>{formatFloat(item?.percentage_voting)}%</div>
						</div>
					</div>
				);

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
								<FailedIcon className={cx("status-icon", "status-icon-fail")} />
								<span className={cx("status-text")}>Failed</span>
							</div>
						);
						break;
					default:
						break;
				}
			}

			const statusDataCell = <div className={cx("status-data-cell", "align-right")}>{statusElement}</div>;

			return [validatorDataCell, addressDataCell, resultDataCell, votingPowerDataCell, statusDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default ResultTable;
