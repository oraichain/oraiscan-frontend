import React, {memo} from "react";
import cn from "classnames/bind";

import styles from "./ButtonGroup.scss";

const cx = cn.bind(styles);

const ButtonGroup = memo(({data = [], rootClassName}) => {
	return (
		<div className={cx("button-group", rootClassName)}>
			{data.map((item, index) => (
				<button
					className={cx("button", {active: item.active})}
					onClick={() => {
						item.onClick(index);
					}}>
					{item.label}
				</button>
			))}
			<button></button>
		</div>
	);
});

export default ButtonGroup;
