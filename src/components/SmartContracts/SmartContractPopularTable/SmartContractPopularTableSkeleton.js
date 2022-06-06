import React, {} from "react";
import classNames from "classnames/bind";
import {_} from "src/lib/scripts";
import styles from "./SmartContractPopularTable.module.scss";
import {Grid, Card, CardContent} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const SmartContractPopularTableSkeleton = () => {
	const cx = classNames.bind(styles);

	const itemPopular = () => {
		return (
			<Card sx={{minWidth: 275}} variant='outlined' className={cx("popuplar-card-root")}>
				<CardContent>
          <Skeleton variant='text' className={cx("skeleton")} width="100%" height={21} />
					<div className={cx("skeleton-root")}>
						<Skeleton variant='text' className={cx("skeleton")} width="40%" height={21} />
						<Skeleton variant='text' className={cx("skeleton")} width="40%" height={21} />
					</div>
					<div className={cx("skeleton-root")}>
						<Skeleton variant='text' className={cx("skeleton")} width="30%" height={21} />
						<Skeleton variant='text' className={cx("skeleton")} width="30%" height={21} />
					</div>
				</CardContent>
			</Card>
		);
	};

	const mappingSkeleton = () => {
		let dataRows = [];
		for (let i = 1; i <= 8; i++) {
			const itemSkeleton = (
				<Grid container={false} item xs={12} md={6} lg={3} key={i}>
					{itemPopular()}
				</Grid>
			);
			dataRows.push(itemSkeleton);
		}
		return dataRows;
	};

	return (
		<Grid container spacing={2}>
			{mappingSkeleton()}
		</Grid>
	);
};

export default SmartContractPopularTableSkeleton;
