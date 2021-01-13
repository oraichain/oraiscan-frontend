// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useHistory} from "react-router-dom";
import {Toolbar, List, ListItem, ListItemText, Button, MenuItem, Drawer, Hidden} from "@material-ui/core";
import {ArrowDropDown, DriveEta} from "@material-ui/icons";
import cn from "classnames/bind";
import Wallet from "./Wallet";
import {initWallet} from "src/store/modules/wallet";
import SearchArea from "src/components/common/SearchArea";
import {navLinkInit} from "./nav-link-init";
import styles from "./SearchAppBar.scss";
import logo from "src/assets/header/logo.svg";
import {indexOf} from "lodash";

export default function(props) {
	const cx = cn.bind(styles);
	const sideNavRef = useRef(null);

	const openSideNav = () => {
		if (sideNavRef && sideNavRef.current) {
			sideNavRef.current.style.width = "280px";
		}
	};

	const closeSideNav = e => {
		e.preventDefault();
		if (sideNavRef && sideNavRef.current) {
			sideNavRef.current.style.width = "0";
		}
	};

	const [navLinks, setNavLinks] = useState(navLinkInit);
	const dispatch = useDispatch();
	const {address} = useSelector(state => state.wallet);
	useEffect(() => {
		const callBack = function(e) {
			if (e?.data?.address) {
				console.log(e);
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
		<div className={cx("SearchAppBar-root")}>
			<Toolbar className={cx("toolbar")}>
				<NavLink to='/' className={cx("toolbar-logo")}>
					<img src={logo} alt={"logo"} />
					<span className={cx("name")}>Oraiscan</span>
				</NavLink>
				<div className={cx("select-wrapper")}>
					{/* <SearchArea propCx={cx} dropdownStyle={{position: "fixed", width: "459px"}} /> */}
					<List component='nav' aria-labelledby='main navigation' className={cx("nav-display-flex")}>
						{navLinks.map((item, index) => {
							const {title, path, children, type} = item;
							if (children) {
								return (
									<div className={cx("dropdown")} key={"nav-dropdown-" + index}>
										<a href='/'>
											<ListItem button>
												<ListItemText primary={title} />
												<ArrowDropDown />
											</ListItem>
										</a>
										<div className={cx("dropdown-content")}>
											{children.map(({title, path}, idx) => (
												<a href={path} key={"nav-dropdown-content" + idx} className={cx("link-text")}>
													{title}
												</a>
											))}
										</div>
									</div>
								);
							}
							return type === "wallet" ? (
								<Wallet data={item} key={"nav-wallet-" + index} />
							) : (
								<a href={path} key={"nav-link-" + index} className={cx("dropdown", "dropdown-link")}>
									{title}
								</a>
							);
						})}
					</List>
					<div className={cx("menu")} onClick={openSideNav}>
						&#9776;
					</div>
					<div ref={sideNavRef} className={cx("sidenav")}>
						<a href='#' className={cx("closebtn")} onClick={closeSideNav}>
							&times;
						</a>
						{navLinks.map(({title, path, children}, index) => {
							if (children) {
								return (
									<div className={cx("dropdown")} key={"sidenav-dropdown-" + index}>
										<a className={cx("dropdown-btn")}>
											<ListItem button>
												<ListItemText primary={title} />
												<ArrowDropDown />
											</ListItem>
										</a>
										<div className={cx("dropdown-content")}>
											{children.map(({title, path}, idx) => (
												<a href={path} key={"sidenav-dropdown-content" + idx} className={cx("link-text")} target='_blank'>
													{title}
												</a>
											))}
										</div>
									</div>
								);
							}
							return (
								<a href={path} key={"sidenav-link-" + index} target='_blank'>
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
