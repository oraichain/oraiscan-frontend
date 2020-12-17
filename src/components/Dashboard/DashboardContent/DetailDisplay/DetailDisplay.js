import * as React from "react";
import cn from "classnames/bind";
import styles from "./DetailDisplay.scss";
import {formatNumber} from "src/lib/scripts";
import {useFetch} from "src/hooks";
import consts from "src/constants/consts";
import moment from "moment";
//  component
import Skeleton from "react-skeleton-loader";
//  redux
import {useSelector} from "react-redux";
//  svgs
import down_rd from "src/assets/common/arrow_down.svg";
import up_gr from "src/assets/common/arrow_up.svg";
import blocktimeSVG from "src/assets/dashboard/blocktime_ic.svg";

const cx = cn.bind(styles);

export default function(props) {
	const status = useSelector(state => state.blockchain.status);
	const [data, requestFetch] = useFetch(`${consts.API_BASE}${consts.API.STATUS}`, "get");
	console.log(data);

	// React.useEffect(() => {
	// 	const cancelToken = axios.CancelToken;
	// 	const source = cancelToken.source();
	// 	dispatch(getCryptoBasicData("binancecoin", "usd", source.token));
	// 	dispatch(getCryptoStatus(source.token));
	// 	return () => {
	// 		source.cancel("cleanup cancel");
	// 	};
	// }, [dispatch]);
	return (
		// () => (
		<div>
			<div className={cx("DetailDisplay")}>
				<div className={cx("card")}>
					<div className={cx("title")}>Last block height</div>
					<div className={cx("content")}>
						{data.data !== null ? data.data.latest_block_height.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
					</div>
					<div className={cx("footer")}>
						{/* 8 Dec 2020 07:56:29am UTC */}
						{data.data !== null ? moment(data.data.timestamp).format('MMM Do YYYY h:mm:ss a') : ""}
					</div>
				</div>
				<div className={cx("card")}>
					<div className={cx("title")}>Average Blocktime (All)</div>
					<div className={cx("content")}>
						{data.data !== null ? data.data.block_time.toFixed(2) : ""}
					</div>
					<div className={cx("footer")}>seconds</div>
				</div>
				{/* <div className={cx("card")}>
					<div className={cx("title")}>Active Validators</div>
					<div className={cx("content")}>
						{data.data !== null ? data.data.total_validator_num : ""}
					</div>
					<div className={cx("footer")}>out of {data.data !== null ? data.data.total_validator_num : ""} validators</div>
				</div> */}
				{/* <div className={cx("card")}>
				<div className={cx("title")}>Online voting power</div>
				<div className={cx("content")}>2.70m</div>
				<div className={cx("footer")}>0.01% from 27.00b ORAIS</div>
			</div> */}
			</div>
			<div className={cx("DetailDisplay", "test")}>
				<div className={cx("card")}>
					<div className={cx("title")}>Active Validators</div>
					<div className={cx("content")}>
						{data.data !== null ? data.data.total_validator_num : ""}
					</div>
					<div className={cx("footer")}>out of {data.data !== null ? data.data.total_validator_num : ""} validators</div>
				</div>
			</div>
		</div>
		// ),
		// [status]
	);
}
