import { LIMIT_PROPOSAL } from "./constant";
import { calculateTallyProposal } from "src/helpers/helper";
import { queryStation } from "src/lib/queryStation";
import { PROPOSAL_STATUS } from "./constant";
import { TextProposal } from "cosmjs-types/cosmos/gov/v1beta1/gov";

export const handleListProposal = async ({ total, proposals, bondTotal, isNullProposal }) => {
	try {
		if (!proposals.length || isNullProposal || total === proposals.length) {
			let listProposalData = [];
			for (let i = 0; i < Math.ceil(total / LIMIT_PROPOSAL); i++) {
				const p = await getDataProposal({ offset: i * LIMIT_PROPOSAL, bondTotal, isFlag: true });
				listProposalData = [...listProposalData, ...p.list];
			}
			return {
				list: listProposalData,
				type: "changeProposal",
			};
		}

		if (total > proposals.length) {
			const limit = total - proposals.length;
			if (limit && limit > LIMIT_PROPOSAL) {
				let listProposalData = [];
				for (let i = 0; i < Math.ceil(limit / LIMIT_PROPOSAL); i++) {
					let limitProposal = i * LIMIT_PROPOSAL;
					if (i + 1 == Math.ceil(limit / LIMIT_PROPOSAL)) {
						limitProposal = limit - i * LIMIT_PROPOSAL;
					}
					const p = await getDataProposal({ offset: limitProposal, isFlag: true, bondTotal });
					listProposalData = [...listProposalData, ...p.list];
				}
				return {
					list: listProposalData,
					type: "updateProposal",
				};
			}
			if (limit && limit < LIMIT_PROPOSAL) {
				const p = await getDataProposal({ limit, isFlag: true, bondTotal });
				return {
					list: [...p.list],
					type: "updateProposal",
				};
			}
		}

	} catch (error) {
		console.log({ error });
	}
};

export const getDataProposal = async ({ offset = 0, limit = undefined, isFlag = false, bondTotal }) => {
	const { proposals, pagination } = await queryStation.proposalList(-1, "", "", undefined, offset, limit);
	let list = [];
	if (isFlag) {
		for (const proposal of proposals) {
			const value = TextProposal.decode(proposal?.content?.value);
			const status = Object.keys(PROPOSAL_STATUS)[Object.values(PROPOSAL_STATUS).indexOf(proposal.status)];
			let totalVote = Object.values(proposal?.finalTallyResult).reduce((acc, cur) => acc + parseInt(cur), 0);
			let finalTally = proposal?.finalTallyResult;
			if (status === "PROPOSAL_STATUS_VOTING_PERIOD") {
				const { tally } = await queryStation.tally(proposal.proposalId);
				totalVote = Object.values(tally).reduce((acc, cur) => acc + parseInt(cur), 0);
				finalTally = tally;
			}
			const tallyObj = calculateTallyProposal({ bonded: bondTotal, totalVote, tally: finalTally });
			list = [
				...list,
				{
					...tallyObj,
					proposal_id: proposal?.proposalId?.toString(),
					status,
					title: value?.title,
					submit_time: proposal.submitTime.seconds.toNumber() * 1000,
					voting_end_time: proposal.votingEndTime.seconds.toNumber() * 1000,
					total_deposit: proposal.totalDeposit.reduce((acc, cur) => acc + parseInt(cur.amount), 0),
					voting_start_time: proposal.votingStartTime.seconds.toNumber() * 1000,
					deposit_end_time: proposal.depositEndTime.seconds.toNumber() * 1000,
					type_url: proposal.content.typeUrl,
					finalTallyResult: finalTally,
				},
			];
		}
	}
	return { list, pagination, proposals };
};
