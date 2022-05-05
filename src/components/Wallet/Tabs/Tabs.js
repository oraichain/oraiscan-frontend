/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import cn from "classnames/bind";
import Grid from "@material-ui/core/Grid";
import styles from "./Tabs.scss";

import ContactIcon from "src/icons/Tabs/ProposalsTabIcon";
import ValidatorsIcon from "src/icons/Tabs/ValidatorsTabIcon";
import DelegatedIcon from "src/icons/Validators/ValidatorsIcon";
import TransactionsIcon from "src/icons/Tabs/TransactionsTabIcon";

const cx = cn.bind(styles);

export default function ({ activeTab, setActiveTab, isBecomeValidator }) {
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
			{/* <div className={cx("tab", activeTab === 6 ? "active" : "")} onClick={() => setActiveTab(6)}>
				<div className={cx("tab-text")}>CW-20 Token Txns</div>
			</div> */}
			{isBecomeValidator && (
				<div className={cx("tab", activeTab === 3 ? "active" : "")} onClick={() => setActiveTab(3)}>
					<ValidatorsIcon className={cx("tab-icon")} />
					{/* <div className={cx("tab-text")}> {isBecomeValidator ? "Your Delegators" : "Become A Validator"}</div> */}
					<div className={cx("tab-text")}> Your Delegators</div>
				</div>
			)}
			<div className={cx("tab", activeTab === 2 ? "active" : "")} onClick={() => setActiveTab(2)}>
				<DelegatedIcon className={cx("tab-icon")} />
				<div className={cx("tab-text")}>Delegated Validator</div>
			</div>
			<div className={cx("tab", activeTab === 4 ? "active" : "")} onClick={() => setActiveTab(4)}>
				<ContactIcon className={cx("tab-icon")} />
				<div className={cx("tab-text")}>Contact</div>
			</div>
			<div className={cx("tab", activeTab === 5 ? "active" : "")} onClick={() => setActiveTab(5)}>
				<DelegatedIcon className={cx("tab-icon")} />
				<div className={cx("tab-text")}>AI Request Fees</div>
			</div>
		</div>
	);
}
