import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import cn from "classnames/bind";
import { _ } from "src/lib/scripts";
import { formatOrai } from "src/helpers/helper";
import { reduceStringAssets } from "src/lib/scripts";
import styles from "./OracleRequestListView.module.scss";
import consts from "src/constants/consts";

const cx = cn.bind(styles);

const OracleRequestListView = ({ data }) => {
	return (
		<Grid container spacing={2}>
			{data?.map((item, key) => {
				// const eventRequestData = item?.logs?.[0]?.events?.filter(event => event?.type === "ai_request_data");
				// const inputField = eventRequestData?.[0]?.attributes
				// 	?.filter(event => event?.key === "data_sources")
				// 	?.map(event => {
				// 		return event?.value;
				// 	});
				return (
					<Grid item xs={12} key={"request-grid-view-item-" + key}>
						<div className={cx("request-card")}>
							<table className={cx("request")}>
								<tr>
									<td>
										<div className={cx("request-title")}>Stage</div>
									</td>
									<td>
										<div className={cx("request-text")}>{item?.stage}</div>
									</td>
								</tr>
								<tr>
									<td>
										{_.isNil(item?.icon) ? <span className={cx("request-icon")}>Requester</span> : <img className={cx("request-icon")} src={item.icon} alt='' />}
									</td>
									<td>
										{_.isNil(item?.requester) ? (
											<div className={cx("request-text")}>-</div>
										) : (
											<div className={cx("request-link")}>
												{item?.requester}
											</div>
										)}
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("request-title")}>Height</div>
									</td>
									<td>
										<div className={cx("request-text")}>{item?.request_height}</div>
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("request-title")}>Merkle Height</div>
									</td>
									<td>
										<div className={cx("request-text")}>{item?.submit_merkle_height}</div>
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("request-title")}>Merkle Root</div>
									</td>
									<td>
										<div className={cx("request-text")}>{reduceStringAssets(item?.merkle_root, 10, 5)}</div>
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("request-title")}>Threshold</div>
									</td>
									<td>
										<div className={cx("request-text")}>{item?.threshold}</div>
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("request-title")}>Service</div>
									</td>
									<td>
										<div className={cx("request-text")}>{item?.service}</div>
									</td>
								</tr>
							</table>
						</div>
					</Grid>
				);
			})}
		</Grid>
	);
};

OracleRequestListView.propTypes = {
	data: PropTypes.any,
};
OracleRequestListView.defaultProps = {
	data: [],
};

export default OracleRequestListView;