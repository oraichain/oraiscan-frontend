import React, {memo} from "react";
import classNames from "classnames/bind";
import styles from "./StatusBox.scss";

const cx = classNames.bind(styles);

const StatusBox = memo(() => (
	<div className={cx("status-box")}>
		<div className={cx("status-box-item")}>
			<span className={cx("status-label")}>Price: </span>
			<span className={cx("status-value")}>$4.73</span>
		</div>

		<div className={cx("status-box-item")}>
			<span className={cx("status-label")}>Bonded:</span>
			<span className={cx("status-value")}>189,132,631</span>
		</div>

		<div className={cx("status-box-item")}>
			<span className={cx("status-label")}>Bonded: </span>
			<span className={cx("status-value")}>189,132,631</span>
		</div>

		<div className={cx("status-box-item")}>
			<span className={cx("status-label")}>Inflation: </span>
			<span className={cx("status-value")}>7.00%</span>
		</div>
	</div>
));

export default StatusBox;
