// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {Container} from "@material-ui/core";
import cn from "classnames/bind";
import {initWallet} from "src/store/modules/wallet";
import Wallet from "./Wallet/Wallet";
import styles from "./NavBar.module.scss";
import logoIcon from "src/assets/header/logo.svg";
import whiteArrowDownIcon from "src/assets/header/white_arrow_down.svg";
import greyArrowDownIcon from "src/assets/header/grey_arrow_down.svg";

const cx = cn.bind(styles);

const initialNavLinks = [
	{
		title: `Product`,
		children: [
			// {title: `Liquidity`, path: `https://liquidity.orai.io/`},
			// {title: `Testnet`, path: `https://scan.orai.io/`},
			{title: `yAi.Finance`, path: `https://yai.finance/`},
			{title: `Marketplace`, path: `https://market.orai.io/oscript`},
		],
	},
	{title: `Tokenomic`, path: `https://orai.io/tokenomics`},
	{
		title: `About`,
		children: [
			{title: `Team`, path: `https://orai.io/#team`},
			{title: `Roadmap`, path: `https://orai.io/roadmap`},
			{title: `Community`, path: `https://t.me/oraichain_official`},
		],
	},
	{title: `Whitepaper`, path: `https://docs.orai.io/docs/whitepaper/introduction/`},
	{title: "Connect Wallet", path: null, type: "wallet", init: true},
];

const NavBar = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const dispatch = useDispatch();
	const {address} = useSelector(state => state.wallet);
	const [navLinks, setNavLinks] = useState(initialNavLinks);
	const navbarCollapseRef = useRef(null);

	const expand = () => {
		if (navbarCollapseRef && navbarCollapseRef.current) {
			navbarCollapseRef.current.style.display = "block";
		}
	};

	const collapse = e => {
		e.preventDefault();
		if (navbarCollapseRef && navbarCollapseRef.current) {
			navbarCollapseRef.current.style.display = "none";
		}
	};

	useEffect(() => {
		const onMessage = function(e) {
			if (e?.data?.address) {
				initialNavLinks[initialNavLinks.length - 1] = {
					title: e.data.address,
					type: "wallet",
				};
				setNavLinks([...initialNavLinks]);
				dispatch(initWallet({address: e.data.address, account: e.data.account}));
			}
		};
		window.addEventListener("message", onMessage, false);
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
		<div className={cx("background")}>
			<Container>
				<div className={cx("navbar")}>
					<NavLink to='/' className={cx("navbar-brand")}>
						<img className={cx("navbar-brand-icon")} src={logoIcon} alt={"logo"} />
						<span className={cx("navbar-brand-text")}>Oraiscan</span>
					</NavLink>
					<div className={cx("navbar-toggler")} onClick={expand}>
						<span className={cx("navbar-toggler-icon")}>&#9776;</span>
					</div>
					<div className={cx("navbar-collapse")} ref={navbarCollapseRef}>
						<div className={cx("navbar-close")} onClick={collapse}>
							<span className={cx("navbar-close-icon")}>&times;</span>
						</div>
						<ul className={cx("navbar-nav")}>
							{navLinks.map((item, index) => {
								const {title, path, children, type} = item;
								if (children) {
									return (
										<li className={cx("nav-item", "dropdown")} key={"nav-item" + index}>
											<span className={cx("nav-link", "dropdown-toggle")}>
												<span className={cx("dropdown-toggle-text")}>{title}</span>
												<img className={cx("dropdown-toggle-icon")} src={isLargeScreen ? whiteArrowDownIcon : greyArrowDownIcon} alt='' />
											</span>
											<div className={cx("dropdown-menu")}>
												{children.map(({title, path}, idx) => (
													<a href={path} key={"dropdown-item-" + idx} className={cx("dropdown-item")}>
														{title}
													</a>
												))}
											</div>
										</li>
									);
								}
								return type === "wallet" ? (
									<li className={cx("nav-item")} key={"nav-item" + index}>
										<Wallet data={item} key={"wallet"} />
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
			</Container>
		</div>
	);
};

NavBar.propTypes = {};
NavBar.defaultProps = {};

export default NavBar;
