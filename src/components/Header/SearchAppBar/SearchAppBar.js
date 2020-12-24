// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import cn from "classnames/bind";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useHistory} from "react-router-dom";
import {Toolbar, List, ListItem, ListItemText, Button, MenuItem, Drawer, Hidden} from "@material-ui/core";
import {ArrowDropDown, DriveEta} from "@material-ui/icons";

import Wallet from "./Wallet";
import {initWallet} from "src/store/modules/wallet";
import SearchArea from "src/components/common/SearchArea";
import {navLinkInit} from "./nav-link-init";
import logo from "src/assets/header/logo.svg";

import styles from "./SearchAppBar.scss";

const cx = cn.bind(styles);

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
				dispatch(initWallet({address: e.data.address, account: e.data.account}));
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
							const {title, path, children, type} = item;
							if (children) {
								return (
									<div className={cx("dropdown")}>
										<a key={title} href='/'>
											<ListItem button>
												<ListItemText primary={title} />
												<ArrowDropDown />
											</ListItem>
										</a>
										<div className={cx("dropdown-content")}>
											{children.map(({title, path}) => (
												<a href={path} key={title} className={cx("link-text")}>
													{title}
												</a>
											))}
										</div>
									</div>
								);
							}
							return type === "wallet" ? (
								<Wallet data={item} />
							) : (
								<a href={path} key={title}>
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
