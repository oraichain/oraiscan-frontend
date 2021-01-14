import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import getTxType from "src/constants/getTxType";
import {_, reduceString, setAgoTime} from "src/lib/scripts";
import {formatOrai} from "src/helpers/helper";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./DelegatedTable.scss";
import successIcon from "src/assets/transactions/success_ic.svg";
import failureIcon from "src/assets/transactions/fail_ic.svg";
import moreIcon from "src/assets/transactions/tx_more_btn.svg";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const addressHeaderCell = <div className={cx("header-cell", "align-left")}>Address</div>;
	const stakeHeaderCell = <div className={cx("header-cell", "align-left")}>Staked (ORAI)</div>;
	const claimHeaderCell = <div className={cx("header-cell", "align-left")}>Claimable Rewards (ORAI)</div>;
	const headerCells = [addressHeaderCell, stakeHeaderCell, claimHeaderCell];
	const headerCellStyles = [{width: "30.33%"}, {width: "30.33%"}, {width: "30.33%"}];
	return {
		headerCells,
		headerCellStyles,
	};
};

const DelegatedTable = memo(({data = []}) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const addressHashDataCell = _.isNil(item?.address) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("parent-hash-data-cell", "align-left")} to={`${consts.API.TXLIST}/${item.parent_hash}`}>
					{reduceString(item.address, 6, 6)}
				</NavLink>
			);

			const stakeDataCell = _.isNil(item?.stake) ? <div className={cx("align-left")}>-</div> : <div className={cx("node-data-cell")}>{item.stake}</div>;

			const claimDataCell = _.isNil(item?.claim) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("txs-data-cell", "align-left")}>{item.claim}</div>
			);

			return [addressHashDataCell, stakeDataCell, claimDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default DelegatedTable;
