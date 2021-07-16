import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, useHistory} from "react-router-dom";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import Dialog from "@material-ui/core/Dialog";
import copy from "copy-to-clipboard";
import {showAlert} from "src/store/modules/global";
import InfoRow from "src/components/common/InfoRow";
import consts from "src/constants/consts";
import CopyIcon from "src/icons/CopyIcon";
import styles from "./Randomness.module.scss";

const cx = cn.bind(styles);

const NewRadomModalResult = ({open, onClose, txResponse}) => {
    const dispatch = useDispatch();
	return (
        <Dialog open={open} onClose={onClose} maxWidth='lg' fullWidth={true}>
            <div className={cx("tx_response")}>
                <div className={cx("message")}> New random seed coming in just a moment...</div>

                <InfoRow label='Contract'>
                    <div className={cx("contract")}>
                        <NavLink className={cx("contract-link")} to={`${consts.PATH.SMART_CONTRACT}/${txResponse.contract}`}>
                            {txResponse.contract}
                        </NavLink>
                        <div
                            className={cx("contract-copy")}
                            onClick={() => {
                                copy(txResponse.contract);
                                dispatch(
                                    showAlert({
                                        show: true,
                                        message: "Copied",
                                        autoHideDuration: 1500,
                                    })
                                );
                            }}>
                            <CopyIcon />
                        </div>
                    </div>
                </InfoRow>

                <InfoRow label='TxHash'>
                    <div className={cx("txhash")}>
                        <NavLink className={cx("txhash-link")} to={`${consts.PATH.TXLIST}/${txResponse.txHash}`}>
                            {txResponse.txHash}
                        </NavLink>
                        <div
                            className={cx("txhash-copy")}
                            onClick={() => {
                                copy(txResponse.txHash);
                                dispatch(
                                    showAlert({
                                        show: true,
                                        message: "Copied",
                                        autoHideDuration: 1500,
                                    })
                                );
                            }}>
                            <CopyIcon />
                        </div>
                    </div>
                </InfoRow>
            </div>
        </Dialog>
	);
};

NewRadomModalResult.propTypes = {
	data: PropTypes.any,
};

NewRadomModalResult.defaultProps = {};

export default NewRadomModalResult;
