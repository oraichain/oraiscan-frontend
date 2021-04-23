/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import cn from "classnames/bind";
import styles from "./TabBar.scss";
import ContactIcon from "src/icons/Tabs/ProposalsTabIcon";
import ValidatorsIcon from "src/icons/Tabs/ValidatorsTabIcon";
import DelegatedIcon from "src/icons/Validators/ValidatorsIcon";
import {tabs} from "./RequestDetails";

const cx = cn.bind(styles);

export default function({activeTab, setActiveTab}) {
	return (
		<div className={cx("tabs")}>
			<div className={cx("tab", activeTab === tabs.AI_DATA_SOURCES ? "active" : "")} onClick={() => setActiveTab(tabs.AI_DATA_SOURCES)}>
				<DelegatedIcon className={cx("tab-icon")} />
				<div className={cx("tab-text")}>{tabs.AI_DATA_SOURCES}</div>
			</div>
			<div className={cx("tab", activeTab === tabs.REPORTS ? "active" : "")} onClick={() => setActiveTab(tabs.REPORTS)}>
				<ValidatorsIcon className={cx("tab-icon")} />
				<div className={cx("tab-text")}>{tabs.REPORTS}</div>
			</div>
			<div className={cx("tab", activeTab === tabs.RESULT ? "active" : "")} onClick={() => setActiveTab(tabs.RESULT)}>
				<ContactIcon className={cx("tab-icon")} />
				<div className={cx("tab-text")}>{tabs.RESULT}</div>
			</div>
		</div>
	);
}
