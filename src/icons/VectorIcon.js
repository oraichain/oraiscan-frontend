import React from "react";
import PropTypes from "prop-types";

const VectorIcon = () => {
	return (
		<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M1 1V9H9" stroke="#767f8d" stroke-width="1.5" stroke-linecap="round" />
		</svg>
	);
};

VectorIcon.propTypes = {
	className: PropTypes.string,
};

VectorIcon.defaultProps = {
	className: "",
};

export default VectorIcon;
