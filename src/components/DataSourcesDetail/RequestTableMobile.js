import * as React from "react";
import cn from "classnames/bind";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {TableCell, TableRow} from "@material-ui/core";
import Skeleton from "react-skeleton-loader";
import {useHistory} from "react-router-dom";

import {ReactComponent as CheckIcon} from "src/assets/icons/check.svg";
import {setAgoTime} from "src/lib/scripts";
import styles from "./RequestTableMobile.module.scss";

const cx = cn.bind(styles);

export default function({blockData = {}}) {
	const validators = useSelector(state => state.blockchain.validators);
	const history = useHistory();
	return (
		<div className={cx("block-row-wrapper")}>
			<div className={cx("block-row")}>
				<div className={cx("left")}> Request </div>
				<div className={cx("right", "link")} onClick={e => history.push(`/blocks/${blockData.height}`)}>
					{" "}
					111111
				</div>
			</div>
			<div className={cx("block-row", "block-row-desc")}>
				<div className={cx("left")}> Blockchain oracle Script </div>
				<div className={cx("right-desc")}> #03 Band Standard Dataset (Crypto) </div>
			</div>
			<div className={cx("block-row", "block-row-desc")}>
				<div className={cx("left")}> Report Status </div>
				<div className={cx("status-text")}>
					<div> Min 10 </div>
					<div> 16 of 16 </div>
				</div>
				<div className={cx("status-graph")}>
					<div className={cx("status-graph-child")}></div>
				</div>
			</div>
			<div className={cx("block-row")}>
				<div className={cx("left-two-line")}>
					<div className={cx("title")}> Status </div>
					<div className={cx("value", "value-check")}>
						{" "}
						<CheckIcon /> Success{" "}
					</div>
				</div>
				<div className={cx("right-two-line")}>
					<div className={cx("title")}> Owner </div>
					<div className={cx("value", "link")}> Owner-001 </div>
				</div>
			</div>
		</div>
	);
}
