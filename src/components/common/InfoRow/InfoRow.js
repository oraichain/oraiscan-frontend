import * as React from "react";
import cn from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./InfoRow.module.scss";

const cx = cn.bind(styles);

const InfoRow = ({label, children, onClick}) => {
	return (
		<ul className={cx("info-row")}>
			<li className={cx("label-column")}>{label}</li>
			<li className={cx("value-column")} onClick={() => onClick && onClick()}>
				{children}
			</li>
		</ul>
	);
};

InfoRow.propTypes = {
	label: PropTypes.any,
	children: PropTypes.any,
	onClick: PropTypes.func,
};

InfoRow.defaultProps = {};

export default InfoRow;
