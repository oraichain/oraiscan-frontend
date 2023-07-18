// @ts-nocheck
import { network } from "src/lib/config/networks";
import { QueryClient, setupGovExtension } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import * as cosmwasm from "@cosmjs/cosmwasm-stargate";

export default class QueryStation {
	constructor() {}
	queryClientTendermint = async () => {
		const tendermint = await Tendermint34Client.connect(network.rpc);
		// const tendermint = await Tendermint34Client.connect("http://3.134.19.98:26657");
		const queryClient = QueryClient.withExtensions(tendermint, setupGovExtension);
		return queryClient;
	};

	queryClient = async () => {
		const client = await cosmwasm.CosmWasmClient.connect(network.rpc);
		// const client = await cosmwasm.CosmWasmClient.connect("http://3.134.19.98:26657");
		return client;
	};

	proposalId = async proposalId => {
		try {
			const queryClient = await this.queryClientTendermint();
			return await queryClient.gov.proposal(proposalId);
		} catch (ex) {
			console.log("proposalId msg error: ", ex);
			throw ex;
		}
	};

	deposits = async (proposalId, paginationKey = undefined) => {
		try {
			const queryClient = await this.queryClientTendermint();
			return await queryClient.gov.deposits(proposalId, paginationKey);
		} catch (ex) {
			console.log("proposalId msg error: ", ex);
			throw ex;
		}
	};

	tally = async proposalId => {
		try {
			const queryClient = await this.queryClientTendermint();
			return await queryClient.gov.tally(proposalId);
		} catch (ex) {
			console.log("proposalId msg error: ", ex);
			throw ex;
		}
	};

	proposalList = async (proposalStatus, depositor = "", voter = "", paginationKey = undefined, offset, limit) => {
		try {
			const queryClient = await this.queryClientTendermint();
			return await queryClient.gov.proposals(proposalStatus, depositor, voter, paginationKey, offset, limit);
		} catch (ex) {
			console.log("proposalId msg error: ", ex);
			throw ex;
		}
	};

	votes = async (proposalId, paginationKey = undefined) => {
		try {
			const queryClient = await this.queryClientTendermint();
			return await queryClient.gov.votes(proposalId, paginationKey);
		} catch (ex) {
			console.log("proposalId msg error: ", ex);
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
