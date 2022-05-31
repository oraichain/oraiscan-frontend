import React, {memo} from "react";
import classNames from "classnames/bind";
import {_, reduceString} from "src/lib/scripts";
import styles from "./SmartContractPopularTable.module.scss";
import {Grid, Card, Typography, CardContent} from "@material-ui/core";
import consts from "src/constants/consts";
import {NavLink} from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";

const SmartContractPopularTableSkeleton = () => {
	const cx = classNames.bind(styles);

	const itemPopular = () => {
		return (
			<Card sx={{minWidth: 275}} variant='outlined' className={cx("popuplar-card-root")}>
				<CardContent>
          <Skeleton variant='text' className={cx("skeleton")} width={320} height={21} />
          <Skeleton variant='text' className={cx("skeleton")} width={320} height={21} />
          <Skeleton variant='text' className={cx("skeleton")} width={320} height={21} />
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
