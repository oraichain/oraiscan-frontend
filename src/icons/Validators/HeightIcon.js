import React from "react";
import PropTypes from "prop-types";

const HeightIcon = ({className}) => {
	return (
		<svg className={className} width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<g clip-path='url(#clip0)'>
				<path
					d='M15.2553 4.74969H0.74465C0.411182 4.74969 0.140869 5.01998 0.140869 5.35348V15.3963C0.140869 15.7297 0.41115 16 0.74465 16H15.2553C15.5888 16 15.8591 15.7298 15.8591 15.3963V5.35348C15.8591 5.01998 15.5888 4.74969 15.2553 4.74969ZM14.6516 14.7924H1.34843V5.95723H14.6516V14.7924Z'
					fill='currentColor'
				/>
				<path
					d='M13.9068 2.35471H2.0729C1.7394 2.35471 1.46912 2.62499 1.46912 2.95849V5.35346H2.67665V3.56227H13.3033V5.35346H14.5106V2.95849C14.5106 2.62499 14.2403 2.35471 13.9068 2.35471Z'
					fill='currentColor'
				/>
				<path
					d='M12.1157 0H3.86416C3.53066 0 3.26038 0.270281 3.26038 0.603781V2.9585H4.46791V1.20756H11.5119V2.9585H12.7195V0.603781C12.7195 0.270281 12.4492 0 12.1157 0Z'
					fill='currentColor'
				/>
			</g>
			<defs>
				<clipPath id='clip0'>
					<rect width='16' height='16' fill='currentColor' />
				</clipPath>
			</defs>
		</svg>
	);
};

HeightIcon.propTypes = {
	className: PropTypes.string,
};

HeightIcon.defaultProps = {
	className: "",
};
export default HeightIcon;
