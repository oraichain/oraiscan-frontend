import React from "react";
import classNames from "classnames/bind";
import {NavLink} from "react-router-dom";

import {TableCell, TableRow} from "@material-ui/core";
import {setAgoTime} from "src/lib/scripts";
import Skeleton from "react-skeleton-loader";
import pickData, {cellTypes} from "./pickData";
import customStyle from "./TableRow.module.scss";

const cx = classNames.bind(customStyle);

export const TableRowThin = ({blockData}) => {
	return (
		<div className={cx("TxList-thinTableRow")}>
			<ul className={cx("row", "text")}>
				<li>Tx Hash</li>
				<li>{blockData.tx_hash ? <>{pickData(blockData, cx, cellTypes.TX_HASH)}</> : <Skeleton />}</li>
			</ul>
			<ul className={cx("row", "text")}>
				<li>Type</li>
				<li>{pickData(blockData, cx, cellTypes.TYPE)}</li>
			</ul>
			<ul className={cx("row")}>
				<li>Address</li>
				<li className={cx("flexit")}>
					{pickData(blockData, cx, cellTypes.FROM)}
					{pickData(blockData, cx, cellTypes.TO)}
				</li>
			</ul>
			<ul className={cx("row")}>
				<li>Value</li>
				<li>
					{pickData(blockData, cx, cellTypes.VALUE)} {pickData(blockData, cx, cellTypes.DENOM)}
				</li>
			</ul>
			<ul className={cx("row")}>
				<li>height</li>
				<li>
					{blockData.height ? (
						<NavLink className={cx("blueColor")} to={`/blocks/${blockData.height}`}>
							{blockData.height}{" "}
						</NavLink>
					) : (
						<Skeleton />
					)}
				</li>
			</ul>
			<ul className={cx("row")}>
				<li>Time</li>
				<li>{blockData.timestamp ? setAgoTime(blockData.timestamp) : <Skeleton />}</li>
			</ul>
		</div>
	);
};

export default function({blockData}) {
	return (
		<TableRow className={cx("TxList-tableRow")} hover={true} key={blockData.id}>
			<TableCell className={cx("tablePointerCell", "text", "txCell")} component='th' scope='row'>
				{pickData(blockData, cx, cellTypes.TX_HASH)}
			</TableCell>
			<TableCell className={cx("tablePointerCell", "text")}>{pickData(blockData, cx, cellTypes.TYPE)}</TableCell>
			<TableCell className={cx("tablePointerCell", "text")}>{pickData(blockData, cx, cellTypes.RESULT)}</TableCell>
			<TableCell className={cx("tablePointerCell", "text")} align='right'>
				{pickData(blockData, cx, cellTypes.AMOUNT)}
			</TableCell>
			<TableCell className={cx("tablePointerCell", "text")} align='right'>
				{pickData(blockData, cx, cellTypes.FEE)}
			</TableCell>
			<TableCell className={cx("tablePointerMiniCell")} align='right'>
				{pickData(blockData, cx, cellTypes.HEIGHT)}
			</TableCell>
			<TableCell className={cx("tableCell")} align='right'>
				{pickData(blockData, cx, cellTypes.TIME)}
			</TableCell>
		</TableRow>
	);
}
