/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import cn from "classnames/bind";
import Grid from "@material-ui/core/Grid";
import styles from "./Tabs.scss";
import txIcon from "src/assets/wallet/tx.svg";
import validatorIcon from "src/assets/wallet/validator.svg";
import delegatedValidatorIcon from "src/assets/wallet/delegated-validator.svg";
import contactIcon from "src/assets/wallet/contact.svg";

const cx = cn.bind(styles);

export default function({activeTab, setActiveTab, isBecomeValidator}) {
	return (
		<div className={cx("tabs")}>
			<div className={cx("tab", activeTab === 0 ? "active" : "")} onClick={() => setActiveTab(0)}>
				<img className={cx("tab-icon")} src={txIcon} />
				<div className={cx("tab-text")}>Transactions</div>
			</div>
			<div className={cx("tab", activeTab === 3 ? "active" : "")} onClick={() => setActiveTab(3)}>
				<img className={cx("tab-icon")} src={validatorIcon} />
				<div className={cx("tab-text")}> {isBecomeValidator ? "Your Delegators" : "Become A Validator"}</div>
			</div>
			<div className={cx("tab", activeTab === 2 ? "active" : "")} onClick={() => setActiveTab(2)}>
				<img className={cx("tab-icon")} src={delegatedValidatorIcon} />
				<div className={cx("tab-text")}>Delegated Validator</div>
			</div>
			<div className={cx("tab", activeTab === 4 ? "active" : "")} onClick={() => setActiveTab(4)}>
				<img className={cx("tab-icon")} src={contactIcon} />
				<div className={cx("tab-text")}>Contact</div>
			</div>
		</div>
	);
}
