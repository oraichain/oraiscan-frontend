// @ts-nocheck
import { network } from "src/lib/config/networks";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import Long from "long";
import { PageRequest } from "cosmjs-types/cosmos/base/query/v1beta1/pagination";
import { QueryClientImpl as GovQueryClient } from "cosmjs-types/cosmos/gov/v1/query";
import * as cosmwasm from "@cosmjs/cosmwasm-stargate";

export default class QueryStation {
	constructor() {}
	queryClientTendermint = async () => {
		const tendermint = await Tendermint34Client.connect(network.rpc);
		// const tendermint = await Tendermint34Client.connect("http://3.134.19.98:26657");
		return new QueryClient(tendermint);
	};

	govQueryClient = queryClient => new GovQueryClient(createProtobufRpcClient(queryClient));

	queryClient = async () => {
		const client = await cosmwasm.CosmWasmClient.connect(network.rpc);
		// const client = await cosmwasm.CosmWasmClient.connect("http://3.134.19.98:26657");
		return client;
	};

	proposalId = async proposalId => {
		try {
			const queryClient = await this.queryClientTendermint();
			return await this.govQueryClient(queryClient).Proposal({ proposalId: Long.fromValue(proposalId) });
		} catch (ex) {
			console.log("proposalId msg error: ", ex);
			throw ex;
		}
	};

	deposits = async (proposalId, paginationKey = undefined) => {
		try {
			const queryClient = await this.queryClientTendermint();
			return await this.govQueryClient(queryClient).Deposits({
				proposalId: Long.fromValue(proposalId),
				pagination: PageRequest.fromPartial({ key: paginationKey }),
			});
		} catch (ex) {
			console.log("proposalId deposits error: ", ex);
			throw ex;
		}
	};

	tally = async proposalId => {
		try {
			const queryClient = await this.queryClientTendermint();
			return await this.govQueryClient(queryClient).TallyResult({ proposalId: Long.fromValue(proposalId) });
		} catch (ex) {
			console.log("proposalId tally error: ", ex);
			throw ex;
		}
	};

	proposalList = async (proposalStatus, depositor = "", voter = "", paginationKey = undefined, limit = 100) => {
		try {
			const queryClient = await this.queryClientTendermint();
			return await this.govQueryClient(queryClient).Proposals({
				proposalStatus,
				depositor,
				voter,
				pagination: PageRequest.fromPartial({
					key: paginationKey,
					limit,
					countTotal: !paginationKey,
				}),
			});
		} catch (ex) {
			console.log("proposalId proposalList error: ", ex);
			throw ex;
		}
	};

	votes = async (proposalId, paginationKey = undefined) => {
		try {
			const queryClient = await this.queryClientTendermint();
			return await this.govQueryClient(queryClient).Votes({
				proposalId: Long.fromValue(proposalId),
				pagination: PageRequest.fromPartial({ key: paginationKey }),
			});
		} catch (ex) {
			console.log("proposalId votes error: ", ex);
			throw ex;
		}
	};

	searchTx = async queryTx => {
		try {
			const client = await this.queryClient();
			return await client.searchTx(queryTx);
		} catch (ex) {
			console.log("searchTx msg error: ", ex);
			throw ex;
		}
	};
}

export const queryStation = new QueryStation();
