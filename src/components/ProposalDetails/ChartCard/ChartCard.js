import React, {memo} from "react";
import classNames from "classnames/bind";
import DonutChart from "react-donut-chart";
import Grid from "@material-ui/core/Grid";
import {formatOrai} from "src/helpers/helper";
import styles from "./ChartCard.scss";

const cx = classNames.bind(styles);

export const colors = {
	DELEGATED: "#51ADCF",
	UNBONDING: "#A5ECD7",
	REWARD: "#FFBF9B",
	AVAILABLE: "#0278AE",
};

const ChartCard = memo(({data}) => {
	return (
		<div className={cx("chart-card")}>
			<div className={cx("chart-card-header")}>
				<div className={cx("total-orai")}>
					<div className={cx("total-orai-label")}>Total ORAI</div>
					<div className={cx("total-orai-value")}>{!isNaN(data?.totalOrai) ? formatOrai(data.totalOrai) : "-"}</div>
				</div>
			</div>
			<div className={cx("chart-card-body")}>
				<DonutChart
					startAngle={-90}
					width={120}
					height={120}
					outerRadius={0.95}
					innerRadius={0.5}
					legend={false}
					data={[
						{value: parseFloat(data?.delegatedPercent ?? 0), label: ""},
						{value: parseFloat(data?.unbondingPercent ?? 0), label: ""},
						{value: parseFloat(data?.rewardPercent ?? 0), label: ""},
						{value: parseFloat(data?.availablePercent ?? 0), label: ""},
					]}
					colors={[colors.DELEGATED, colors.UNBONDING, colors.REWARD, colors.AVAILABLE]}
					strokeColor={false}
				/>
			</div>
			<div className={cx("chart-card-footer")}>
				<div className={cx("chart-comment-group")}>
					<div className={cx("chart-comment")}>
						<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.AVAILABLE}}></div>
						<div className={cx("chart-comment-info")}>
							<div className={cx("chart-comment-label")}>Available</div>
							<div className={cx("chart-comment-value")}>{!isNaN(data?.availablePercent) ? data.availablePercent + "%" : "-"}</div>
						</div>
					</div>

					<div className={cx("chart-comment")}>
						<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.DELEGATED}}></div>
						<div className={cx("chart-comment-info")}>
							<div className={cx("chart-comment-label")}>Delegated</div>
							<div className={cx("chart-comment-value")}>{!isNaN(data?.delegatedPercent) ? data.delegatedPercent + "%" : "-"}</div>
						</div>
					</div>
				</div>

				<div className={cx("chart-comment-group")}>
					<div className={cx("chart-comment")}>
						<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.UNBONDING}}></div>
						<div className={cx("chart-comment-info")}>
							<div className={cx("chart-comment-label")}>Unbonding</div>
							<div className={cx("chart-comment-value")}>{!isNaN(data?.unbondingPercent) ? data.unbondingPercent + "%" : "-"}</div>
						</div>
					</div>
					<div className={cx("chart-comment")}>
						<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.REWARD}}></div>
						<div className={cx("chart-comment-info")}>
							<div className={cx("chart-comment-label")}>Reward</div>
							<div className={cx("chart-comment-value")}>{!isNaN(data?.rewardPercent) ? data.rewardPercent + "%" : "-"}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});

export default ChartCard;
