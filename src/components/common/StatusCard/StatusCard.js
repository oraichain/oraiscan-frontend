import React, {memo} from "react";
import cn from "classnames/bind";
import {_} from "src/lib/scripts";
import styles from "./StatusCard.module.scss";

const cx = cn.bind(styles);

const StatusCard = memo(({icon, label, value, comment}) => (
	<div className={cx("status-card")}>
		<div className={cx("status-card-header")}>
			<div className={cx("status-icon")}>{icon}</div>
			<span className={cx("status-label")}>{label}</span>
		</div>
		<div className={cx("status-card-body")}>
			<p className={cx("status-value")}>{value}</p>
			{!_.isNil(comment) && <p className={cx("status-comment")}>{comment}</p>}
		</div>
	</div>
));

export default StatusCard;
