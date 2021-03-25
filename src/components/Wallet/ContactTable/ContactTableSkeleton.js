import React, {memo, useMemo} from "react";
import Skeleton from "react-loading-skeleton";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import {getHeaderRow} from "src/components/Wallet/ContactTable/ContactTable";
import styles from "./ContactTable.scss";

const ContactTableSkeleton = memo(({rows = 5}) => {
	const cx = classNames.bind(styles);
	const getDataRows = rows => {
		let dataRows = [];
		for (let i = 1; i <= rows; i++) {
			const nameDataCell = (
				<div className={cx("skeleton-data-cell", "align-left")}>
					<Skeleton />
				</div>
			);

			const addressDataCell = (
				<div className={cx("skeleton-data-cell", "align-left")}>
					<Skeleton />
				</div>
			);

			dataRows.push([nameDataCell, addressDataCell]);
		}
		return dataRows;
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default ContactTableSkeleton;
