import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import cn from "classnames/bind";
import styles from "./RequestGridView.module.scss";

const cx = cn.bind(styles);

const RequestGridViewSkeleton = ({rows}) => {
	let requestGridViewItem = [];

	for (let i = 0; i < rows; i++) {
		requestGridViewItem.push(
			<Grid item lg={3} md={4} sm={12} xs={12} key={"request-grid-view-item-" + i}>
				<div className={cx("request-card")}>
					<table className={cx("request")}>
						<tr>
							<td>
								<Skeleton className={cx("skeleton", "request-icon")} variant='circle' width={24} height={24} />
							</td>
							<td>
								<div className={cx("request-text")}>Oracle script name</div>
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("request-title")}>Request id</div>
							</td>
							<td>
								<div className={cx("request-link")}>
									<Skeleton className={cx("skeleton")} variant='text' width={70} height={21} />
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("request-title")}>Fee</div>
							</td>
							<td>
								<div className={cx("request-text")}>
									<Skeleton className={cx("skeleton")} variant='text' width={70} height={21} />
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("request-title")}>Input</div>
							</td>
							<td>
								<div className={cx("request-text")}>
									<Skeleton className={cx("skeleton")} variant='text' width={70} height={21} />
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("request-title")}>Creator</div>
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

RequestGridViewSkeleton.propTypes = {
	rows: PropTypes.number,
};
RequestGridViewSkeleton.defaultProps = {
	rows: 12,
};

export default RequestGridViewSkeleton;
