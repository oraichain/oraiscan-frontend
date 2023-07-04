// @ts-nocheck
import { network } from "src/lib/config/networks";
import { QueryClient, setupGovExtension } from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";

export const broadcastModeObj = {
	BROADCAST_MODE_BLOCK: "BROADCAST_MODE_BLOCK",
	BROADCAST_MODE_ASYNC: "BROADCAST_MODE_ASYNC",
	BROADCAST_MODE_SYNC: "BROADCAST_MODE_SYNC",
	BROADCAST_MODE_UNSPECIFIED: "BROADCAST_MODE_UNSPECIFIED",
};

export default class QueryStation {
	constructor() {}
	queryClientTendermint = async () => {
		const tendermint = await Tendermint34Client.connect(network.rpc);
		const queryClient = QueryClient.withExtensions(tendermint, setupGovExtension);
		return queryClient;
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

	proposalList = async (proposalStatus, depositor = "", voter = "", paginationKey) => {
		try {
			const queryClient = await this.queryClientTendermint();
			return await queryClient.gov.proposals(proposalStatus, depositor, voter);
		} catch (ex) {
			console.log("proposalId msg error: ", ex);
			throw ex;
		}
	};
}

export const queryStation = new QueryStation();
