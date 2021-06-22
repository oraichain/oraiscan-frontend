import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import cn from "classnames/bind";
import styles from "./PriceFeedsGridView.module.scss";

const cx = cn.bind(styles);

const PriceFeedsGridViewSkeleton = ({rows}) => {
	let requestGridViewItem = [];

	for (let i = 0; i < rows; i++) {
		requestGridViewItem.push(
			<Grid item lg={3} md={4} sm={12} xs={12} key={"price-feeds-grid-view-item-" + i}>
				<div className={cx("price-feeds-card")}>
					<div className={cx("price-feeds-card-pair")}>
						<Skeleton className={cx("skeleton", "price-feeds-card-pair-icon")} variant='circle' width={24} height={24} />
						<Skeleton className={cx("skeleton")} variant='text' width={70} height={21} />
					</div>
					<div className={cx("price-feeds-card-price")}>
						<Skeleton className={cx("skeleton")} variant='text' width={70} height={21} />
					</div>
					<div className={cx("price-feeds-card-status")}>
						<Skeleton className={cx("skeleton")} variant='text' width={70} height={21} />
					</div>
				</div>
			</Grid>
		);
	}

	return (
		<div className={cx("price-feeds")}>
			<div className={cx("price-feeds-header")}>
				<span className={cx("price-feeds-header-name")}>Explore the decentralized oracle networks powered.</span>
			</div>
			<div className={cx("price-feeds-body")}>
				<Grid container spacing={3}>
					{requestGridViewItem}
				</Grid>
			</div>
		</div>
	);
};

PriceFeedsGridViewSkeleton.propTypes = {
	rows: PropTypes.number,
};
PriceFeedsGridViewSkeleton.defaultProps = {
	rows: 12,
};

export default PriceFeedsGridViewSkeleton;
