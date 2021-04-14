import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./NotFound.module.scss";

const cx = classNames.bind(styles);

const NotFound = ({message}) => {
	return <div className={cx("not-found")}>{message}</div>;
};

NotFound.propTypes = {
	message: PropTypes.string,
};

NotFound.defaultProps = {
	message: "Not Found",
};

export default NotFound;
