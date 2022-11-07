import * as React from "react";
import cn from "classnames/bind";
//  hooks
import {useScroll} from "src/hooks";
//  assets
import scrollTopSVG from "src/assets/common/scroll_top.svg";
import styles from "./ScrollTop.module.scss";

const cx = cn.bind(styles);

export default function ScrollTop(props) {
	const atScroll = useScroll(100);
	return React.useMemo(
		() => (
			<div className={cx("ScrollTop-overlay", {invisible: !atScroll})} onClick={() => window.scroll({top: 0, left: 0})}>
				<img src={scrollTopSVG} alt={"up"} />
			</div>
		),
		[atScroll]
	);
}
