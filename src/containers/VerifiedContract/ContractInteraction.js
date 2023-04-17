import { processMsgInput } from "src/helpers/contract";
import { network } from "src/lib/config/networks";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { notification } from "antd";

export const onQuery = async (msg, contract_address, setLoading) => {
    try {
        setLoading(true);
        const input = await processMsgInput(msg);
        const wallet = await window.keplr.getOfflineSignerAuto(network.chainId);

        const client = await SigningCosmWasmClient.connectWithSigner(network.rpc, wallet, {
            prefix: network.prefix,
        });

        const ret = await client.queryContractSmart(contract_address, input);
        notification.success({ message: `${JSON.stringify(ret)}`, });
        setLoading(false);
    } catch (ex) {
        notification.error({ message: `${JSON.stringify(ex)}`, });
        setLoading(false);
        console.log("onQuery msg error: ", ex);
    }
};

export const onExecute = async (msg, contract_address, setLoading) => {
    try {
        setLoading(true);
        const input = await processMsgInput(msg);
        const wallet = await window.keplr.getOfflineSignerAuto(network.chainId);
        const accounts = await wallet.getAccounts();
        const client = await SigningCosmWasmClient.connectWithSigner(network.rpc, wallet, {
            prefix: network.prefix,
            gasPrice: "0.001orai",
        });

        const ret = await client.execute(accounts[0].address, contract_address, input, "auto");
        notification.success({ message: `${JSON.stringify(ret)}`, });
        setLoading(false)
    } catch (ex) {
        notification.error({ message: `${JSON.stringify(ex)}`, });
        setLoading(false)
        console.log("onExecute msg error: ", ex);
    }
};