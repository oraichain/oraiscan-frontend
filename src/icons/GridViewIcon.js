import React from "react";
import PropTypes from "prop-types";

const GridViewIcon = ({className}) => {
	return (
		<svg className={className} width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M1.125 1C1.05596 1 1 1.05596 1 1.125V5.375C1 5.44404 1.05596 5.5 1.125 5.5H5.375C5.44404 5.5 5.5 5.44404 5.5 5.375V1.125C5.5 1.05596 5.44404 1 5.375 1H1.125ZM0 1.125C0 0.50368 0.50368 0 1.125 0H5.375C5.99632 0 6.5 0.50368 6.5 1.125V5.375C6.5 5.99632 5.99632 6.5 5.375 6.5H1.125C0.50368 6.5 0 5.99632 0 5.375V1.125Z'
				fill='currentColor'
			/>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M8.625 1C8.55596 1 8.5 1.05596 8.5 1.125V5.375C8.5 5.44404 8.55596 5.5 8.625 5.5H12.875C12.944 5.5 13 5.44404 13 5.375V1.125C13 1.05596 12.944 1 12.875 1H8.625ZM7.5 1.125C7.5 0.50368 8.00368 0 8.625 0H12.875C13.4963 0 14 0.50368 14 1.125V5.375C14 5.99632 13.4963 6.5 12.875 6.5H8.625C8.00368 6.5 7.5 5.99632 7.5 5.375V1.125Z'
				fill='currentColor'
			/>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M1.125 8.5C1.05596 8.5 1 8.55596 1 8.625V12.875C1 12.944 1.05596 13 1.125 13H5.375C5.44404 13 5.5 12.944 5.5 12.875V8.625C5.5 8.55596 5.44404 8.5 5.375 8.5H1.125ZM0 8.625C0 8.00368 0.50368 7.5 1.125 7.5H5.375C5.99632 7.5 6.5 8.00368 6.5 8.625V12.875C6.5 13.4963 5.99632 14 5.375 14H1.125C0.50368 14 0 13.4963 0 12.875V8.625Z'
				fill='currentColor'
			/>
			<path
				fill-rule='evenodd'
				clip-rule='evenodd'
				d='M8.625 8.5C8.55596 8.5 8.5 8.55596 8.5 8.625V12.875C8.5 12.944 8.55596 13 8.625 13H12.875C12.944 13 13 12.944 13 12.875V8.625C13 8.55596 12.944 8.5 12.875 8.5H8.625ZM7.5 8.625C7.5 8.00368 8.00368 7.5 8.625 7.5H12.875C13.4963 7.5 14 8.00368 14 8.625V12.875C14 13.4963 13.4963 14 12.875 14H8.625C8.00368 14 7.5 13.4963 7.5 12.875V8.625Z'
				fill='currentColor'
			/>
		</svg>
	);
};

GridViewIcon.propTypes = {
	className: PropTypes.string,
};

GridViewIcon.defaultProps = {
	className: "",
};
export default GridViewIcon;
