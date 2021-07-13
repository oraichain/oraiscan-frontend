import React, {memo} from "react";
import cn from "classnames/bind";

import styles from "./ButtonGroup.scss";

const cx = cn.bind(styles);

const ButtonGroup = memo(({data = [], value, onChange}) => {
	return (
		<div className={cx("button-group")}>
			{data.map((item, index) => (
				<button
					key={"button-" + index}
					className={cx("button", {active: item.value === value})}
					onClick={() => {
						if (item.value !== value) {
							onChange(item.value);
						}
					}}>
					{item.label}
				</button>
			))}
		</div>
	);
});

export default ButtonGroup;
