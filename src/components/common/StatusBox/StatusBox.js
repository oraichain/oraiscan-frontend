/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useState, useRef, useEffect } from "react";
import { useGet } from "restful-react";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";

import consts from "src/constants/consts";
import { formatInteger, formatFloat, formatOrai, calculateInflationFromApr } from "src/helpers/helper";
import { setStatusBox } from "src/store/modules/blockchain";

import styles from "./StatusBox.module.scss";
import { showAlert } from "src/store/modules/global";
import { ORAI } from "src/lib/config/constants";
import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const StatusBox = memo(() => {
	const cx = classNames.bind(styles);
	const [loadCompleted, setLoadCompleted] = useState(false);
	const [loadCommunityPoolCompleted, setLoadCommunityPoolCompleted] = useState(false);
	const [wantedInflationRate, setWantedInflationRate] = useState(undefined);
	const dispatch = useDispatch();
	let timerID = useRef(null);

	const { data, loading, refetch, error } = useGet({
		path: consts.API.ORAICHAIN_INFO,
		resolve: data => {
			setLoadCompleted(true);
			dispatch(setStatusBox(data));
			return data;
		},
	});

	const { data: communityPool, loading: poolLoading, refetch: refetchPool, error: errorPool } = useGet({
		path: `${consts.LCD_API_BASE}${consts.LCD_API.COMMUNITY_POOL}`,
		resolve: ({ pool }) => {
			const oraiPool = pool.find(pool => pool.denom === ORAI);
			// fallback case if the api has any problem
			if (!oraiPool) return { denom: ORAI.toUpperCase(), amount: "-1" }
			setLoadCommunityPoolCompleted(true);
			dispatch(setStatusBox(oraiPool));
			return oraiPool;
		},
	});

	if (error || errorPool) {
		dispatch(
			showAlert({
				show: true,
				message: error ? error.message : errorPool.message,
				autoHideDuration: 3000,
				type: "error",
			})
		);
	}

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
		if (loadCommunityPoolCompleted) {
			timerID.current = setTimeout(() => {
				refetchPool();
				setLoadCommunityPoolCompleted(false);
			}, consts.REQUEST.TIMEOUT);
			return () => {
				if (timerID) {
					clearTimeout(timerID.current);
				}
			};
		}
	}, [loadCompleted, loadCommunityPoolCompleted]);

	useEffect(() => {
		calculateInflationFromApr()
			.then((inflation) => {
				console.log("inflation rate: ", inflation)
				setWantedInflationRate(inflation);
			})
			.catch((err) => {
				console.log("error getting wanted inflation rate: ", err.message);
			});
	}, []);

	return (
		<div className={cx("status-box")}>
			<div className={cx("status-box-item")}>
				<span className={cx("status-label")}>Height: </span>
				<span className={cx("status-value")}>{data?.height ? formatInteger(data.height) : "--"}</span>
			</div>
			<div className={cx("status-box-item")}>
				<span className={cx("status-label")}>Bonded: </span>
				<span className={cx("status-value")}>{data?.bonded ? formatOrai(data?.bonded, 1000000, 2) + ` ${ORAI.toUpperCase()}` : "--"}</span>
			</div>
			<div className={cx("status-box-item")}>
				<span className={cx("status-label")}>Inflation: </span>
				<span className={cx("status-value")}>{data?.inflation ? formatFloat(data.inflation) + "%" : "--"}</span>
			</div>
			<div className={cx("status-box-item")}>
				<div className={cx("header-cell", "align-right")}>
					<span className={cx("status-label")}>Wanted Inflation: </span>
					<span className={cx("status-value")}>{wantedInflationRate ? formatFloat(wantedInflationRate) + "%" : "--"}</span>
					<Tooltip title='Infration rate needed to guarantee ~29% APR with 3% commission' className={cx("tooltip-header-cell")}>
						<QuestionCircleOutlined />
					</Tooltip>
				</div>
			</div>
			<div className={cx("status-box-item")}>
				<span className={cx("status-label")}>Community Pool: </span>
				<span className={cx("status-value")}>{formatOrai(communityPool?.amount, 1000000, 2) + ' ' + communityPool?.denom.toUpperCase()}</span>
			</div>
		</div>
	);
});

export default StatusBox;
