import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import cn from "classnames/bind";
import {_} from "src/lib/scripts";
import {formatOrai} from "src/helpers/helper";
import styles from "./OracleRequestGridView.module.scss";
import consts from "src/constants/consts";
import {NavLink} from "react-router-dom";

const cx = cn.bind(styles);

const OracleRequestGridView = ({data}) => {
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
					<Grid item lg={3} md={4} sm={12} xs={12} key={"request-grid-view-item-" + key}>
						<div className={cx("request-card")}>
							<table className={cx("request")}>
								<tr>
									<td>
										<div className={cx("request-title")}>Request id</div>
									</td>
									<td>
										{_.isNil(item?.request_id) ? (
											<div className={cx("request-link")}>-</div>
										) : (
											<NavLink className={cx("request-link")} to={`${consts.PATH.ORACLE_REQUEST}/${item?.contract}/${item?.request_id}`}>
												{item?.request_id}
											</NavLink>
										)}
									</td>
								</tr>
								<tr>
									<td>
										{_.isNil(item?.icon) ? <span className={cx("request-icon")}>Contract</span> : <img className={cx("request-icon")} src={item.icon} alt='' />}
									</td>
									<td>
										{_.isNil(item?.contract) ? (
											<div className={cx("request-text")}>-</div>
										) : (
											<NavLink className={cx("request-link")} to={`${consts.PATH.SMART_CONTRACT}/${item?.contract}`}>
												{item?.contract}
											</NavLink>
										)}
										{/* // <div className={cx("request-text")}>{_.isNil(item?.contract) ? "-" : item?.contract}</div> */}
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
												<span className={cx("fee-value")}>{formatOrai(item?.fees)}</span>
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
										<div className={cx("request-text")}>{item?.input}</div>
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("request-title")}>Status</div>
									</td>
									<td>
										<div className={cx("request-text")}>{item?.status ? "Success" : "Fail"}</div>
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

OracleRequestGridView.propTypes = {
	data: PropTypes.any,
};
OracleRequestGridView.defaultProps = {
	data: [],
};

export default OracleRequestGridView;
