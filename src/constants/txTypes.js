export default Object.freeze({
	//  COSMOS_SDK
	COSMOS_SDK: {
		MSG_CREATE_VALIDATOR: "cosmos-sdk/MsgCreateValidator",
		MSG_DELEGATE: "cosmos-sdk/MsgDelegate",
		MSG_UNDELEGATE: "cosmos-sdk/MsgUndelegate",
		MSG_SEND: "cosmos-sdk/MsgSend",
		MSG_EDIT_VALIDATOR: "cosmos-sdk/MsgEditValidator",
		MSG_BEGIN_REDELEGATE: "cosmos-sdk/MsgBeginRedelegate",
		MSG_WITHDRAW_DELEGATION_REWARD: "cosmos-sdk/MsgWithdrawDelegationReward",
		MSG_WITHDRAW_VALIDATOR_COMMISSION: "cosmos-sdk/MsgWithdrawValidatorCommission",
		SEND: "cosmos-sdk/Send",
		MSG_SUBMIT_PROPOSAL: "cosmos-sdk/MsgSubmitProposal",
		MSG_DEPOSIT: "cosmos-sdk/MsgDeposit",
		MSG_VOTE: "cosmos-sdk/MsgVote",
		MSG_REMOVE_VALIDATOR: "cosmos-sdk/MsgRemoveValidator",
		MSG_CREATE_VALIDATOR_PROPOSAL: "cosmos-sdk/MsgCreateValidatorProposal",
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
	AIRESULT: {},
});
