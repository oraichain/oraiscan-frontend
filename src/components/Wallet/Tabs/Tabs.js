/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import cn from "classnames/bind";
import { useGet } from "restful-react";
import ContactIcon from "src/icons/Tabs/ProposalsTabIcon";
import ValidatorsIcon from "src/icons/Tabs/ValidatorsTabIcon";
import TransactionsIcon from "src/icons/Tabs/TransactionsTabIcon";
import { getListCwToken } from "src/lib/api";
import styles from "./Tabs.module.scss";

const cx = cn.bind(styles);

export default function({ activeTab, setActiveTab, isBecomeValidator, address }) {
	const response = useGet({
		path: getListCwToken(address),
	});
	const dataRes = response?.data?.data;

	return (
		<div className={cx("tabs")}>
			<div className={cx("tab", activeTab === 0 ? "active" : "")} onClick={() => setActiveTab(0)}>
				<TransactionsIcon className={cx("tab-icon")} />
				<div className={cx("tab-text")}>Transactions</div>
			</div>
			{dataRes && dataRes?.length > 0 && (
				<div className={cx("tab", activeTab === 6 ? "active" : "")} onClick={() => setActiveTab(6)}>
					<div className={cx("tab-text")}>CW-20 Token Txs</div>
				</div>
			)}
			{/* {dataRes && dataRes?.length > 0 && (
				<div className={cx("tab", activeTab === 7 ? "active" : "")} onClick={() => setActiveTab(7)}>
					<div className={cx("tab-text")}>CW-721 Transactions</div>
				</div>
			)} */}
			{isBecomeValidator && (
				<div className={cx("tab", activeTab === 3 ? "active" : "")} onClick={() => setActiveTab(3)}>
					<ValidatorsIcon className={cx("tab-icon")} />
					<div className={cx("tab-text")}>Your Delegators</div>
				</div>
			)}
			<div className={cx("tab", activeTab === 4 ? "active" : "")} onClick={() => setActiveTab(4)}>
				<ContactIcon className={cx("tab-icon")} />
				<div className={cx("tab-text")}>Contact</div>
			</div>
		</div>
	);
}
