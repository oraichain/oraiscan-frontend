import React from "react";
import PropTypes from "prop-types";

const SuccessIcon = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_9_2174)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.5 6.5 2 12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12ZM17.0707 9.79805C17.4613 9.40753 17.4613 8.77436 17.0707 8.38384C16.6802 7.99331 16.047 7.99331 15.6565 8.38384L10.5454 13.4949L8.34346 11.2929C7.95294 10.9024 7.31977 10.9024 6.92925 11.2929C6.53872 11.6835 6.53872 12.3166 6.92925 12.7071L9.83834 15.6162C10.2289 16.0068 10.862 16.0068 11.2526 15.6162L17.0707 9.79805Z" fill="#53BD9F" />
            </g>
            <defs>
                <clipPath id="clip0_9_2174">
                    <rect width="20" height="20" fill="white" transform="translate(2 2)" />
                </clipPath>
            </defs>
        </svg>

    );
};

SuccessIcon.propTypes = {
    className: PropTypes.string,
};

SuccessIcon.defaultProps = {
    className: "",
};

export default SuccessIcon;
