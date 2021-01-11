import * as React from "react";
import cn from "classnames/bind";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {TableCell, TableRow} from "@material-ui/core";
import Skeleton from "react-skeleton-loader";
import {useHistory} from "react-router-dom";

import {setAgoTime} from "src/lib/scripts";
import styles from "./TableRowMobile.scss";

const cx = cn.bind(styles);

export default function({blockData}) {
	const validators = useSelector(state => state.blockchain.validators);
	const history = useHistory();
	return (
		<div className={cx("block-row-wrapper")}>
			<div className={cx("block-row")}>
				<div className={cx("left")}> Height </div>
				<div className={cx("right", "link")} onClick={e => history.push(`/blocks/${blockData.height}`)}>
					{" "}
					{blockData.height}{" "}
				</div>
			</div>
			<div className={cx("block-row")}>
				<div className={cx("left")}> Proposer </div>
				{blockData.moniker ? (
					<div className={cx("right", "link")} onClick={e => history.push(`/validators/${validators[blockData.moniker]?.operatorAddr}`)}>
						{" "}
						{blockData.moniker}{" "}
					</div>
				) : (
					<Skeleton />
				)}
			</div>
			<div className={cx("block-row")}>
				<div className={cx("left-two-line")}>
					<div className={cx("title")}> TXS </div>
					<div className={cx("value")}> {blockData.height ? blockData.num_txs ? blockData.num_txs : "0" : <Skeleton />} </div>
				</div>
				<div className={cx("right-two-line")}>
					<div className={cx("title")}> Time </div>
					{blockData.timestamp ? <div className={cx("value")}>{setAgoTime(blockData.timestamp)}</div> : <Skeleton />}
				</div>
			</div>
		</div>
	);
}
