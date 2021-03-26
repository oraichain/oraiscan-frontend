import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./BackTitle.scss";
import backIcon from "src/assets/icons/back.svg";

const cx = classNames.bind(styles);

const BackTitle = memo(({title, to}) => {
	return (
		<div className={cx("back-title")}>
			<NavLink className={cx("back-title-link")} to={to}>
				<img alt='/' className={cx("back-title-icon")} src={backIcon} />
			</NavLink>

			<span className={cx("back-title-text")}>{title}</span>
		</div>
	);
});

export default BackTitle;
