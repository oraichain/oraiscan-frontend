import React from "react";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import styles from "./RequestList.module.scss";

const cx = cn.bind(styles);

const RequestList = ({totalItems, children}) => {
	return (
		<div className={cx("requests-card")}>
			<div className={cx("requests-card-header")}>
				<div className={cx("total")}>
					<span className={cx("total-title")}>Requests</span>
					<span className={cx("total-value")}>({totalItems})</span>
				</div>
			</div>
			<div className={cx("requests-card-body")}>{children}</div>
		</div>
	);
};

RequestList.propTypes = {
	totalItems: PropTypes.any,
	children: PropTypes.any,
};
RequestList.defaultProps = {
	totalItems: "-",
};

export default RequestList;
