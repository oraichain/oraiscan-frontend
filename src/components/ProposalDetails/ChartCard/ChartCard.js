import React, {memo} from "react";
import classNames from "classnames/bind";
import DonutChart from "react-donut-chart";
import Grid from "@material-ui/core/Grid";
import {formatOrai} from "src/helpers/helper";
import styles from "./ChartCard.scss";

const cx = classNames.bind(styles);

export const colors = {
	YES: "#0278AE",
	NO: "#51ADCF",
	NO_WITH_VETO: "#A5ECD7",
	ABSTAIN: "#FFBF9B",
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
						{value: parseFloat(data?.yes_percentage ?? 0), label: ""},
						{value: parseFloat(data?.no_percentage ?? 0), label: ""},
						{value: parseFloat(data?.no_with_veto_percentage ?? 0), label: ""},
						{value: parseFloat(data?.abstain_percentage ?? 0), label: ""},
					]}
					colors={[colors.YES, colors.NO, colors.NO_WITH_VETO, colors.ABSTAIN]}
					strokeColor={false}
				/>
			</div>
			<div className={cx("chart-card-footer")}>
				<div className={cx("chart-comment-group")}>
					<div className={cx("chart-comment")}>
						<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.YES}}></div>
						<div className={cx("chart-comment-info")}>
							<div className={cx("chart-comment-label")}>Yes</div>
							<div className={cx("chart-comment-value")}>{!isNaN(data?.yes_percentage) ? data.yes_percentage + "%" : "-"}</div>
						</div>
					</div>

					<div className={cx("chart-comment")}>
						<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.NO}}></div>
						<div className={cx("chart-comment-info")}>
							<div className={cx("chart-comment-label")}>No</div>
							<div className={cx("chart-comment-value")}>{!isNaN(data?.no_percentage) ? data.no_percentage + "%" : "-"}</div>
						</div>
					</div>
				</div>

				<div className={cx("chart-comment-group")}>
					<div className={cx("chart-comment")}>
						<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.NO_WITH_VETO}}></div>
						<div className={cx("chart-comment-info")}>
							<div className={cx("chart-comment-label")}>NoWithVeto</div>
							<div className={cx("chart-comment-value")}>{!isNaN(data?.no_with_veto_percentage) ? data.no_with_veto_percentage + "%" : "-"}</div>
						</div>
					</div>
					<div className={cx("chart-comment")}>
						<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.ABSTAIN}}></div>
						<div className={cx("chart-comment-info")}>
							<div className={cx("chart-comment-label")}>Abstain</div>
							<div className={cx("chart-comment-value")}>{!isNaN(data?.abstain_percentage) ? data.abstain_percentage + "%" : "-"}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});

export default ChartCard;
