import classNames from "classnames/bind";
import React, {memo, useMemo} from "react";
import ThemedTable from "src/components/common/ThemedTable";
import {tableThemes} from "src/constants/tableThemes";
import {_} from "src/lib/scripts";
import styles from "./ExecutorsTable.module.scss";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const publicKeyHeaderCell = <div className={cx("header-cell", "align-left")}>Executor Public Keys</div>;
	const executingHeaderCell = <div className={cx("header-cell", "align-right")}>Index</div>;
	const activeHeaderCell = <div className={cx("header-cell", "align-right")}>Active</div>;
	const headerCells = [publicKeyHeaderCell, executingHeaderCell, activeHeaderCell];
	const headerCellStyles = [
		{width: "72%"}, // Name
		{width: "14%"}, // Index
		{width: "14%"}, // Active
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
