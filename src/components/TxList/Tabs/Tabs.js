/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import cn from "classnames/bind";
import {useGet} from "restful-react";
import TransactionsIcon from "src/icons/Tabs/TransactionsTabIcon";
import {getListCwToken, getListOWContract} from "src/lib/api";
import styles from "./Tabs.module.scss";

const cx = cn.bind(styles);

export default function({activeTab, setActiveTab, address, isTab = false}) {
	const {data: dataRes} = useGet({
		path: !isTab ? getListCwToken(address) : getListOWContract(address),
	});

	return (
		<div className={cx("tabs")}>
			<div className={cx("tab", activeTab === 0 ? "active" : "")} onClick={() => setActiveTab(0)}>
				<TransactionsIcon className={cx("tab-icon")} />
				<div className={cx("tab-text")}>Transactions</div>
			</div>
			{!isTab && (
				<div className={cx("tab", activeTab === 1 ? "active" : "")} onClick={() => setActiveTab(1)}>
					<TransactionsIcon className={cx("tab-icon")} />
					<div className={cx("tab-text")}>Royalty Transactions</div>
				</div>
			)}
			{!isTab && (
			<div className={cx("tab", activeTab === 3 ? "active" : "")} onClick={() => setActiveTab(3)}>
				<TransactionsIcon className={cx("tab-icon")} />
				<div className={cx("tab-text")}>CW-721 transactions</div>
			</div>
			)}
			{dataRes?.data && dataRes?.data?.length > 0 && (
				<div className={cx("tab", activeTab === 2 ? "active" : "")} onClick={() => setActiveTab(2)}>
					<TransactionsIcon className={cx("tab-icon")} />
					<div className={cx("tab-text")}>CW-20 Token Transactions</div>
				</div>
			)}
		</div>
	);
}
