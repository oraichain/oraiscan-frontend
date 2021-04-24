import React from "react";
import PropTypes from "prop-types";

const ListViewIcon = ({className}) => {
	return (
		<svg className={className} width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<g clip-path='url(#clip0)'>
				<path
					d='M15 4H1C0.448667 4 0 3.55133 0 3V1C0 0.448667 0.448667 0 1 0H15C15.5513 0 16 0.448667 16 1V3C16 3.55133 15.5513 4 15 4ZM1 0.666667C0.816667 0.666667 0.666667 0.816 0.666667 1V3C0.666667 3.184 0.816667 3.33333 1 3.33333H15C15.1833 3.33333 15.3333 3.184 15.3333 3V1C15.3333 0.816 15.1833 0.666667 15 0.666667H1Z'
					fill='currentColor'
				/>
				<path
					d='M15 10H1C0.448667 10 0 9.55133 0 9V7C0 6.44867 0.448667 6 1 6H15C15.5513 6 16 6.44867 16 7V9C16 9.55133 15.5513 10 15 10ZM1 6.66667C0.816667 6.66667 0.666667 6.816 0.666667 7V9C0.666667 9.184 0.816667 9.33333 1 9.33333H15C15.1833 9.33333 15.3333 9.184 15.3333 9V7C15.3333 6.816 15.1833 6.66667 15 6.66667H1Z'
					fill='currentColor'
				/>
				<path
					d='M15 16H1C0.448667 16 0 15.5513 0 15V13C0 12.4487 0.448667 12 1 12H15C15.5513 12 16 12.4487 16 13V15C16 15.5513 15.5513 16 15 16ZM1 12.6667C0.816667 12.6667 0.666667 12.816 0.666667 13V15C0.666667 15.184 0.816667 15.3333 1 15.3333H15C15.1833 15.3333 15.3333 15.184 15.3333 15V13C15.3333 12.816 15.1833 12.6667 15 12.6667H1Z'
					fill='currentColor'
				/>
			</g>
			<defs>
				<clipPath id='clip0'>
					<rect width='16' height='16' fill='white' />
				</clipPath>
			</defs>
		</svg>
	);
};

ListViewIcon.propTypes = {
	className: PropTypes.string,
};

ListViewIcon.defaultProps = {
	className: "",
};
export default ListViewIcon;
