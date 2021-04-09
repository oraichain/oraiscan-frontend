import React from "react";
import PropTypes from "prop-types";

const RejectedIcon = ({className}) => {
	return (
		<svg className={className} width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<g clip-path='url(#clip0)'>
				<path
					d='M7 12C9.75686 12 12 9.75706 12 7C12 5.66333 11.4802 4.40753 10.5363 3.46372C9.59226 2.51982 8.33667 2 7 2C4.24294 2 2 4.24294 2 7C2 8.33667 2.51982 9.59247 3.46372 10.5363C4.40753 11.4802 5.66333 12 7 12ZM7 11.1667C6.02629 11.1667 5.10415 10.8357 4.36206 10.2271L10.2271 4.36206C10.8357 5.10415 11.1667 6.02629 11.1667 7C11.1667 9.29746 9.29746 11.1667 7 11.1667ZM7 2.83333C7.97351 2.83333 8.89585 3.16435 9.63774 3.77287L3.77287 9.63794C3.16435 8.89585 2.83333 7.97371 2.83333 7C2.83333 4.70253 4.70253 2.83333 7 2.83333Z'
					fill='currentColor'
				/>
			</g>
			<defs>
				<clipPath id='clip0'>
					<rect width='10' height='10' fill='white' transform='translate(2 2)' />
				</clipPath>
			</defs>
		</svg>
	);
};

RejectedIcon.propTypes = {
	className: PropTypes.string,
};

RejectedIcon.defaultProps = {
	className: "",
};
export default RejectedIcon;
