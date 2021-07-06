import React from "react";
import PropTypes from "prop-types";

const PendingIcon = ({className}) => {
	return (
		<svg className={className} width='80' height='80' viewBox='0 0 80 80' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M54.2515 47.0646L43.0973 38.6989V21.658C43.0973 19.9446 41.7123 18.5596 39.9988 18.5596C38.2854 18.5596 36.9004 19.9446 36.9004 21.658V40.2483C36.9004 41.2243 37.359 42.1446 38.1398 42.7271L50.5332 52.0222C51.0909 52.4405 51.7416 52.6419 52.3891 52.6419C53.3341 52.6419 54.2637 52.2174 54.871 51.3994C55.8999 50.0329 55.621 48.0902 54.2515 47.0646Z'
				fill='currentColor'
			/>
			<path
				d='M40 0C17.9427 0 0 17.9427 0 40C0 62.0573 17.9427 80 40 80C62.0573 80 80 62.0573 80 40C80 17.9427 62.0573 0 40 0ZM40 73.8033C21.3633 73.8033 6.19672 58.6367 6.19672 40C6.19672 21.3633 21.3633 6.19672 40 6.19672C58.6398 6.19672 73.8033 21.3633 73.8033 40C73.8033 58.6367 58.6367 73.8033 40 73.8033Z'
				fill='currentColor'
			/>
		</svg>
	);
};

PendingIcon.propTypes = {
	className: PropTypes.string,
};

PendingIcon.defaultProps = {
	className: "",
};
export default PendingIcon;
