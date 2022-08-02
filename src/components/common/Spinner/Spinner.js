import React from "react";
import cn from "classnames/bind";

import spinSVG from "src/assets/common/spin.svg";
import styles from "./Spinner.module.scss";

const cx = cn.bind(styles);

export default function Spinner({styles}) {
	return (
		<div className={cx("spinner-wrapper")} style={styles}>
			<img className={cx("spinner")} src={spinSVG} alt={"SPIN ME ROUND"} />
		</div>
	);
}
