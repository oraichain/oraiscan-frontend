


import React from "react";
import PropTypes from "prop-types";

const DownArrowIcon = ({ className, width, height , style }) => {
    return (
        <svg style={style} className={className} width={width} height={height} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.93333 0.774089C7.93333 0.346571 7.51547 0 7 0C6.48453 0 6.06667 0.346571 6.06667 0.774089V11.6777L1.5933 7.96761C1.22881 7.66531 0.637856 7.66531 0.273367 7.96761C-0.0911224 8.26991 -0.0911224 8.76004 0.273367 9.06234L5.68007 13.5466C6.40905 14.1512 7.59095 14.1512 8.31993 13.5466L13.7266 9.06234C14.0911 8.76004 14.0911 8.26991 13.7266 7.96761C13.3621 7.66531 12.7712 7.66531 12.4067 7.96761L7.93333 11.6777V0.774089Z" fill="#767F8D" />
        </svg>

    );
};

DownArrowIcon.propTypes = {
    className: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    style: PropTypes.object
};

DownArrowIcon.defaultProps = {
    className: "",
    width: 14,
    height: 14,
    style: {},
};

export default DownArrowIcon;
