// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import cn from "classnames/bind";
import Wallet from "./Wallet/Wallet";
import DownAngleIcon from "src/icons/DownAngleIcon";
import styles from "./NavBar.module.scss";
import logoIcon from "src/assets/header/logo.svg";
import logoXmasLight from "src/assets/header/orai-xmas_light.svg";
import OraiLogo from "src/icons/OraiLogo";
import ModeSwitch from "src/components/common/ModeSwitch";
import { BiChevronDown } from "react-icons/bi";
const cx = cn.bind(styles);

const NavBarDesktop = ({ initialNavLinks, isDarkTheme }) => {
	const navbarCollapseRef = useRef(null);
	const navbarOverlayRef = useRef(null);

	const collapse = () => {
		if (navbarCollapseRef && navbarCollapseRef.current) {
			navbarCollapseRef.current.style.display = "none";
			navbarOverlayRef.current.style.display = "none";
		}
	};

	const [active, setActive] = React.useState(-1);
	const handleDropdown = index => {
		if (window.innerWidth < 576) {
			if (active === index) setActive(-1);
			else setActive(index);
		}
	};

	return (
		<div className={cx("navbar")}>
			<NavLink to='/' className={cx("navbar-brand")}>
				{/* <img className={cx("navbar-brand-icon")} src={logoIcon} alt={"logo"} />
				<span className={cx("navbar-brand-text")}>Oraiscan</span> */}
				{/* <OraiLogo /> */}
				<img style={{ width: 195, height: 45}} src={logoXmasLight}></img>
			</NavLink>
			<nav className={cx("header-menu")} ref={navbarCollapseRef}>
				<ul>
					<ModeSwitch />
					{initialNavLinks.map((item, index) => {
						const { children, type, path, title } = item;
						if (children?.length) {
							return (
								<li key={index} className={cx("pointer")}>
									<a href={item.link}>
										{item.title ?? ""} {item.children && item.children.length > 0 && <BiChevronDown onClick={() => handleDropdown(index)} />}
									</a>
									{item.children && item.children.length > 0 && (
										<div className={cx("menu-dropdown", active === index ? "active" : "")}>
											{item.children.map((child, index) => (
												<div key={index} className={cx("menu-item")}>
													<div className={cx("item")}>
														<div className={cx("title")} style={{ color: isDarkTheme ? "" : "#181818" }}>{child.name ?? ""}</div>
														{child.list && child.list.length > 0 && (
															<ul>
																{child.list.map((el, index) => (
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
											))}
										</div>
									)}
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
			</nav>
		</div>
	);
};

NavBarDesktop.propTypes = {
	initialNavLinks: PropTypes.any,
};
NavBarDesktop.defaultProps = {};

export default NavBarDesktop;
