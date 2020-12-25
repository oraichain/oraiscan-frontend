import React, {memo, useMemo} from "react";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames/bind";
import {formatFloat} from "src/helpers/helper";
import DonutChart from "react-donut-chart";
import styles from "./CoinsCard.scss";

const CoinsCard = memo(({total, price, available, delegated, unbonding, reward, denom, minHeight = "220px"}) => {
	const cx = classNames.bind(styles);

	const delegatedPercent = (parseFloat(delegated) * 100) / parseFloat(total);
	const unbondingPercent = (parseFloat(unbonding) * 100) / parseFloat(total);
	const rewardPercent = (parseFloat(reward) * 100) / parseFloat(total);
	const availablePercent = (parseFloat(available) * 100) / parseFloat(total);

	const delegatedColor = "#51ADCF";
	const unbondingColor = "#A5ECD7";
	const rewardColor = "#FFBF9B";
	const availableColor = "#0278AE";

	const calculateTotalPrice = (total, price) => {
		return parseFloat(total) * parseFloat(price);
	};

	const totalPrice = useMemo(() => calculateTotalPrice(total, price), [total, price]);
	return (
		<div className={cx("coins-card")} style={{minHeight: minHeight}}>
			<Grid container spacing={2}>
				<Grid item lg={5} md={12}>
					<div className={cx("total-orai-title")}>
						Total <span className={cx("uppercase")}>{denom}</span>
					</div>
					<div className={cx("total-orai-value")}>{formatFloat(total, 2)}</div>
					<div className={cx("unit-price")}>
						${formatFloat(price, 2)} /<span className={cx("uppercase")}>{denom}</span>
					</div>
					<div className={cx("total-price")}>{formatFloat(totalPrice, 2)}</div>
				</Grid>
				<Grid container item lg={7} md={12}>
					<Grid item className={cx("donut-chart")} md={5} xs={12}>
						<DonutChart
							startAngle={-90}
							width={120}
							height={120}
							outerRadius={0.95}
							innerRadius={0.5}
							legend={false}
							data={[
								{value: parseFloat(delegatedPercent), label: ""},
								{value: parseFloat(unbondingPercent), label: ""},
								{value: parseFloat(rewardPercent), label: ""},
								{value: parseFloat(availablePercent), label: ""},
							]}
							colors={[delegatedColor, unbondingColor, rewardColor, availableColor]}
							strokeColor={false}
						/>
					</Grid>
					<Grid container item md={7} xs={12} className={cx("chart-comments")}>
						<Grid item md={6} xs={12}>
							<div className={cx("chart-comment")}>
								<div>
									<div className={cx("chart-comment-color")} style={{background: availableColor}}></div>
								</div>
								<div>
									<div className={cx("chart-comment-text")}>Available</div>
									<div className={cx("chart-comment-value")}>{formatFloat(availablePercent)}%</div>
								</div>
							</div>
						</Grid>

						<Grid item md={6} xs={12}>
							<div className={cx("chart-comment")}>
								<div>
									<div className={cx("chart-comment-color")} style={{background: delegatedColor}}></div>
								</div>
								<div>
									<div className={cx("chart-comment-text")}>Delegated</div>
									<div className={cx("chart-comment-value")}>{formatFloat(delegatedPercent)}%</div>
								</div>
							</div>
						</Grid>

						<Grid item md={6} xs={12}>
							<div className={cx("chart-comment")}>
								<div>
									<div className={cx("chart-comment-color")} style={{background: unbondingColor}}></div>
								</div>
								<div>
									<div className={cx("chart-comment-text")}>Unbonding</div>
									<div className={cx("chart-comment-value")}>{formatFloat(unbondingPercent)}%</div>
								</div>
							</div>
						</Grid>

						<Grid item md={6} xs={12}>
							<div className={cx("chart-comment")}>
								<div>
									<div className={cx("chart-comment-color")} style={{background: rewardColor}}></div>
								</div>
								<div>
									<div className={cx("chart-comment-text")}>Reward</div>
									<div className={cx("chart-comment-value")}>{formatFloat(rewardPercent)}%</div>
								</div>
							</div>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
});

export default CoinsCard;
