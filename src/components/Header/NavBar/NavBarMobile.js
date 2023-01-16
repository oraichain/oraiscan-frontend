// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Container } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
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
import OraiIcon from "src/icons/OraiIcon";
const cx = cn.bind(styles);

const NavBarMobile = ({ toggleSearchArea, initialNavLinks, isDarkTheme }) => {
	useEffect(() => { });
	const { address } = useSelector(state => state.wallet);
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
				{/* <img className={cx("navbar-brand-icon")} src={logoIcon} alt={"logo"} /> */}
				<OraiIcon className={cx("navbar-brand-icon")} />
				<span className={cx("navbar-brand-text")}>ORAICHAIN</span>
			</NavLink>
			{!_.isNil(address) && (
				<div className={cx("navbar-user")}>
					<Wallet data={{ init: false, title: address }} key={"wallet"} collapse={collapse} />
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
						const { title, path, children, type } = item;
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
											{children.map(({ name, list }, idx) => {
												return (
													<div key={idx} className={cx("dropdown-item")}>
														<div className={cx("item")}>
															<div className={cx("title")} style={{ color: isDarkTheme ? "" : "#181818" }} >{name ?? ""}</div>
															{list && list.length > 0 && (
																<ul>
																	{list.map((el, index) => (
																		<li key={index}>
																			<a href={el.link} target={el.target ?? "_self"} style={{ color: isDarkTheme ? "" : "#181818", opacity: isDarkTheme ? 1 : "0.5" }}>
																				{el.icon ?? ""}
																				{el.title ?? ""}
																			</a>
																		</li>
																	))}
																</ul>
															)}
														</div>
													</div>
												);
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
