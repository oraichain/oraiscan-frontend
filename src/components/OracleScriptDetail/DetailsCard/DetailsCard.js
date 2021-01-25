/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo} from "react";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames/bind";
import styles from "./DetailsCard.scss";
import Address from "src/components/common/Address";
import infoIcon from "src/assets/oracleScripts/info_ic.svg";

const cx = classNames.bind(styles);
const DetailsCard = memo(() => {
	return (
		<div className={cx("details-card")}>
			<div className={cx("title")}>
				<span className={cx("title-tag")}>#D2</span>
				<span className={cx("title-name")}>Band Standard Dataset (Crypto)</span>
			</div>

			<Grid container spacing={2}>
				<Grid item lg={3} xs={12}>
					<div className={cx("api-card")}>
						<div className={cx("api-card-name")}>Request</div>
						<div className={cx("api-card-value")}>186,012</div>
					</div>
				</Grid>
				<Grid item lg={3} xs={12}>
					<div className={cx("api-card")}>
						<div className={cx("api-card-name")}>Response Time</div>
						<div className={cx("api-card-value")}>8.05s</div>
					</div>
				</Grid>
			</Grid>

			<div className={cx("information-card")}>
				<div className={cx("information-card-header")}>Information</div>
				<div className={cx("information-card-body")}>
					<Grid container spacing={1} className={cx("information")}>
						<Grid item lg={4} xs={12} className={cx("information-title")}>
							<span className={cx("information-title-text")}>Owner</span>
							<img src={infoIcon} alt='' className={cx("information-title-icon")} />
						</Grid>
						<Grid item lg={8} xs={12} className={cx("information-value")}>
							<Address address='orai1nl23kd2w7vehmk6d6scrs9jagqrdrxrat32vxv' size='md' showCopyIcon={false} />
						</Grid>
					</Grid>

					<Grid container spacing={1} className={cx("information")}>
						<Grid item lg={4} xs={12} className={cx("information-title")}>
							<span className={cx("information-title-text")}>Data Sources</span>
							<img src={infoIcon} alt='' className={cx("information-title-icon")} />
						</Grid>
						<Grid item lg={8} xs={12} className={cx("information-value")}>
							<span className={cx("tag")}>#D3</span>
							<span className={cx("tag")}>#D1</span>
							<span className={cx("tag")}>#D2</span>
							<span className={cx("tag")}>#D4</span>
							<span className={cx("tag")}>#D11</span>
						</Grid>
					</Grid>

					<Grid container spacing={1} className={cx("information")}>
						<Grid item lg={4} xs={12} className={cx("information-title")}>
							<span className={cx("information-title-text")}>Test Cases</span>
							<img src={infoIcon} alt='' className={cx("information-title-icon")} />
						</Grid>
						<Grid item lg={8} xs={12} className={cx("information-value")}>
							<span className={cx("tag")}>#Test01</span>
							<span className={cx("tag")}>#Test02</span>
							<span className={cx("tag")}>#Test03</span>
							<span className={cx("tag")}>#Test06</span>
							<span className={cx("tag")}>#Test09</span>
							<span className={cx("tag")}>#Test11</span>
						</Grid>
					</Grid>

					<Grid container spacing={1} className={cx("information")}>
						<Grid item lg={12} xs={12}>
							<div className={cx("information-title")}>
								<span className={cx("information-title-text")}>Description</span>
								<img src={infoIcon} alt='' className={cx("information-title-icon")} />
							</div>
							<div className={cx("information-value")}>
								<p className={cx("text")}>Band Standard Dataset oracle script for querying cryptocurrency prices</p>
							</div>
						</Grid>
					</Grid>
				</div>
			</div>
		</div>
	);
});

export default DetailsCard;
