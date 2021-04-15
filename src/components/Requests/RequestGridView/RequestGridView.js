import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import cn from "classnames/bind";
import {_} from "src/lib/scripts";
import styles from "./RequestGridView.module.scss";

const cx = cn.bind(styles);

const RequestGridView = ({data}) => {
	return (
		<Grid container spacing={2} className={cx("request-grid-view")}>
			{data.map((item, key) => {
				return (
					<Grid item lg={3} md={4} sm={12} xs={12} className={cx("request-grid-view-item")} key={"request-grid-view-item-" + key}>
						<div className={cx("request-card")}>
							<table className={cx("request")}>
								<tr>
									<td>{_.isNil(item?.icon) ? <span className={cx("request-icon")}>-</span> : <img className={cx("request-icon")} src={item.icon} alt='' />}</td>
									<td>
										<div className={cx("request-text")}>Oracle script name</div>
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("request-title")}>Request id</div>
									</td>
									<td>
										<div className={cx("request-link")}>{_.isNil(item?.request_id) ? "-" : item.request_id}</div>
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("request-title")}>Creator</div>
									</td>
									<td>
										<div className={cx("request-text")}>{_.isNil(item?.creator) ? "-" : item.creator}</div>
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("request-title")}>Input</div>
									</td>
									<td>
										<div className={cx("request-text")}>{_.isNil(item?.input) ? "-" : item.input}</div>
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("request-title")}>Creator</div>
									</td>
									<td>
										<div className={cx("request-text")}>{_.isNil(item?.creator) ? "-" : item.creator}</div>
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
