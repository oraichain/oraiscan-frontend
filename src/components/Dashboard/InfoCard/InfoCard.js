import React, {memo} from "react";
import classNames from "classnames/bind";
import Grid from "@material-ui/core/Grid";
import PriceDisplay from "../DashboardContent/PriceDisplay";
import GraphDisplay from "../DashboardContent/GraphDisplay";
import DetailDisplay from "../DashboardContent/DetailDisplay";
import styles from "./InfoCard.scss";

const cx = classNames.bind(styles);

const InfoCard = memo(({}) => {
	return (
		<div className={cx("info-card")}>
			<Grid container spacing={0}>
				<Grid item lg={3} xs={12}>
					<PriceDisplay />
				</Grid>
				<Grid item lg={5} xs={12}>
					<GraphDisplay />
				</Grid>
				<Grid item lg={4} xs={12}>
					<DetailDisplay />
				</Grid>
			</Grid>
		</div>
	);
});

export default InfoCard;
