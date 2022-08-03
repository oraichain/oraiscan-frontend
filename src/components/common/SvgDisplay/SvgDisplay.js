import React from "react";
import cn from "classnames/bind";
//  assets
import defaultSVG from "src/assets/common/arrow_ic.svg";
import styles from "./SvgDisplay.module.scss";

const cx = cn.bind(styles);
export default function SvgDisplay({svgSrc = defaultSVG, customClass}) {
	return (
		<div className={cx("Svg-wrapper", customClass ? customClass : undefined)}>
			<img src={svgSrc} alt='SVG' />
		</div>
	);
}
