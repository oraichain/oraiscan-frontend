/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import cn from "classnames/bind";
import DelegatedClaim from "src/components/Wallet/DelegatedValidator/DelegatedClaim";
import DelegatedWithdraw from "src/components/Wallet/DelegatedValidator/DelegatedWithdraw";
import styles from "./DelegatedValidator.module.scss";

const cx = cn.bind(styles);

export default function({address}) {
	const [activeTab, setActiveTab] = React.useState(0);
	return (
		<div className={cx("DelegatedValidator")}>
			{activeTab === 0 && <DelegatedClaim setActiveTab={setActiveTab} address={address} />}
			{activeTab === 1 && <DelegatedWithdraw setActiveTab={setActiveTab} address={address} />}
		</div>
	);
}
