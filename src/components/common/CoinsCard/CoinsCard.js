import React, {memo, useMemo} from "react";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames/bind";
import {formatOrai, formatFloat} from "src/helpers/helper";
import DonutChart from "react-donut-chart";
import BigNumber from "bignumber.js";
import styles from "./CoinsCard.scss";

export const colors = {
	DELEGATED: "#51ADCF",
	UNBONDING: "#A5ECD7",
	REWARD: "#FFBF9B",
	AVAILABLE: "#0278AE",
};

const CoinsCard = memo(({price, available, delegated, unbonding, reward, denom}) => {
	const cx = classNames.bind(styles);

	unbonding = new BigNumber(unbonding);
	delegated = new BigNumber(delegated);
	available = new BigNumber(available);
	reward = new BigNumber(reward);
	const total = unbonding
		.plus(delegated)
		.plus(available)
		.plus(reward);
	const delegatedPercent = delegated.dividedBy(total).multipliedBy(100);
	const unbondingPercent = unbonding.dividedBy(total).multipliedBy(100);
	const rewardPercent = reward.dividedBy(total).multipliedBy(100);
	const availablePercent = available.dividedBy(total).multipliedBy(100);

	const calculateTotalPrice = (total, price) => {
		return parseFloat(total) * parseFloat(price);
	};

	const totalPrice = useMemo(() => calculateTotalPrice(total / 1000000, price), [total, price]);
	return (
		<div className={cx("coins-card")}>
			<Grid container spacing={2}>
				<Grid container item md={5} sm={12}>
					<Grid item md={12} sm={6} xs={6}>
						<div className={cx("total-orai-title")}>
							Total <span className={cx("denom")}>{denom}</span>
						</div>
						<div className={cx("total-orai-value")}>{formatOrai(total)}</div>
					</Grid>
					<Grid item md={12} sm={6} xs={6}>
						<div className={cx("unit-price")}>
							${formatFloat(price, 2)} /<span className={cx("denom")}>{denom}</span>
						</div>
						<div className={cx("total-price")}>${formatFloat(totalPrice, 2)}</div>
					</Grid>
				</Grid>
				<Grid container item md={7} sm={12}>
					<Grid item className={cx("donut-chart")} md={5} xs={12}>
						<DonutChart
							startAngle={-90}
							width={120}
							height={120}
							outerRadius={0.95}
							innerRadius={0.5}
							legend={false}
							data={[
								{value: parseFloat(availablePercent), label: ""},
								{value: parseFloat(delegatedPercent), label: ""},
								{value: parseFloat(unbondingPercent), label: ""},
								{value: parseFloat(rewardPercent), label: ""},
							]}
							colors={[colors.AVAILABLE, colors.DELEGATED, colors.UNBONDING, colors.REWARD]}
							strokeColor={false}
						/>
					</Grid>
					<Grid container item md={7} xs={12}>
						<div className={cx("chart-comments")}>
							<div className={cx("chart-comment-group")}>
								<div className={cx("chart-comment")}>
									<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.AVAILABLE}}></div>
									<div className={cx("chart-comment-info")}>
										<div className={cx("chart-comment-label")}>Available</div>
										<div className={cx("chart-comment-value")}>{formatFloat(availablePercent)}%</div>
									</div>
								</div>

								<div className={cx("chart-comment")}>
									<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.DELEGATED}}></div>
									<div className={cx("chart-comment-info")}>
										<div className={cx("chart-comment-label")}>Delegated</div>
										<div className={cx("chart-comment-value")}>{formatFloat(delegatedPercent)}%</div>
									</div>
								</div>
							</div>

							<div className={cx("chart-comment-group")}>
								<div className={cx("chart-comment")}>
									<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.UNBONDING}}></div>
									<div className={cx("chart-comment-info")}>
										<div className={cx("chart-comment-label")}>Unbonding</div>
										<div className={cx("chart-comment-value")}>{formatFloat(unbondingPercent)}%</div>
									</div>
								</div>
								<div className={cx("chart-comment")}>
									<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.REWARD}}></div>
									<div className={cx("chart-comment-info")}>
										<div className={cx("chart-comment-label")}>Reward</div>
										<div className={cx("chart-comment-value")}>{formatFloat(rewardPercent)}%</div>
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

export default CoinsCard;
