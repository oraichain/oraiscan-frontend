// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import cn from "classnames/bind";
import { initWallet } from "src/store/modules/wallet";
import NavBarMobile from "./NavBarMobile";
import styles from "./NavBar.module.scss";
import consts from "src/constants/consts";
import MediumIcon from "src/assets/community/MediumIcon";
import TelegramIcon from "src/assets/community/TelegramIcon";
import TwitterIcon from "src/assets/community/TwitterIcon";
import YoutubeIcon from "src/assets/community/YoutubeIcon";
import RedditIcon from "src/assets/community/RedditIcon";
import GithubIcon from "src/assets/community/GithubIcon";
import { updateToken } from "src/firebase-cloud-message";
import NavBarDesktop from "./NavBarDesktop";
import { ThemeSetup } from "src/helpers/helper";

import { FaTelegramPlane, FaTwitter, FaDiscord, FaGithub, FaLinkedin, FaInfoCircle } from "react-icons/fa";

const cx = cn.bind(styles);

const initialNavLinks = [
	{
		title: "Learn",
		// link: "/",
		children: [
			{
				name: "AI LAYER 1",
				list: [
					{
						title: "Introduction",
						link: "https://docs.orai.io/white-paper/system-overview/ai-layer-1-for-data-economy-and-oracle-services",
						icon: null,
						target: "_blank",
					},
					{
						title: "Layer 2 Rollups and Subnetworks",
						link: "https://docs.orai.io/white-paper/system-overview/layer-2-rollups-and-subnetworks",
						icon: null,
						target: "_blank",
					},
					{
						title: "Verifiable and trustless AI Execution",
						link: "https://docs.orai.io/white-paper/system-overview/verifiable-and-trustless-ai-execution",
						icon: null,
						target: "_blank",
					},
					{
						title: "Decentralized Data and AI platform",
						link: "https://docs.orai.io/white-paper/system-overview/decentralized-data-and-ai-platform",
						icon: null,
						target: "_blank",
					},
					{
						title: "IBC Communication",
						link: "https://docs.orai.io/white-paper/system-overview/ibc-integration",
						icon: null,
						target: "_blank",
					},
				],
			},
			{
				name: "TOKEN",
				list: [
					{
						title: "Utilities",
						link: "https://docs.orai.io/white-paper/token-economics",
						icon: null,
						target: "_blank",
					},
					{
						title: "Tokenomics",
						link: "https://docs.orai.io/white-paper/token-economics",
						icon: null,
						target: "_blank",
					},
				],
			},
			{
				name: "WHITEPAPER",
				list: [
					{
						title: "Document link",
						link: "https://docs.orai.io",
						icon: null,
						target: "_blank",
					},
				],
			},
		],
	},
	{
		title: "Build",
		// link: "/",
		children: [
			{
				name: "VALIDATORS",
				list: [
					{
						title: "Secure the Oraichain Mainnet 2.0",
						link: "https://docs.orai.io/developers/networks/mainnet/become-a-validator",
						icon: null,
						target: "_blank",
					},
				],
			},
			{
				name: "DEVELOPERS",
				list: [
					{
						title: "Build CosmWasm smart contracts + CosmWasm IDE",
						link: "https://marketplace.visualstudio.com/items?itemName=oraichain.cosmwasm-ide",
						icon: null,
						target: "_blank",
					},
				],
			},
			{
				name: "EXECUTORS",
				list: [
					{
						title: "Operate the subnetworks",
						link: "https://docs.orai.io/developers/executors/ai-executor",
						icon: null,
						target: "_blank",
					},
				],
			},
		],
	},
	{
		title: "Earn",
		// link: "/",
		children: [
			{
				name: "STAKING TO EARN 29% APR",
				list: [
					{
						title: "Secure our DPoS network",
						link: "https://scan.orai.io/validators",
						icon: null,
						target: "_blank",
					},
				],
			},
			{
				name: "FARMING WITH ORAI",
				list: [
					{
						title: "Available on Ethereum and Binance Smart Chain",
						link: "https://yai.finance",
						icon: null,
						target: "_blank",
					},
				],
			},
			{
				name: "BUG BOUNTY PROGRAM",
				list: [
					{
						title: "Enhance the security level of Oraichain",
						link: "https://blog.orai.io/introducing-bug-bounty-program-for-oraichain-and-its-ecosystem-6f65316ef0d",
						icon: null,
						target: "_blank",
					},
				],
			},
		],
	},
	{
		title: "Ecosystem",
		// link: "/",
		children: [
			{
				name: "AI ORACLES",
				list: [
					{
						title: "Price Feed",
						link: "https://docs.orai.io/price-feeds/binance-smart-chain",
						icon: null,
						target: "_blank",
					},
					{
						title: "VRF",
						link: "https://docs.orai.io/vrf/introduction",
						icon: null,
						target: "_blank",
					},
					{
						title: "Royalty Protocol",
						link: "https://blog.orai.io/introducing-royalty-protocol-on-oraichain-b4b78366beaa",
						icon: null,
						target: "_blank",
					},
					{
						title: "Originality Check",
						link: "https://airight.io/original-check",
						icon: null,
						target: "_blank",
					},
				],
			},
			{
				name: "DEX & DEFI",
				list: [
					{
						title: "OraiDEX",
						link: "https://oraidex.io",
						icon: null,
						target: "_blank",
					},
					{
						title: "yAI.Finance",
						link: "https://yai.finance",
						icon: null,
						target: "_blank",
					},
					{
						title: "Trava",
						link: "https://trava.finance",
						icon: null,
						target: "_blank",
					},
				],
			},
			{
				name: "WEB 3.0",
				list: [
					{
						title: "Data Hub",
						link: "https://datahub.orai.io",
						icon: null,
						target: "_blank",
					},
					{
						title: "AI Marketplace",
						link: "https://market.orai.io",
						icon: null,
						target: "_blank",
					},
				],
			},
			{
				name: "NFT",
				list: [
					{
						title: "aiRight",
						link: "https://airight.io",
						icon: null,
						target: "_blank",
					},
				],
			},
			{
				name: "GAMEFI",
				list: [
					{
						title: "Kawaii Islands",
						link: "https://kawaii.global",
						icon: null,
						target: "_blank",
					},
					{
						title: "Wen Lambo",
						link: "https://dcrc-racing.web.app",
						icon: null,
						target: "_blank",
					},
				],
			},
			{
				name: "INCUBATOR",
				list: [
					{
						title: "EDVC",
						link: "https://edvc.org",
						icon: null,
						target: "_blank",
					},
				],
			},
			{
				name: "WALLET",
				list: [
					{
						title: "Oraichain Wallet",
						link: "https://docs.orai.io/oraichain-wallet",
						icon: null,
						target: "_blank",
					},
				],
			},
		],
	},
	{
		title: "Explore",
		// link: "/",
		children: [
			{
				name: "BLOG",
				list: [
					{
						title: "Get an in-depth understanding of Oraichain",
						link: "https://blog.orai.io",
						icon: null,
						target: "_blank",
					},
				],
			},
			{
				name: "COMMUNITY",
				list: [
					{
						title: "Telegram",
						link: "https://t.me/oraichain",
						icon: <FaTelegramPlane />,
						target: "_blank",
					},
					{
						title: "Twitter",
						link: "https://twitter.com/oraichain",
						icon: <FaTwitter />,
						target: "_blank",
					},
					{
						title: "Discord",
						link: "https://discord.gg/uUVSh3Xb",
						icon: <FaDiscord />,
						target: "_blank",
					},
					{
						title: "Github",
						link: "https://github.com/oraichain",
						icon: <FaGithub />,
						target: "_blank",
					},
				],
			},
		],
	},
	{ title: "Connect Wallet", link: null, type: "wallet", children: [] },
];

function isSlowBlock(lastest, blocks) {
	if (!lastest || !blocks || !blocks.data || !blocks.data[0]) {
		return false;
	}

	const lastestBlockHeight = parseFloat(lastest?.block?.header?.height);
	const currentBlock = blocks?.data?.[0]?.height;
	if (Math.abs(lastestBlockHeight - currentBlock) > 1000) {
		return true;
	}
}

const NavBar = ({ toggleSearchArea }) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const { isDarkTheme } = ThemeSetup();
	const dispatch = useDispatch();
	const { address } = useSelector(state => state.wallet);
	const [navLinks, setNavLinks] = useState(initialNavLinks);
	const [isMaintaining, setIsMaintaining] = useState(false);

	useEffect(() => {
		const onMessage = function (e) {
			const address = e?.data?.address;
			if (address) {
				initialNavLinks[initialNavLinks.length - 1] = {
					title: address,
					type: "wallet",
				};
				setNavLinks([...initialNavLinks]);
				dispatch(initWallet({ address, account: e.data.account }));
				updateToken(address);
			}
		};
		window.addEventListener("message", onMessage, false);

		const checkLatestBlock = async () => {
			// check block to display maintaince or not
			const lastest = await fetch(`${consts.LCD_API_BASE}/blocks/latest`).then(res => res.json());
			const currentBlocks = await fetch(`${consts.API_BASE}${consts.API.BLOCKLIST}?limit=10`).then(res => res.json());
			if (isSlowBlock(lastest, currentBlocks)) {
				setIsMaintaining(true);
			}
			// console.log("result blocks: ", result);
		};
		checkLatestBlock();
		// if (parseInt(result.block.header.height) - consts.MIN_MAINTAINANCE > )
		return () => {
			window.removeEventListener("message", onMessage);
		};
	}, []);

	useEffect(() => {
		initialNavLinks[initialNavLinks.length - 1] = {
			title: address,
			type: "wallet",
		};
		setNavLinks([...initialNavLinks]);
	}, [address]);

	return (
		<div
			style={{
				background: isDarkTheme ? "#0F1017" : "#444193",
			}}
			className={cx("background")}>
			{isMaintaining && (
				<div className={cx("maintain")}>
					<div className={cx("maintain-text")}>
						Oraiscan is currently experiencing some problems syncing with Oraichain. It will be back shortly, thank you for your patience!
					</div>
				</div>
			)}
			<Container>
				{isLargeScreen ? <NavBarDesktop initialNavLinks={navLinks} /> : <NavBarMobile toggleSearchArea={toggleSearchArea} initialNavLinks={navLinks} />}
			</Container>
		</div>
	);
};

NavBar.propTypes = {
	toggleSearchArea: PropTypes.func,
};
NavBar.defaultProps = {};

export default NavBar;
