import React, {memo} from "react";
import classNames from "classnames/bind";

import {ReactComponent as BlockIcon} from "src/assets/validatorDetails/blocks.svg";
import styles from "./CardHeader.scss";

const cx = classNames.bind(styles);

const CardHeader = memo(({title = "", info = "", icon, isDesktop}) => {
	return isDesktop ? (
		<div className={cx("container")}>
			<div className={cx("title")}>{title}</div>
			{info !== "" && (
				<div className={cx("info")}>
					<img src={icon} alt='#' />
					<div className={cx("txt-info")}>{info}</div>
				</div>
			)}
		</div>
	) : (
		<div className={cx("container-mobile")}>
			<div className={cx("container-block")}>
				<div className={cx("title")}>{title}</div>
				<div className={cx("show-more")}> Show more </div>
			</div>
			{info !== "" && (
				<div className={cx("info")}>
					<BlockIcon /> {info}
				</div>
			)}
		</div>
	);
});

export default CardHeader;
