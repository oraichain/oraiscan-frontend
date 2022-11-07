/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, {useCallback, useMemo} from "react";
import {NavLink} from "react-router-dom";
import {Grid} from "@material-ui/core";
import cn from "classnames/bind";
import {useHistory} from "src/hooks";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import svg from "./SubHeaderAssets";
import styles from "./SubHeader.module.scss";

const cx = cn.bind(styles);
const routes = Object.freeze(_.map(consts.MENU, v => v.route));

const checkCurrentRoute = (route, pathname) => {
	if (route === "/") return pathname === "/";
	else if (_.includes(pathname, route)) return true;
	else if (_.isEqual(route, "/dashboard") && _.every(routes, v => !_.includes(pathname, v))) return true;
	return false;
};

export default function({navBarOpen, setNavBarOpen, currentRoute, setCurrentRoute}) {
	const history = useHistory();

	const handleClick = useCallback(
		(e, route) => {
			if (_.isEqual(window.location.pathname, route)) e.preventDefault();
			if (route === "/dex") {
				e.preventDefault();
				window.open(consts.LINK.BINANCEDEX, "_blank");
			}
			setNavBarOpen(false);
			if (currentRoute !== route) {
				setCurrentRoute(route);
			}
		},
		[setNavBarOpen]
	);

	const render = useCallback(
		pathname => (
			<div className={cx(`sub-header`, {open: navBarOpen})}>
				<Grid container className={cx("nav-list", {open: navBarOpen})}>
					<Grid item className={cx("navi")}>
						{_.map(consts.MENU, (v, idx) => {
							const check = checkCurrentRoute(v.route, pathname);
							return (
								<NavLink className={cx("nav-item")} key={idx} to={v.route} onClick={e => handleClick(e, v.route)}>
									<img src={check ? svg.on[idx] : svg.off[idx]} alt={"none"} />
									<h2 className={cx("nav-item-title", {selected: check})}>{v.display}</h2>
								</NavLink>
							);
						})}
					</Grid>
				</Grid>
			</div>
		),
		[handleClick, navBarOpen]
	);

	return useMemo(() => render(history.location.pathname), [render, history.location.pathname]);
}
