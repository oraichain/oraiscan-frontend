import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import cn from "classnames/bind";
import {_} from "src/lib/scripts";
import styles from "./RequestGridView.module.scss";
import consts from "src/constants/consts";
import {NavLink} from "react-router-dom";

const cx = cn.bind(styles);

const RequestGridView = ({data}) => {
	return (
		<Grid container spacing={2}>
			{data?.map((item, key) => {
				return (
					<Grid item lg={3} md={4} sm={12} xs={12} key={"request-grid-view-item-" + key}>
						<div className={cx("request-card")}>
							<table className={cx("request")}>
								<tr>
									<td>
										{_.isNil(item?.icon) ? <span className={cx("request-icon")}>Name</span> : <img className={cx("request-icon")} src={item.icon} alt='' />}
									</td>
									<td>
										<div className={cx("request-text")}>{_.isNil(item?.oracle_script_name) ? "-" : item?.oracle_script_name}</div>
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("request-title")}>Request id</div>
									</td>
									<td>
										{_.isNil(item?.request_id) ? (
											<div className={cx("request-link")}>-</div>
										) : (
											<NavLink className={cx("request-link")} to={`${consts.API.REQUESTS}/${item.request_id}`}>
												{item?.request_id}
											</NavLink>
										)}
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("request-title")}>Fee</div>
									</td>
									<td>
										{_.isNil(item?.fees) ? (
											<div className={cx("fee")}>-</div>
										) : (
											<div className={cx("fee")}>
												<span className={cx("fee-value")}>{item?.fees}</span>
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
										<div className={cx("request-text")}>{_.isNil(item?.input) ? "-" : item?.input}</div>
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("request-title")}>Creator</div>
									</td>
									<td>
										<div className={cx("request-text")}>{_.isNil(item?.creator) ? "-" : item?.creator}</div>
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

RequestGridView.propTypes = {
	data: PropTypes.any,
};
RequestGridView.defaultProps = {
	data: [],
};

export default RequestGridView;
