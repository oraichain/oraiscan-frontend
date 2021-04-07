import React from "react";
import PropTypes from "prop-types";

const ProposalsTabIcon = ({className}) => {
	return (
		<svg className={className} width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M12.8377 10.0181V2.98219L10.1421 0H0.400391V16H12.0685C13.7405 16 15.1007 14.6361 15.1007 12.9595C15.1007 11.5494 14.1384 10.3604 12.8377 10.0181ZM10.1525 1.40963L11.316 2.69681H10.1525V1.40963ZM1.33789 0.9375H9.21505V3.63431H11.9002V9.92366C10.3062 10.0115 9.0363 11.3396 9.0363 12.9595C9.0363 13.7747 9.35789 14.516 9.88055 15.0625H1.33786L1.33789 0.9375ZM12.0685 15.0625C10.9135 15.0625 9.9738 14.1191 9.9738 12.9595C9.9738 11.7999 10.9135 10.8565 12.0685 10.8565C13.2235 10.8565 14.1632 11.7999 14.1632 12.9595C14.1632 14.1191 13.2235 15.0625 12.0685 15.0625Z'
				fill='currentColor'
			/>
			<path d='M2.66309 9.42383H7.68984V10.3613H2.66309V9.42383Z' fill='currentColor' />
			<path d='M2.66309 7.5332H7.68984V8.47072H2.66309V7.5332Z' fill='currentColor' />
			<path d='M2.66309 11.2988H7.68984V12.2363H2.66309V11.2988Z' fill='currentColor' />
			<path d='M11.5996 12.4907H12.5371V13.4282H11.5996V12.4907Z' fill='currentColor' />
			<path d='M6.58244 3.73322L5.91953 3.07031L4.14456 4.84528L3.32306 4.02378L2.66016 4.68668L4.14456 6.17109L6.58244 3.73322Z' fill='currentColor' />
		</svg>
	);
};

ProposalsTabIcon.propTypes = {
	className: PropTypes.string,
};

ProposalsTabIcon.defaultProps = {
	className: "",
};
export default ProposalsTabIcon;
