import React from "react";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import cn from "classnames/bind";
import {_} from "src/lib/scripts";
import {formatOrai} from "src/helpers/helper";
import styles from "./RequestListView.module.scss";
import consts from "src/constants/consts";

const cx = cn.bind(styles);

const RequestListView = ({data}) => {
	return (
		<Grid container spacing={2}>
			{data?.tx_responses?.map((item, key) => {
				const eventRequestData = item?.logs?.[0]?.events?.filter(event => event?.type === "ai_request_data");
				const inputField = eventRequestData?.[0]?.attributes
					?.filter(event => event?.key === "data_sources")
					?.map(event => {
						return event?.value;
					});
				return (
					<Grid item xs={12} key={"request-grid-view-item-" + key}>
						<div className={cx("request-card")}>
							<table className={cx("request")}>
								<tr>
									<td>
										{_.isNil(item?.icon) ? <span className={cx("request-icon")}>Name</span> : <img className={cx("request-icon")} src={item.icon} alt='' />}
									</td>
									<td>
										<div className={cx("request-link")}>
											{_.isNil(item?.tx?.body?.messages?.[0]?.oracle_script_name) ? "-" : item?.tx?.body?.messages?.[0]?.oracle_script_name}
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("request-title")}>Request id</div>
									</td>
									<td>
										{_.isNil(item?.tx?.body?.messages?.[0]?.request_id) ? (
											<div className={cx("request-link")}>-</div>
										) : (
											<NavLink className={cx("request-link")} to={`${consts.API.REQUESTS}/${item?.tx?.body?.messages?.[0]?.request_id}`}>
												{item?.tx?.body?.messages?.[0]?.request_id}
											</NavLink>
										)}
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("request-title")}>Fee</div>
									</td>
									<td>
										{_.isNil(item?.tx?.body?.messages?.[0]?.fees) ? (
											<div className={cx("fee")}>-</div>
										) : (
											<div className={cx("fee")}>
												<span className={cx("fee-value")}>{formatOrai(item?.tx?.body?.messages?.[0]?.fees)}</span>
												<span className={cx("fee-denom")}>ORAI</span>
											</div>
										)}
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("request-title")}>Input</div>
									</td>
									<td>
										<div className={cx("request-text")}>{inputField?.join(", ")}</div>
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("request-title")}>Creator</div>
									</td>
									<td>
										<div className={cx("request-text")}>{_.isNil(item?.tx?.body?.messages?.[0]?.creator) ? "-" : item?.tx?.body?.messages?.[0]?.creator}</div>
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

RequestListView.propTypes = {
	data: PropTypes.any,
};
RequestListView.defaultProps = {
	data: [],
};

export default RequestListView;
