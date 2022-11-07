import React from "react";
import cn from "classnames/bind";
//  assets
import arrowBlackSVG from "src/assets/assets/arrow_bk.svg";
import arrowGreySVG from "src/assets/assets/arrow_gr.svg";
import styles from "./SortButton.module.scss";

const cx = cn.bind(styles);

export default function SortButton({active = false, asc = false}) {
	return React.useMemo(
		() => (
			<div className={cx("sort-wrapper")}>
				<img src={active && !asc ? arrowBlackSVG : arrowGreySVG} alt={"up"} />
				<img src={active && asc ? arrowBlackSVG : arrowGreySVG} className={cx("flip")} alt={"down"} />
			</div>
		),
		[active, asc]
	);
}
