/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import cn from "classnames/bind";
import Grid from "@material-ui/core/Grid";
import styles from "./Tabs.scss";
import TransactionsIcon from "src/icons/Tabs/TransactionsTabIcon";

const cx = cn.bind(styles);

export default function({activeTab, setActiveTab}) {
	return (
		<div className={cx("tabs")}>
			<div className={cx("tab", activeTab === 0 ? "active" : "")} onClick={() => setActiveTab(0)}>
				<TransactionsIcon className={cx("tab-icon")} />
				<div className={cx("tab-text")}>Transactions</div>
			</div>
			<div className={cx("tab", activeTab === 1 ? "active" : "")} onClick={() => setActiveTab(1)}>
				<TransactionsIcon className={cx("tab-icon")} />
				<div className={cx("tab-text")}>Royalty Transactions</div>
			</div>
		</div>
	);
}
