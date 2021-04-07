import React from "react";
import PropTypes from "prop-types";

const MediumIcon = ({className}) => {
	return (
		<svg className={className} width='14' height='12' viewBox='0 0 14 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M0.224121 7.98445C0.224121 7.98445 1.14706 5.26074 1.02721 3.90723C1.02721 3.90723 1.21254 2.05394 2.0774 1.37441C2.94227 0.694871 4.05424 0.324215 4.48667 0.324215C4.9191 0.324215 5.47509 0.334717 5.84574 0.452709C6.27818 0.200663 7.57547 0.138886 7.7608 1.06553C8.81099 1.43618 10.8496 2.05394 11.0967 2.60993C11.3438 3.16591 11.5291 3.66012 11.0349 4.27788C10.5407 4.89564 9.11987 6.25472 8.87277 6.5636C8.62567 6.87248 7.63725 8.04622 7.45192 8.60221C7.26659 9.15819 6.95771 9.83773 7.08126 10.8261C5.59864 11.0115 1.58319 10.6408 0.224121 7.98445Z'
				fill='currentColor'
			/>
		</svg>
	);
};

MediumIcon.propTypes = {
	className: PropTypes.string,
};

MediumIcon.defaultProps = {
	className: "",
};

export default MediumIcon;
