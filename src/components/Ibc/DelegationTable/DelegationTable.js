import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {formatOrai, parseIbc } from "src/helpers/helper";
import {_, reduceString} from "src/lib/scripts";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import CheckIcon from "src/icons/CheckIcon";
import styles from "./DelegationTable.scss";
import TimesIcon from "src/icons/TimesIcon";
import RedoIcon from "src/icons/RedoIcon";
import moment from "moment";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const txHashHeaderCell = <div className={cx("header-cell", "align-left")}>Tx Hash</div>;
	const typeHeaderCell = <div className={cx("header-cell", "align-left")}>Type</div>;
	const resultHeaderCell = <div className={cx("header-cell", "align-left")}>Result</div>;
	const amountHeaderCell = <div className={cx("header-cell", "align-right")}>Amount</div>;
	const feeHeaderCell = <div className={cx("header-cell", "align-right")}>Fee</div>;
	const heightHeaderCell = <div className={cx("header-cell", "align-right")}>Height</div>;
	const timeHeaderCell = <div className={cx("header-cell", "align-right")}>Time</div>;
	const headerCells = [txHashHeaderCell, typeHeaderCell, resultHeaderCell, amountHeaderCell, feeHeaderCell, heightHeaderCell, timeHeaderCell];
	const headerCellStyles = [
		{width: "15%", minWidth: "100px"}, //  Tx Hash
		{width: "20%", minWidth: "200px"}, // Type
		{width: "15%", minWidth: "130px"}, // Result
		{width: "15%", minWidth: "130px"}, // Amount
		{width: "13%", minWidth: "150px"}, // Fee
		{width: "10%", minWidth: "80px"}, // Height
		{width: "12%", minWidth: "80px"}, // Time
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
			let resultDataCellContent;
			if (!item?.transaction?.code) {
				resultDataCellContent = (
					<div className={cx("result")}>
						<CheckIcon className={cx("result-icon", "result-icon-success")} />
						<span className={cx("result-text")}>Success</span>
					</div>
				);
			} else if (item?.transaction?.code) {
				resultDataCellContent = (
					<div className={cx("result")}>
						<TimesIcon className={cx("result-icon", "result-icon-fail")} />
						<span className={cx("result-text")}>Failure</span>
					</div>
				);
			} else if (item.transaction?.code === "pending") {
				resultDataCellContent = (
					<div className={cx("result")}>
						<RedoIcon className={cx("result-icon", "result-icon-pending")} />
						<span className={cx("result-text")}>Pending</span>
					</div>
				);
			}

			const txHashDataCell =
				_.isNil(item?.transaction) && _.isNil(item?.transaction?.tx_hash) ? (
					<div className={cx("align-left")}>-</div>
				) : (
					<div className={cx("hash-data-cell", "align-left")}>
						<NavLink className={cx("link")} to={`/txs/${item?.transaction?.tx_hash}`}>
							{reduceString(item?.transaction?.tx_hash, 6, 6)}
						</NavLink>
					</div>
				);
			const typeDataCell =
				_.isNil(item?.tx_type) ? (
					<div className={cx("align-left")}>-</div>
				) : (
					<div className={cx("type-data-cell", "align-left")}>
						<div className={cx("type")}>
							<span className={cx("type-text")}>{item.tx_type}</span>
						</div>
					</div>
				);
			const resultDataCell = _.isNil(item?.transaction?.code) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("result-data-cell", "align-left")}>{resultDataCellContent}</div>
			);

			const amountDataCell = _.isNil(item?.amount) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("amount-data-cell", "align-right")}>
					<div className={cx("amount")}>
						<span className={cx("amount-value")}>{formatOrai(item.amount)}</span>
						<span className={cx("amount-denom")}>{parseIbc(item.denom)}</span>
					</div>
				</div>
			);
			const feeDataCell =
				_.isNil(item?.transaction) || _.isNil(item?.transaction?.gas_wanted) ? (
					<div className={cx("align-right")}>-</div>
				) : (
					<div className={cx("amount-data-cell", "align-right")}>
						<div className={cx("amount")}>
							<span className={cx("amount-value")}>{JSON.parse(item?.transaction?.fee)?.amount?.[0]?.value / Math.pow(10,6) || "0"}</span>
							<span className={cx("amount-denom")}> {JSON.parse(item?.transaction?.fee)?.amount?.[0]?.denom}</span>
						</div>
					</div>
				);
			const heightDataCell =
				_.isNil(item?.transaction) || _.isNil(item?.transaction?.height) ? (
					<div className={cx("align-right")}>-</div>
				) : (
					<div className={cx("height-data-cell", "align-right")}>
						<div className={cx("height")}>
							<span className={cx("height-text")}>{item?.transaction?.height}</span>
						</div>
					</div>
				);
			const timeDataCell = _.isNil(item?.created_at) ? (
				<div className={cx("align-right")}>-</div>
			) : (
				<div className={cx("time-data-cell", "align-right")}>
					<div className={cx("time")}>
						<span className={cx("time-text")}>{moment(item.created_at).fromNow()}</span>
					</div>
				</div>
			);
			return [txHashDataCell, typeDataCell, resultDataCell, amountDataCell, feeDataCell, heightDataCell, timeDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default DelegationTable;
