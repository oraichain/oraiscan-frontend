import * as React from "react";
import cn from "classnames/bind";
import styles from "./DetailDisplay.scss";
import {formatNumber} from "src/lib/scripts";
//  component
import Skeleton from "react-skeleton-loader";
//  redux
import {useSelector} from "react-redux";
import consts from "src/constants/consts";
//  svgs
import down_rd from "src/assets/common/arrow_down.svg";
import up_gr from "src/assets/common/arrow_up.svg";
import blocktimeSVG from "src/assets/dashboard/blocktime_ic.svg";

const cx = cn.bind(styles);

export default function(props) {
	const status = useSelector(state => state.blockchain.status);

	// React.useEffect(() => {
	// 	const cancelToken = axios.CancelToken;
	// 	const source = cancelToken.source();
	// 	dispatch(getCryptoBasicData("binancecoin", "usd", source.token));
	// 	dispatch(getCryptoStatus(source.token));
	// 	return () => {
	// 		source.cancel("cleanup cancel");
	// 	};
	// }, [dispatch]);
	return React.useMemo(
		() => (
			<div className={cx("DetailDisplay")}>
				<div className={cx("card")}>
					<div className={cx("title")}>Last block height</div>
					<div className={cx("content")}>363,813</div>
					<div className={cx("footer")}>8 Dec 2020 07:56:29am UTC</div>
				</div>
				<div className={cx("card")}>
					<div className={cx("title")}>Average Blocktime (All)</div>
					<div className={cx("content")}>5.59</div>
					<div className={cx("footer")}>seconds</div>
				</div>
				<div className={cx("card")}>
					<div className={cx("title")}>Active Validators</div>
					<div className={cx("content")}>3</div>
					<div className={cx("footer")}>out of 3 validators</div>
				</div>
				<div className={cx("card")}>
					<div className={cx("title")}>Online voting power</div>
					<div className={cx("content")}>2.70m</div>
					<div className={cx("footer")}>0.01% from 27.00b ORAIS</div>
				</div>
			</div>
		),
		[status]
	);
}
