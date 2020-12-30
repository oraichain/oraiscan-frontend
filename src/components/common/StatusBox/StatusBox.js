import React, {memo, useState, useRef, useEffect} from "react";
import {useGet} from "restful-react";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {formatInteger, formatFloat, formatOrai} from "src/helpers/helper";
import styles from "./StatusBox.scss";

const StatusBox = memo(() => {
	const cx = classNames.bind(styles);
	const [loadCompleted, setLoadCompleted] = useState(false);
	let timerID = useRef(null);

	const cleanUp = () => {
		if (timerID) {
			clearTimeout(timerID);
		}
	};

	const {data, loading, refetch} = useGet({
		path: consts.API.ORAICHAIN_INFO,
		resolve: data => {
			setLoadCompleted(true);
			return data;
		},
	});

	useEffect(() => {
		if (loadCompleted) {
			timerID = setTimeout(() => {
				refetch();
				setLoadCompleted(false);
			}, consts.REQUEST.TIMEOUT);
			return () => {
				cleanUp();
			};
		}
	}, [loadCompleted]);

	return (
		<div className={cx("status-box")}>
			<div className={cx("status-box-item")}>
				<span className={cx("status-label")}>Price: </span>
				<span className={cx("status-value")}>{data?.price ? "$" + formatFloat(data.price) : "--"}</span>
			</div>
			<div className={cx("status-box-item")}>
				<span className={cx("status-label")}>Height: </span>
				<span className={cx("status-value")}>{data?.height ? formatInteger(data.height) : "--"}</span>
			</div>
			<div className={cx("status-box-item")}>
				<span className={cx("status-label")}>Bonded: </span>
				<span className={cx("status-value")}>{data?.bonded ? formatOrai(data.bonded) : "--"}</span>
			</div>
			<div className={cx("status-box-item")}>
				<span className={cx("status-label")}>Inflation: </span>
				<span className={cx("status-value")}>{data?.inflation ? formatFloat(data.inflation) + "%" : "--"}</span>
			</div>
		</div>
	);
});

export default StatusBox;
