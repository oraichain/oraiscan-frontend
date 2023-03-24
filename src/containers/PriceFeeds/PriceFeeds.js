// @ts-nocheck
import React, {useEffect, useState, useRef} from "react";
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
import NoResult from "src/components/common/NoResult";
import {pricePair} from "src/constants/priceFeed";
import {getPriceBSCTestnet} from "./bsc-testnet";
import {getPricePolygon} from "./polygon";
import {getPriceFeedMainnet} from "./mainnet";
import {priceFeedNetworks} from "src/constants/priceFeed";

const cx = cn.bind(styles);

const PriceFeeds = ({}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [keyword, setKeyword] = useState("");
	const [network, setNetwork] = useState(priceFeedNetworks.MAINNET);
	const [isLoading, setIsLoading] = useState(false);
	const networkRef = useRef(priceFeedNetworks.MAINNET);

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
				setIsLoading(true);
				const data = await getPriceFeedMainnet();
				networkRef.current === priceFeedNetworks.MAINNET && setData(data);
				setIsLoading(false);
			} catch (e) {
				console.log("error", e);
				networkRef.current === priceFeedNetworks.MAINNET && setData(null);
				setIsLoading(false);
			}
		};

		const getPriceFeedBSC = async () => {
			try {
				setIsLoading(true);
				const data = await getPriceBSCTestnet(pricePair);
				networkRef.current === priceFeedNetworks.BSC_TESTNET && setData(data);
				setIsLoading(false);
			} catch (e) {
				console.log("error", e);
				networkRef.current === priceFeedNetworks.BSC_TESTNET && setData(null);
				setIsLoading(false);
			}
		};

		const getPriceFeedPolygon = async () => {
			try {
				setIsLoading(true);
				const data = await getPricePolygon(pricePair);
				networkRef.current === priceFeedNetworks.POLYGON && setData(data);
				setIsLoading(false);
			} catch (e) {
				console.log("error", e);
				networkRef.current === priceFeedNetworks.POLYGON && setData(null);
				setIsLoading(false);
			}
		};

		if (network === priceFeedNetworks.BSC_TESTNET) {
			getPriceFeedBSC();
		} else if (network === priceFeedNetworks.POLYGON) {
			getPriceFeedPolygon();
		} else {
			getPriceFeedORAI();
		}
	}, [renewPriceFeed, network]);

	useEffect(() => {
		let i = 0;

		const renewPriceInterval = setInterval(() => {
			i && setRenewPriceFeed(v => v + 1);
			i++;
		}, 1000 * 60 * 2);

		return () => {
			clearInterval(renewPriceInterval);
		};
	}, []);

	const renderData = () => {
		if (!data) {
			return <NoResult />;
		}

		if (isLoading) {
			return <PriceFeedsGridViewSkeleton />;
		}

		return <PriceFeedsGridView {...data} keyword={keyword} network={networkRef.current} />;
	};

	return (
		<>
			{titleSection}
			<Container fixed className={cx("price-feeds")}>
				{filterSection}
				{renderData()}
			</Container>
		</>
	);
};

PriceFeeds.propTypes = {};
PriceFeeds.defaultProps = {};

export default PriceFeeds;
