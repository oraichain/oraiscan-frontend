import React from "react";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import {isNil} from "lodash-es";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import InfoRow from "src/components/common/InfoRow";
import styles from "./ContractPreview.module.scss";

const cx = cn.bind(styles);

const HeaderCardSkeleton = ({data}) => {
	return (
		<Grid item lg={6} sm={12} md={6} xs={12}>
			<div className={cx("contract-preview")}>
				<table>
					<thead>
						<tr>
							<td colSpan={2}>
								<div className={cx("header-title")}>Contract Overview</div>
							</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>Address</div>
							</td>
							<td>
								<div className={cx("item-text")}>{isNil(data?.address) ? "-" : data?.address}</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Contract Info</div>
							</td>
							<td>
								<div className={cx("item-text")}>{isNil(data?.info) ? "-" : data?.info}</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Code Id</div>
							</td>
							<td>
								<div className={cx("item-text")}>{isNil(data?.code_id) ? "-" : data?.code_id}</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</Grid>
	);
};

HeaderCardSkeleton.propTypes = {
	data: PropTypes.any,
};

HeaderCardSkeleton.defaultProps = {};

export default HeaderCardSkeleton;
