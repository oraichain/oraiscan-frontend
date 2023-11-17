import React, { memo, useMemo } from "react";
import classNames from "classnames/bind";
import { formatOrai } from "src/helpers/helper";
import { tableThemes } from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./TopHoldersTable.module.scss";
import { isNil } from "lodash";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const addressHeaderCell = <div className={cx("header-cell", "align-left")}>Address</div>;
	const balanceHeaderCell = <div className={cx("header-cell", "align-left")}>Balance</div>;

	let headerCells = [addressHeaderCell, balanceHeaderCell];
	let headerCellStyles = [
		{ width: "50%", minWidth: "180px" }, // Address
		{ width: "50%", minWidth: "120px" }, // Balance
	];

	return {
		headerCells,
		headerCellStyles,
	};
};

const TopHoldersTable = memo(({ data = [], tokenInfo = {} }) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const addressDataCell = (item?.address, `${item.address}`);

			const balanceDataCell = isNil(item?.balance) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("txs-data-cell", "align-right")}>
					{formatOrai(Number(item.balance), Math.pow(10, tokenInfo?.decimals))} <span>{tokenInfo?.symbol.toUpperCase()}</span>
				</div>
			);

			return [addressDataCell, balanceDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default TopHoldersTable;
