import React, {memo, useMemo} from "react";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames/bind";
import {formatFloat} from "src/helpers/helper";
import styles from "./CircleChartCard.scss";
import circleChart from "src/assets/common/circle_chart.svg";

const AddressCard = memo(({totalOrai, unitPrice, chartName, availablePercent, delegatedPercent, unbondingPercent, rewardPercent, minHeight = "220px"}) => {
	const cx = classNames.bind(styles);

	const calculateTotalPrice = (totalOrai, unitPrice) => {
		return parseFloat(totalOrai) * parseFloat(unitPrice);
	};

	const totalPrice = useMemo(() => calculateTotalPrice(totalOrai, unitPrice), [totalOrai, unitPrice]);
	return (
		<div className={cx("circle-chart-card")} style={{minHeight: minHeight}}>
			<Grid container spacing={2}>
				<Grid item lg={5} md={12}>
					<div className={cx("total-orai-title")}>Total ORAI</div>
					<div className={cx("total-orai-value")}>{formatFloat(totalOrai, 2)}</div>
					<div className={cx("unit-price")}>${formatFloat(unitPrice, 2)} /ORAI</div>
					<div className={cx("total-price")}>{formatFloat(totalPrice, 2)}</div>
				</Grid>
				<Grid container item lg={7} md={12}>
					<Grid item className={cx("circle-chart")} md={5} xs={12}>
						<img src={circleChart} alt='circle-chart-graph' className={cx("circle-chart-graph")} />
						<div className={cx("circle-chart-name")}>{chartName}</div>
					</Grid>
					<Grid container item md={7} xs={12} className={cx("chart-comments")}>
						<Grid item md={6} xs={12}>
							<div className={cx("chart-comment")}>
								<div>
									<div className={cx("chart-comment-color")} style={{background: "#0278AE"}}></div>
								</div>
								<div>
									<div className={cx("chart-comment-text")}>Available</div>
									<div className={cx("chart-comment-value")}>{availablePercent}%</div>
								</div>
							</div>
						</Grid>

						<Grid item md={6} xs={12}>
							<div className={cx("chart-comment")}>
								<div>
									<div className={cx("chart-comment-color")} style={{background: "#51ADCF"}}></div>
								</div>
								<div>
									<div className={cx("chart-comment-text")}>Delegated</div>
									<div className={cx("chart-comment-value")}>{delegatedPercent}%</div>
								</div>
							</div>
						</Grid>

						<Grid item md={6} xs={12}>
							<div className={cx("chart-comment")}>
								<div>
									<div className={cx("chart-comment-color")} style={{background: "#A5ECD7"}}></div>
								</div>
								<div>
									<div className={cx("chart-comment-text")}>Unbonding</div>
									<div className={cx("chart-comment-value")}>{unbondingPercent}%</div>
								</div>
							</div>
						</Grid>

						<Grid item md={6} xs={12}>
							<div className={cx("chart-comment")}>
								<div>
									<div className={cx("chart-comment-color")} style={{background: "#FFBF9B"}}></div>
								</div>
								<div>
									<div className={cx("chart-comment-text")}>Reward</div>
									<div className={cx("chart-comment-value")}>{rewardPercent}%</div>
								</div>
							</div>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
});

export default AddressCard;
