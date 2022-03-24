import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import cn from "classnames/bind";
import styles from "./OracleRequestListView.module.scss";

const cx = cn.bind(styles);

const OracleRequestListViewSkeleton = ({ rows }) => {
	let requestGridViewItem = [];

	for (let i = 0; i < rows; i++) {
		requestGridViewItem.push(
			<Grid item xs={12} key={"request-grid-view-item-" + i}>
				<div className={cx("request-card")}>
					<table className={cx("request")}>
						<tr>
							<td>
								<div className={cx("request-title")}>Stage</div>
							</td>
							<td>
								<div className={cx("request-link")}>
									<Skeleton className={cx("skeleton")} variant='text' width={70} height={21} />
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("request-text")}>Requester</div>
							</td>
							<td>
								<Skeleton className={cx("skeleton", "request-icon")} variant='circle' width={24} height={24} />
							</td>

						</tr>
						<tr>
							<td>
								<div className={cx("request-title")}>Height</div>
							</td>
							<td>
								<div className={cx("request-text")}>
									<Skeleton className={cx("skeleton")} variant='text' width={70} height={21} />
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("request-title")}>Merkle Height</div>
							</td>
							<td>
								<div className={cx("request-text")}>
									<Skeleton className={cx("skeleton")} variant='text' width={70} height={21} />
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("request-title")}>Merkle Root</div>
							</td>
							<td>
								<div className={cx("request-text")}>
									<Skeleton className={cx("skeleton")} variant='text' width={70} height={21} />
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("request-title")}>Threshold</div>
							</td>
							<td>
								<div className={cx("request-text")}>
									<Skeleton className={cx("skeleton")} variant='text' width={70} height={21} />
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("request-title")}>Service</div>
							</td>
							<td>
								<div className={cx("request-text")}>
									<Skeleton className={cx("skeleton")} variant='text' width={70} height={21} />
								</div>
							</td>
						</tr>
					</table>
				</div>
			</Grid>
		);
	}
	return (
		<Grid container spacing={3}>
			{requestGridViewItem}
		</Grid>
	);
};

OracleRequestListViewSkeleton.propTypes = {
	rows: PropTypes.number,
};
OracleRequestListViewSkeleton.defaultProps = {
	rows: 12,
};

export default OracleRequestListViewSkeleton;
