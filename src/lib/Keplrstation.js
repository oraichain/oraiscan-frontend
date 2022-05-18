// @ts-nocheck
import Cosmos from "@oraichain/cosmosjs";
import config from "src/config.js";
import { network } from "src/lib/config/networks";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { stringToPath } from "@cosmjs/crypto";
import CosmosMessages from "@oraichain/cosmosjs-monorepo";
import typeSend from "src/constants/typeSend";
import consts from "src/constants/consts";
import messagesErrors from 'src/constants/messages';
const cosmos = new Cosmos(config.LCD_API, network.chainId);
cosmos.setBech32MainPrefix(consts.DENOM);

const broadcastModeObj = {
    BROADCAST_MODE_BLOCK: "BROADCAST_MODE_BLOCK",
};

const sendCoin = async (args, broadcastMode = broadcastModeObj.BROADCAST_MODE_BLOCK) => {
    const { mnemonic, type = typeSend.SEND, totalAmount, fromAddress, toAddress, arr_send , msg } = args;
    const wallet = await collectWallet(mnemonic);
    const amount = [{ denom: cosmos.bech32MainPrefix, amount: totalAmount }];
    let message = "";
    switch (type) {
        case typeSend.SEND:
            message = CosmosMessages.getMsgSend(fromAddress, toAddress, amount);
            break;
        case typeSend.MULTISEND:
            message = CosmosMessages.getMsgMultiSend(fromAddress, amount, arr_send);
            break;
        case typeSend.CW20:
            message = CosmosMessages.getMsgExecuteContract(msg?.[0]?.value?.contract, msg?.[0]?.value?.msg, msg?.[0]?.value?.sender);
            break;
        default:
            break;
    }
    const txBody = cosmos.constructTxBody({ messages: [message] });
    try {
        const response = await cosmos.submit(wallet, txBody, broadcastMode, amount);
        return response;
    } catch (ex) {
        console.log(ex);
    }
};

const collectWallet = async mnemonic => {
    const { current } = window.chainStore;
    if (!mnemonic) {
        const keplr = await window.Keplr.getKeplr();
        if (!keplr) {
            throw messagesErrors.INSTALL_KEPLR_FIRST;
        }
        const wallet = keplr.getOfflineSigner(network.chainId);
        return wallet;
    } else {
        const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
            mnemonic,
            stringToPath(current(network.chainId).hdPath ? current(network.chainId).hdPath : consts.HD_PATH.DEFAULT),
            consts.DENOM
        );
        return wallet;
    }
};

export default class Keystation {
    constructor(params) {
        if (!params) {
            return;
        }
        const { lcd, path } = params;
        this.lcd = lcd;
        this.path = path;
    }
    send(args, broadcastMode) {
        return sendCoin(args, broadcastMode);
    }
}

export const keplrStation = new Keystation({
    lcd: config.LCD_API,
    path: consts.HD_PATH.EXAMPLE,
});
