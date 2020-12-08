export default Object.freeze({
	//  COSMOS
	COSMOS: {
		SEND: "cosmos-sdk/Send",
		PROPOSAL_SUBMIT: "cosmos-sdk/MsgSubmitProposal",
		DEPOSIT: "cosmos-sdk/MsgDeposit",
		VOTE: "cosmos-sdk/MsgVote",
		VALIDATOR_CREATE: "cosmos-sdk/MsgCreateValidator",
		VALIDATOR_REMOVE: "cosmos-sdk/MsgRemoveValidator",
		VALIDATOR_PROPOSAL: "cosmos-sdk/MsgCreateValidatorProposal",

		MSG_SEND: "cosmos-sdk/MsgSend",
	},

	//  DEX
	DEX: {
		ORDER_NEW: "dex/NewOrder",
		ORDER_CANCEL: "dex/CancelOrder",
		LIST: "dex/ListMsg",
	},

	//  TOKENS
	TOKENS: {
		ISSUE: "tokens/IssueMsg",
		BURN: "tokens/BurnMsg",
		TIME_LOCK: "tokens/TimeLockMsg",
		FREEZE: "tokens/FreezeMsg",
		UNFREEZE: "tokens/UnfreezeMsg",
		TIME_UNLOCK: "tokens/TimeUnlockMsg",
		TIME_RELOCK: "tokens/TimeRelockMsg",
		HTLT: "tokens/HTLTMsg",
		HTLT_DEPOSIT: "tokens/DepositHTLTMsg",
		HTLT_CLAIM: "tokens/ClaimHTLTMsg",
		HTLT_REFUND: "tokens/RefundHTLTMsg",
		MINT: "tokens/MintMsg",
	},

	//  MISC
	MISC: {
		ACCOUNTFLAG_SET: "scripts/SetAccountFlagsMsg",
	},

	// PROVIDER
	PROVIDER: {
		CREATE_AI_DATA_SOURCE: "provider/CreateAIDataSource",
		EDIT_AI_DATA_SOURCE: "provider/EditAIDataSource",

		CREATE_ORACLE_SCRIPT: "provider/CreateOracleScript",
		EDIT_ORACLE_SCRIPT: "provider/EditOracleScript",

		SET_TESTCASE: "provider/SetTestCase",
	},

	// WEBSOCKET
	WEBSOCKET: {
		ADD_REPORT: "websocket/AddReport",
	},

	// AIREQUEST
	AIREQUEST: {
		SET_CLASSIFICATION_REQUEST: "airequest/SetClassificationRequest",
	},
});
