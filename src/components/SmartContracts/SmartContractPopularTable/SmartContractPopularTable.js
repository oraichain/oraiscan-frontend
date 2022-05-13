// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo} from "react";
import classNames from "classnames/bind";
import {_} from "src/lib/scripts";
import styles from "./SmartContractPopularTable.module.scss";
import {Grid, Card, Typography, CardContent} from "@material-ui/core";
import {addressDisplay} from "src/helpers/helper";

const SmartContractPopularTable = memo(({data = []}) => {
	const cx = classNames.bind(styles);
	const itemPopular = item => {
		return (
			<Card sx={{minWidth: 275}} variant='outlined'>
				<CardContent>
					<Typography className={cx("header-cell")} gutterBottom>
						{item.label ? item.label : "-"}
					</Typography>
					<div className={cx("smart-contract-popular-card-list-item-row")}>
						<div className={cx("item-title")}>Contract Address</div>
						{_.isNil(item?.address) ? <div className={cx("item-link")}>-</div> : <div className={cx("item-link")}>{addressDisplay(item.address)}</div>}
					</div>

					<div className={cx("smart-contract-popular-card-list-item-row")}>
						<div className={cx("item-title")}>Executes</div>
						{_.isNil(item?.count_execute) ? <div className={cx("item-link")}>-</div> : <div className={cx("item-link")}>{item.count_execute}</div>}
					</div>
				</CardContent>
			</Card>
		);
	};

	return (
		<Grid container spacing={2}>
			{data.map((item, index) => (
				<Grid container={false} item xs={12} md={6} lg={3} key={index}>
					{itemPopular(item)}
				</Grid>
			))}
		</Grid>
	);
});

export default SmartContractPopularTable;
