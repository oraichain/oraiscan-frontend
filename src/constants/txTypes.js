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
		MSG_DELEGATE: "cosmos-sdk/MsgDelegate",
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
		CREATE_TEST_CASE: "provider/SetTestCase",
		EDIT_TEST_CASE: "provider/EditTestCase",
		CREATE_ORACLE_SCRIPT: "provider/CreateOracleScript",
		EDIT_ORACLE_SCRIPT: "provider/EditOracleScript",
	},

	// WEBSOCKET
	WEBSOCKET: {
		ADD_REPORT: "websocket/AddReport",
		ADD_REPORTER: "websocket/AddReporter",
		TEST_CASE_RESULT: "websocket/TestCaseResult",
	},

	// AIREQUEST
	AIREQUEST: {
		SET_CLASSIFICATION_REQUEST: "airequest/SetClassificationRequest",
		SET_PRICE_REQUEST: "airequest/SetPriceRequest",
		SET_OCR_REQUEST: "airequest/SetOCRRequest",
		SET_KYC_REQUEST: "airequest/SetKYCRequest",
	},

	// AIRESULT
	AIRESULT: {

	},
});
