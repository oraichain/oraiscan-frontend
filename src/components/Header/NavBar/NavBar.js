// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {Container} from "@material-ui/core";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import cn from "classnames/bind";
import {initWallet} from "src/store/modules/wallet";
import NavBarMobile from "./NavBarMobile";
import styles from "./NavBar.module.scss";
import consts from "src/constants/consts";
import MediumIcon from "src/assets/community/MediumIcon";
import TelegramIcon from "src/assets/community/TelegramIcon";
import TwitterIcon from "src/assets/community/TwitterIcon";
import YoutubeIcon from "src/assets/community/YoutubeIcon";
import RedditIcon from "src/assets/community/RedditIcon";
import GithubIcon from "src/assets/community/GithubIcon";
import {updateToken} from "src/firebase-cloud-message";
import NavBarDesktop from "./NavBarDesktop";
import {ThemeSetup} from "src/helpers/helper";

const cx = cn.bind(styles);

const initialNavLinks = [
	{
		title: `Product`,
		children: [
			// {title: `Liquidity`, path: `https://liquidity.orai.io/`},
			{title: `yAI Finance`, path: `https://yai.finance`},
			{title: `aiRight`, path: `https://airight.io`},
			{title: `AI Marketplace`, path: `https://market.orai.io`},
			{title: `Oraiscan`, path: `https://scan.orai.io`},
			{title: `Oraichain Studio`, path: `https://developer.orai.io`},
			{title: `Oraichain Bridge`, path: `https://bridge.orai.io`},
		],
	},
	{
		title: `Docs`,
		children: [
			{title: `Whitepaper`, path: `https://docs.orai.io/docs/whitepaper/introduction/`},
			{title: `Tokenomics`, path: `https://orai.io/tokenomics`},
			{title: `FAQs`, path: `https://gov.orai.io/`},
		],
	},
	{
		title: `Events`,
		children: [
			{title: `Roadmap`, path: `https://orai.io/roadmap`},
			{title: `Calendar`, path: `https://orai.io/calendar`},
			{title: `Milestones`, path: `https://orai.io/calendar#milestones`},
			{title: `News`, path: `https://medium.com/oraichain`},
			{title: `Press Releases`, path: `https://orai.io/news`},
		],
	},
	{
		title: `Community`,
		children: [
			{title: `Medium`, path: `https://medium.com/oraichain`, Icon: MediumIcon},
			{title: `Telegram`, path: `https://t.me/oraichain`, Icon: TelegramIcon},
			{title: `Twitter`, path: `https://twitter.com/oraichain`, Icon: TwitterIcon},
			{title: `Youtube`, path: `https://www.youtube.com/channel/UCyckcs_Fm8kU4o2Y1_KPjXg`, Icon: YoutubeIcon},
			{title: `Reddit`, path: `https://www.reddit.com/r/Oraichain_Official/`, Icon: RedditIcon},
			{title: `Github`, path: `https://github.com/oraichain`, Icon: GithubIcon},
		],
	},
	{title: "Connect Wallet", path: null, type: "wallet", init: true},
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

const NavBar = ({toggleSearchArea}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const {isDarkTheme} = ThemeSetup();
	const dispatch = useDispatch();
	const {address} = useSelector(state => state.wallet);
	const [navLinks, setNavLinks] = useState(initialNavLinks);
	const [isMaintaining, setIsMaintaining] = useState(false);

	useEffect(() => {
		const onMessage = function(e) {
			const address = e?.data?.address;
			if (address) {
				initialNavLinks[initialNavLinks.length - 1] = {
					title: address,
					type: "wallet",
				};
				setNavLinks([...initialNavLinks]);
				dispatch(initWallet({address, account: e.data.account}));
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
