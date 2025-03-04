import consts from "src/constants/consts";
import { parseTxFee } from "./helper";
import _ from "lodash";
import typeSend from "src/constants/typeSend";

export const payloadTransaction = (type, msg, minGasFee, gas, memo, props) => {
	return {
		type,
		...props,
		value: {
			msg,
			fee: {
				amount: [parseTxFee(minGasFee)],
				gas,
			},
			signatures: null,
			memo,
		},
	};
};

export const args = ({ type, totalAmount, fromAddress, toAddress, msg, contractAddress, ...props }) => {
	return {
		type,
		totalAmount,
		fromAddress,
		toAddress,
		contractAddress,
		msg,
		arr_send:
			Array.isArray(msg) &&
			msg?.map(ms => ({
				coins: ms.value.amount,
				address: ms.value.to_address,
			})),
		...props,
	};
};

export const minusFees = (fee = 0, amount = 0) => {
	return String(+amount - fee);
};

export const handleTransactionResponse = (response, notification, history, setLoadingTransaction, typeSubmit) => {
	setLoadingTransaction(false);
	if (typeSubmit && (typeSubmit == typeSend.CW20 || typeSubmit === typeSend.MULTISENDCW20)) return history.push(`/txs/${response?.transactionHash}`);
	if (response?.code === 0) {
		notification.success({ message: "Transaction successful!" });
		history.push(`/txs/${response?.transactionHash}`);
	} else notification.error({ message: `Transaction failed with tx hash: ${response?.transactionHash}` });
};

export const getAmountDenomInfo = (item, account) => {
	let amount, denom;
	const denomName = item?.messages?.[0].amount?.[0]?.denom_name;
	const newDenom = item?.messages?.[0]?.sent_funds?.[0]?.denom_name;
	const noDenomName = item?.amount?.[0]?.sent_funds?.[0]?.denom;
	const amountDenomName = item?.amount?.[0]?.amount?.denom;

	if (account && item?.messages?.find(msg => getTxTypeNew(msg["@type"]) === "MsgMultiSend")) {
		try {
			let outputs = item?.messages?.[0]?.outputs.find(e => e.address === account);
			amount = outputs ? outputs?.coins?.[0]?.amount : item?.messages?.[0]?.inputs?.[0]?.coins?.[0]?.amount;
			denom = outputs ? outputs?.coins?.[0]?.denom : item?.messages?.[0]?.inputs?.[0]?.coins?.[0]?.denom || consts.DENOM;
		} catch (err) {
			if (!_.isNil(item?.amount?.[0]?.denom) && !_.isNil(item?.amount?.[0]?.amount)) {
				amount = item?.amount?.[0]?.amount;
				denom = item?.amount?.[0]?.denom;
			}
		}
	} else {
		if (item?.amount?.length > 1) {
			amount = 0;
			denom = consts.MORE;
		} else if (!_.isNil(item?.amount?.[0]?.denom) && !_.isNil(item?.amount?.[0]?.amount)) {
			denom = newDenom ? newDenom : amountDenomName;
			amount = item?.amount?.[0]?.amount;
		} else if (item?.messages[0]?.amount && item?.messages[0]?.amount?.length > 0) {
			amount = item?.messages[0]?.amount[0]?.amount;
			denom = item?.messages[0]?.amount[0]?.denom_name;
		}
	}

	return {
		denomName,
		newDenom,
		noDenomName,
		amount,
		denom,
	};
};

export const getTxTypeNew = (type, rawLog = "[]", result = "") => {
	const typeArr = type.split(".");
	let typeMsg = typeArr[typeArr.length - 1];
	// if (typeMsg === "MsgExecuteContract" && result === "Success") {
	// 	let rawLogArr = JSON.parse(rawLog);
	// 	for (let event of rawLogArr[0].events) {
	// 		if (event["type"] === "wasm") {
	// 			for (let att of event["attributes"]) {
	// 				if (att["key"] === "action") {
	// 					let attValue = att["value"]
	// 						.split("_")
	// 						.map(word => word.charAt(0).toUpperCase() + word.slice(1))
	// 						.join("");
	// 					typeMsg += "/" + attValue;
	// 					break;
	// 				}
	// 			}

	// 			break;
	// 		}
	// 	}
	// }
	return typeMsg;
};

const handleRoyaltyPercentage = royalty => {
	if (royalty === "-") {
		return royalty;
	}

	royalty = (royalty / consts.ROYALTY_DECIMAL_POINT_PERCENT).toFixed(9);
	let zeroCount = 0;
	for (let i = royalty.length - 1; i >= 0; i--) {
		if (royalty[i] == "0") zeroCount++;
		if (royalty[i] === ".") {
			zeroCount++;
			break;
		}
		if (royalty[i] != "0") break;
	}
	royalty = royalty.substring(0, royalty.length - zeroCount) + "%";
	return royalty;
};

export const getNewRoyalty = (account, events, result = "") => {
	let newRoyalty = "-";
	if (result === "Failure") {
		return newRoyalty;
	}

	let checkRoyalty = false;
	let checkAccount = false;

	if (events && events.length > 0) {
		for (let event of events) {
			if (event["type"] === "wasm") {
				for (let att of event["attributes"]) {
					if (att["key"] === "action" && att["value"] === "update_ai_royalty") {
						checkRoyalty = true;
						continue;
					}

					if (checkRoyalty && att["key"] === "creator" && att["value"] === account) {
						checkAccount = true;
						continue;
					}

					if (checkAccount && att["key"] === "new_royalty") {
						newRoyalty = att["value"];
						break;
					}
				}

				break;
			}
		}
	}

	return handleRoyaltyPercentage(newRoyalty);
};

export const getRoyaltyAmount = (account, events, result = "") => {
	let royaltyAmount = "0";
	if (result === "Failure") {
		return royaltyAmount;
	}

	let checkRoyaltyAmount = false;
	for (let index = events?.length - 1; index > -1; index--) {
		const event = events[index];
		if (event["type"] === "wasm") {
			for (let att of event["attributes"]) {
				if (att["key"] === "action" && att["value"] === "pay_royalty") {
					checkRoyaltyAmount = true;
					continue;
				}

				if (att["key"] === "action" && att["value"] === "finish_pay_royalty") {
					break;
				}

				if (checkRoyaltyAmount && att["key"].startsWith(`royalty_${account}_`)) {
					let index = att["value"].indexOf("orai");
					royaltyAmount = index !== -1 ? att["value"].slice(0, index) : "0";
				}
			}

			break;
		}
	}

	const obj = { royalty: checkRoyaltyAmount, amount: royaltyAmount };
	return obj;
};

export const getTokenId = (events, result = "") => {
	let tokenId = "";
	if (result === "Failure") {
		return tokenId;
	}

	for (let event of events) {
		if (event["type"] === "wasm") {
			for (let att of event["attributes"]) {
				if (att["key"] === "token_id") {
					tokenId = att["value"];
					break;
				}
			}

			break;
		}
	}

	return tokenId;
};
