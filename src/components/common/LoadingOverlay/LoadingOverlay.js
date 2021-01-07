import React from "react";
import classNames from "classnames/bind";

import styles from "./LoadingOverlay.scss";

const cx = classNames.bind(styles);

const LoadingOverlay = () => (
	<div className={cx("loading-background")}>
		<div className={cx("loading-bar")}></div>
	</div>
);

export default LoadingOverlay;
