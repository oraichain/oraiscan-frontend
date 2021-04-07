import React from "react";
import PropTypes from "prop-types";

const TelegramIcon = ({className}) => {
	return (
		<svg className={className} width='14' height='12' viewBox='0 0 14 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M5.56539 7.98971L5.34483 11.092C5.66039 11.092 5.79703 10.9564 5.96096 10.7936L7.44043 9.37971L10.506 11.6248C11.0683 11.9381 11.4644 11.7731 11.6161 11.1075L13.6284 1.67842L13.6289 1.67787C13.8072 0.846733 13.3284 0.521726 12.7806 0.725619L0.952495 5.25404C0.145255 5.56737 0.157482 6.01744 0.815275 6.22131L3.83924 7.16191L10.8633 2.76678C11.1938 2.54789 11.4944 2.669 11.2472 2.88789L5.56539 7.98971Z'
				fill='currentColor'
			/>
		</svg>
	);
};

TelegramIcon.propTypes = {
	className: PropTypes.string,
};

TelegramIcon.defaultProps = {
	className: "",
};

export default TelegramIcon;
