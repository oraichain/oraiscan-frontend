import React, { memo  , useState } from "react";
import classNames from "classnames/bind";
import styles from "./WriteContract.module.scss";
import HeaderContract from "../HeaderContract";
import {  useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Allowance , ReadWriteContract } from '../ComponentContract';
import copy from "copy-to-clipboard";
import { showAlert } from "src/store/modules/global";

const cx = classNames.bind(styles);

const WriteContract = memo(() => {
	const { address } = useSelector(state => state.wallet);
	const [activeTab, setActiveTab] = useState(false);
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
		<div className={cx("write-contract")}>
			<HeaderContract icon={<></>} label={address ? "Connect to web3" : "Connect to wallet"} activeTab={activeTab} setActiveTab={setActiveTab} />
			<div style={{ height: 16 }} />
			<ReadWriteContract  status={activeTab} label={"1.  _maxTxAmount"} type={"uint256"} amount={"10000000000000"} />
			<ReadWriteContract  status={activeTab} label={"2.  _maxWalletSize"} type={"uint256"} amount={"10000000000000"} />
			<Allowance status={activeTab} onClickCopy={onClickCopy} label={"3.  allowance"} onClick={undefined} owner={undefined} setOwner={undefined} spender={undefined} setSpender={undefined} />
		</div>
	);
});

export default WriteContract;
