import React, { memo } from "react";
import classNames from "classnames/bind";
import styles from "./VerifiedContract.module.scss";
import ClarityContractLineIcon from "src/icons/ClarityContractLineIcon";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

const HeaderContract = ({ label, icon, setActiveTab, activeTab }) => {
    return (
        <div className={cx('header-contract')} >
            <div className={cx('left')}>
                {icon ?? <ClarityContractLineIcon className={cx("tab-icon")} />}
                <span style={{ paddingLeft: 6 }}>
                    {label}
                </span>
            </div>
            <div className={cx('right')} >
                <div className={cx('expland')} onClick={() => setActiveTab(!activeTab)}>
                    {activeTab ? "Collapse all" : "Expand All"}
                </div>
                <div className={cx('reset')} onClick={() => setActiveTab(activeTab == false ? undefined : false)}>
                    Reset
                </div>
            </div>
        </div>
    );
};

HeaderContract.propTypes = {
    label: PropTypes.string,
    icon: PropTypes.any
};
HeaderContract.defaultProps = {
    label: "",
    icon: undefined
};

export default HeaderContract;
