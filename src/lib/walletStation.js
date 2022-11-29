// @ts-nocheck
import { network } from "src/lib/config/networks";
import typeSign from "src/constants/typeSend";
import consts from "src/constants/consts";
import { GasPrice, AminoTypes } from "@cosmjs/stargate";
import { Decimal } from '@cosmjs/math';
import * as cosmwasm from '@cosmjs/cosmwasm-stargate';
import { MsgWithdrawValidatorCommission, MsgWithdrawDelegatorReward } from 'cosmjs-types/cosmos/distribution/v1beta1/tx';
import { MsgDelegate, MsgBeginRedelegate, MsgUndelegate, MsgCreateValidator } from 'cosmjs-types/cosmos/staking/v1beta1/tx';
import { MsgDeposit, MsgSubmitProposal, MsgVote } from 'cosmjs-types/cosmos/gov/v1beta1/tx';
import { MsgMultiSend } from 'cosmjs-types/cosmos/bank/v1beta1/tx'
import { Any } from "cosmjs-types/google/protobuf/any";
import { MsgExecuteContract } from "cosmjs-types/cosmwasm/wasm/v1/tx";
import { UpdateAdminProposal } from "cosmjs-types/cosmwasm/wasm/v1/proposal";
import { TextProposal } from "cosmjs-types/cosmos/gov/v1beta1/gov";
import { ParameterChangeProposal } from 'cosmjs-types/cosmos/params/v1beta1/params';
import { createStakingAminoConverters } from '@cosmjs/stargate/build/modules/staking/aminomessages';
import { createDistributionAminoConverters } from '@cosmjs/stargate/build/modules/distribution/aminomessages';

export const broadcastModeObj = {
    BROADCAST_MODE_BLOCK: "BROADCAST_MODE_BLOCK",
    BROADCAST_MODE_ASYNC: "BROADCAST_MODE_ASYNC",
    BROADCAST_MODE_SYNC: "BROADCAST_MODE_SYNC",
    BROADCAST_MODE_UNSPECIFIED: "BROADCAST_MODE_UNSPECIFIED",
};

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
        const aminoTypes = new AminoTypes({
            ...createStakingAminoConverters(),
            ...createDistributionAminoConverters()
        });
        return await cosmwasm.SigningCosmWasmClient.connectWithSigner(network.rpc, wallet, {
            gasPrice: new GasPrice(Decimal.fromUserInput('0', 6), network.denom),
            prefix: network.denom,
            aminoTypes
        });
    };

    signAndBroadCast = async (address, messages, gas = 'auto') => {
        try {
            const wallet = await this.collectWallet();
            const client = await this.signerClient(wallet);
            console.log({ messages });
            return await client.signAndBroadcast(address, messages, gas);
        } catch (ex) {
            console.log("signAndBroadcast msg error: ", ex);
            throw ex;
        }
    };

    signBroadcast = async (props) => {
        const wallet = await this.collectWallet();
        const client = await this.signerClient(wallet);
        const { fromAddress, toAddress, contractAddress, msg, type = typeSign.SEND, gas = 'auto', delegator_address, validator_address, amount } = props
        try {
            switch (type) {
                case typeSign.SEND:
                    return await client.sendTokens(fromAddress, toAddress, [msg], gas)
                case typeSign.MULTISEND:
                    return await client.signAndBroadcast(fromAddress, [msg], gas);
                case typeSign.CW20:
                    return await client.execute(fromAddress, contractAddress, msg, gas);
                case typeSign.DELEGATETOKENS:
                    return await client.delegateTokens(delegator_address, validator_address, amount, gas);
                case typeSign.UNDELEGATETOKENS:
                    return await client.undelegateTokens(delegator_address, validator_address, amount, gas);
                case typeSign.WITHDRAWREWARDS:
                    return await client.withdrawRewards(delegator_address, validator_address, gas);
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
            value: MsgMultiSend.fromPartial({
                inputs: [
                    {
                        address: fromAddress,
                        coins: [{ denom: consts.DENOM, amount: totalAmount?.toString() }],
                    },
                ],
                outputs: arr_send,
            })
        };
        return this.signBroadcast({ ...payload, msg: message });
    };

    delegate = async (delegator_address, validator_address, amount) => {
        const key = await window.Keplr.getKeplrKey(network.chainId);
        if (!key.isNanoLedger) return this.signBroadcast({ delegator_address, validator_address, amount, type: typeSign.DELEGATETOKENS });
        const messages = {
            typeUrl: "/cosmos.staking.v1beta1.MsgDelegate",
            value: {
                delegatorAddress: delegator_address,
                validatorAddress: validator_address,
                amount
            }
        };
        return this.signAndBroadCast(delegator_address, [messages]);
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
                value: MsgWithdrawDelegatorReward.fromPartial({
                    delegatorAddress: msg.delegator_address,
                    validatorAddress: msg.validator_address,
                })
            });
        }
        return this.signAndBroadCast(msgs?.[0]?.delegator_address, messages);
    }

    redelegate = async (delegator_address, validator_src_address, validator_dst_address, amount) => {
        const message = {
            typeUrl: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
            value: MsgBeginRedelegate.fromPartial({
                delegatorAddress: delegator_address,
                validatorSrcAddress: validator_src_address,
                validatorDstAddress: validator_dst_address,
                amount
            })
        }
        return this.signAndBroadCast(delegator_address, [message]);
    };

    withdrawCommission = async (validator_address, address) => {
        const message = {
            typeUrl: "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission",
            value: MsgWithdrawValidatorCommission.fromPartial({
                validatorAddress: validator_address
            })
        }
        return this.signAndBroadCast(address, [message]);
    };

    createValidator = async (msg) => {
        const message = {
            typeUrl: '/cosmos.staking.v1beta1.MsgCreateValidator',
            value: MsgCreateValidator.fromPartial({
                description: msg.description,
                commission: msg.commission,
                delegatorAddress: msg.delegator_address,
                minSelfDelegation: msg.min_self_delegation,
                pubkey: msg.pubkey,
                validatorAddress: msg.validatorAddress,
                value: msg.value,
            })
        }
        return this.signAndBroadCast(msg.delegator_address, [message]);
    }

    deposit = async (proposalId, depositor, amount) => {
        const message = {
            typeUrl: '/cosmos.gov.v1beta1.MsgDeposit',
            value: MsgDeposit.fromPartial({
                proposalId: Number(proposalId), depositor: depositor, amount
            })
        }
        return this.signAndBroadCast(proposalId, [message]);
    }

    vote = async (proposalId, voter, option) => {
        const message = {
            typeUrl: '/cosmos.gov.v1beta1.MsgVote',
            value: MsgVote.fromPartial({
                proposalId,
                voter: voter,
                option
            })
        }
        return this.signAndBroadCast(proposalId, [message]);
    }

    executeContract = async (contract, msg, sender, funds) => {
        const message = {
            typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
            value: MsgExecuteContract.fromPartial({
                contract,
                msg: Buffer.from(msg),
                sender,
                funds,
            })
        }
        return this.signAndBroadCast(sender, [message]);
    }

    parameterChangeProposal = async (proposer, amount, change_info) => {
        const initial_deposit = [{ denom: consts.DENOM, amount: amount.toString() }]
        const message = {
            typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
            value: {
                content: Any.fromPartial({
                    typeUrl: "/cosmos.params.v1beta1.ParameterChangeProposal",
                    value: ParameterChangeProposal.encode(change_info).finish()
                }),
                proposer: proposer,
                initialDeposit: initial_deposit,
            }
        }
        return this.signAndBroadCast(proposer, [message]);
    }

    updateAdminProposal = async (proposer, amount, change_info) => {
        const initial_deposit = [{ denom: consts.DENOM, amount: amount.toString() }]
        const message = {
            typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
            value: MsgSubmitProposal.fromPartial({
                content: Any.fromPartial({
                    typeUrl: "/cosmwasm.wasm.v1.UpdateAdminProposal",
                    value: UpdateAdminProposal.encode(change_info).finish()
                }),
                proposer: proposer,
                initialDeposit: initial_deposit,
            })
        }
        return this.signAndBroadCast(proposer, [message]);
    }

    textProposal = async (proposer, amount, change_info,) => {
        const initial_deposit = [{ denom: consts.DENOM, amount: amount.toString() }]
        const message = {
            typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
            value: {
                content: Any.fromPartial({
                    typeUrl: "/cosmos.gov.v1beta1.TextProposal",
                    value: TextProposal.encode(change_info).finish()
                }),
                proposer: proposer,
                initialDeposit: initial_deposit,
            }
        }
        console.log("message: ", message)
        return this.signAndBroadCast(proposer, [message]);
    }

    randomnessContract = async (contract, msg, sender) => {
        const message = {
            typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
            value: MsgExecuteContract.fromPartial({
                contract,
                msg: Buffer.from(msg),
                sender,
                // funds, 
            })
        }
        return this.signAndBroadCast(sender, [message]);
    }
}

export const walletStation = new WalletStation();
