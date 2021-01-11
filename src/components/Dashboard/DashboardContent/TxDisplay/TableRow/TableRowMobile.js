import * as React from "react";
import cn from "classnames/bind";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {TableCell, TableRow} from "@material-ui/core";
import Skeleton from "react-skeleton-loader";
import {useHistory} from "react-router-dom";

import {setAgoTime} from "src/lib/scripts";
import pickData, {cellTypes} from "src/components/TxList/TableRow/pickData";

import styles from "./TableRowMobile.scss";
import stylesDesktop from "./TableRow.scss";

const cx = cn.bind(styles);
const cxDesktop = cn.bind(stylesDesktop);

export default function({blockData}) {
	const validators = useSelector(state => state.blockchain.validators);
	const history = useHistory();
	return (
		<div className={cx("block-row-wrapper")}>
			<div className={cx("block-row")}>
				<div className={cx("left")}> Tx hash </div>
				<div className={cx("right", "link") + " " + cxDesktop("tablePointerCell", "text", "typeWidth")}>
					{pickData(blockData, cxDesktop, cellTypes.TX_HASH)}
				</div>
			</div>
			<div className={cx("block-row")}>
				<div className={cx("left")}> Type </div>
				<div className={cx("right", "link", "type") + " " + cxDesktop("tablePointerCell", "text", "typeWidth")}>
					{pickData(blockData, cxDesktop, cellTypes.TYPE)}
				</div>
			</div>
			<div className={cx("block-row")}>
				<div className={cx("left-two-line")}>
					<div className={cx("title")}> Height </div>
					<div className={cx("value", "link")} onClick={() => history.push(`/blocks/${blockData.height}`)}>
						{blockData.height ? blockData.height : <Skeleton />}
					</div>
				</div>
				<div className={cx("right-two-line")}>
					<div className={cx("title")}> Time </div>
					{blockData.timestamp ? <div className={cx("value")}>{setAgoTime(blockData.timestamp)}</div> : <Skeleton />}
				</div>
			</div>
		</div>
	);
}
