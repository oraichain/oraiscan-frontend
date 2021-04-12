// @ts-nocheck
import React, {memo} from "react";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames/bind";
import DonutChart from "react-donut-chart";
import styles from "./CoinsCard.scss";
import {themeIds} from "src/constants/themes";
import {useSelector} from "react-redux";

const EmptyCoinsCard = memo(({denom}) => {
	const cx = classNames.bind(styles);
	const activeThemeId = useSelector(state => state.activeThemeId);
	const colors = {
		DELEGATED: activeThemeId === themeIds.LIGHT ? "#51ADCF" : "#1A87FF",
		UNBONDING: activeThemeId === themeIds.LIGHT ? "#A5ECD7" : "#E1E9D1",
		REWARD: activeThemeId === themeIds.LIGHT ? "#FFBF9B" : "#7BCCC4",
		AVAILABLE: activeThemeId === themeIds.LIGHT ? "#0278AE" : "#4EB3D3",
	};
	return (
		<div className={cx("coins-card")}>
			<Grid container spacing={2}>
				<Grid container item md={5} sm={12}>
					<Grid item md={12} sm={6} xs={6}>
						<div className={cx("total-orai-title")}>
							Total <span className={cx("denom")}>{denom}</span>
						</div>
						<div className={cx("total-orai-value")}>-</div>
					</Grid>
					<Grid item md={12} sm={6} xs={6}>
						<div className={cx("unit-price")}>
							- /<span className={cx("denom")}>{denom}</span>
						</div>
						<div className={cx("total-price")}>-</div>
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
								{value: 0, label: ""},
								{value: 0, label: ""},
								{value: 0, label: ""},
								{value: 0, label: ""},
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
										<div className={cx("chart-comment-value")}>-%</div>
									</div>
								</div>

								<div className={cx("chart-comment")}>
									<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.DELEGATED}}></div>
									<div className={cx("chart-comment-info")}>
										<div className={cx("chart-comment-label")}>Delegated</div>
										<div className={cx("chart-comment-value")}>-%</div>
									</div>
								</div>
							</div>

							<div className={cx("chart-comment-group")}>
								<div className={cx("chart-comment")}>
									<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.UNBONDING}}></div>
									<div className={cx("chart-comment-info")}>
										<div className={cx("chart-comment-label")}>Unbonding</div>
										<div className={cx("chart-comment-value")}>-%</div>
									</div>
								</div>
								<div className={cx("chart-comment")}>
									<div className={cx("chart-comment-icon")} style={{backgroundColor: colors.REWARD}}></div>
									<div className={cx("chart-comment-info")}>
										<div className={cx("chart-comment-label")}>Reward</div>
										<div className={cx("chart-comment-value")}>-%</div>
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

export default EmptyCoinsCard;
