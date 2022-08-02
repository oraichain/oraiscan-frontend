/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useState, useRef, useEffect} from "react";
import {useGet} from "restful-react";
import classNames from "classnames/bind";
import {useDispatch} from "react-redux";

import consts from "src/constants/consts";
import {formatInteger, formatFloat, formatOrai} from "src/helpers/helper";
import {setStatusBox} from "src/store/modules/blockchain";

import styles from "./StatusBox.module.scss";

const StatusBox = memo(() => {
	const cx = classNames.bind(styles);
	const [loadCompleted, setLoadCompleted] = useState(false);
	const dispatch = useDispatch();
	let timerID = useRef(null);

	const {data, loading, refetch} = useGet({
		path: consts.API.ORAICHAIN_INFO,
		resolve: data => {
			setLoadCompleted(true);
			dispatch(setStatusBox(data));
			return data;
		},
	});

	useEffect(() => {
		if (loadCompleted) {
			timerID.current = setTimeout(() => {
				refetch();
				setLoadCompleted(false);
			}, consts.REQUEST.TIMEOUT);
			return () => {
				if (timerID) {
					clearTimeout(timerID.current);
				}
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
				<span className={cx("status-value")}>{data?.bonded ? formatFloat(data.bonded / 1000000) + " ORAI" : "--"}</span>
			</div>
			<div className={cx("status-box-item")}>
				<span className={cx("status-label")}>Inflation: </span>
				<span className={cx("status-value")}>{data?.inflation ? formatFloat(data.inflation) + "%" : "--"}</span>
			</div>
		</div>
	);
});

export default StatusBox;
