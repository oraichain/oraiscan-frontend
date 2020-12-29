import React, {memo} from "react";
import classNames from "classnames/bind";
import styles from "./NoResult.scss";
import noResultIcon from "src/assets/common/no_result_ic.svg";
const cx = classNames.bind(styles);

const NoResult = memo(({text = "No result"}) => (
	<div className={cx("no-result")}>
		<img src={noResultIcon} className={cx("no-result-icon")} />
		<p className={cx("no-result-text")}>{text}</p>
	</div>
));

export default NoResult;
