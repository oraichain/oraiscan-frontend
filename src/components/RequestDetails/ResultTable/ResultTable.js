/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {logoBrand} from "src/constants/logoBrand";
import {formatFloat, formatInteger} from "src/helpers/helper";
import {_} from "src/lib/scripts";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import CheckIcon from "src/icons/Validators/CheckIcon";
import ClockIcon from "src/icons/ClockIcon";
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
			if (!_.isNil(item?.address)) {
				const matchedLogoItem = logoBrand.find(logoBrandItem => item.address === logoBrandItem.operatorAddress);

				if (matchedLogoItem) {
					validatorName = matchedLogoItem?.name ?? "-";
					validatorIcon = matchedLogoItem?.logo ?? aiIcon;
				}
			}

			const validatorDataCell = _.isNil(validatorName) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("validator-data-cell", "align-left")}>
					<div className={cx("validator")}>
						<img className={cx("validator-icon")} src={validatorIcon} alt='' />
						<span className={cx("validator-name")}>{validatorName}</span>
					</div>
				</div>
			);

			const addressDataCell = _.isNil(item?.address) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("address-data-cell", "align-left")}>{item.address}</div>
			);

			const resultDataCell = _.isNil(item?.result) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("result-data-cell", "align-left")}>{item.result}</div>
			);

			const votingPowerDataCell =
				_.isNil(item?.voting_power?.value) || _.isNil(item?.voting_power?.percent) ? (
					<div className={cx("align-left")}>-</div>
				) : (
					<div className={cx("voting-power-data-cell", "align-left")}>
						<div className={cx("voting-power")}>
							<div className={cx("voting-power-value")}>{formatInteger(item.voting_power.value)}</div>
							<div className={cx("voting-power-percent")}>{formatFloat(item.voting_power.percent)}%</div>
						</div>
					</div>
				);

			let statusElement;
			if (_.isNil(item?.status)) {
				statusElement = <div className={cx("status")}>-</div>;
			} else {
				if (item.status === "success") {
					statusElement = (
						<div className={cx("status")}>
							<CheckIcon className={cx("status-icon", "status-icon-success")} />
							<span className={cx("status-text")}>Success</span>
						</div>
					);
				} else if (item.status === "pending") {
					statusElement = (
						<div className={cx("status")}>
							<ClockIcon className={cx("status-icon", "status-icon-pending")} />
							<span className={cx("status-text")}>Pending</span>
						</div>
					);
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
