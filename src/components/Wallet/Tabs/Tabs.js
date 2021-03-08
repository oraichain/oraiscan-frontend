/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import cn from "classnames/bind";
import Grid from "@material-ui/core/Grid";

import styles from "./Tabs.scss";

const cx = cn.bind(styles);

export default function({activeTab, setActiveTab, isBecomeValidator}) {
	return (
		<div className={cx("tabs")}>
			<div className={cx("tab", activeTab === 0 ? "active" : "")} onClick={() => setActiveTab(0)}>
				<img src={require("../../../assets/wallet/tx.svg")} />
				<div>Transactions</div>
			</div>
			<div className={cx("tab", activeTab === 3 ? "active" : "")} onClick={() => setActiveTab(3)}>
				<img src={require("../../../assets/wallet/validator.svg")} />
				<div> {isBecomeValidator ? "Your Delegators" : "Become A Validator"}</div>
			</div>
			<div className={cx("tab", activeTab === 2 ? "active" : "")} onClick={() => setActiveTab(2)}>
				<img src={require("../../../assets/wallet/delegated-validator.svg")} />
				<div>Delegated Validator</div>
			</div>
		</div>
	);
}
