import * as React from "react";
import cn from "classnames/bind";
import {NavLink} from "react-router-dom";
//  components
import {TableCell, TableRow} from "@material-ui/core";
import Skeleton from "react-skeleton-loader";
import {setAgoTime} from "src/lib/scripts";
import styles from "./TableRow.module.scss";

import pickData, {cellTypes} from "src/components/TxList/TableRow/pickData";

const cx = cn.bind(styles);

export default function({blockData}) {
	return (
		<TableRow className={cx("txDisplay-tableRow")} hover={true} key={blockData.id}>
			<TableCell className={cx("tablePointerCell", "text", "txHash")} component='th' scope='row'>
				{pickData(blockData, cx, cellTypes.TX_HASH)}
			</TableCell>
			<TableCell className={cx("tablePointerCell", "text", "typeWidth")} align='left'>
				{pickData(blockData, cx, cellTypes.TYPE)}
			</TableCell>
			<TableCell className={cx("tableCell", "height")} align='right'>
				{blockData.height ? (
					<NavLink className={cx("blueColor")} to={`/blocks/${blockData.height}`}>
						{blockData.height}{" "}
					</NavLink>
				) : (
					<Skeleton />
				)}
			</TableCell>
			<TableCell className={cx("tableCell", "time")} align='right'>
				{blockData.timestamp ? <>{setAgoTime(blockData.timestamp)}</> : <Skeleton />}
			</TableCell>
		</TableRow>
	);
}
