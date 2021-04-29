import React, {memo} from "react";
import classNames from "classnames/bind";
import styles from "./NoResult.scss";
import NoResultIcon from "src/icons/NoResultIcon";

const cx = classNames.bind(styles);

const NoResult = memo(({text = "No result"}) => (
	<div className={cx("no-result")}>
		<NoResultIcon className={cx("no-result-icon")}></NoResultIcon>
		<p className={cx("no-result-text")}>{text}</p>
	</div>
));

export default NoResult;
