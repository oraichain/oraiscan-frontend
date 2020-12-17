import React, {useState} from "react";
import cn from "classnames/bind";
import styles from "./DashboardContent.scss";
import {_} from "src/lib/scripts";
import {useFetch} from "src/hooks";
import consts from "src/constants/consts";
//  components
import GraphDisplay from "./GraphDisplay";
import PriceDisplay from "./PriceDisplay";
import DetailDisplay from "./DetailDisplay";
import BlocksDisplay from "./BlocksDisplay";
import TxDisplay from "./TxDisplay";
//  assets
import exchangeSVG from "src/assets/dashboard/exchange_ic.svg";
import dexSVG from "src/assets/dashboard/dex_ic.svg";
import jexSVG from "src/assets/dashboard/jex_ic.svg";
import launchpadSVG from "src/assets/dashboard/launchpad_ic.svg";
//  component
import Skeleton from "react-skeleton-loader";
//  redux
import {useSelector} from "react-redux";

const cx = cn.bind(styles);

const cardData = Object.freeze([
	{
		svg: exchangeSVG,
		title: "Exchange",
		content: "Blockchain and crypto asset exchange",
		link: "https://www.binance.org/en/trade",
	},
	{
		svg: dexSVG,
		title: "Binance DEX",
		content: "decentralized digital asset exchange",
		link: "https://www.binance.org/",
	},
	{
		svg: jexSVG,
		title: "Binance JEX",
		content: "Bitcoin futures & Crypto options",
		link: "https://www.jex.com/",
	},
	{
		svg: launchpadSVG,
		title: "Launchpad",
		content: "Token launch platform",
		link: "https://launchpad.binance.com/",
	},
]);

export default function(props) {
	const status = useSelector(state => state.blockchain.status);
	const [data, requestFetch] = useFetch(`${consts.API_BASE}${consts.API.BLOCKLIST}?limit=10`, "get");
	// console.log(data);
	return (
		<div className={cx("DashboardContent-wrapper")}>
			<div className={cx("header")}>
				<div className={cx("title")}>Dashboard</div>
				<div className={cx("info")}>
					<div className={cx("detail")}>
						<span>Price: </span>
						<span style={{fontWeight: 500}}>{status?.price ? `$${status?.price}` : <Skeleton width={"92px"} height={"34px"} />}</span>
					</div>
					<div className={cx("detail")}>
						<span>Height: </span>
						<span style={{fontWeight: 500}}>{data.data !== null ? data.data.paging.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}</span>
					</div>
					{/* <div className={cx("detail")}>
						<span>Bonded: </span>
						<span style={{fontWeight: 500}}>189,132,631</span>
					</div>
					<div className={cx("detail")}>
						<span>Inflation: </span>
						<span style={{fontWeight: 500}}>7.00%</span>
					</div> */}
				</div>
			</div>
			<div className={cx("PriceGraphClickable-wrapper")}>
				<div className={cx("Card", "PriceGraph-wrapper")}>
					<PriceDisplay />
					<GraphDisplay />
					<DetailDisplay />
				</div>
			</div>
			<div className={cx("BlockTx-wrapper")}>
				<BlocksDisplay />
				<div className={cx("CardFixed")}>
					<TxDisplay />
				</div>
			</div>
		</div>
	);
}

const DashboardCard = ({svg, title, content, link}) => (
	<li className={cx("DashboardCard-wrapper")} onClick={() => window.open(link, "_blank")}>
		<img src={svg} alt={"logo"} />
		<div className={cx("text-wrapper")}>
			<div className={cx("title")}>{title}</div>
			<p className={cx("content")}>{content}</p>
		</div>
	</li>
);
