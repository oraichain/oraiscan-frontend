import React, { memo, useMemo } from "react";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import consts from "src/constants/consts";
import { _, reduceString, setAgoTime } from "src/lib/scripts";
import { formatOrai } from "src/helpers/helper";
import { tableThemes } from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./NFTTable.module.scss";
import { string } from "prop-types";

const cx = classNames.bind(styles);

export const getHeaderRow = () => {
	const txHashHeaderCell = <div className={cx("header-cell", "align-left")}>TxHash</div>;
	const contractAddrHeaderCell = <div className={cx("header-cell", "align-left")}>Contract address</div>;
	const contractHeaderCell = <div className={cx("header-cell", "align-left")}>Contract</div>;
	const creatorHeaderCell = <div className={cx("header-cell", "align-left")}>Creator</div>;
	const creatorTypeHeaderCell = <div className={cx("header-cell", "align-left")}>Creator Type</div>;
	const nftNameHeaderCell = <div className={cx("header-cell", "align-left")}>NFT Name</div>;
	const nftIDHeaderCell = <div className={cx("header-cell", "align-left")}>NFT ID</div>;
	const timeHeaderCell = <div className={cx("header-cell", "align-left")}>Time</div>;

	let headerCells = [
		txHashHeaderCell,
		nftIDHeaderCell,
		nftNameHeaderCell,
		creatorTypeHeaderCell,
		creatorHeaderCell,
		contractAddrHeaderCell,
		contractHeaderCell,
		timeHeaderCell,
	];
	let headerCellStyles = [
		{ width: "14%", minWidth: "180px" }, // TxHash
		{ width: "8%", minWidth: "80px" }, // NFT ID
		{ width: "14%", minWidth: "120px" }, // NFT Name
		{ width: "12%", minWidth: "120px" }, // Creator type
		{ width: "14%", minWidth: "180px" }, // Creator
		{ width: "14%", minWidth: "180px" }, // Contract address
		{ width: "14%", minWidth: "180px" }, // Contract
		{ width: "12%", minWidth: "120px" }, // Time
	];

	return {
		headerCells,
		headerCellStyles,
	};
};

const reduceStringAdress = (value, toHref = "", isStyle, rawString = false) => {
	const result = _.isNil(value) ? (
		<div className={cx("align-center")}>-</div>
	) : (
		<NavLink className={cx("sm-contract-data-cell")} to={toHref}>
			{isStyle === 1 ? <div className={cx("align-right")}>{rawString ? value : reduceString(value, 6, 6)}</div> : rawString ? value : reduceString(value, 6, 6)}
		</NavLink>
	);
	return result;
};

const NFTTable = memo(({ data = [], address }) => {
	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map(item => {
			const txHashDataCell = reduceStringAdress(item?.tx_hash, `${consts.PATH.TXLIST}/${item.tx_hash}`);

			const contractAddrDataCell = reduceStringAdress(item?.contract_address, `${consts.PATH.ACCOUNT}/${item?.contract_address}`);
			const contractDataCell = reduceStringAdress(item?.contract, `${consts.PATH.ACCOUNT}/${item?.contract}`);
			const creatorDataCell = reduceStringAdress(item?.creator, `${consts.PATH.ACCOUNT}/${item?.creator}`);

			const creatorTypeDataCell = _.isNil(item?.creator_type) ? (
				<div className={cx("height-data-cell", "align-center")}>-</div>
			) : (
				<div className={cx("height-data-cell", "align-left")} to={`${consts.API.BLOCKLIST}/${item.creator_type}`}>
					{item.creator_type.toUpperCase()}
				</div>
			);

			const nftNameDataCell = _.isNil(item?.nft_name) ? (
				<div className={cx("height-data-cell", "align-center")}>-</div>
			) : (
				<div className={cx("height-data-cell", "align-left")} to={`${consts.API.BLOCKLIST}/${item.nft_name}`}>
					{item.nft_name}
				</div>
			);

			const nftIDDataCell = _.isNil(item?.nft_id) ? (
				<div className={cx("height-data-cell", "align-center")}>-</div>
			) : (
				<div className={cx("height-data-cell", "align-left")} to={`${consts.API.BLOCKLIST}/${item.nft_id}`}>
					{item.nft_id}
				</div>
			);

			const timeDataCell = _.isNil(item?.timestamp) ? (
				<div className={cx("height-data-cell", "align-center")}>-</div>
			) : (
				<div className={cx("time-data-cell", "align-left")}>{setAgoTime(item.timestamp)}</div>
			);

			return [txHashDataCell, nftIDDataCell, nftNameDataCell, creatorTypeDataCell, creatorDataCell, contractAddrDataCell, contractDataCell, timeDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default NFTTable;
