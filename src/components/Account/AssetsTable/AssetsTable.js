import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {formatOrai} from "src/helpers/helper";
import {_, reduceString , reduceStringAssets } from "src/lib/scripts";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./AssetsTable.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const validatorHeaderCell = <div className={cx("header-cell", "align-left")}>Name</div>;
	const amountHeaderCell = <div className={cx("header-cell", "align-right")}>Amount</div>;
	const rewardHeaderCell = <div className={cx("header-cell", "align-right")}>Total Value</div>;
	const headerCells = [validatorHeaderCell, amountHeaderCell, rewardHeaderCell];
	const headerCellStyles = [
		{minWidth: "140px"}, // Name
		{minWidth: "80px"}, // Amount
		{minWidth: "80px"}, // Total Value
	];

	return {
		headerCells,
		headerCellStyles,
	};
};

const AssetsTable = memo(({data = []}) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const validatorDataCell = _.isNil(item?.validator_address) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("align-left")}>
					{reduceStringAssets(item.validator_address, 30, 0)}
				</div>
				// <NavLink className={cx("validator-data-cell", "align-left")} to={`${consts.PATH.VALIDATORS}/${item.validator_address}`}>
				// 	{reduceString(item.validator_address, 15, 0)}
				// 	{item.validator_address}
				// </NavLink>
			);

			const amountDataCell =
				_.isNil(item?.amount) || _.isNil(item?.denom) ? (
					<div className={cx("align-right")}>-</div>
				) : (
					<div className={cx("amount-data-cell", "align-right")}>
						<div className={cx("amount")}>
							<span className={cx("amount-value")}>{formatOrai(item.amount)}</span>
							<span className={cx("amount-denom")}>{reduceStringAssets(item.denom,7,3)}</span>
						</div>
					</div>
				);

			const rewardDataCell =
				_.isNil(item?.reward) || _.isNil(item?.denom_reward) ? (
					<div className={cx("reward-data-cell", "align-right")}>-</div>
				) : (
					<div className={cx("reward-data-cell", "align-right")}>
						<div className={cx("reward")}>
							<span className={cx("reward-value")}>{formatOrai(item.reward)}</span>
							<span className={cx("reward-denom")}>{item.denom_reward}</span>
						</div>
					</div>
				);

			return [validatorDataCell, amountDataCell, rewardDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default AssetsTable;
