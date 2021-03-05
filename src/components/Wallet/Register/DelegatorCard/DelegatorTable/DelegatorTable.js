/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import {formatOrai} from "src/helpers/helper";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./DelegatorTable.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const addressHeaderCell = <div className={cx("header-cell", "align-left")}>Address</div>;
	const stakedHeaderCell = <div className={cx("header-cell", "align-left")}>Staked (ORAI)</div>;
	const claimableRewardsHeaderCell = <div className={cx("header-cell", "align-left")}>Claimable Rewards (ORAI)</div>;
	const headerCells = [addressHeaderCell, stakedHeaderCell, claimableRewardsHeaderCell];
	const headerCellStyles = [{width: "auto"}, {width: "auto"}, {width: "auto"}];
	return {
		headerCells,
		headerCellStyles,
	};
};

const DelegatorTable = memo(({data = [], address = ""}) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map((item, index) => {
			let ownerBadge = null;

			if (item?.address && item.address == address) {
				ownerBadge = <span className={cx("owner-badge")}>Owner</span>;
			}

			const addressDataCell = item?.address ? (
				<div className={cx("address-data-cell", {"address-data-cell-with-owner-badge": ownerBadge})}>
					<NavLink className={cx("address")} to={`${consts.PATH.VALIDATORS}/${item.address}`}>
						{item.address}
					</NavLink>
					{ownerBadge && ownerBadge}
				</div>
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

			return [addressDataCell, stakedDataCell, claimableRewardsDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default DelegatorTable;
