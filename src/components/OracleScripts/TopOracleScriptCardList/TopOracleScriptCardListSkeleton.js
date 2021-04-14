import React, {memo} from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import styles from "./TopOracleScriptCardList.module.scss";

const cx = classNames.bind(styles);

const TopOracleScriptCardListSkeleton = memo(({rows}) => {
	let topOracleScriptCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		topOracleScriptCardListItems.push(
			<Grid item xs={12} lg={3}>
				<div className={cx("oracle-script")}>
					<div className={cx("oracle-script-ordering")}>
						<Skeleton className={cx("skeleton")} variant='text' width={25} height={21} />
					</div>
					<div className={cx("oracle-script-title")}>
						<Skeleton className={cx("skeleton")} variant='text' width={180} height={24} />
					</div>
					<div className={cx("oracle-script-content")}>
						<Skeleton className={cx("skeleton")} variant='text' width={180} height={24} />
					</div>
					<div className={cx("oracle-script-request")}>
						<div className={cx("oracle-script-request-title")}>Requests</div>
						<div className={cx("oracle-script-request-value")}>
							<Skeleton className={cx("skeleton")} variant='text' width={50} height={21} />
						</div>
					</div>
					<div className={cx("oracle-script-response")}>
						<div className={cx("oracle-script-response-title")}>Response time</div>
						<div className={cx("oracle-script-response-value")}>
							<Skeleton className={cx("skeleton")} variant='text' width={50} height={21} />
						</div>
					</div>
				</div>
			</Grid>
		);
	}

	return (
		<Grid container spacing={2} className={cx("top-oracle-scripts")}>
			{topOracleScriptCardListItems}
		</Grid>
	);
});

TopOracleScriptCardListSkeleton.propTypes = {
	rows: PropTypes.number,
};
TopOracleScriptCardListSkeleton.defaultProps = {
	rows: 4,
};

export default TopOracleScriptCardListSkeleton;
