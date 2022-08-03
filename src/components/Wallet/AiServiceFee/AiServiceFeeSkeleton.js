// @ts-nocheck
import React, {memo, useState} from "react";
import {NavLink} from "react-router-dom";
import cn from "classnames/bind";
import copy from "copy-to-clipboard";
import {useGet} from "restful-react";
import {useSelector, useDispatch} from "react-redux";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import styles from "./AiServiceFee.module.scss";
import {isNil} from "lodash";

const cx = cn.bind(styles);

const AiServiceFeeSkeleton = memo(({isLargeScreen}) => {
	const currentFeesElement = (
		<>
			<div className={cx("validator-text")}>
				<Skeleton variant='text' width={"95%"} height={24}></Skeleton>
			</div>{" "}
		</>
	);

	const maxExecutorFeeElement = (
		<>
			<div className={cx("validator-text")}>
				<Skeleton variant='text' width={"95%"} height={24}></Skeleton>
			</div>{" "}
		</>
	);

	const pingDataElement = (
		<>
			<div className={cx("validator-text")}>
				<Skeleton variant='text' width={"95%"} height={24}></Skeleton>
			</div>{" "}
		</>
	);

	const baseRewardDataElement = (
		<>
			<div className={cx("validator-text")}>
				<Skeleton variant='text' width={"95%"} height={24}></Skeleton>
			</div>
		</>
	);

	const currentRewardPoolElement = (
		<>
			<div className={cx("validator-text")}>
				<Skeleton variant='text' width={"95%"} height={24}></Skeleton>
			</div>
		</>
	);

	const currentRewardPoolStatusElement = (
		<>
			<div className={cx("validator-text")}>
				<Skeleton variant='text' width={"95%"} height={24}></Skeleton>
			</div>
		</>
	);

	const withdrawPoolButtonElement = (
		<div className={cx("validator-text")}>
			<Skeleton variant='text' width={"95%"} height={24}></Skeleton>
		</div>
	);

	const UpdateFeesElement = (
		<div className={cx("validator-text")}>
			<Skeleton variant='text' width={"95%"} height={24}></Skeleton>
		</div>
	);

	const claimRewardElement = (
		<div className={cx("validator-text")}>
			<Skeleton variant='text' width={"95%"} height={24}></Skeleton>
		</div>
	);

	return (
		<div className={cx("your-validator-card")}>
			<div className={cx("your-validator-card-header")}>Your AI Oracle service fees</div>
			<div className={cx("your-validator-card-body")}>
				{isLargeScreen ? (
					<Grid container spacing={0}>
						<Grid item xs={6} className={cx("validator-detail")}>
							{currentFeesElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{maxExecutorFeeElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{UpdateFeesElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							<div className={cx("validator-text")}>
								<Skeleton variant='text' width={"95%"} height={24}></Skeleton>
							</div>
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{currentRewardPoolElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{currentRewardPoolStatusElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{withdrawPoolButtonElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{pingDataElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{baseRewardDataElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{claimRewardElement}
						</Grid>
					</Grid>
				) : (
					<Grid container spacing={0}>
						<Grid item xs={6} className={cx("validator-detail")}>
							{currentFeesElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{maxExecutorFeeElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{UpdateFeesElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{currentRewardPoolElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{currentRewardPoolStatusElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{withdrawPoolButtonElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{pingDataElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{baseRewardDataElement}
						</Grid>
						<Grid item xs={6} className={cx("validator-detail")}>
							{claimRewardElement}
						</Grid>
					</Grid>
				)}
			</div>
		</div>
	);
});

export default AiServiceFeeSkeleton;
