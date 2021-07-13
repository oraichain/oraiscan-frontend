// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef} from "react";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import {Container} from "@material-ui/core";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import _ from "lodash";
import cn from "classnames/bind";
import Wallet from "./Wallet/Wallet";
import SearchArea from "src/components/Dashboard/SearchArea";
import DownAngleIcon from "src/icons/DownAngleIcon";
import RightArrowIcon from "src/icons/RightArrowIcon";
import SearchIcon from "src/icons/SearchIcon";
import styles from "./NavBarMobile.module.scss";
import CloseIcon from "src/icons/CloseIcon";
import logoIcon from "src/assets/header/logo.svg";

const cx = cn.bind(styles);

const NavBarMobile = ({toggleSearchArea, initialNavLinks}) => {
	useEffect(() => {});
	const {address} = useSelector(state => state.wallet);
	const navbarCollapseRef = useRef(null);
	const navbarOverlayRef = useRef(null);
	const [openSearch, setOpenSearch] = useState(false);

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

	return (
		<div className={cx("navbar")}>
			<NavLink to='/' className={cx("navbar-brand")}>
				<img className={cx("navbar-brand-icon")} src={logoIcon} alt={"logo"} />
				<span className={cx("navbar-brand-text")}>Oraiscan</span>
			</NavLink>
			{!_.isNil(address) && (
				<div className={cx("navbar-user")}>
					<Wallet data={{init: false, title: address}} key={"wallet"} collapse={collapse} />
				</div>
			)}
			<div className={cx("navbar-right")}>
				<div className={cx("navbar-toggler")} onClick={expand}>
					<span className={cx("navbar-toggler-icon")}>&#9776;</span>
				</div>
			</div>
			<div className={cx("navbar-overlay")} ref={navbarOverlayRef}></div>
			<div className={cx("navbar-collapse")} ref={navbarCollapseRef}>
				<div className={cx("navbar-button-section")}>
					<span
						onClick={() => {
							setOpenSearch(!openSearch);
						}}>
						<SearchIcon className={cx("navbar-search-icon")} />
					</span>
					<span onClick={collapse}>
						<CloseIcon className={cx("navbar-close-icon")} />
					</span>
				</div>
				{openSearch && (
					<div className={cx("search-section")}>
						<SearchArea isDropdownVisible={false} closeMobileNavigateBar={collapse} />
					</div>
				)}
				<ul className={cx("navbar-nav")}>
					{initialNavLinks.map((item, index) => {
						const {title, path, children, type} = item;
						if (children) {
							return (
								<li className={cx("nav-item")} key={"nav-item" + index}>
									<div
										onClick={e => {
											const activeTab = e.currentTarget.getElementsByClassName(cx("dropdown-menu"))?.[0];
											const className = activeTab?.className?.includes(cx("dropdown-menu-active"));
											if (!className) {
												activeTab.classList.add(cx("dropdown-menu-active"));
											} else {
												activeTab.classList.remove(cx("dropdown-menu-active"));
											}
										}}
										className={cx("dropdown")}>
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
							// <li className={cx("nav-item")} key={"nav-item" + index}>
							// 	<Wallet data={item} key={"wallet"} collapse={collapse} />
							// </li>
							<></>
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
	);
};

export default NavBarMobile;
