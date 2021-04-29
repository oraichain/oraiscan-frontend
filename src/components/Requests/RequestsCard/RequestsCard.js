import React from "react";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import cn from "classnames/bind";
import Grid from "@material-ui/core/Grid";
import consts from "src/constants/consts";
import styles from "./RequestsCard.module.scss";
import AddIcon from "src/icons/AddIcon";

const cx = cn.bind(styles);

const RequestsCard = ({totalItems, children}) => {
	return (
		<div className={cx("requests-card")}>
			<div className={cx("requests-card-header")}>
				<div className={cx("total")}>
					<span className={cx("total-title")}>Requests</span>
					<span className={cx("total-value")}>({totalItems})</span>
				</div>
				<div className={cx("create-button")}>
					<span className={cx("create-button-text")}>Create AI Request</span>
					<AddIcon className={cx("create-button-icon")} />
				</div>
			</div>
			<div className={cx("requests-card-body")}>{children}</div>
		</div>
	);
};

RequestsCard.propTypes = {
	totalItems: PropTypes.any,
	children: PropTypes.any,
};
RequestsCard.defaultProps = {
	totalItems: "-",
};

export default RequestsCard;
