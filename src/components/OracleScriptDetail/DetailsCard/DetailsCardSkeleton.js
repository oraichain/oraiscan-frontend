/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo} from "react";
import PropTypes from "prop-types";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames/bind";
import Address from "src/components/common/Address";
import InfoIcon from "src/icons/InfoIcon";
import styles from "./DetailsCard.module.scss";

const cx = classNames.bind(styles);
const DetailsCardSkeleton = memo(({data}) => {
	return (
		<div className={cx("details-card")}>
			<div className={cx("title")}>
				<span className={cx("title-tag")}>
					<Skeleton className={cx("skeleton")} variant='text' width={30} height={30} />
				</span>
				<span className={cx("title-name")}>
					<Skeleton className={cx("skeleton")} variant='text' width={100} height={30} />
				</span>
			</div>

			<Grid container spacing={2}>
				<Grid item lg={3} xs={12}>
					<div className={cx("api-card")}>
						<div className={cx("api-card-name")}>Request</div>
						<div className={cx("api-card-value")}>
							<Skeleton className={cx("skeleton")} variant='text' width={85} height={36} />
						</div>
					</div>
				</Grid>
				<Grid item lg={3} xs={12}>
					<div className={cx("api-card")}>
						<div className={cx("api-card-name")}>Response Time</div>
						<div className={cx("api-card-value")}>
							<Skeleton className={cx("skeleton")} variant='text' width={85} height={36} />
						</div>
					</div>
				</Grid>
			</Grid>

			<div className={cx("information-card")}>
				<div className={cx("information-card-header")}>Information</div>
				<div className={cx("information-card-body")}>
					<Grid container spacing={1} className={cx("information")}>
						<Grid item lg={4} xs={12} className={cx("information-title")}>
							<span className={cx("information-title-text")}>Owner</span>
							<InfoIcon className={cx("information-title-icon")} />
						</Grid>
						<Grid item lg={8} xs={12} className={cx("information-value")}>
							<Skeleton className={cx("skeleton")} variant='text' width={200} height={24} />
						</Grid>
					</Grid>

					<Grid container spacing={1} className={cx("information")}>
						<Grid item lg={4} xs={12} className={cx("information-title")}>
							<span className={cx("information-title-text")}>Data Sources</span>
							<InfoIcon className={cx("information-title-icon")} />
						</Grid>
						<Grid item lg={8} xs={12} className={cx("information-value")}>
							<Skeleton className={cx("skeleton")} variant='text' width={200} height={24} />
						</Grid>
					</Grid>

					<Grid container spacing={1} className={cx("information")}>
						<Grid item lg={4} xs={12} className={cx("information-title")}>
							<span className={cx("information-title-text")}>Test Cases</span>
							<InfoIcon className={cx("information-title-icon")} />
						</Grid>
						<Grid item lg={8} xs={12} className={cx("information-value")}>
							<Skeleton className={cx("skeleton")} variant='text' width={200} height={24} />
						</Grid>
					</Grid>

					<Grid container spacing={1} className={cx("information")}>
						<Grid item lg={12} xs={12}>
							<div className={cx("information-title")}>
								<span className={cx("information-title-text")}>Description</span>
								<InfoIcon className={cx("information-title-icon")} />
							</div>
							<div className={cx("information-value")}>
								<Skeleton className={cx("skeleton")} variant='text' width={200} height={24} />
							</div>
						</Grid>
					</Grid>
				</div>
			</div>
		</div>
	);
});

DetailsCardSkeleton.propTypes = {
	data: PropTypes.any,
};
DetailsCardSkeleton.defaultProps = {};

export default DetailsCardSkeleton;
