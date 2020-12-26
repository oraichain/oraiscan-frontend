import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {formatFloat} from "src/helpers/helper";
import {_, reduceString} from "src/lib/scripts";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./DelegationTable.scss";

const DelegationTable = memo(({data = []}) => {
	const cx = classNames.bind(styles);

	const validatorHeaderCell = <div className={cx("validator-header-cell", "align-left")}>Validator</div>;
	const amountHeaderCell = <div className={cx("amount-header-cell", "align-right")}>Amount</div>;
	const rewardHeaderCell = <div className={cx("reward-header-cell", "align-right")}>Reward</div>;
	const headerCells = [validatorHeaderCell, amountHeaderCell, rewardHeaderCell];
	const headerCellStyles = [
		// {minWidth: "80px"}, // Rank
		// {width: "240px"}, // Validator
		// {width: "170px"}, // Voting Power
	];

	const getDataRows = data => {
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
						<span>{formatFloat(item.amount, 3)}</span>
						<span>{item.denom}</span>
					</div>
				);

			const rewardDataCell =
				_.isNil(item?.reward) || _.isNil(item?.denom) ? (
					<div className={cx("reward-data-cell", "align-right")}>-</div>
				) : (
					<div className={cx("reward-data-cell", "align-right")}>
						<span>{formatFloat(item.reward, 3)}</span>
						<span>{item.denom}</span>
					</div>
				);

			return [
				validatorDataCell, // Validator
				amountDataCell, // Amount
				rewardDataCell, // Reward
			];
		});
	};

	const dataRows = useMemo(() => getDataRows(data), [data]);

	return <ThemedTable theme={tableThemes.DARK} headerCells={headerCells} dataRows={dataRows} headerCellStyles={headerCellStyles} />;
});

export default DelegationTable;
