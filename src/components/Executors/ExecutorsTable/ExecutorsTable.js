import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {formatOrai} from "src/helpers/helper";
import {_, reduceString, reduceStringAssets} from "src/lib/scripts";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./ExecutorsTable.module.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const publicKeyHeaderCell = <div className={cx("header-cell", "align-left")}>Executor Public Keys</div>;
	const executingHeaderCell = <div className={cx("header-cell", "align-right")}>Index</div>;
	const activeHeaderCell = <div className={cx("header-cell", "align-right")}>Active</div>;
	const headerCells = [publicKeyHeaderCell, executingHeaderCell, activeHeaderCell];
	const headerCellStyles = [
		{minWidth: "140px"}, // Name
		{minWidth: "80px"}, // Index
		{minWidth: "80px"}, // Active
	];

	return {
		headerCells,
		headerCellStyles,
	};
};

const ExecutorsTable = memo(({data = []}) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const publicKeyDataCell = _.isNil(item?.pubkey) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("align-left")}>
					{/* {reduceStringAssets(item.pubkey, 30, 0)} */}
					{item.pubkey}
				</div>
			);

			const executingKeyDataCell = _.isNil(item?.index) ? <div className={cx("align-right")}>-</div> : <div className={cx("align-right")}>{item.index}</div>;

			const activeDataCell =
				_.isNil(item?.is_active) || _.isNil(item?.is_active) ? (
					<div className={cx("align-right")}>-</div>
				) : (
					<div className={cx("active-data-cell", "align-right")}>
						<div className={cx("active")}>
							<span className={cx("active-value")}>{item.is_active ? "true" : "false"}</span>
						</div>
					</div>
				);

			return [publicKeyDataCell, executingKeyDataCell, activeDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default ExecutorsTable;
