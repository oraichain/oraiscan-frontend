import React, { memo } from "react";
import classNames from "classnames/bind";
import styles from "./VerifiedContract.module.scss";
import ClarityContractLineIcon from "src/icons/ClarityContractLineIcon";
const cx = classNames.bind(styles);

const HeaderContract = ({ label }) => {
    return (
        <div className={cx('header-contract')} >
            <div className={cx('left')}>
                <ClarityContractLineIcon className={cx("tab-icon")} />
                <span>
                    {label}
                </span>
            </div>
            <div className={cx('right')} >
                <div className={cx('expland')} >
                    Expand All
                </div>
                <div  className={cx('reset')} >
                    Reset
                </div>
            </div>
        </div>
    );
};

export default HeaderContract;
