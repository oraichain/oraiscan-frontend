// @ts-nocheck
import Cosmos from "@oraichain/cosmosjs";
import config from "src/config.js";
import { network } from "src/lib/config/networks";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { stringToPath } from "@cosmjs/crypto";
import CosmosMessages from "@oraichain/cosmos-messages";
import typeSend from "src/constants/typeSend";
import consts from "src/constants/consts";

export const broadcastModeObj = {
    BROADCAST_MODE_BLOCK: "BROADCAST_MODE_BLOCK",
    BROADCAST_MODE_ASYNC: "BROADCAST_MODE_ASYNC",
    BROADCAST_MODE_SYNC: "BROADCAST_MODE_SYNC",
    BROADCAST_MODE_UNSPECIFIED: "BROADCAST_MODE_UNSPECIFIED",
};

export default class WalletStation {
    constructor() {
        const cosmos = new Cosmos(network.lcd, network.chainId);
        cosmos.setBech32MainPrefix(consts.DENOM);
        this.cosmos = cosmos;
    }

    constructTxBody = async (messages) => {
        const block = await this.cosmos.get('/blocks/latest');
        const timeoutHeight = parseInt(block.block.header.height) + consts.NUM.TX_TIMEOUT_HEIGHT;
        return this.cosmos.constructTxBody({ messages, timeout_height: timeoutHeight });
    }

    broadcastMsg = async (wallet, txBody, broadcastMode, fees) => {
        try {
            return this.cosmos.submit(wallet, txBody, broadcastMode, fees, 10000000);
        } catch (ex) {
            console.log(ex);
            throw ex;
        }
    }

    collectWallet = async () => {
        const keplr = await window.Keplr.getKeplr();
        if (!keplr) {
            throw consts.INSTALL_KEPLR_FIRST;
        }
        return await keplr.getOfflineSignerAuto(this.cosmos.chainId);
    };

    sendCoin = async (args, broadcastMode = broadcastModeObj.BROADCAST_MODE_BLOCK) => {
        const { type = typeSend.SEND, totalAmount, fromAddress, toAddress, arr_send, msg } = args;
        const wallet = await this.collectWallet();
        const amount = [{ denom: this.cosmos.bech32MainPrefix, amount: totalAmount?.toString() }];
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
        const txBody = await this.constructTxBody([message]);
        return this.broadcastMsg(wallet, txBody, broadcastMode);
    };

    delegate = async (delegator_address, validator_address, amount, broadcastMode = broadcastModeObj.BROADCAST_MODE_BLOCK) => {
        const wallet = await this.collectWallet();
        const message = CosmosMessages.getMsgDelegate(delegator_address, validator_address, { denom: this.cosmos.bech32MainPrefix, amount: amount.toString() });
        return this.broadcastMsg(wallet, await this.constructTxBody([message]), broadcastMode);
    }

    undelegate = async (delegator_address, validator_address, amount, broadcastMode = broadcastModeObj.BROADCAST_MODE_BLOCK) => {
        const wallet = await this.collectWallet();
        const message = CosmosMessages.getMsgUndelegate(delegator_address, validator_address, { denom: this.cosmos.bech32MainPrefix, amount: amount.toString() });
        return this.broadcastMsg(wallet, await this.constructTxBody([message]), broadcastMode);
    }

    redelegate = async (delegator_address, validator_src_address, validator_dst_address, amount, broadcastMode = broadcastModeObj.BROADCAST_MODE_BLOCK) => {
        const wallet = await this.collectWallet();
        const message = CosmosMessages.getMsgReDelegate(delegator_address, validator_src_address, validator_dst_address, { denom: this.cosmos.bech32MainPrefix, amount: amount.toString() });
        return this.broadcastMsg(wallet, await this.constructTxBody([message]), broadcastMode);
    }

    withdrawCommission = async (validator_address, broadcastMode = broadcastModeObj.BROADCAST_MODE_BLOCK) => {
        const wallet = await this.collectWallet();
        const message = CosmosMessages.getMsgWithdrawValidatorCommission(validator_address);
        return this.broadcastMsg(wallet, await this.constructTxBody([message]), broadcastMode);
    }

    createValidator = async (msg, broadcastMode = broadcastModeObj.BROADCAST_MODE_BLOCK) => {
        const wallet = await this.collectWallet();
        const message = CosmosMessages.getMsgCreateValidator(msg.description, msg.commission, msg.delegator_address, msg.min_self_delegation, msg.pubkey, msg.validator_address, msg.value);
        return this.broadcastMsg(wallet, await this.constructTxBody([message]), broadcastMode);
    }

    deposit = async (proposalId, depositor, amount, broadcastMode = broadcastModeObj.BROADCAST_MODE_BLOCK) => {
        const wallet = await this.collectWallet();
        const message = CosmosMessages.getMsgDepositProposal(proposalId, depositor, amount);
        return this.broadcastMsg(wallet, await this.constructTxBody([message]), broadcastMode);
    }

    vote = async (proposalId, voter, option, broadcastMode = broadcastModeObj.BROADCAST_MODE_BLOCK) => {
        const wallet = await this.collectWallet();
        const message = CosmosMessages.getMsgVoteProposal(proposalId, voter, option);
        return this.broadcastMsg(wallet, await this.constructTxBody([message]), broadcastMode);
    }

    withdrawDelegatorReward = async (msgs, broadcastMode = broadcastModeObj.BROADCAST_MODE_BLOCK) => {
        const wallet = await this.collectWallet();
        let messages = [];
        for (let msg of msgs) {
            messages.push(CosmosMessages.getMsgWithdrawDelegatorReward(msg.delegator_address, msg.validator_address));
        }
        return this.broadcastMsg(wallet, this.cosmos.constructTxBody({ messages }), broadcastMode);
    }

    executeContract = async (contract, msg, sender, sentFunds, broadcastMode = broadcastModeObj.BROADCAST_MODE_BLOCK) => {
        const wallet = await this.collectWallet();
        const message = CosmosMessages.getMsgExecuteContract(contract, msg, sender, sentFunds);
        return this.broadcastMsg(wallet, await this.constructTxBody([message]), broadcastMode);
    }

    parameterChangeProposal = async (proposer, amount, change_info, broadcastMode = broadcastModeObj.BROADCAST_MODE_BLOCK) => {
        const wallet = await this.collectWallet();
        const initial_deposit = [{ denom: this.cosmos.bech32MainPrefix, amount: amount }]
        const message = CosmosMessages.getMsgParameterChangeProposal(proposer, initial_deposit, change_info);
        return this.broadcastMsg(wallet, await this.constructTxBody([message]), broadcastMode);
    }

    randomnessContract = async (contract, msg, sender, broadcastMode = broadcastModeObj.BROADCAST_MODE_BLOCK) => {
        const wallet = await this.collectWallet();
        const message = CosmosMessages.getMsgExecuteContract(contract, msg, sender);
        return this.broadcastMsg(wallet, await this.constructTxBody([message]), broadcastMode);
    }
}

export const walletStation = new WalletStation();
