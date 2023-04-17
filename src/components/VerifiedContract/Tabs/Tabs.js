/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import cn from "classnames/bind";
import DelegatedIcon from "src/icons/Validators/ValidatorsIcon";
import TransactionsIcon from "src/icons/Tabs/TransactionsTabIcon";
import styles from "./Tabs.module.scss";
import SearchInput from "src/components/common/SearchInput";
const cx = cn.bind(styles);

export default function ({ activeTab, setActiveTab, address, keyword, setKeyword, placeholder }) {
	return (
		<div className={cx("tabs-all")} >
			<div className={cx("tabs")}>
				<div className={cx("tab", activeTab === 0 ? "active" : "")} onClick={() => setActiveTab(0)}>
					<div className={cx("tab-text")}>Code</div>
				</div>
				<div className={cx("tab", activeTab === 1 ? "active" : "")} onClick={() => setActiveTab(1)}>
					<div className={cx("tab-text")}>Read Contract</div>
				</div>
				<div className={cx("tab", activeTab === 2 ? "active" : "")} onClick={() => setActiveTab(2)}>
					<div className={cx("tab-text")}>Write Contract</div>
				</div>
			</div>
			{/* <div className={cx("search")}>
				<SearchInput
					className={cx("search-custom")}
					placeholder={placeholder}
					value={keyword}
					onChange={e => {
						setKeyword(e.target.value);
					}}
				/>
			</div> */}
		</div>
	);
}
