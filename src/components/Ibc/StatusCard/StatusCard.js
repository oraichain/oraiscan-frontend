import React, {memo} from "react";
import cn from "classnames/bind";
import {_} from "src/lib/scripts";
import styles from "./StatusCard.scss";

const cx = cn.bind(styles);

const StatusCard = memo(({icon, label, value, comment}) => (
	<div className={cx("status-card")}>
		<div className={cx("status-card-header")}>
			<div className={cx("status-icon")}>{icon}</div>
			<span className={cx("status-label")}>{label}</span>
		</div>
		<div className={cx("status-card-body")}>
			<div className={cx("status-comment")}>{comment}</div>
			{!_.isNil(value) && <div className={cx("status-value")}>{value}</div>}
		</div>
	</div>
));

export default StatusCard;
