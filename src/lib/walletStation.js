// @ts-nocheck
import { network } from "src/lib/config/networks";
import typeSign from "src/constants/typeSend";
import consts from "src/constants/consts";
import { GasPrice } from "@cosmjs/stargate";
import { Decimal } from '@cosmjs/math';
import * as cosmwasm from '@cosmjs/cosmwasm-stargate';

export const broadcastModeObj = {
    BROADCAST_MODE_BLOCK: "BROADCAST_MODE_BLOCK",
    BROADCAST_MODE_ASYNC: "BROADCAST_MODE_ASYNC",
    BROADCAST_MODE_SYNC: "BROADCAST_MODE_SYNC",
    BROADCAST_MODE_UNSPECIFIED: "BROADCAST_MODE_UNSPECIFIED",
};

export const gasDefault = { gas: "200000", amount: '0' }

export default class WalletStation {
    constructor() { }
    collectWallet = async () => {
        const keplr = await window.Keplr.getKeplr();
        if (!keplr) {
            throw consts.INSTALL_KEPLR_FIRST;
        }
        return await keplr.getOfflineSignerAuto(network.chainId);
    };

    signerClient = async (wallet) => {
        return await cosmwasm.SigningCosmWasmClient.connectWithSigner(network.rpc, wallet, {
            gasPrice: new GasPrice(Decimal.fromUserInput('0', 6), network.denom),
            prefix: network.denom,
            gasLimits: { exec: 10000000 },
        });
    };

    signAndBroadCast = async (address, messages) => {
        try {
            const wallet = await this.collectWallet();
            const client = await this.signerClient(wallet);
            return await client.signAndBroadcast(address, messages, gasDefault);
        } catch (ex) {
            console.log("signAndBroadcast msg error: ", ex);
            throw ex;
        }
    };

    signBroadcast = async (props) => {
        const wallet = await this.collectWallet();
        const client = await this.signerClient(wallet);
        const { fromAddress, toAddress, contractAddress, msg, type = typeSign.SEND, gas = gasDefault, delegator_address, validator_address, amount } = props
        try {
            switch (type) {
                case typeSign.SEND:
                    return await client.sendTokens(fromAddress, toAddress, [msg], gas)
                case typeSign.MULTISEND:
                    return await client.signAndBroadcast(fromAddress, [msg], gas);
                case typeSign.CW20:
                    return await client.execute(fromAddress, contractAddress, msg, gas);
                case typeSign.DELEGATETOKENS:
                    return await client.delegateTokens(delegator_address, validator_address, amount);
                case typeSign.UNDELEGATETOKENS:
                    return await client.undelegateTokens(delegator_address, validator_address, amount);
                case typeSign.WITHDRAWREWARDS:
                    return await client.withdrawRewards(delegator_address, validator_address);
            }
        } catch (ex) {
            console.log("signBroadcast msg error: ", ex);
            throw ex;
        }
    };

    sendCoin = async (payload) => {
        if (payload.type !== typeSign.MULTISEND) return this.signBroadcast(payload);
        const { arr_send, fromAddress, totalAmount } = payload;
        const message = {
            typeUrl: "/cosmos.bank.v1beta1.MsgMultiSend",
            value: {
                inputs: [
                    {
                        address: fromAddress,
                        coins: [{ denom: consts.DENOM, amount: totalAmount?.toString() }],
                    },
                ],
                outputs: arr_send,
            }
        };
        return this.signBroadcast({ ...payload, msg: message });
    };

    delegate = async (delegator_address, validator_address, amount) => {
        return this.signBroadcast({ delegator_address, validator_address, amount, type: typeSign.DELEGATETOKENS });
    };

    undelegate = async (delegator_address, validator_address, amount) => {
        return this.signBroadcast({ delegator_address, validator_address, amount, type: typeSign.UNDELEGATETOKENS });
    };

    withdrawDelegatorReward = async (msgs) => {
        if (!Array.isArray(msgs)) return this.signBroadcast({ delegator_address: msgs?.delegator_address, validator_address: msgs?.validator_address, type: typeSign.WITHDRAWREWARDS });
        let messages = [];
        for (let msg of msgs) {
            messages.push({
                typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
                value: {
                    delegatorAddress: msg.delegator_address,
                    validatorAddress: msg.validator_address,
                }
            });
        }
        return this.signAndBroadCast(msgs?.[0]?.delegator_address, messages);
    }

    redelegate = async (delegator_address, validator_src_address, validator_dst_address, amount) => {
        const message = {
            typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
            value: {
                delegatorAddress: delegator_address,
                validatorSrcAddress: validator_src_address,
                validatorDstAddress: validator_dst_address,
                amount
            }
        }
        return this.signAndBroadCast(delegator_address, [message]);
    };

    withdrawCommission = async (validator_address) => {
        const message = {
            type_url: "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission",
            value: {
                validatorAddress: validator_address
            }
        }
        return this.signAndBroadCast(validator_address, [message]);
    };

    createValidator = async (msg) => {
        const message = {
            type_url: '/cosmos.staking.v1beta1.MsgCreateValidator',
            value: {
                description: msg.description,
                commission: msg.commission,
                delegatorAddress: msg.delegator_address,
                minSelfDelegation: msg.min_self_delegation,
                pubkey: msg.pubkey,
                validatorAddress: msg.validatorAddress,
                value: msg.value,
            }
        }
        return this.signAndBroadCast(msg.delegator_address, [message]);
    }

    deposit = async (proposalId, depositor, amount) => {
        const message = {
            type_url: '/cosmos.gov.v1beta1.MsgDeposit',
            value: {
                proposalId: Number(proposalId), depositor: depositor, amount
            }
        }
        return this.signAndBroadCast(proposalId, [message]);
    }

    vote = async (proposalId, voter, option) => {
        const message = {
            type_url: '/cosmos.gov.v1beta1.MsgDeposit',
            value: {
                proposalId,
                voter: voter,
                option
            }
        }
        return this.signAndBroadCast(proposalId, [message]);
    }

    executeContract = async (contract, msg, sender, sentFunds) => {
        const message = {
            type_url: '/cosmwasm.wasm.v1beta1.MsgExecuteContract',
            value: {
                contract,
                msg: Buffer.from(msg),
                sender,
                sentFunds,
            }
        }
        return this.signAndBroadCast(sender, message);
    }

    parameterChangeProposal = async (proposer, amount, change_info) => {
        const initial_deposit = [{ denom: consts.DENOM, amount: amount.toString() }]
        const message = {
            type_url: "/cosmos.gov.v1beta1.MsgSubmitProposal",
            value: {
                content: {
                    type_url: "/cosmos.params.v1beta1.ParameterChangeProposal",
                    value: {
                        ...change_info
                    }
                },
                proposer: proposer,
                initialDeposit: initial_deposit,
            }
        }
        return this.signAndBroadCast(proposer, message);
    }

    textProposal = async (proposer, amount, change_info,) => {
        const initial_deposit = [{ denom: consts.DENOM, amount: amount.toString() }]
        const message = {
            type_url: "/cosmos.gov.v1beta1.MsgSubmitProposal",
            value: {
                content: {
                    type_url: "/cosmos.gov.v1beta1.TextProposal",
                    value: {
                        ...change_info
                    }
                },
                proposer: proposer,
                initialDeposit: initial_deposit,
            }
        }
        return this.signBroadcast(proposer, message);
    }

    randomnessContract = async (contract, msg, sender) => {
        const message = {
            type_url: '/cosmwasm.wasm.v1beta1.MsgExecuteContract',
            value: {
                contract,
                msg: Buffer.from(msg),
                sender,
                // sentFunds, 
            }
        }
        return this.signBroadcast(sender, message);
    }
}

export const walletStation = new WalletStation();
