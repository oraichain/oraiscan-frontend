import React from "react";
import PropTypes from "prop-types";

const SuccessBlockIcon = ({className}) => {
	return (
		<svg className={className} width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<rect width='25' height='25' rx='4' fill='currentColor' />
		</svg>
	);
};

SuccessBlockIcon.propTypes = {
	className: PropTypes.string,
};

SuccessBlockIcon.defaultProps = {
	className: "",
};
export default SuccessBlockIcon;
