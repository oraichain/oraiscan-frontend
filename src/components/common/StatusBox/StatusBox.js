import React, {memo} from "react";
import classNames from "classnames/bind";
import Skeleton from "react-skeleton-loader";

import {useFetch, useTimer} from "src/hooks";
import consts from "src/constants/consts";

import {useSelector} from "react-redux";

import styles from "./StatusBox.scss";

const cx = classNames.bind(styles);

const sampleData = [
	{
		label: "Price",
		value: "$4.73",
	},
	{
		label: "Height",
		value: "4,374,598",
	},
	{
		label: "Bonded",
		value: " --",
	},
	{
		label: "Inflation",
		value: " --",
	},
];

const StatusBox = memo(() => {
	const status = useSelector(state => state.blockchain.status);
	const [data, requestFetch] = useFetch(`${consts.API_BASE}${consts.API.STATUS}`, "get");

	const [watching] = useTimer(true, consts.NUM.DETAIL_REAL_TIME_DELAY_MS);

	React.useEffect(() => {
		requestFetch();
	}, [watching, requestFetch]);

	return (
		<div className={cx("status-box")}>
			{/* {data.map(({ label, value }) => {
				return (
					<div className={cx("status-box-item")}>
						<span className={cx("status-label")}>Lable: </span>
						<span className={cx("status-value")}>Value</span>
					</div>
				);
			})} */}
			<div className={cx("status-box-item")}>
				<span className={cx("status-label")}>Price: </span>
				<span className={cx("status-value")}>{status?.price ? `$${status?.price}` : <Skeleton width={"92px"} height={"34px"} />}</span>
			</div>
			<div className={cx("status-box-item")}>
				<span className={cx("status-label")}>Height: </span>
				<span className={cx("status-value")}>{data.data !== null ? data.data.latest_block_height.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}</span>
			</div>
			<div className={cx("status-box-item")}>
				<span className={cx("status-label")}>Bonded: </span>
				<span className={cx("status-value")}>--</span>
			</div>
			<div className={cx("status-box-item")}>
				<span className={cx("status-label")}>Inflation: </span>
				<span className={cx("status-value")}>--</span>
			</div>
		</div>
	);
});

export default StatusBox;
