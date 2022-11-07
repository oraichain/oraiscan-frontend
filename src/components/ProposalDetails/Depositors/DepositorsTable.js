import React, {memo, useMemo} from "react";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import {NavLink} from "react-router-dom";
import consts from "src/constants/consts";
import {reduceString, setAgoTime} from "src/lib/scripts";
import {formatOrai, formatFloat} from "src/helpers/helper";
import styles from "./Depositors.module.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const depositorHeaderCell = <div className={cx("header-cell", "align-left")}>Depositor</div>;
	const txHashHeaderCell = <div className={cx("header-cell", "align-left")}>Txhash</div>;
	const amountHeaderCell = <div className={cx("header-cell", "align-left")}>Amount</div>;
	const timeHeaderCell = <div className={cx("header-cell", "align-right")}>Time</div>;
	const headerCells = [depositorHeaderCell, txHashHeaderCell, amountHeaderCell, timeHeaderCell];
	const headerCellStyles = [
		{width: "24%", minWidth: "240px"},
		{width: "20%", minWidth: "140px"},
		{width: "14%", minWidth: "100px"},
		{width: "18%", minWidth: "100px"},
	];
	return {
		headerCells,
		headerCellStyles,
	};
};

const DepositorsTable = memo(({data = []}) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}
		let itemAmount = {};
		return data.map((item, index) => {
			if (item?.amount) {
				const denom = item?.amount.slice(-4);
				const amount = item?.amount.slice(0, -4);
				itemAmount = {
					amount,
					denom,
				};
			}

			const depositorDataCell = (
				<div className={cx("align-left")}>
					<NavLink className={cx("tx-hash-data-cell", "align-left")} to={`${consts.PATH.ACCOUNT}/${item?.account_address}`}>
						{item?.account_address}
					</NavLink>
				</div>
			);
			const txHashDataCell = (
				<div className={cx("align-left")}>
					{item?.tx_hash ? (
						<NavLink className={cx("tx-hash-data-cell", "align-left")} to={`${consts.PATH.TXLIST}/${item?.tx_hash}`}>
							{reduceString(item?.tx_hash, 6, 6)}
						</NavLink>
					) : (
						"-"
					)}
				</div>
			);
			const answerDataCell = (
				<div className={cx("align-left")}>
					{formatOrai(itemAmount?.amount)} {itemAmount?.denom.toUpperCase()}
				</div>
			);
			const timeDataCell = <div className={cx("align-right")}>{setAgoTime(item?.time_deposit)}</div>;

			return [depositorDataCell, txHashDataCell, answerDataCell, timeDataCell];
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
			// rowMotions={rowMotions}
		/>
	);
});

export default DepositorsTable;
