import React, {memo} from "react";
import classNames from "classnames/bind";
import PendingIcon from "src/icons/PendingIcon";
import styles from "./Pending.module.scss";

const cx = classNames.bind(styles);

const Pending = memo(({text = "Pending"}) => (
	<div className={cx("pending")}>
		<PendingIcon className={cx("pending-icon")}></PendingIcon>
		<p className={cx("pending-text")}>{text}</p>
	</div>
));

export default Pending;
