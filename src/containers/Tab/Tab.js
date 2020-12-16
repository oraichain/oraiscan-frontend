import React from "react";
import cn from "classnames/bind";
import {useLocation, useHistory} from "react-router-dom";
import styles from "./Tab.scss";

import blocksSVG from "src/assets/header/blocks.svg";
import dashboardSVG from "src/assets/header/dashboard.svg";
import validatorsSVG from "src/assets/header/validators.svg";
import transactionsSVG from "src/assets/header/transactions.svg";
import proposalsSVG from "src/assets/header/proposals.svg";
import data_sourcesSVG from "src/assets/header/data_sources.svg";
import oracle_scriptsSVG from "src/assets/header/oracle_scripts.svg";
import requestsSVG from "src/assets/header/requests.svg";

const cx = cn.bind(styles);

const tabs = [
	{
		name: "Dashboard",
		img: dashboardSVG,
		route: "dashboard",
	},
	{
		name: "Validators",
		img: validatorsSVG,
		route: "validators",
	},
	{
		name: "Blocks",
		img: blocksSVG,
		route: "blocks",
	},
	{
		name: "Transactions",
		img: transactionsSVG,
		route: "tx",
	},
	{
		name: "Proposals",
		img: proposalsSVG,
		route: "proposals",
	},
	{
		name: "Data Sources",
		img: data_sourcesSVG,
		route: "data-sources",
	},
	{
		name: "Test Cases",
		route: "test-cases",
	},
	{
		name: "Oracle Scripts",
		img: oracle_scriptsSVG,
		route: "oracle-scripts",
	},
	{
		name: "Requests",
		img: requestsSVG,
		route: "requests",
	},
];

export default function(props) {
	const {pathname} = useLocation();
	const history = useHistory();
	return (
		<div className={cx("Tabs")}>
			{tabs.map(({name, img, route}) => {
				return (
					<div className={cx("Tab", {active: pathname.indexOf(route) > -1 ? true : false})}>
						<img src={img} alt='DB' />
						<span className={cx("title")} onClick={() => history.push(route)}>
							{" "}
							{name}{" "}
						</span>
					</div>
				);
			})}
			{/* <div className={cx("Tab", "active")}>
				<img src={dashboardSVG} alt='DB' />
				<span className={cx("title")}>Dashboard</span>
			</div>
			<div className={cx("Tab")}>
				<img src={validatorsSVG} alt='VL' />
				<span className={cx("title")}>Validators</span>
			</div>
			<div className={cx("Tab")}>
				<img src={blocksSVG} alt='BL' />
				<span className={cx("title")}>Blocks</span>
			</div>
			<div className={cx("Tab")}>
				<img src={transactionsSVG} alt='TX' />

				<span className={cx("title")}>Transactions</span>
			</div>
			<div className={cx("Tab")}>
				<img src={proposalsSVG} alt='PR' />
				<span className={cx("title")}>Proposals</span>
			</div>
			<div className={cx("Tab")} >
				<img src={data_sourcesSVG} alt='DS' />

				<span className={cx("title")}>Data Sources</span>
			</div>
			<div className={cx("Tab")}>
				<img src={oracle_scriptsSVG} alt='OS' />

				<span className={cx("title")}>Oracle Scripts</span>
			</div>
			<div className={cx("Tab")}>
				<img src={requestsSVG} alt='RQ' />
				<span className={cx("title")}>Requests</span>
			</div> */}
		</div>
	);
}
