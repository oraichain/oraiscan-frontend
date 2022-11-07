import React, {memo} from "react";
import classNames from "classnames/bind";
import styles from "./LinkCard.module.scss";

const cx = classNames.bind(styles);

const LinkCard = memo(({icon, link, type}) => {
	return (
		<a href={link} target='_blank' rel='noopener noreferrer' className={cx("linkcard-wrapper")}>
			<div className={cx("icon", `${type}`)}>
				<img src={icon} alt='icon' />
				{type === "web" && <span className={cx("web-title")}>Web Wallet</span>}
			</div>
		</a>
	);
});

export default LinkCard;
