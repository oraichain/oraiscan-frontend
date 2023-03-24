import React from "react";
import PropTypes from "prop-types";

const ViewMoreProposalIcon = ({className}) => {
	return (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 9L16.5 12L13.5 15" stroke="#ABB1B9" stroke-linecap="square"/>
        <path d="M7.5 12H15" stroke="#ABB1B9" stroke-linecap="square"/>
        <path d="M16.5 12H15" stroke="#ABB1B9" stroke-linecap="round"/>
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#ABB1B9" stroke-linecap="square"/>
        </svg>
        
	);
};

ViewMoreProposalIcon.propTypes = {
	className: PropTypes.string,
};

ViewMoreProposalIcon.defaultProps = {
	className: "",
};
export default ViewMoreProposalIcon;
