import React, { memo, useState } from "react";
import classNames from "classnames/bind";
import styles from "./WriteContract.module.scss";
import HeaderContract from "../HeaderContract";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { HandleItemContract } from '../ComponentContract';
import { onExecute } from '../ContractInteraction';
import copy from "copy-to-clipboard";
import { showAlert } from "src/store/modules/global";
import { useHistory } from "src/hooks";

const cx = classNames.bind(styles);

const WriteContract = memo(({ data }) => {
    const { address } = useSelector(state => state.wallet);
    const history = useHistory();
    const [activeTab, setActiveTab] = useState(true);
    const activeThemeId = useSelector(state => state.activeThemeId);
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
            <HeaderContract icon={<></>} onClickLink={() => address && history.push(`/account/${address}`)} label={address ? "Connect to web3" : "Connect to wallet"} activeTab={activeTab} setActiveTab={setActiveTab} />
            <div style={{ height: 16 }} />
            <HandleItemContract activeThemeId={activeThemeId} handleText='Execute' setActiveTab={setActiveTab} activeTab={activeTab} onClickCopy={onClickCopy} contractAddress={data?.contract_address} schema={data?.schema?.execute} onHandle={onExecute} />
        </div>
    );
});

export default WriteContract;
