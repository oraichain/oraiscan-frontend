import React from "react";
import cn from "classnames/bind";
import styles from "./Dashboard.scss";
//  components
import DashboardContent from "src/components/Dashboard/DashboardContent";

const cx = cn.bind(styles);

export default function(props) {
	return (
		<div className={cx("Dashboard")}>
			<DashboardContent />
		</div>
	);
}
