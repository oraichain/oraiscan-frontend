import React, {memo} from "react";
import classNames from "classnames/bind";

import styles from "./CardHeader.scss";

const cx = classNames.bind(styles);

const CardHeader = memo(({title = "", info = "", icon}) => {
	return (
		<div className={cx("container")}>
			<div className={cx("title")}>{title}</div>
			{info !== "" && (
				<div className={cx("info")}>
					<img src={icon} />
					<div className={cx("txt-info")}>{info}</div>
				</div>
			)}
		</div>
	);
});

export default CardHeader;
