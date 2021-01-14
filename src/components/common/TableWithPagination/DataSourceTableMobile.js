import * as React from "react";
import cn from "classnames/bind";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {TableCell, TableRow} from "@material-ui/core";
import Skeleton from "react-skeleton-loader";
import {useHistory} from "react-router-dom";
import _ from "lodash";

import {setAgoTime} from "src/lib/scripts";
import pickData, {cellTypes} from "src/components/TxList/TableRow/pickData";

import styles from "./DataSourceTableMobile.scss";

const cx = cn.bind(styles);

export default function({data}) {
	console.log(data);
	const validators = useSelector(state => state.blockchain.validators);
	const history = useHistory();
	return (
		<div className={cx("block-table")}>
			{_.map(data, (blockData, i) => (
				<div className={cx("block-row-wrapper")}>
					<div className={cx("block-row")}>
						<div className={cx("left")}> Data Sources </div>
						<div className={cx("right", "link")}>{blockData[0]}</div>
					</div>
					<div className={cx("block-row")}>
						<div className={cx("left")}> Fee </div>
						<div className={cx("right")}>{blockData[2]}</div>
					</div>
					<div className={cx("block-row")}>
						<div className={cx("left-two-line")}>
							<div className={cx("title")}> Request </div>
							<div className={cx("value")}>{blockData[3]}</div>
						</div>
						<div className={cx("right-two-line")}>
							<div className={cx("title")}> Owner </div>
							<div className={cx("value", "link", "owner")} onClick={() => history.push(`/blocks/${blockData.height}`)}>
								{blockData[4]}
							</div>
						</div>
					</div>
					<div className={cx("block-row", "block-row-desc")}>
						<div className={cx("left")}> Descriptions </div>
						<div className={cx("right-desc")}>{blockData[1]}</div>
					</div>
				</div>
			))}
		</div>
	);
}
