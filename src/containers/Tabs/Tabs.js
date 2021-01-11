import React, {memo, useState, useRef} from "react";
import {useLocation, useHistory} from "react-router-dom";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import {closePageBar} from "src/store/modules/global";
import {useDispatch} from "react-redux";

import styles from "./Tabs.scss";
import backIcon from "src/assets/header/back_ic.svg";
import toggleIcon from "src/assets/header/toggle_ic.svg";
import blocksSVG from "src/assets/header/blocks.svg";
import dashboardSVG from "src/assets/header/dashboard_black.svg";
import validatorsSVG from "src/assets/header/validators.svg";
import transactionsSVG from "src/assets/header/transactions.svg";
import proposalsSVG from "src/assets/header/proposals.svg";
import data_sourcesSVG from "src/assets/header/data_sources.svg";
import oracle_scriptsSVG from "src/assets/header/oracle_scripts.svg";
import requestsSVG from "src/assets/header/requests.svg";
import test_caseSVG from "src/assets/header/test_case.svg";

const cx = cn.bind(styles);

const tabs = [
	{
		name: "Dashboard",
		img: dashboardSVG,
		route: "/",
	},
	{
		name: "Validators",
		img: validatorsSVG,
		route: "/validators",
	},
	{
		name: "Blocks",
		img: blocksSVG,
		route: "/blocks",
	},
	{
		name: "Transactions",
		img: transactionsSVG,
		route: "/txs",
	},
	{
		name: "Proposals",
		img: proposalsSVG,
		route: "/proposals",
	},
	{
		name: "Data Sources",
		img: data_sourcesSVG,
		route: "/data-sources",
	},
	{
		name: "Test Cases",
		img: test_caseSVG,
		route: "/test-cases",
	},
	{
		name: "Oracle Scripts",
		img: oracle_scriptsSVG,
		route: "/oracle-scripts",
	},
	{
		name: "Requests",
		img: requestsSVG,
		route: "/requests",
	},
];

const Tabs = memo(() => {
	const {pathname} = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	return (
		<Container>
			<div className={cx("overlay")}></div>
			<div className={cx("tabs")}>
				<div className={cx("close")}>
					<img src={backIcon} alt='' className={cx("close-icon")} onClick={() => dispatch(closePageBar())} />
				</div>
				{tabs.map(({name, img, route}, index) => {
					return (
						<div
							className={cx("tab", {active: route === "/" ? pathname === "/" : pathname.indexOf(route) > -1})}
							onClick={() => history.push(route)}
							key={index}>
							<img src={img} alt='' className={cx("tab-icon")} />
							<span className={cx("tab-title")}>{name}</span>
						</div>
					);
				})}
			</div>
		</Container>
	);
});

export default Tabs;
