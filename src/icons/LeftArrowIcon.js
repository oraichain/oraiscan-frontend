import React from "react";
import PropTypes from "prop-types";

const LeftArrowIcon = ({className}) => {
	return (
		<svg className={className} width='16' height='14' viewBox='0 0 16 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M8.19416 2.03791C8.56028 1.6718 8.56028 1.0782 8.19416 0.712087C7.82805 0.345971 7.23445 0.345971 6.86834 0.712087L1.24334 6.33709C0.877221 6.7032 0.877221 7.2968 1.24334 7.66291L6.86834 13.2879C7.23445 13.654 7.82805 13.654 8.19416 13.2879C8.56028 12.9218 8.56028 12.3282 8.19416 11.9621L4.16958 7.9375H14.0938C14.6115 7.9375 15.0312 7.51777 15.0312 7C15.0312 6.48223 14.6115 6.0625 14.0938 6.0625H4.16958L8.19416 2.03791Z'
				fill='currentColor'
			/>
		</svg>
	);
};

LeftArrowIcon.propTypes = {
	className: PropTypes.string,
};

LeftArrowIcon.defaultProps = {
	className: "",
};

export default LeftArrowIcon;
