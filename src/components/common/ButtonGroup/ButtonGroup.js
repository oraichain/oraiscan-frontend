import React, {memo} from "react";
import cn from "classnames/bind";

import styles from "./ButtonGroup.scss";

const cx = cn.bind(styles);

const ButtonGroup = memo(({data = [], rootClassName}) => {
	return (
		<div className={cx("button-group", rootClassName)}>
			{data.map((item, index) => (
				<button
					key={"button-" + index}
					className={cx("button", {active: item.active})}
					onClick={() => {
						item.onClick(index);
					}}>
					{item.label}
				</button>
			))}
		</div>
	);
});

export default ButtonGroup;
