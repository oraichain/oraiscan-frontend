import consts from "src/constants/consts";

const {
	PROPOSALS_OPTIONS: { UNBONDING_TIME, VOTING_PERIOD, COMMUNITY_TAX, INFLATION_MIN, INFLATION_MAX, TEXT_PROPOSAL, DEPOSIT_PARAMS, UPDATE_ADMIN_PROPOSAL, COMMUNITY_POOL_SPEND_PROPOSAL },
	VOTING_PERIOD_OPTIONS: { VOTING_DAY, VOTING_TIME },
} = consts;

const defaultValues = {
	title: "",
	description: "",
	amount: 10,
	unbondingTime: 3600,
	voting_period_day: 1,
	voting_period_time: "01:00:00",
	min_deposit: 10,
	communitytax: 0,
	InflationMin: 0,
	InflationMax: 0,
	newadmin: "",
	contract: "",
	recipient: "",
	receiveAmount: 10
};


const fields = [
	{
		label: "Unbonding time",
		value: UNBONDING_TIME,
	},
	{
		label: "Voting Period",
		value: VOTING_PERIOD,
	},
	{
		label: "Community Tax",
		value: COMMUNITY_TAX,
	},
	{
		label: "Minimum Inflation",
		value: INFLATION_MIN,
	},
	{
		label: "Maximum Inflation",
		value: INFLATION_MAX,
	},
	{
		label: "Minimum Deposit Amount",
		value: DEPOSIT_PARAMS,
	},
	{
		label: "Text Proposal",
		value: TEXT_PROPOSAL,
	},
	{
		label: "Update Admin Proposal",
		value: UPDATE_ADMIN_PROPOSAL,
	},
	{
		label: "Community Pool Spend Proposal",
		value: COMMUNITY_POOL_SPEND_PROPOSAL,
	},
];

const votingFields = [
	{
		label: "Day",
		value: VOTING_DAY,
	},
	{
		label: "Time",
		value: VOTING_TIME,
	},
];

export {
    defaultValues,
    fields,
    votingFields
}