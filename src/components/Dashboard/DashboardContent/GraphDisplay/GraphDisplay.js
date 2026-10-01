import axios from "axios";
import cn from "classnames/bind";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import consts from "src/constants/consts";
import { getMarketChartRange } from "src/lib/api";
import { empty, getUnixTimes, _ } from "src/lib/scripts";
import { setMarketChart } from "src/store/modules/blockchain";

import Chart from "src/components/common/Chart";
import ErrorPage from "src/components/common/ErrorPage";
import styles from "./GraphDisplay.module.scss";

const cx = cn.bind(styles);

const TWO_HOURS_IN_MINUTES = 24 * 60;
const DATA_COUNT_DENOM = 4;
const STALE_CACHE_MS = 10 * 60 * 1000;

export default function() {
	const dispatch = useDispatch();
	const marketChart = useSelector(state => state.blockchain.marketChart);
	const data = marketChart?.data;
	const [showPrice, setShowPrice] = React.useState(true);
	const [now, setNow] = React.useState(Date.now());
	const [graphWrapperWidth, setGraphWrapperWidth] = React.useState(100);
	const graphWrapperRef = React.useRef();
	const cachedAt = Number(marketChart?.cachedAt);
	const hasCachedAt = Number.isFinite(cachedAt) && cachedAt > 0;
	const isStaleCache = hasCachedAt && now - cachedAt > STALE_CACHE_MS;

	const transformData = data => {
		if (Array.isArray(data)) {
			return data
				.filter((item, index, arr) => index % DATA_COUNT_DENOM === 0 || index === 0 || index === arr.length - 1)
				.map((item, index) => [item[0], Math.round(item[1] * 100) / 100]);
		}

		return [];
	};

	React.useEffect(() => {
		const times = getUnixTimes(TWO_HOURS_IN_MINUTES, "minute", "hour");
		const cancelToken = axios.CancelToken;
		const source = cancelToken.source();
		getMarketChartRange(consts.COIN_ID, "usd", times[0], times[1], source.token)
			.then(res => {
				if (_.isObject(res.data)) {
					dispatch(
						setMarketChart({
							data: [transformData(res?.data?.prices), transformData(res?.data?.total_volumes)],
							cachedAt: Date.now(),
						})
					);
				}
			})
			.catch(ex => {
				console.log("exception querying coinGecko", ex);
			});
		setGraphWrapperWidth(graphWrapperRef.current.offsetWidth);
		return () => {
			source.cancel("cleanup cancel");
		};
	}, [dispatch]);

	React.useEffect(() => {
		const interval = setInterval(() => setNow(Date.now()), 60 * 1000);
		return () => clearInterval(interval);
	}, []);

	const clickTab = () => setShowPrice(v => !v);

	return (
		<div className={cx("GraphDisplay")}>
			<div className={cx("tab-wrapper")}>
				<div className={cx("tab-wrapper-btn")}>
					<button className={cx({ selected: showPrice })} onClick={clickTab}>
						<p>Price</p>
					</button>
					<button className={cx({ selected: !showPrice })} onClick={clickTab}>
						<p>Volume</p>
					</button>
				</div>
			</div>
			<div className={cx("Graph-wrapper")} ref={graphWrapperRef}>
				{_.isNil(data) ? (
					undefined
				) : empty(data?.[0]) || empty(data?.[0]) ? (
					<ErrorPage />
				) : (
					<Chart key={showPrice} options={options} data={data?.[showPrice ? 0 : 1]} wrapperWidth={graphWrapperWidth} />
				)}
			</div>
			{isStaleCache && <div className={cx("stale-cache")}>Cached chart data is over 10 minutes old. Fresh data is being updated.</div>}
		</div>
	);
}

const options = {
	chart: {
		type: "areaspline",
		margin: [5, 15, 20, 15],
		height: "230px",
		width: null,
		spacing: [20, 20, 20, 20],
		renderTo: "container",
	},
};
