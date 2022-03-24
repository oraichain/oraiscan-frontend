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
import OraiLogo from "src/icons/OraiLogo";
import ModeSwitch from "src/components/common/ModeSwitch";

const cx = cn.bind(styles);

const NavBarDesktop = ({ initialNavLinks }) => {
	const navbarCollapseRef = useRef(null);
	const navbarOverlayRef = useRef(null);

	const collapse = () => {
		if (navbarCollapseRef && navbarCollapseRef.current) {
			navbarCollapseRef.current.style.display = "none";
			navbarOverlayRef.current.style.display = "none";
		}
	};

	return (
		<div className={cx("navbar")}>
			<NavLink to='/' className={cx("navbar-brand")}>
				{/* <img className={cx("navbar-brand-icon")} src={logoIcon} alt={"logo"} />
				<span className={cx("navbar-brand-text")}>Oraiscan</span> */}
				<OraiLogo />
			</NavLink>
			<div className={cx("navbar-collapse")} ref={navbarCollapseRef}>
				<ul className={cx("navbar-nav")}>
					<ModeSwitch />
					{initialNavLinks.map((item, index) => {
						const { title, path, children, type } = item;
						if (children) {
							return (
								<li className={cx("nav-item")} key={"nav-item" + index}>
									<div className={cx("dropdown")}>
										<span className={cx("nav-link", "dropdown-toggle")}>
											<span className={cx("dropdown-toggle-text")}>{title}</span>
											<DownAngleIcon className={cx("dropdown-toggle-icon")} />
										</span>
										<div className={cx("dropdown-menu")}>
											{children.map(({ title, path, Icon }, idx) => {
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
	);
};

NavBarDesktop.propTypes = {
	initialNavLinks: PropTypes.any,
};
NavBarDesktop.defaultProps = {};

export default NavBarDesktop;
