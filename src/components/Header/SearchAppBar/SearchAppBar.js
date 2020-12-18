// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import cn from "classnames/bind";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {Toolbar, List, ListItem, ListItemText, Button, MenuItem, Drawer, Hidden} from "@material-ui/core";
import {ArrowDropDown, DriveEta} from "@material-ui/icons";
import copy from "copy-to-clipboard";

import Keystation from "src/lib/Keystation";
import {initWallet} from "src/store/modules/wallet";
import SearchArea from "src/components/common/SearchArea";
import logo from "src/assets/header/logo.svg";
import {ReactComponent as CopyIcon} from "src/assets/icons/copy.svg";
import {ReactComponent as ShareIcon} from "src/assets/icons/share.svg";

import styles from "./SearchAppBar.scss";

const cx = cn.bind(styles);

const handleClickConnectWallet = () => {
	const myKeystation = new Keystation({
		client: process.env.REACT_APP_WALLET_API,
		lcd: "https://lcd-cosmos-free.cosmostation.io",
		path: "44/118/0/0/0",
		keystationUrl: process.env.REACT_APP_WALLET_API,
	});

	const prefix = "cosmos";
	const popup = myKeystation.openWindow("signin", prefix);
	let popupTick = setInterval(function() {
		if (popup.closed) {
			clearInterval(popupTick);
			console.log("window closed!");
		}
	}, 500);
};

const navLinkInit = [
	{title: `Home`, path: `https://orai.io/`},
	{
		title: `Products`,
		children: [
			{title: `Liquidity`, path: `https://liquidity.orai.io/`},
			{title: `Testnet`, path: `https://scan.orai.io/`},
			{title: `yAi.Finance`, path: `https://yai.finance/`},
			{title: `Marketplace`, path: `https://market.orai.io/oscript`},
		],
	},
	{title: `Tokenomics`, path: `https://orai.io/Tokenomics`},
	{
		title: `About`,
		children: [
			{title: `Team`, path: `https://orai.io/#team`},
			{title: `Roadmap`, path: `https://orai.io/roadmap`},
			{title: `Community`, path: `https://t.me/oraichain_official`},
		],
	},
	{title: `Whitepaper`, path: `https://docs.orai.io/docs/whitepaper/introduction/`},
	{title: "Connect Wallet", path: null, handleClick: handleClickConnectWallet, type: "wallet"},
];

function openNav() {
	document.getElementById("mySidenav").style.width = "280px";
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
}

export default function(props) {
	const [navLinks, setNavLinks] = useState(navLinkInit);
	const dispatch = useDispatch();
	const {address} = useSelector(state => state.wallet);

	useEffect(() => {
		const callBack = function(e) {
			if (e?.data?.address) {
				navLinkInit[navLinkInit.length - 1] = {
					title: e.data.address,
					type: "wallet",
				};
				setNavLinks([...navLinkInit]);
				dispatch(initWallet(e.data.address));
			}
		};
		window.addEventListener("message", callBack, false);
		return () => {
			window.removeEventListener("message", callBack);
		};
	}, []);

	useEffect(() => {
		navLinkInit[navLinkInit.length - 1] = {
			title: address,
			type: "wallet",
		};
		setNavLinks([...navLinkInit]);
	}, [address]);

	const renderWalletItem = ({path, title, handleClick}) => {
		if (title === "") {
			return (
				<a href={path} key={title} target='_blank' onClick={handleClick || handleClickConnectWallet}>
					<ListItem button>
						<ListItemText primary={"Connect Wallet"} />
					</ListItem>
				</a>
			);
		}
		return (
			<div className={cx("dropdown")}>
				<a href={path} key={title} target='_blank' onClick={e => e.preventDefault()}>
					<ListItem button>
						{title}
						<ArrowDropDown />
					</ListItem>
				</a>
				<div className={cx("dropdown-content")}>
					<div className={cx("orai-profile")}>
						<div className={cx("wallet-name")}>Address (your name here)</div>
						<div className={cx("wallet-link")}>
							<a href='/' onClick={e => e.preventDefault()}>
								{" "}
								{title}{" "}
							</a>
							<span className={cx("wallet-copy")} onClick={() => copy(title)}>
								{" "}
								<CopyIcon />{" "}
							</span>
							<span className={cx("wallet-share")}>
								{" "}
								<ShareIcon />{" "}
							</span>
						</div>
						<div className={cx("orai-btn-group")}>
							<div className={cx("btn-orai", "change-wallet")}> Change Wallet </div>
							<div className={cx("btn-orai", "close-wallet")} onClick={() => dispatch(initWallet(""))}>
								{" "}
								Close Wallet{" "}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className={cx("SearchAppBar-root")} id={"Header-fixed-id"}>
			<Toolbar className={cx("toolbar")}>
				<NavLink to='/'>
					<img src={logo} alt={"logo"} />
					<span className={cx("name")}>Oraiscan</span>
				</NavLink>
				<div className={cx("select-wrapper")}>
					{/* <SearchArea propCx={cx} dropdownStyle={{position: "fixed", width: "459px"}} /> */}
					<List component='nav' aria-labelledby='main navigation' className={cx("nav-display-flex")}>
						{navLinks.map((item, idx) => {
							const {title, path, children, handleClick, type} = item;
							if (children) {
								return (
									<div className={cx("dropdown")}>
										<a key={title}>
											<ListItem button>
												<ListItemText primary={title} />
												<ArrowDropDown />
											</ListItem>
										</a>
										<div className={cx("dropdown-content")}>
											{children.map(({title, path}) => (
												<a href={path} key={title} className={cx("link-text")} target='_blank'>
													{title}
												</a>
											))}
										</div>
									</div>
								);
							}
							return type === "wallet" ? (
								renderWalletItem(item)
							) : (
								<a href={path} key={title} target='_blank'>
									<ListItem button>
										<ListItemText primary={title} />
									</ListItem>
								</a>
							);
						})}
					</List>
					<div className={cx("menu")} onClick={openNav}>
						&#9776;
					</div>
					<div id='mySidenav' className={cx("sidenav")}>
						<a href='javascript:void(0)' className={cx("closebtn")} onClick={closeNav}>
							&times;
						</a>
						{navLinks.map(({title, path, children}, idx) => {
							if (children) {
								return (
									<div className={cx("dropdown")}>
										<a key={title} className={cx("dropdown-btn")}>
											<ListItem button>
												<ListItemText primary={title} />
												<ArrowDropDown />
											</ListItem>
										</a>
										<div className={cx("dropdown-content")}>
											{children.map(({title, path}) => (
												<a href={path} key={title} className={cx("link-text")} target='_blank'>
													{title}
												</a>
											))}
										</div>
									</div>
								);
							}
							return (
								<a href={path} key={title} target='_blank'>
									<ListItem button>
										<ListItemText primary={title} />
									</ListItem>
								</a>
							);
						})}
						{/* <a href='#'>Home</a>
						<a href='#'>Products</a>
						<a href='#'>Tokenomics</a>
						<a href='#'>About</a>
						<a href='#'>Whitepaper</a> */}
					</div>
				</div>
			</Toolbar>
		</div>
	);
}
