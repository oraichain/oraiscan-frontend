import React, {memo} from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames/bind";
import styles from "./TopOracleScriptCardList.module.scss";

const cx = classNames.bind(styles);

const TopOracleScriptCardList = memo(({data}) => {
	return (
		<Grid container spacing={2} className={cx("top-oracle-scripts")}>
			<Grid item xs={12} lg={3}>
				<div className={cx("oracle-script")}>
					<div className={cx("oracle-script-ordering")}>#03</div>
					<div className={cx("oracle-script-title")}>Band Standard Dataset (Forex & Commodities)</div>
					<div className={cx("oracle-script-content")}>Band Standard Dataset oracle script for querying cryptocurrency prices</div>
					<div className={cx("oracle-script-request")}>
						<div className={cx("oracle-script-request-title")}>Requests</div>
						<div className={cx("oracle-script-request-value")}>181,103</div>
					</div>
					<div className={cx("oracle-script-response")}>
						<div className={cx("oracle-script-response-title")}>Response time</div>
						<div className={cx("oracle-script-response-value")}>8.17 s</div>
					</div>
				</div>
			</Grid>

			<Grid item xs={12} lg={3}>
				<div className={cx("oracle-script")}>
					<div className={cx("oracle-script-ordering")}> #03 </div>
					<div className={cx("oracle-script-title")}> Band Standard Dataset (Forex & Commodities) </div>
					<div className={cx("oracle-script-content")}> Band Standard Dataset oracle script for querying cryptocurrency prices </div>
					<div className={cx("oracle-script-request")}>
						<div className={cx("oracle-script-request-title")}> Requests </div>
						<div className={cx("oracle-script-request-value")}> 181,103 </div>
					</div>
					<div className={cx("oracle-script-response")}>
						<div className={cx("oracle-script-response-title")}> Response time </div>
						<div className={cx("oracle-script-response-value")}> 8.17 s </div>
					</div>
				</div>
			</Grid>

			<Grid item xs={12} lg={3}>
				<div className={cx("oracle-script")}>
					<div className={cx("oracle-script-ordering")}> #03 </div>
					<div className={cx("oracle-script-title")}> Band Standard Dataset (Forex & Commodities) </div>
					<div className={cx("oracle-script-content")}> Band Standard Dataset oracle script for querying cryptocurrency prices </div>
					<div className={cx("oracle-script-request")}>
						<div className={cx("oracle-script-request-title")}> Requests </div>
						<div className={cx("oracle-script-request-value")}> 181,103 </div>
					</div>
					<div className={cx("oracle-script-response")}>
						<div className={cx("oracle-script-response-title")}> Response time </div>
						<div className={cx("oracle-script-response-value")}> 8.17 s </div>
					</div>
				</div>
			</Grid>

			<Grid item xs={12} lg={3}>
				<div className={cx("oracle-script")}>
					<div className={cx("oracle-script-ordering")}> #03 </div>
					<div className={cx("oracle-script-title")}> Band Standard Dataset (Forex & Commodities) </div>
					<div className={cx("oracle-script-content")}> Band Standard Dataset oracle script for querying cryptocurrency prices </div>
					<div className={cx("oracle-script-request")}>
						<div className={cx("oracle-script-request-title")}> Requests </div>
						<div className={cx("oracle-script-request-value")}> 181,103 </div>
					</div>
					<div className={cx("oracle-script-response")}>
						<div className={cx("oracle-script-response-title")}> Response time </div>
						<div className={cx("oracle-script-response-value")}> 8.17 s </div>
					</div>
				</div>
			</Grid>
		</Grid>
	);
});

TopOracleScriptCardList.propTypes = {
	data: PropTypes.any,
};
TopOracleScriptCardList.defaultProps = {};

export default TopOracleScriptCardList;
