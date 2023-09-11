import React from "react";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import { NavLink } from "react-router-dom";
import { isNil } from "lodash";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import InfoRow from "src/components/common/InfoRow";
import styles from "./MoreInfo.module.scss";
import consts from "src/constants/consts";

const cx = cn.bind(styles);

const MoreInfo = ({ data }) => {
	return (
		<Grid item lg={6} xs={12}>
			<div className={cx("more-info")}>
				<table>
					<thead>
						<tr>
							<td colSpan={2}>
								<div className={cx("header-title")}>More Info</div>
							</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>Creator</div>
							</td>
							{isNil(data?.creator) ? (
								<td>
									<div className={cx("item-text")}>-</div>
								</td>
							) : (
								<td>
									<div>
										<NavLink className={cx("item-link")} to={`${consts.PATH.ACCOUNT}/${data?.creator}`}>
											{data?.creator}
										</NavLink>
									</div>
								</td>
							)}
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Admin</div>
							</td>
							<td>
								<div className={cx("item-text")}>{isNil(data?.admin) || data?.admin === "" ? "-" : data?.admin}</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Label</div>
							</td>
							<td>
								<div className={cx("item-text")}>{isNil(data?.label) ? "-" : data?.label}</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</Grid>
	);
};

MoreInfo.propTypes = {
	data: PropTypes.any,
};

MoreInfo.defaultProps = {};

export default MoreInfo;
