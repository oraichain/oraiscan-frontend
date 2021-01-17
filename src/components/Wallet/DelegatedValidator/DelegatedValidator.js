/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import cn from "classnames/bind";

import styles from "./DelegatedValidator.scss";
import DelegatedClaim from "./DelegatedClaim";
import DelegatedWithdraw from "./DelegatedWithdraw";

const cx = cn.bind(styles);

export default function(props) {
	const [activeTab, setActiveTab] = React.useState(0);
	return (
		<div className={cx("DelegatedValidator")}>
			{activeTab === 0 && <DelegatedClaim setActiveTab={setActiveTab} />}
			{activeTab === 1 && <DelegatedWithdraw setActiveTab={setActiveTab} />}
		</div>
	);
}
