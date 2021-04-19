import React from "react";
import PropTypes from "prop-types";

const RightArrowIcon = ({className}) => {
	return (
		<svg className={className} width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path d='M0 7H12.1733L6.58667 1.41333L8 0L16 8L8 16L6.58667 14.5867L12.1733 9H0V7Z' fill='currentColor' />
		</svg>
	);
};

RightArrowIcon.propTypes = {
	className: PropTypes.string,
};

RightArrowIcon.defaultProps = {
	className: "",
};

export default RightArrowIcon;
