import React from "react";
import PropTypes from "prop-types";

const MostVotedicon = ({className}) => {
	return (
		<svg className={className} width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<circle cx='6' cy='6' r='6' fill='currentColor' />
		</svg>
	);
};

MostVotedicon.propTypes = {
	className: PropTypes.string,
};

MostVotedicon.defaultProps = {
	className: "",
};
export default MostVotedicon;
