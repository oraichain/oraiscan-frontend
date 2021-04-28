import React, {memo} from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames/bind";
import styles from "./TopOracleScriptCardList.module.scss";

const cx = classNames.bind(styles);

const TopOracleScriptCardList = memo(({data}) => {
	return (
		<Grid container spacing={2} className={cx("top-oracle-scripts")}>
			{data?.map(data => {
				return (
					<Grid item xs={12} lg={3}>
						<div className={cx("oracle-script")}>
							<div className={cx("oracle-script-ordering")}>#03</div>
							<div className={cx("oracle-script-title")}>{data?.name}</div>
							<div className={cx("oracle-script-content")}>{data?.description}</div>
							<div className={cx("oracle-script-request")}>
								<div className={cx("oracle-script-request-title")}>Requests</div>
								<div className={cx("oracle-script-request-value")}>{data?.request}</div>
							</div>
						</div>
					</Grid>
				);
			})}
		</Grid>
	);
});

TopOracleScriptCardList.propTypes = {
	data: PropTypes.any,
};
TopOracleScriptCardList.defaultProps = {
	data: [],
};

export default TopOracleScriptCardList;
