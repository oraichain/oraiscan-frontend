/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import cn from "classnames/bind";
import { useGet } from "restful-react";
import TransactionsIcon from "src/icons/Tabs/TransactionsTabIcon";
import { getListCwToken, getListOWContract } from "src/lib/api";
import styles from "./Tabs.module.scss";
import consts from "src/constants/consts";

const cx = cn.bind(styles);

export default function({ activeTab, setActiveTab, address, isTab = false }) {
	const { data: dataRes } = useGet({
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
					<div className={cx("tab-text")}>CW-721 Transactions</div>
				</div>
			)}
			{dataRes?.data && dataRes?.data?.length > 0 && (
				<div className={cx("tab", activeTab === 2 ? "active" : "")} onClick={() => setActiveTab(2)}>
					<TransactionsIcon className={cx("tab-icon")} />
					<div className={cx("tab-text")}>CW-20 Token Transactions</div>
				</div>
			)}
			{address === consts.AIRI_CONTRACT_ADDRESS || address === consts.ORAIX_CONTRACT_ADDRESS ? (
				<div className={cx("tab", activeTab === 4 ? "active" : "")} onClick={() => setActiveTab(4)}>
					<TransactionsIcon className={cx("tab-icon")} />
					<div className={cx("tab-text")}>Top Holders</div>
				</div>
			) : null}
		</div>
	);
}
