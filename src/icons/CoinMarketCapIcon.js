import React from "react";
import PropTypes from "prop-types";

const CoinMarketCapIcon = ({className}) => {
	return (
		<svg className={className} width='14' height='12' viewBox='0 0 14 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
				<path
					d='M5.14302 11.6191C7.24697 11.6191 8.95255 9.91347 8.95255 7.80953C8.95255 5.70558 7.24697 4 5.14302 4C3.03908 4 1.3335 5.70558 1.3335 7.80953C1.3335 9.91347 3.03908 11.6191 5.14302 11.6191Z'
					fill='currentColor'
				/>
				<path
					d='M11.1113 11.365C12.1633 11.365 13.0161 9.77314 13.0161 7.80946C13.0161 5.84578 12.1633 4.25391 11.1113 4.25391C10.0593 4.25391 9.20654 5.84578 9.20654 7.80946C9.20654 9.77314 10.0593 11.365 11.1113 11.365Z'
					fill='currentColor'
				/>
				<path
					d='M13.9684 11.111C14.3542 11.111 14.6668 9.66121 14.6668 7.87286C14.6668 6.08451 14.3542 4.63477 13.9684 4.63477C13.5827 4.63477 13.27 6.08451 13.27 7.87286C13.27 9.66121 13.5827 11.111 13.9684 11.111Z'
					fill='currentColor'
				/>
			</svg>
		</svg>
	);
};

CoinMarketCapIcon.propTypes = {
	className: PropTypes.string,
};

CoinMarketCapIcon.defaultProps = {
	className: "",
};

export default CoinMarketCapIcon;
