import classNames from "classnames/bind";
import {memo, useMemo} from "react";
import ThemedTable from "src/components/common/ThemedTable";
import {tableThemes} from "src/constants/tableThemes";
import {amountDecimal18, formatOrai} from "src/helpers/helper";
import {reduceStringAssets, _} from "src/lib/scripts";
import styles from "./AssetsTable.module.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const validatorHeaderCell = <div className={cx("header-cell", "align-left")}>Original Denom</div>;
	const amountHeaderCell = <div className={cx("header-cell", "align-right")}>Amount</div>;
	const rewardHeaderCell = <div className={cx("header-cell", "align-right")}>Total Value</div>;
	const headerCells = [validatorHeaderCell, amountHeaderCell, rewardHeaderCell];
	
	const headerCellStyles = [
		{ width: "40%" }, // Name
		{ width: "30%" }, // Amount
		{ width: "30%" }, // Total Value
	];

	return {
		headerCells,
		headerCellStyles,
	};
};

const AssetsTable = memo(({ data = [] }) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}
		return data.map(item => {
			const validatorAddressSplit = item?.validator_address?.split("/")?.[0] || item?.validator_address;
			let tokenInfo = amountDecimal18.find(e => e.address?.toLowerCase() == validatorAddressSplit?.toLowerCase());
			if(!tokenInfo && item.validator_address.includes("erc20")) {
				tokenInfo = { 
					name: "ERC20",
					decimal: 18
				}
			}
			if(!tokenInfo && item.validator_address.includes("airi")) {
				tokenInfo = { 
					name: "AIRI",
					decimal: 18
				}
			}
			const validatorDataCell = _.isNil(item?.validator_address) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("denom-data-cell", "align-left")}>{tokenInfo ? tokenInfo.name : reduceStringAssets(item.validator_address, 30, 0)}</div>
			);

			const amountDataCell =
				_.isNil(item?.amount) || _.isNil(item?.denom) ? (
					<div className={cx("align-right")}>-</div>
				) : (
					<div className={cx("amount-data-cell", "align-right")}>
						<div className={cx("amount")}>
							<span className={cx("amount-value")}>{formatOrai(item.amount, Math.pow(10, tokenInfo ? tokenInfo.decimal : 6))}</span>
							<span className={cx("amount-denom")}>{tokenInfo ? tokenInfo?.name : reduceStringAssets(item.denom, 7, 3)}</span>
						</div>
					</div>
				);

			const rewardDataCell =
				_.isNil(item?.reward) || _.isNil(item?.denom_reward) ? (
					<div className={cx("reward-data-cell", "align-right")}>-</div>
				) : (
					<div className={cx("reward-data-cell", "align-right")}>
						<div className={cx("reward")}>
							{/* <span className={cx("reward-value")}>{formatOrai(item.reward)}</span> */}
							<span className={cx("reward-value")}>{formatOrai(item.reward, Math.pow(10, tokenInfo ? tokenInfo.decimal : 6))}</span>
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
