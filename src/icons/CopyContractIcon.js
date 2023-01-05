import React from "react";
import PropTypes from "prop-types";

const CopyVerifiedIcon = ({ className, width = 16, height = 16 }) => {
    return (
        <svg className={className} width={width} height={height} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.66667 1.77778H9.77778C10.2687 1.77778 10.6667 2.17575 10.6667 2.66667V3.55556H12.4444V2.66667C12.4444 1.19391 11.2505 0 9.77778 0H2.66667C1.19391 0 0 1.19391 0 2.66667V9.77778C0 11.2505 1.19391 12.4444 2.66667 12.4444H3.55556V10.6667H2.66667C2.17575 10.6667 1.77778 10.2687 1.77778 9.77778V2.66667C1.77778 2.17575 2.17575 1.77778 2.66667 1.77778Z" fill="#767F8D" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3333 5.33332H6.22221C5.73129 5.33332 5.33332 5.73129 5.33332 6.22221V13.3333C5.33332 13.8242 5.73129 14.2222 6.22221 14.2222H13.3333C13.8242 14.2222 14.2222 13.8242 14.2222 13.3333V6.22221C14.2222 5.73129 13.8242 5.33332 13.3333 5.33332ZM6.22221 3.55554C4.74945 3.55554 3.55554 4.74945 3.55554 6.22221V13.3333C3.55554 14.8061 4.74945 16 6.22221 16H13.3333C14.8061 16 16 14.8061 16 13.3333V6.22221C16 4.74945 14.8061 3.55554 13.3333 3.55554H6.22221Z" fill="#767F8D" />
        </svg>
    );
};

CopyVerifiedIcon.propTypes = {
    className: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
};

CopyVerifiedIcon.defaultProps = {
    className: "",
    width: 20,
    height: 20
};

export default CopyVerifiedIcon;