/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import {formatOrai} from "src/helpers/helper";
import {tableThemes} from "src/constants/tableThemes";
import {logoBrand} from "src/constants/logoBrand";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./WithdrawTable.scss";
import aiIcon from "src/assets/common/ai_ic.svg";
import arrowIcon from "src/assets/wallet/arrow_down.svg";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const validatorHeaderCell = <div className={cx("header-cell", "align-left")}>Validator</div>;
	const stakedHeaderCell = <div className={cx("header-cell", "align-left")}>Staked (ORAI)</div>;
	const rewardsHeaderCell = <div className={cx("header-cell", "align-left")}>Rewards (ORAI)</div>;
	const ubondedHeaderCell = <div className={cx("header-cell", "align-left")}>Unbonded (ORAI)</div>;
	const withdrawableHeaderCell = <div className={cx("header-cell", "align-left")}>Withdrawable (ORAI)</div>;
	const withdrawHeaderCell = <div className={cx("header-cell", "align-center")}>Withdraw</div>;
	const headerCells = [validatorHeaderCell, stakedHeaderCell, rewardsHeaderCell, ubondedHeaderCell, withdrawableHeaderCell, withdrawHeaderCell];
	const headerCellStyles = [{width: "auto"}, {width: "auto"}, {width: "auto"}, {width: "auto"}, {width: "auto"}, {width: "140px"}];
	return {
		headerCells,
		headerCellStyles,
	};
};

const WithdrawTable = memo(({data}) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map((item, index) => {
			const validatorIcon = logoBrand.find(logoBrandItem => item?.validator === logoBrandItem.operatorAddress)?.logo ?? aiIcon;

			const validatorDataCell = item?.validator ? (
				<NavLink className={cx("validator-data-cell", "align-left")} to={`${consts.PATH.VALIDATORS}/${item.validator}`}>
					<div className={cx("validator")}>
						<img className={cx("validator-icon")} src={validatorIcon} />
						<span className={cx("validator-name")}>{item.validator}</span>
					</div>
				</NavLink>
			) : (
				<div className={cx("align-left")}>-</div>
			);

			const stakedDataCell = _.isNil(item?.staked) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("staked-data-cell")}>{formatOrai(item?.staked)}</div>
			);

			const rewardsDataCell = _.isNil(item?.rewards) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("rewards-data-cell")}>{formatOrai(item?.rewards)}</div>
			);

			const unbondedDataCell = _.isNil(item?.unbonded) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("unbonded-data-cell", "align-left")}>{formatOrai(item.unbonded)}</div>
			);

			const withdrawableDataCell = _.isNil(item?.withdrawable) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("withdrawable-data-cell", "align-left")}>{formatOrai(item.withdrawable)}</div>
			);

			const withdrawDataCell = (
				<div className={cx("withdraw-data-cell", "align-center")}>
					<button className={cx("button")}>
						Withdraw
						<img className={cx("button-icon")} src={arrowIcon} />
					</button>
				</div>
			);

			return [validatorDataCell, stakedDataCell, rewardsDataCell, unbondedDataCell, withdrawableDataCell, withdrawDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default WithdrawTable;
