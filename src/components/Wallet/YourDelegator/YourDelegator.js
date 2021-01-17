/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import cn from "classnames/bind";

import styles from "./YourDelegator.scss";

const cx = cn.bind(styles);

export default function() {
	return (
		<div className={cx("YourDelelgator")}>
			<div className={cx("title")}>Register to become a validator</div>
			<Grid container spacing={3} className={cx("row")}>
				<Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
					<div className={cx("label")}>Validator name</div>
					<a href='https://google.com'>Oraichain</a>
				</Grid>
				<Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
					<div className={cx("label")}>Total Delegators</div>
					<div className={cx("content")}>122</div>
				</Grid>
			</Grid>
			<Grid container spacing={3} className={cx("row")}>
				<Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
					<div className={cx("label")}>
						Validator Address <img src={require("../../../assets/wallet/copy.svg")} style={{marginLeft: 7.5, cursor: "pointer"}} />
					</div>
					<div className={cx("content", "address")}>0x09470B5978C978eB28df8C3cB8421520339c1E2a</div>
				</Grid>
				<Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
					<div className={cx("label")}>Total Stake Amount</div>
					<div className={cx("content")}>120,256 ORAI</div>
				</Grid>
			</Grid>
			<Grid container spacing={3} className={cx("row")}>
				<Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
					<div className={cx("label")}>
						Validator Contract <img src={require("../../../assets/wallet/copy.svg")} style={{marginLeft: 7.5, cursor: "pointer"}} />
					</div>
					<div className={cx("content", "address")}>0x09470B5978C978eB28df8C3cB8421520339c1E2a</div>
				</Grid>
				<Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
					<div className={cx("label")}>Status</div>
					<div className={cx("content")}>Active</div>
				</Grid>
			</Grid>
			<Grid container spacing={3} className={cx("row")}>
				<Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
					<div className={cx("label")}>Role</div>
					<a href='https://google.com'>Proposer</a>
				</Grid>
				<Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
					<div className={cx("label")}>Missing Block</div>
					<div className={cx("content")}>0</div>
				</Grid>
			</Grid>
			<Grid container spacing={3} className={cx("row")}>
				<Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
					<div className={cx("label")}>Commission Rate</div>
					<a href='https://google.com'>5%</a>
				</Grid>
				<Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
					<div className={cx("label")}>Claimable Commission Reward</div>
					<div className={cx("content")}>12,000 ORAI</div>
				</Grid>
			</Grid>
			<Grid container spacing={3} className={cx("row")}>
				<Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
					<div className={cx("label")}>Max Commission Rate</div>
					<a href='https://google.com'>25%</a>
				</Grid>
				<Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
					<Button className={cx("MuiButton-root")}>Next</Button>
				</Grid>
			</Grid>
			<Grid container spacing={3} className={cx("row")}>
				<Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
					<div className={cx("label")}>Max Change Commission Rate</div>
					<div className={cx("content")}>5%</div>
				</Grid>
			</Grid>
		</div>
	);
}
