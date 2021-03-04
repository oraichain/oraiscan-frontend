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
import styles from "./ClaimTable.scss";
import aiIcon from "src/assets/common/ai_ic.svg";
import giftIcon from "src/assets/wallet/gift.svg";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const validatorHeaderCell = <div className={cx("header-cell", "align-left")}>Validator</div>;
	const stakedHeaderCell = <div className={cx("header-cell", "align-left")}>Staked (ORAI)</div>;
	const claimableRewardsHeaderCell = <div className={cx("header-cell", "align-left")}>Claimable Rewards (ORAI)</div>;
	const claimHeaderCell = <div className={cx("header-cell", "align-center")}> </div>;
	const headerCells = [validatorHeaderCell, stakedHeaderCell, claimableRewardsHeaderCell, claimHeaderCell];
	const headerCellStyles = [{width: "auto"}, {width: "auto"}, {width: "auto"}, {width: "140px"}];
	return {
		headerCells,
		headerCellStyles,
	};
};

const ClaimTable = memo(({data}) => {
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

			const claimableRewardsDataCell = _.isNil(item?.claimable_rewards) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("claimable-rewards-data-cell", "align-left")}>{formatOrai(item.claimable_rewards)}</div>
			);

			const claimDataCell = (
				<div className={cx("claim-data-cell", "align-center")}>
					<button className={cx("button")}>
						Claim
						<img className={cx("button-icon")} src={giftIcon} />
					</button>
				</div>
			);

			return [validatorDataCell, stakedDataCell, claimableRewardsDataCell, claimDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default ClaimTable;
