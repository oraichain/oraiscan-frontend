import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_, reduceString} from "src/lib/scripts";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./DelegatorsTable.scss";
import {formatOrai} from "src/helpers/helper";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const delegatorAddressHeaderCell = <div className={cx("header-cell", "align-left")}>Delegator Address</div>;
	const amountHeaderCell = <div className={cx("header-cell", "align-right")}>Amount</div>;
	const shareHeaderCell = <div className={cx("header-cell", "align-right")}>Share</div>;
	const headerCells = [delegatorAddressHeaderCell, amountHeaderCell, shareHeaderCell];
	const headerCellStyles = [
		{width: "auto"}, // Delegator Address
		{width: "auto"}, // Amount
		{width: "auto"}, // Share
	];

	return {
		headerCells,
		headerCellStyles,
	};
};

const DelegatorsTable = memo(({data = []}) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const delegatorAddressDataCell = _.isNil(item?.delegator_address) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("delegator-address-data-cell", "align-left")} to={`${consts.PATH.ACCOUNT}/${item.delegator_address}`}>
					{reduceString(item.delegator_address, 6, 6)}
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

			const shareDataCell = _.isNil(item?.shares) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("shares-data-cell", "align-right")}>{item.shares}%</div>
			);

			return [delegatorAddressDataCell, amountDataCell, shareDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data]);

	return <ThemedTable theme={tableThemes.DARK} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default DelegatorsTable;
