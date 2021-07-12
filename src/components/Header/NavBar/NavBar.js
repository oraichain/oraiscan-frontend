// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {Container} from "@material-ui/core";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import cn from "classnames/bind";
import {initWallet} from "src/store/modules/wallet";
import Wallet from "./Wallet/Wallet";
import NavBarMobile from "./NavBarMobile";
import DownAngleIcon from "src/icons/DownAngleIcon";
import RightArrowIcon from "src/icons/RightArrowIcon";
import SearchIcon from "src/icons/SearchIcon";
import styles from "./NavBar.module.scss";
import logoIcon from "src/assets/header/logo.svg";
import consts from "src/constants/consts";
import MediumIcon from "src/assets/community/MediumIcon";
import TelegramIcon from "src/assets/community/TelegramIcon";
import TwitterIcon from "src/assets/community/TwitterIcon";
import YoutubeIcon from "src/assets/community/YoutubeIcon";
import RedditIcon from "src/assets/community/RedditIcon";
import GithubIcon from "src/assets/community/GithubIcon";
import {updateToken} from "src/firebase-cloud-message";

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
	const dispatch = useDispatch();
	const {address} = useSelector(state => state.wallet);
	const [navLinks, setNavLinks] = useState(initialNavLinks);
	const navbarCollapseRef = useRef(null);
	const navbarOverlayRef = useRef(null);
	const [isMaintaining, setIsMaintaining] = useState(false);

	const expand = () => {
		if (navbarCollapseRef && navbarCollapseRef.current) {
			navbarCollapseRef.current.style.display = "block";
			navbarOverlayRef.current.style.display = "block";
		}
	};

	const collapse = () => {
		if (navbarCollapseRef && navbarCollapseRef.current) {
			navbarCollapseRef.current.style.display = "none";
			navbarOverlayRef.current.style.display = "none";
		}
	};

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

	useEffect(() => {
		if (isLargeScreen && navbarCollapseRef.current?.style?.display) {
			navbarCollapseRef.current.style.display = "block";
			navbarOverlayRef.current.style.display = "none";
		} else {
			if (navbarCollapseRef.current?.style?.display && navbarCollapseRef.current.style.display == "block") {
				navbarOverlayRef.current.style.display = "block";
			}
		}
	}, [isLargeScreen]);

	return (
		<div className={cx("background")}>
			{isMaintaining && (
				<div className={cx("maintain")}>
					<div className={cx("maintain-text")}>
						Oraiscan is currently experiencing some problems syncing with Oraichain. It will be back shortly, thank you for your patience!
					</div>
				</div>
			)}
			<Container>
				{isLargeScreen ? (
					<div className={cx("navbar")}>
						<NavLink to='/' className={cx("navbar-brand")}>
							<img className={cx("navbar-brand-icon")} src={logoIcon} alt={"logo"} />
							<span className={cx("navbar-brand-text")}>Oraiscan</span>
						</NavLink>
						<div className={cx("navbar-right")}>
							<div className={cx("navbar-search")} onClick={toggleSearchArea}>
								<SearchIcon className={cx("navbar-search-icon")} />
							</div>
							<div className={cx("navbar-toggler")} onClick={expand}>
								<span className={cx("navbar-toggler-icon")}>&#9776;</span>
							</div>
						</div>
						<div className={cx("navbar-overlay")} ref={navbarOverlayRef}></div>
						<div className={cx("navbar-collapse")} ref={navbarCollapseRef}>
							<div className={cx("navbar-close")}>
								<div className={cx("navbar-close-button")} onClick={collapse}>
									<RightArrowIcon className={cx("navbar-close-icon")} />
								</div>
							</div>
							<ul className={cx("navbar-nav")}>
								{navLinks.map((item, index) => {
									const {title, path, children, type} = item;
									if (children) {
										return (
											<li className={cx("nav-item")} key={"nav-item" + index}>
												<div className={cx("dropdown")}>
													<span className={cx("nav-link", "dropdown-toggle")}>
														<span className={cx("dropdown-toggle-text")}>{title}</span>
														<DownAngleIcon className={cx("dropdown-toggle-icon")} />
													</span>
													<div className={cx("dropdown-menu")}>
														{children.map(({title, path, Icon}, idx) => {
															if (Icon) {
																return (
																	<a href={path} target='blank' key={"dropdown-item-" + idx} className={cx("dropdown-item")}>
																		<Icon className={cx("dropdown-item-icon")} /> {title}
																	</a>
																);
															} else {
																return (
																	<a href={path} target='blank' key={"dropdown-item-" + idx} className={cx("dropdown-item")}>
																		{title}
																	</a>
																);
															}
														})}
													</div>
												</div>
											</li>
										);
									}
									return type === "wallet" ? (
										<li className={cx("nav-item")} key={"nav-item" + index}>
											<Wallet data={item} key={"wallet"} collapse={collapse} />
										</li>
									) : (
										<li className={cx("nav-item")} key={"nav-item" + index}>
											<a href={path} className={cx("nav-link")}>
												{title}
											</a>
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				) : (
					<NavBarMobile initialNavLinks={initialNavLinks} />
				)}
			</Container>
		</div>
	);
};

NavBar.propTypes = {
	toggleSearchArea: PropTypes.func,
};
NavBar.defaultProps = {};

export default NavBar;
