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
						<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.YES}}></div>
						<div className={cx("chart-comment-info")}>
							<div className={cx("chart-comment-label")}>Yes</div>
							<div className={cx("chart-comment-value")}>
								<Skeleton className={cx("skeleton")} variant='text' width={53} height={24} />
							</div>
						</div>
					</div>

					<div className={cx("chart-comment")}>
						<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.NO}}></div>
						<div className={cx("chart-comment-info")}>
							<div className={cx("chart-comment-label")}>No</div>
							<div className={cx("chart-comment-value")}>
								<Skeleton className={cx("skeleton")} variant='text' width={53} height={24} />
							</div>
						</div>
					</div>
				</div>

				<div className={cx("chart-comment-group")}>
					<div className={cx("chart-comment")}>
						<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.NO_WITH_VETO}}></div>
						<div className={cx("chart-comment-info")}>
							<div className={cx("chart-comment-label")}>NoWithVeto</div>
							<div className={cx("chart-comment-value")}>
								<Skeleton className={cx("skeleton")} variant='text' width={53} height={24} />
							</div>
						</div>
					</div>
					<div className={cx("chart-comment")}>
						<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.ABSTAIN}}></div>
						<div className={cx("chart-comment-info")}>
							<div className={cx("chart-comment-label")}>Abstain</div>
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
