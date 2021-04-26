/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import cn from "classnames/bind";
import PropTypes from "prop-types";
import {tabs} from "src/containers/RequestDetails/RequestDetails";
import ContactIcon from "src/icons/Tabs/ProposalsTabIcon";
import ValidatorsIcon from "src/icons/Tabs/ValidatorsTabIcon";
import DelegatedIcon from "src/icons/Validators/ValidatorsIcon";
import styles from "./TabBar.module.scss";

const cx = cn.bind(styles);

const TabBar = ({activeTab, setActiveTab}) => {
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
};

TabBar.propTypes = {
	activeTab: PropTypes.any,
	setActiveTab: PropTypes.func,
};
TabBar.defaultProps = {};

export default TabBar;
