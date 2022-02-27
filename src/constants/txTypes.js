export default Object.freeze({
	//  COSMOS_SDK
	COSMOS_SDK: {
		MSG_CREATE_VALIDATOR: "/cosmos.staking.v1beta1.MsgCreateValidator",
		MSG_DELEGATE: "/cosmos.staking.v1beta1.MsgDelegate",
		MSG_UNDELEGATE: "/cosmos.staking.v1beta1.MsgUndelegate",
		MSG_SEND: "/cosmos.bank.v1beta1.MsgSend",
		MSG_MULTI_SEND: "/cosmos.bank.v1beta1.MsgMultiSend",
		MSG_EDIT_VALIDATOR: "/cosmos.staking.v1beta1.MsgEditValidator",
		MSG_WITHDRAW_DELEGATOR_REWARD: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
		MSG_WITHDRAW_DELEGATION_REWARD: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
		MSG_WITHDRAW_VALIDATOR_COMMISSION: "/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission",
		MSG_SUBMIT_PROPOSAL: "/cosmos.gov.v1beta1.MsgSubmitProposal",
		MSG_DEPOSIT: "/cosmos.gov.v1beta1.MsgDeposit",
		MSG_VOTE: "/cosmos.gov.v1beta1.MsgVote",
		MSG_CREATE_VALIDATOR_PROPOSAL: "/cosmos.staking.v1beta1.MsgCreateValidatorProposal",
		INSTANTIATE_CONTRACT: "/cosmwasm.wasm.v1beta1.MsgInstantiateContract",
		EXECUTE_CONTRACT: "/cosmwasm.wasm.v1beta1.MsgExecuteContract",
		STORE_CODE: "/cosmwasm.wasm.v1beta1.MsgStoreCode",
		MSG_BEGIN_REDELEGATE: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
		MSG_IBC_TRANSFER: "/ibc.applications.transfer.v1.MsgTransfer",
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
		CREATE_AI_DATA_SOURCE: "/oraichain.orai.provider.MsgCreateAIDataSource",
		EDIT_AI_DATA_SOURCE: "/oraichain.orai.provider.MsgEditAIDataSource",
		CREATE_TEST_CASE: "/oraichain.orai.provider.MsgCreateTestCase",
		EDIT_TEST_CASE: "/oraichain.orai.provider.MsgEditTestCase",
		CREATE_ORACLE_SCRIPT: "/oraichain.orai.provider.MsgCreateOracleScript",
		EDIT_ORACLE_SCRIPT: "/oraichain.orai.provider.MsgEditOracleScript",
	},

	// WEBSOCKET
	WEBSOCKET: {
		CREATE_REPORT: "/oraichain.orai.websocket.MsgCreateReport",
		ADD_REPORT: "websocket/AddReport",
		ADD_REPORTER: "websocket/AddReporter",
		TEST_CASE_RESULT: "websocket/TestCaseResult",
	},

	// AIREQUEST
	AIREQUEST: {
		SET_AI_REQUEST: "/oraichain.orai.airequest.MsgSetAIRequest",
		SET_CLASSIFICATION_REQUEST: "airequest/SetClassificationRequest",
		SET_PRICE_REQUEST: "airequest/SetPriceRequest",
		SET_OCR_REQUEST: "airequest/SetOCRRequest",
		SET_KYC_REQUEST: "airequest/SetKYCRequest",
	},

	// AIRESULT
	AIRESULT: {},
});
