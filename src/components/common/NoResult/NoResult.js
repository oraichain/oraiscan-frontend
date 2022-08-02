import React, {memo} from "react";
import classNames from "classnames/bind";
import NoResultIcon from "src/icons/NoResultIcon";
import styles from "./NoResult.module.scss";

const cx = classNames.bind(styles);

const NoResult = memo(({text = "No result"}) => (
	<div className={cx("no-result")}>
		<NoResultIcon className={cx("no-result-icon")}></NoResultIcon>
		<p className={cx("no-result-text")}>{text}</p>
	</div>
));

export default NoResult;
