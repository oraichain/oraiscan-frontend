import React, {memo} from "react";
import cn from "classnames/bind";
import styles from "./StatusCard.scss";

const cx = cn.bind(styles);

const StatusCard = memo(({icon, label, value}) => (
	<div className={cx("status-card")}>
		<div className={cx("status-card-header")}>
			<img src={icon} className={cx("status-card-icon")} />
			<span className={cx("status-card-label")}>{label}</span>
		</div>
		<div className={cx("status-card-content")}>
			<p className={cx("status-card-value")}>{value}</p>
		</div>
	</div>
));

export default StatusCard;
