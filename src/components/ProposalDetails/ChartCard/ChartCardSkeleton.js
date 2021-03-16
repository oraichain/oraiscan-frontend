import React, {memo} from "react";
import classNames from "classnames/bind";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import {colors} from "./ChartCard";
import styles from "./ChartCard.scss";

const cx = classNames.bind(styles);

const ChartCardSkeleton = memo(({data}) => {
	return (
		<div className={cx("chart-card")}>
			<div className={cx("chart-card-header")}>
				<div className={cx("total-orai")}>
					<div className={cx("total-orai-label")}>Total ORAI</div>
					<div className={cx("total-orai-value")}>
						<Skeleton className={cx("skeleton")} variant='text' width={100} height={27} />
					</div>
				</div>
			</div>
			<div className={cx("chart-card-body")}>
				<Skeleton className={cx("skeleton")} variant='circle' width={120} height={120} />
			</div>
			<div className={cx("chart-card-footer")}>
				<div className={cx("chart-comment-group")}>
					<div className={cx("chart-comment")}>
						<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.AVAILABLE}}></div>
						<div className={cx("chart-comment-info")}>
							<div className={cx("chart-comment-label")}>Available</div>
							<div className={cx("chart-comment-value")}>
								<Skeleton className={cx("skeleton")} variant='text' width={53} height={24} />
							</div>
						</div>
					</div>
					<div className={cx("chart-comment")}>
						<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.DELEGATED}}></div>
						<div className={cx("chart-comment-info")}>
							<div className={cx("chart-comment-label")}>Delegated</div>
							<div className={cx("chart-comment-value")}>
								<Skeleton className={cx("skeleton")} variant='text' width={53} height={24} />
							</div>
						</div>
					</div>
				</div>
				<div className={cx("chart-comment-group")}>
					<div className={cx("chart-comment")}>
						<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.UNBONDING}}></div>
						<div className={cx("chart-comment-info")}>
							<div className={cx("chart-comment-label")}>Unbonding</div>
							<div className={cx("chart-comment-value")}>
								<Skeleton className={cx("skeleton")} variant='text' width={53} height={24} />
							</div>
						</div>
					</div>
					<div className={cx("chart-comment")}>
						<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.REWARD}}></div>
						<div className={cx("chart-comment-info")}>
							<div className={cx("chart-comment-label")}>Reward</div>
							<div className={cx("chart-comment-value")}>
								<Skeleton className={cx("skeleton")} variant='text' width={53} height={24} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});

export default ChartCardSkeleton;
