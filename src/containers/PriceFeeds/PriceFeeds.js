// @ts-nocheck
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import queryString from "query-string";
import cn from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import PriceFeedsGridView from "src/components/PriceFeeds/PriceFeedsGridView";
import PriceFeedsGridViewSkeleton from "src/components/PriceFeeds/PriceFeedsGridView/PriceFeedsGridViewSkeleton";
import TogglePageBar from "src/components/common/TogglePageBar";
import FilterSection from "src/components/PriceFeeds/FilterSection";
import styles from "./PriceFeeds.module.scss";
import consts from "src/constants/consts";
import NoResult from "src/components/common/NoResult";
import axios from "axios";
import {pricePair} from "src/constants/priceFeed";
import {getPriceBSCTestnet} from "./bsc-testnet";
import {priceFeedNetworks} from "src/constants/priceFeed";

const cx = cn.bind(styles);

const PriceFeeds = ({}) => {
	const history = useHistory();
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [keyword, setKeyword] = useState("");
	const [network, setNetwork] = useState(priceFeedNetworks.MAINNET);
	const [data, setData] = useState({
		data: [],
	});
	const [renewPriceFeed, setRenewPriceFeed] = useState(0);

	let titleSection;
	if (isLargeScreen) {
		titleSection = (
			<Container fixed>
				<TitleWrapper>
					<PageTitle title={"Price Feeds"} />
					<StatusBox />
				</TitleWrapper>
			</Container>
		);
	} else {
		titleSection = <TogglePageBar type='price_feeds' />;
	}
	const filterSection = <FilterSection keyword={keyword} setKeyword={setKeyword} network={network} setNetwork={setNetwork} />;

	useEffect(() => {
		const getPriceFeed = async () => {
			try {
				const {data: aiRequestData} = await axios.get(
					`${consts.LCD_API_BASE}${consts.LCD_API.AI_REQUEST_DATA}?events=ai_request_data.oscript_name%3D%27oscript_price_special%27&order_by=2`
				);

				if (aiRequestData?.txs?.length > 0) {
					for (let tx of aiRequestData.txs) {
						const reqId = tx.body.messages[0].request_id;
						const {data: fullRequestData} = await axios.get(`${consts.LCD_API_BASE}/airesult/fullreq/${reqId}`);

						if (fullRequestData?.result?.results?.length > 0) {
							let finalResultList = [],
								aggregatedResult = [];

							const {data: blockData} = await axios.get(`${consts.API_BASE}/blocks?&limit=1&before=${parseInt(fullRequestData?.ai_request?.block_height) + 1}`);

							for (let item of fullRequestData.result.results) {
								const resultDecode = JSON.parse(atob(item.result));
								aggregatedResult = aggregatedResult.concat(resultDecode);
							}
							aggregatedResult = aggregatedResult.map(result => ({...result, price: parseFloat(result.price)}));

							let holder = {};
							let uniqueSymbols = [];

							aggregatedResult.forEach(d => {
								if (holder.hasOwnProperty(d.name)) {
									holder[d.name] = holder[d.name] + d.price;
									holder[d.name + "count"] += 1;
								} else {
									uniqueSymbols.push(d.name);
									holder[d.name] = d.price;
									holder[d.name + "count"] = 1;
								}
							});

							uniqueSymbols.forEach(d => {
								holder[d] /= holder[d + "count"];
								delete holder[d + "count"];
							});

							for (let prop in holder) {
								finalResultList.push({name: prop, price: holder[prop]});
							}

							network === priceFeedNetworks.MAINNET &&
								setData({
									data: finalResultList,
									lastUpdate: blockData?.data[0]?.timestamp,
									reports: fullRequestData?.reports,
								});
							break;
						}
					}
				}
			} catch (e) {
				console.log("error", e);
				setData(null);
			}
		};

		const getPriceFeedBSC = async () => {
			try {
				const data = await getPriceBSCTestnet(pricePair);
				setData(data);
			} catch (e) {
				console.log("error", e);
				setData(null);
			}
		};

		if (network === priceFeedNetworks.BSC_TESTNET) {
			getPriceFeedBSC();
		} else {
			getPriceFeed();
		}
	}, [renewPriceFeed, network]);

	useEffect(() => {
		// const url = process.env.REACT_APP_WEBSOCKET_URL || `wss://rpc.orai.io/websocket`;
		// const socket = new WebSocket(url);
		// socket.onopen = () => {
		// 	socket.send(
		// 		JSON.stringify({
		// 			jsonrpc: "2.0",
		// 			method: "subscribe",
		// 			params: [`message.action='set_ai_request'`],
		// 			id: 1,
		// 		})
		// 	);
		// };

		let i = 0;

		// socket.onmessage = res => {
		// 	const data = JSON.parse(res.data);
		// 	console.log(data);
		// 	i && setRenewPriceFeed(v => v + 1);
		// 	i++;
		// };

		const renewPriceInterval = setInterval(() => {
			i && setRenewPriceFeed(v => v + 1);
			i++;
		}, 1000 * 60 * 2);

		return () => {
			clearInterval(renewPriceInterval);
		};
	}, []);

	return (
		<>
			{titleSection}
			<Container fixed className={cx("price-feeds")}>
				{filterSection}
				{data ? data.data.length > 0 ? <PriceFeedsGridView {...data} keyword={keyword} /> : <PriceFeedsGridViewSkeleton /> : <NoResult />}
			</Container>
		</>
	);
};

PriceFeeds.propTypes = {};
PriceFeeds.defaultProps = {};

export default PriceFeeds;
