import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {formatOrai} from "src/helpers/helper";
import {_, reduceString} from "src/lib/scripts";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./DelegationTable.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const validatorHeaderCell = <div className={cx("header-cell", "align-left")}>Validator</div>;
	const amountHeaderCell = <div className={cx("header-cell", "align-right")}>Amount</div>;
	const rewardHeaderCell = <div className={cx("header-cell", "align-right")}>Reward</div>;
	const headerCells = [validatorHeaderCell, amountHeaderCell, rewardHeaderCell];
	const headerCellStyles = [
		{minWidth: "100px"}, // Validator
		{minWidth: "100px"}, // Amount
		{minWidth: "100px"}, // Reward
	];

	return {
		headerCells,
		headerCellStyles,
	};
};

const DelegationTable = memo(({data = []}) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const validatorDataCell = _.isNil(item?.validator_address) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("validator-data-cell", "align-left")} to={`${consts.API.VALIDATORS}/${item.validator_address}`}>
					{reduceString(item.validator_address, 6, 6)}
				</NavLink>
			);

			const amountDataCell =
				_.isNil(item?.amount) || _.isNil(item?.denom) ? (
					<div className={cx("align-right")}>-</div>
				) : (
					<div className={cx("amount-data-cell", "align-right")}>
						<div className={cx("amount")}>
							<span className={cx("amount-value")}>{formatOrai(item.amount)}</span>
							<span className={cx("amount-denom")}>{item.denom}</span>
						</div>
					</div>
				);

			const rewardDataCell =
				_.isNil(item?.reward) || _.isNil(item?.denom) ? (
					<div className={cx("reward-data-cell", "align-right")}>-</div>
				) : (
					<div className={cx("reward-data-cell", "align-right")}>
						<div className={cx("reward")}>
							<span className={cx("reward-value")}>{formatOrai(item.reward)}</span>
							<span className={cx("reward-denom")}>{item.denom}</span>
						</div>
					</div>
				);

			return [validatorDataCell, amountDataCell, rewardDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data]);

	return <ThemedTable theme={tableThemes.DARK} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default DelegationTable;
