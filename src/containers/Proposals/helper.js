import { LIMIT_PROPOSAL } from "./constant";
import { calculateTallyProposal } from "src/helpers/helper";
import { queryStation } from "src/lib/queryStation";
import { PROPOSAL_STATUS } from "./constant";

export const handleListProposal = async ({ total, bondTotal }) => {
	try {
		let listProposalData = [];
		if (!total) {
			return { list: listProposalData, type: "changeProposal" };
		}

		let paginationKey;
		do {
			const p = await getDataProposal({ paginationKey, limit: LIMIT_PROPOSAL, bondTotal, isFlag: true });
			listProposalData = [...listProposalData, ...p.list];
			paginationKey = p.pagination?.nextKey;
		} while (paginationKey?.length && listProposalData.length < total);

		return {
			list: listProposalData,
			type: "changeProposal",
		};

	} catch (error) {
		console.log({ error });
	}
};

export const getDataProposal = async ({ paginationKey = undefined, limit = LIMIT_PROPOSAL, isFlag = false, bondTotal }) => {
	const { proposals, pagination } = await queryStation.proposalList(-1, "", "", paginationKey, limit);
	let list = [];
	if (isFlag) {
		for (const proposal of proposals) {
			const status = Object.keys(PROPOSAL_STATUS)[Object.values(PROPOSAL_STATUS).indexOf(proposal.status)];
			let finalTally = proposal?.finalTallyResult || {};
			let totalVote = Object.values(finalTally).reduce((acc, cur) => {
				const votes = Number(cur);
				return acc + (Number.isFinite(votes) ? votes : 0);
			}, 0);
			if (status === "PROPOSAL_STATUS_VOTING_PERIOD") {
				const { tally } = await queryStation.tally(proposal.id.toString());
				finalTally = tally || {};
				totalVote = Object.values(finalTally).reduce((acc, cur) => {
					const votes = Number(cur);
					return acc + (Number.isFinite(votes) ? votes : 0);
				}, 0);
			}
			const tallyObj = calculateTallyProposal({ bonded: bondTotal, totalVote, tally: finalTally });
			console.log({
				tallyObj
			});

			list = [
				...list,
				{
					...tallyObj,
					proposal_id: proposal?.id?.toString(),
					status,
					title: proposal.title,
					submit_time: Number(proposal.submitTime.seconds) * 1000,
					voting_end_time: Number(proposal.votingEndTime.seconds) * 1000,
					total_deposit: proposal.totalDeposit.reduce((acc, cur) => acc + parseInt(cur.amount), 0),
					voting_start_time: Number(proposal.votingStartTime.seconds) * 1000,
					deposit_end_time: Number(proposal.depositEndTime.seconds) * 1000,
					type_url: proposal.messages?.[0]?.typeUrl,
					finalTallyResult: finalTally,
				},
			];
		}
	}
	return { list, pagination, proposals };
};
