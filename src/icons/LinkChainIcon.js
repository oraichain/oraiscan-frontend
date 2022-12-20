


import React from "react";
import PropTypes from "prop-types";

const LinkChainIcon = ({ className, width = '16', height = '16' }) => {
    return (
        <svg className={className} width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.20085 6.79921C8.56379 6.16241 7.6999 5.80469 6.79915 5.80469C5.8984 5.80469 5.03451 6.16241 4.39745 6.79921L1.99498 9.20091C1.3579 9.83798 1 10.702 1 11.603C1 12.504 1.3579 13.368 1.99498 14.0051C2.63205 14.6422 3.49611 15.0001 4.39706 15.0001C5.29802 15.0001 6.16208 14.6422 6.79915 14.0051L8 12.8042" stroke="#767F8D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.79919 9.20085C7.43626 9.83764 8.30014 10.1954 9.20089 10.1954C10.1016 10.1954 10.9655 9.83764 11.6026 9.20085L14.0051 6.79915C14.6421 6.16208 15 5.29802 15 4.39706C15 3.49611 14.6421 2.63205 14.0051 1.99498C13.368 1.3579 12.5039 1 11.603 1C10.702 1 9.83796 1.3579 9.20089 1.99498L8.00004 3.19583" stroke="#767F8D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    );
};

LinkChainIcon.propTypes = {
    className: PropTypes.string,
};

LinkChainIcon.defaultProps = {
    className: "",
};

export default LinkChainIcon;
