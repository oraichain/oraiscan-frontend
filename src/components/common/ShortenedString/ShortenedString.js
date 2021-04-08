import React from "react";
import cn from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./ShortenedString.module.scss";

const cx = cn.bind(styles);

const ShortenedString = ({inputString, long, displayThresh, medium}) => {
	return (
		<span className={cx({"shortened-string-md": medium, "shortened-string-xl": !medium && long, "shortened-string": !medium && !long})}>
			<span className={cx("front")}>{inputString.substr(0, displayThresh)}</span>
			<span className={cx("middle")}>{inputString.substr(displayThresh, inputString.length - displayThresh * 2)}</span>
			<span>{inputString.substr(inputString.length - displayThresh, inputString.length)}</span>
		</span>
	);
};

ShortenedString.propTypes = {
	inputString: PropTypes.string,
	long: PropTypes.bool,
	displayThresh: PropTypes.number,
	medium: PropTypes.bool,
};

ShortenedString.defaultProps = {
	inputString: "",
	long: false,
	displayThresh: 12,
	medium: false,
};

export default ShortenedString;
