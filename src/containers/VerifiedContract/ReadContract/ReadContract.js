import React, { memo } from "react";
import classNames from "classnames/bind";
import styles from "./ReadContract.module.scss";
import HeaderContract from "../HeaderContract";
import CopyVerifiedIcon from "src/icons/CopyContractIcon";
import DownArrowIcon from "src/icons/DownArrowIcon";
import { Button } from "@material-ui/core";
import VectorIcon from 'src/icons/VectorIcon';
import copy from "copy-to-clipboard";
import { showAlert } from "src/store/modules/global";
import { useDispatch } from "react-redux";

const cx = classNames.bind(styles);

const ItemContract = ({ label, amount, type }) => {
    return (
        <div className={cx("items")} >
            <div className={cx("header")} >
                <div className={cx("label")}>{label}</div>
                <div className={cx("icon")}>
                    <CopyVerifiedIcon className={cx('link')} />
                    <div style={{ width: 16 }} />
                    <DownArrowIcon className={cx('link')} />
                </div>
            </div>
            <div className={cx("value")}>
                <span className={cx("amount")}>{amount} </span>
                <span className={cx("type")}>{type}</span>
            </div>
        </div>
    );
};

const Allowance = ({ label, onClick, owner, setOwner, spender, setSpender, onClickCopy }) => {
    return (
        <div className={cx("items")} >
            <div className={cx("header")} >
                <div className={cx("label")}>{label}</div>
                <div className={cx("icon")}>
                    <div onClick={() => onClickCopy(label)}><CopyVerifiedIcon /></div>
                    <div style={{ width: 16 }} />
                    <div><DownArrowIcon /></div>
                </div>
            </div>
            <div className={cx("value")}>
                <div className={cx("label-contract")}>owner (address)</div>
                <div className={cx("input")}>
                    <input type='text' className={cx("text-field")} placeholder={''} value={owner} readOnly={false} onChange={setOwner} />
                </div>
                <div className={cx("label-contract")}>spender (address)</div>
                <div className={cx("input")}>
                    <input type='text' className={cx("text-field")} placeholder={''} value={spender} readOnly={false} onChange={setSpender} />
                </div>
                <div className={cx("btn")}>
                    <Button variant='contained' onClick={onClick}>
                        Query
                    </Button>
                </div>

                <div className={cx("vector")}>
                    <VectorIcon />
                    <span className={cx("type")}>uint256</span>
                </div>
            </div>
        </div>
    )
}

const ReadContract = memo(() => {
    const dispatch = useDispatch();
    const onClickCopy = (msg) => {
        copy(JSON.stringify(msg))
        dispatch(
            showAlert({
                show: true,
                message: "Copied",
                autoHideDuration: 1500,
            })
        );
    }
    return (
        <div className={cx("readcontract")}>
            <HeaderContract label={"Read Contract Infomation"} />
            <div style={{ height: 16 }} />
            <ItemContract onClickCopy={onClickCopy} label={"1.  _maxTxAmount"} type={"uint256"} amount={"10000000000000"} />
            <ItemContract onClickCopy={onClickCopy} label={"2.  _maxWalletSize"} type={"uint256"} amount={"10000000000000"} />
            <Allowance onClickCopy={onClickCopy} label={"3.  allowance"} onClick={undefined} owner={undefined} setOwner={undefined} spender={undefined} setSpender={undefined} />
        </div>
    );
});

export default ReadContract;
