import * as React from "react";
import cn from "classnames/bind";
import {formatNumber} from "src/lib/scripts";
import {useFetch, useTimer} from "src/hooks";
import consts from "src/constants/consts";
import moment from "moment";
import {setAgoTime} from "src/lib/scripts";
//  component
import Skeleton from "react-skeleton-loader";
//  redux
import {useSelector} from "react-redux";
//  svgs
import down_rd from "src/assets/common/arrow_down.svg";
import up_gr from "src/assets/common/arrow_up.svg";
import blocktimeSVG from "src/assets/dashboard/blocktime_ic.svg";
import styles from "./DetailDisplay.module.scss";

const cx = cn.bind(styles);

export default function(props) {
	const data = useSelector(state => state.blockchain.status);
	return (
		<div className={cx("DetailWrapper")}>
			<div className={cx("DetailDisplay")}>
				<div className={cx("card")}>
					<div className={cx("title")}>Last block height</div>
					<div className={cx("content")}>{data !== null ? data?.latest_block_height?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}</div>
					<div className={cx("footer")}>{data !== null ? setAgoTime(data?.timestamp) : ""}</div>
				</div>
				<div className={cx("card")}>
					<div className={cx("title")}>Average Blocktime (All)</div>
					<div className={cx("content")}>{data !== null ? data?.block_time?.toFixed(2) : ""}</div>
					<div className={cx("footer")}>seconds</div>
				</div>
			</div>
			<div className={cx("DetailDisplay", "test")}>
				<div className={cx("card")}>
					<div className={cx("title")}>Active Validators</div>
					<div className={cx("content")}>{data !== null ? data?.total_validator_active : ""}</div>
					<div className={cx("footer")}>out of {data !== null ? data?.total_validator_num : ""} validators</div>
				</div>
			</div>
		</div>
	);
}
