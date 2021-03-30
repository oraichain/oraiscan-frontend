import React, {memo} from "react";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import {colors} from "src/components/common/CoinsCard/CoinsCard";
import styles from "./CoinsCard.scss";

const cx = classNames.bind(styles);

const CoinsCardSkeleton = memo(() => {
	return (
		<div className={cx("coins-card")}>
			<Grid container spacing={2}>
				<Grid container item md={5} sm={12}>
					<Grid item md={12} sm={6} xs={6}>
						<div className={cx("total-orai-title")}>
							Total{" "}
							<span className={cx("denom")}>
								<Skeleton className={cx("skeleton-inline")} variant='text' width={21} height={21} />
							</span>
						</div>
						<div className={cx("total-orai-value")}>
							<Skeleton className={cx("skeleton-inline")} variant='text' width={130} height={30} />
						</div>
					</Grid>
					<Grid item md={12} sm={6} xs={6}>
						<div className={cx("unit-price")}>
							<Skeleton className={cx("skeleton-inline")} variant='text' width={21} height={20} />
						</div>
						<div className={cx("total-price")}>
							<Skeleton className={cx("skeleton-inline")} variant='text' width={140} height={30} />
						</div>
					</Grid>
				</Grid>
				<Grid container item md={7} sm={12}>
					<Grid item className={cx("donut-chart")} md={5} xs={12}>
						<Skeleton className={cx("skeleton-inline")} variant='circle' width={120} height={120} />
					</Grid>
					<Grid container item md={7} xs={12}>
						<div className={cx("chart-comments")}>
							<div className={cx("chart-comment-group")}>
								<div className={cx("chart-comment")}>
									<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.AVAILABLE}}></div>
									<div className={cx("chart-comment-info")}>
										<div className={cx("chart-comment-label")}>Available</div>
										<div className={cx("chart-comment-value")}>
											<Skeleton className={cx("skeleton-inline")} variant='text' width={53} height={24} />
										</div>
									</div>
								</div>

								<div className={cx("chart-comment")}>
									<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.DELEGATED}}></div>
									<div className={cx("chart-comment-info")}>
										<div className={cx("chart-comment-label")}>Delegated</div>
										<div className={cx("chart-comment-value")}>
											<Skeleton className={cx("skeleton-inline")} variant='text' width={53} height={24} />
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
											<Skeleton className={cx("skeleton-inline")} variant='text' width={53} height={24} />
										</div>
									</div>
								</div>
								<div className={cx("chart-comment")}>
									<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.REWARD}}></div>
									<div className={cx("chart-comment-info")}>
										<div className={cx("chart-comment-label")}>Reward</div>
										<div className={cx("chart-comment-value")}>
											<Skeleton className={cx("skeleton-inline")} variant='text' width={53} height={24} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
});

export default CoinsCardSkeleton;
