import React from "react";
import PropTypes from "prop-types";

const OraiIcon = ({className}) => {
	return (
		<svg className={className} width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<g clip-path='url(#clip0_5130_13757)'>
				<path
					d='M8.28292 8.5409L8.91667 10.4127H7.48705L8.15765 8.5409H8.28292ZM11.7022 11.4149H10.6558V11.7833H13.235V11.4149H12.2033V8.46721H13.235V8.09875H10.6558V8.46721H11.7022V11.4149ZM6.99331 11.7833L7.34703 10.7959H9.04932L9.38093 11.7833H9.92625L8.5998 8.09875H7.84814L6.49958 11.7833H6.99331ZM15.291 15.2911H4.70886V4.70892H15.291V15.2911Z'
					fill='currentColor'
				/>
				<path d='M11.0317 20C15.7554 19.5136 19.5137 15.7553 20.0001 11.0317H18.7547C18.3125 15.129 15.2101 18.3935 11.0317 18.8578V20Z' fill='currentColor' />
				<path d='M0 11.0317C0.486367 15.7553 4.24466 19.5136 8.96831 20V18.8578C4.78998 18.3935 1.69492 15.1216 1.24539 11.0317H0Z' fill='currentColor' />
				<path d='M20.0001 8.96831C19.5137 4.24466 15.7554 0.486367 11.0317 0V1.14223C15.2101 1.60648 18.3052 4.87841 18.7547 8.96831H20.0001Z' fill='currentColor' />
				<path d='M8.96831 0C4.24466 0.486367 0.486367 4.24466 0 8.96832H1.24539C1.68755 4.87104 4.78998 1.60649 8.96831 1.14223V0Z' fill='currentColor' />
			</g>
			<defs>
				<clipPath id='clip0_5130_13757'>
					<rect width='20' height='20' fill='white' />
				</clipPath>
			</defs>
		</svg>
	);
};

OraiIcon.propTypes = {
	className: PropTypes.string,
};

OraiIcon.defaultProps = {
	className: "",
};

export default OraiIcon;
