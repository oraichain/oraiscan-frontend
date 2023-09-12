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
	// const contractAddrHeaderCell = <div className={cx("header-cell", "align-left")}>Contract address</div>;
	// const contractHeaderCell = <div className={cx("header-cell", "align-left")}>Contract</div>;
	const creatorHeaderCell = <div className={cx("header-cell", "align-left")}>Creator</div>;
	const creatorTypeHeaderCell = <div className={cx("header-cell", "align-left")}>Type</div>;
	const nftNameHeaderCell = <div className={cx("header-cell", "align-left")}>Name</div>;
	const nftIDHeaderCell = <div className={cx("header-cell", "align-left")}>Token ID</div>;
	const timeHeaderCell = <div className={cx("header-cell", "align-right")}>Time</div>;
	const ownerHeaderCell = <div className={cx("header-cell", "align-left")}>Owner</div>;
	const descriptionHeaderCell = <div className={cx("header-cell", "align-left")}>Description</div>;

	let headerCells = [
		txHashHeaderCell,
		nftNameHeaderCell,
		creatorTypeHeaderCell,
		ownerHeaderCell,
		nftIDHeaderCell,
		creatorHeaderCell,
		// contractAddrHeaderCell,
		// contractHeaderCell,
		descriptionHeaderCell,
		timeHeaderCell,
	];
	let headerCellStyles = [
		{ width: "14%", minWidth: "140px" }, // TxHash
		{ width: "8%", minWidth: "80px" }, // NFT ID
		{ width: "14%", minWidth: "120px" }, // NFT Name
		{ width: "12%", minWidth: "120px" }, // Creator type
		{ width: "12%", minWidth: "120px" }, //Owner
		// { width: "12%", minWidth: "120px" }, // Creator
		// { width: "12%", minWidth: "120px" }, // Contract address
		{ width: "12%", minWidth: "120px" }, // Contract
		{ width: "12%", minWidth: "120px" }, // Time
		{ width: "12%", minWidth: "120px" }, // Description
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

const reduceStringDes = (value, isStyle, rawString = false) => {
	const result = _.isNil(value) ? (
		<div className={cx("align-center")}>-</div>
	) : (
		<div className={cx("height-data-cell")}>
			{isStyle === 1 ? <div className={cx("align-right")}>{rawString ? value : reduceString(value, 6, 6)}</div> : rawString ? value : reduceString(value, 6, 6)}
		</div>
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
			// const contractAddrDataCell = reduceStringAdress(item?.contract_address, `${consts.PATH.ACCOUNT}/${item?.contract_address}`);
			// const contractDataCell = reduceStringAdress(item?.contract, `${consts.PATH.ACCOUNT}/${item?.contract}`);
			const creatorDataCell = reduceStringAdress(item?.creator, `${consts.PATH.ACCOUNT}/${item?.creator}`);
			const ownerDataCell = reduceStringAdress(item?.owner, `${consts.PATH.ACCOUNT}/${item?.owner}`);
			const descriptionDataCell = reduceStringDes(item?.description, `${consts.PATH.ACCOUNT}/${item?.description}`);

			const creatorTypeDataCell = _.isNil(item?.creator_type) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("type-data-cell")}>
					<div className={cx("first-message-type")}>{item.creator_type}</div>
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
				<div className={cx("time-data-cell", "align-right")}>{setAgoTime(item.timestamp)}</div>
			);

			return [
				txHashDataCell,
				nftNameDataCell,
				creatorTypeDataCell,
				ownerDataCell,
				nftIDDataCell,
				creatorDataCell,
				// contractAddrDataCell,
				// contractDataCell,
				descriptionDataCell,
				timeDataCell,
			];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default NFTTable;
