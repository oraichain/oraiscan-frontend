import React, {memo} from "react";
import classNames from "classnames/bind";
import styles from "./StatusBox.scss";

const cx = classNames.bind(styles);

const sampleData = [
	{
		label: "Price",
		value: "$4.73",
	},
	{
		label: "Bonded",
		value: "189,132,631",
	},
	{
		label: "Bonded",
		value: "189,132,631",
	},
	{
		label: "Inflation",
		value: "7.00%",
	},
];

const StatusBox = memo(({data = sampleData}) => (
	<div className={cx("status-box")}>
		{data.map(({label, value}) => {
			return (
				<div className={cx("status-box-item")}>
					<span className={cx("status-label")}>{label}: </span>
					<span className={cx("status-value")}>{value}</span>
				</div>
			);
		})}
	</div>
));

export default StatusBox;
