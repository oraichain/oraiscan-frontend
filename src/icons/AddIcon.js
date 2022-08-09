import React from "react";
import PropTypes from "prop-types";

const AddIcon = ({ className }) => {
	return (
		<svg className={className} width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M12.3999 6.26498H7.73502V1.59996C7.73502 1.19426 7.40572 0.865 6.99995 0.865C6.59426 0.865 6.26498 1.19428 6.26498 1.59996V6.26498H1.59996C1.19428 6.26498 0.865 6.59426 0.865 6.99995C0.865 7.40572 1.19426 7.73502 1.59996 7.73502H6.26498V12.3999C6.26498 12.8057 6.59424 13.135 6.99995 13.135C7.40574 13.135 7.73502 12.8057 7.73502 12.3999V7.73502H12.3999C12.8057 7.73502 13.135 7.40574 13.135 6.99995C13.135 6.59424 12.8057 6.26498 12.3999 6.26498Z'
				fill='currentColor'
				stroke='currentColor'
				strokeWidth='0.27'
			/>
		</svg>
	);
};

AddIcon.propTypes = {
	className: PropTypes.string,
};

AddIcon.defaultProps = {
	className: "",
};
export default AddIcon;
