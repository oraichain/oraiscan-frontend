import txTypes from "src/constants/txTypes";

const {COSMOS_SDK, DEX, TOKENS, MISC, PROVIDER, WEBSOCKET} = txTypes;

export default function(txType) {
	switch (txType) {
		case DEX.ORDER_NEW:
		case "NEW_ORDER":
			return "Place Order";

		case "CANCEL_ORDER":
		case DEX.ORDER_CANCEL:
			return "Cancel Order";

		case "TRANSFER":

		case COSMOS_SDK.SEND:
		case COSMOS_SDK.MSG_SEND:
			return "Transfer";

		case "LIST_TOKEN":
		case DEX.LIST:
			return "Listing";
		case "FREEZE_TOKEN":
		case TOKENS.FREEZE:
			return "Freeze";

		case "UN_FREEZE_TOKEN":
		case TOKENS.UNFREEZE:
			return "Unfreeze";

		case "TIME_LOCK":
		case TOKENS.TIME_LOCK:
			return "Time Lock";

		case "TIME_UNLOCK":
		case TOKENS.TIME_UNLOCK:
			return "Time Unlock";
		case TOKENS.TIME_RELOCK:
			return "Time Relock";

		case "ISSUE_TOKEN":
		case TOKENS.ISSUE:
			return "Issue Asset";

		case "BURN_TOKEN":
		case TOKENS.BURN:
			return "Burn";

		case TOKENS.MINT:
			return "Mint";
		case TOKENS.HTLT:
			return "Create Swap";
		case TOKENS.HTLT_CLAIM:
			return "Claim Swap";
		case TOKENS.HTLT_DEPOSIT:
			return "Deposit Swap";
		case TOKENS.HTLT_REFUND:
			return "Refund Swap";

		case COSMOS_SDK.MSG_DEPOSIT:
			return "Deposit";
		case "PROPOSAL":
		case COSMOS_SDK.MSG_SUBMIT_PROPOSAL:
			return "Proposal Submit";
		case COSMOS_SDK.MSG_CREATE_VALIDATOR_PROPOSAL:
			return "Validator Proposal";
		case "VOTE":
		case COSMOS_SDK.MSG_VOTE:
			return "Vote";
		case COSMOS_SDK.MSG_CREATE_VALIDATOR:
			return "Create Validator";
		case COSMOS_SDK.MSG_REMOVE_VALIDATOR:
			return "Remove Validator";
		case COSMOS_SDK.MSG_DELEGATE:
			return "Delegate";

		case MISC.ACCOUNTFLAG_SET:
			return "Set Account Flag";

		case PROVIDER.CREATE_AI_DATA_SOURCE:
			return "Create AI Data Source";
		case PROVIDER.EDIT_AI_DATA_SOURCE:
			return "Edit AI Data Source";
		case PROVIDER.CREATE_TEST_CASE:
			return "Create AI Test Case";
		case PROVIDER.EDIT_TEST_CASE:
			return "Edit AI Test Case";
		case PROVIDER.CREATE_ORACLE_SCRIPT:
			return "Create Oracle Script";
		case PROVIDER.EDIT_ORACLE_SCRIPT:
			return "Edit Oracle Script";

		case WEBSOCKET.ADD_REPORTER:
			return "Add Reporter";
		case WEBSOCKET.ADD_REPORT:
			return "Report";

		default:
			return txType.replace("cosmos-sdk/", "");
	}
}
