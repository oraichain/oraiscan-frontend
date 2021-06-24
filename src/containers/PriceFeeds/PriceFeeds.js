// @ts-nocheck
import React, {useEffect, useState, useRef} from "react";
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
import {getPriceFeedMainnet} from "./mainnet";
import {priceFeedNetworks} from "src/constants/priceFeed";

const cx = cn.bind(styles);

const PriceFeeds = ({}) => {
	const history = useHistory();
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [keyword, setKeyword] = useState("");
	const [network, setNetwork] = useState(priceFeedNetworks.MAINNET);
	const networkRef = useRef();

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

	const handleChangeNetwork = n => {
		networkRef.current = n;
		setNetwork(n);
	};

	const filterSection = <FilterSection keyword={keyword} setKeyword={setKeyword} network={network} setNetwork={handleChangeNetwork} />;

	useEffect(() => {
		const getPriceFeedORAI = async () => {
			try {
				const data = await getPriceFeedMainnet();
				networkRef.current === priceFeedNetworks.MAINNET && setData(data);
			} catch (e) {
				console.log("error", e);
				networkRef.current === priceFeedNetworks.MAINNET && setData(null);
			}
		};

		const getPriceFeedBSC = async () => {
			try {
				const data = await getPriceBSCTestnet(pricePair);
				networkRef.current === priceFeedNetworks.BSC_TESTNET && setData(data);
			} catch (e) {
				console.log("error", e);
				networkRef.current === priceFeedNetworks.BSC_TESTNET && setData(null);
			}
		};

		if (network === priceFeedNetworks.BSC_TESTNET) {
			getPriceFeedBSC();
		} else {
			getPriceFeedORAI();
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
