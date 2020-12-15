import React from "react";
import cn from "classnames/bind";
import styles from "./SearchAppBar.scss";
// import _ from "lodash";
import {NavLink} from "react-router-dom";

//  components
import SearchArea from "src/components/common/SearchArea";
import {Toolbar, List, ListItem, ListItemText, Button, MenuItem, Drawer, Hidden} from "@material-ui/core";
import {ArrowDropDown, DriveEta} from "@material-ui/icons";

import logo from "src/assets/header/logo.svg";

const cx = cn.bind(styles);

const navLinks = [
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
];

function openNav() {
	document.getElementById("mySidenav").style.width = "280px";
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
}

export default function(props) {
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
						{navLinks.map(({title, path, children}, idx) => {
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
							return (
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
