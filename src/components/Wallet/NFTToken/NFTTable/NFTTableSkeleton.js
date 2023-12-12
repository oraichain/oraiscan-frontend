import React, {memo, useMemo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import {tableThemes} from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import {getHeaderRow} from "./NFTTable";
import styles from "./NFTTable.module.scss";

const NFTTableSkeleton = memo(({rows = 10}) => {
	const cx = classNames.bind(styles);
	const getDataRows = rows => {
		let dataRows = [];
		for (let i = 1; i <= rows; i++) {
			const txHashDataCell = (
				<div className={cx("skeleton-data-cell", "align-left")}>
					<Skeleton />
				</div>
			);

			const nftIDDataCell = (
				<div className={cx("skeleton-data-cell", "align-left")}>
					<Skeleton />
				</div>
			);

			const nftNameDataCell = (
				<div className={cx("skeleton-data-cell", "align-left")}>
					<Skeleton />
				</div>
			);

			const creatorTypeDataCell = (
				<div className={cx("skeleton-data-cell", "align-right")}>
					<Skeleton />
				</div>
			);

			const creatorDataCell = (
				<div className={cx("skeleton-data-cell", "align-right")}>
					<Skeleton />
				</div>
			);

			// const contractAddrDataCell = (
			// 	<div className={cx("skeleton-data-cell", "align-right")}>
			// 		<Skeleton />
			// 	</div>
			// );
			// const contractDataCell = (
			// 	<div className={cx("skeleton-data-cell", "align-right")}>
			// 		<Skeleton />
			// 	</div>
			// );
			const timeDataCell = (
				<div className={cx("skeleton-data-cell", "align-right")}>
					<Skeleton />
				</div>
			);
			const ownerDataCell = (
				<div className={cx("skeleton-data-cell", "align-right")}>
					<Skeleton />
				</div>
			);
			const descriptionDataCell = (
				<div className={cx("skeleton-data-cell", "align-right")}>
					<Skeleton />
				</div>
			);
			dataRows.push([txHashDataCell, nftIDDataCell, nftNameDataCell, creatorTypeDataCell, ownerDataCell, creatorDataCell, timeDataCell, descriptionDataCell]);
		}
		return dataRows;
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(rows), [rows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default NFTTableSkeleton;
