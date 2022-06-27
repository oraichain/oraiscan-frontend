import Cosmos from "@oraichain/cosmosjs";
import { fromPrivateKey } from "bip32";
import config, { isTestnet } from "src/config.js";
import consts from "src/constants/consts";
import { networks } from "../../constants/networks";

const lcd = config.LCD_API;
// const contract = isTestnet ? "orai15tyssrtmk4dwmadf9gr5ee4xjgtmgq9qu584h6" : "orai1e5rcy5azgah7rllnd7qvzz66mrsq6ehxma6g4m";
const contract = config.randomnessContractAddress;

// init cosmos version
const network = isTestnet ? networks.TESTNET : networks.MAINNET;
const cosmos = new Cosmos(lcd, network);
cosmos.setBech32MainPrefix("orai");
const message = Cosmos.message;

export const getHandleMessage = (contract, msg, sender, amount) => {
	const sent_funds = amount && amount !== "0" ? [{ denom: cosmos.bech32MainPrefix, amount }] : null;
	const msgSend = new message.cosmwasm.wasm.v1beta1.MsgExecuteContract({
		contract,
		msg,
		sender,
		sent_funds,
	});

	const msgSendAny = new message.google.protobuf.Any({
		type_url: "/cosmwasm.wasm.v1beta1.MsgExecuteContract",
		value: message.cosmwasm.wasm.v1beta1.MsgExecuteContract.encode(msgSend).finish(),
	});

	return new message.cosmos.tx.v1beta1.TxBody({
		messages: [msgSendAny],
	});
};

// export const getTxResponse = async (amount, fees, gas, userInput = btoa(""), setLoadingPopup) => {
// 	// invoke handle message contract to update the randomness value. Min fees is 1orai
// 	const input = Buffer.from(
// 		JSON.stringify({
// 			request_random: {
// 				input: btoa(userInput),
// 			},
// 		})
// 	);
// 	console.log("network: ", network);

// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			const { privateKey, chainCode, network } = await getChildKey();
// 			const childKey = fromPrivateKey(Buffer.from(privateKey), Buffer.from(chainCode), network);

// 			const sender = cosmos.getAddress(childKey);
// 			const txBody = getHandleMessage(contract, input, sender, amount);
// 			if (setLoadingPopup) {
// 				await setLoadingPopup(true);
// 			}
// 			const response = await cosmos.submit(childKey, txBody, "BROADCAST_MODE_BLOCK", isNaN(fees) ? 0 : parseInt(fees), gas);

// 			resolve({ response, contract });
// 		} catch (error) {
// 			reject(error);
// 		}
// 	});
// };

export const getLatestRound = async (contract = config.randomnessContractAddress) => {
	const currentFees = await getCurrentFees(contract);
	const queryLatestInput = JSON.stringify({
		latest_round: {},
	});
	const latest = await cosmos.get(`${consts.LCD_API.WASM}/${contract}/smart/${Buffer.from(queryLatestInput).toString("base64")}`);
	return {
		latest: latest.data,
		currentFees: currentFees,
		// pubkey: pubkey.data,
	};
};

export const getRound = async (round, contract = config.randomnessContractAddress) => {
	const currentFees = await getCurrentFees(contract);
	// query a specific round information
	const queryRoundInput = JSON.stringify({
		get_round: { round: parseInt(round) },
	});

	const roundOutput = await cosmos.get(`${consts.LCD_API.WASM}/${contract}/smart/${Buffer.from(queryRoundInput).toString("base64")}`);
	return {
		latest: roundOutput.data,
		currentFees: currentFees,
		// pubkey: pubkey.data,
	};
};

const getCurrentFees = async contract => {
	// query current fees required
	const queryFeesInput = JSON.stringify({
		contract_info: {},
	});
	const contractInfo = await cosmos.get(`${consts.LCD_API.WASM}/${contract}/smart/${Buffer.from(queryFeesInput).toString("base64")}`);
	console.log("contract info: ", contractInfo);
	const currentFees = contractInfo.data.fee ? contractInfo.data.fee.amount : 0;
	return currentFees;
};

export const getRoundOld = async (round, contract) => {
	// query current fees required
	const queryFeesInput = JSON.stringify({
		get_fees: {},
	});
	const currentFees = await cosmos.get(`${consts.LCD_API.WASM}/${contract}/smart/${Buffer.from(queryFeesInput).toString("base64")}`);

	// query pub key
	const queryPubkeyInput = JSON.stringify({
		pub_key: {},
	});
	const pubkey = await cosmos.get(`${consts.LCD_API.WASM}/${contract}/smart/${Buffer.from(queryPubkeyInput).toString("base64")}`);

	const queryRoundInput = JSON.stringify({
		get: { round: parseInt(round) },
	});
	const roundOutput = await cosmos.get(`${consts.LCD_API.WASM}/${contract}/smart/${Buffer.from(queryRoundInput).toString("base64")}`);
	return {
		latest: roundOutput.data,
		currentFees: currentFees.data,
		pubkey: pubkey.data,
	};
};

// export const getAddressValidator = async () => {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			const { privateKey, chainCode, network } = await getChildKey();
// 			const childKey = fromPrivateKey(Buffer.from(privateKey), Buffer.from(chainCode), network);

// 			const sender = cosmos.getAddress(childKey);
// 			resolve({ sender, privateKey });
// 		} catch (error) {
// 			reject(error);
// 		}
// 	});
// };

// export const getChildKey = () => {
// 	// const popup = window.open(`${config.walletapi}/auth?signInFromScan=true`, "", "resizable=1, scrollbars=1, fullscreen=0, width=470, height=760");
// 	const popup = myKeystation.openWindow("auth", "");

// 	return new Promise((resolve, reject) => {
// 		const loop = setInterval(function () {
// 			if (!popup) {
// 				clearInterval(loop);
// 				reject("window-blocked");
// 			} else if (popup.closed) {
// 				clearInterval(loop);
// 				reject("window-closed");
// 			}
// 		}, 500);
// 		const handler = e => {
// 			if (e.data.privateKey && e.data.chainCode && e.data.network) {
// 				clearInterval(loop);
// 				window.removeEventListener("message", handler);
// 				resolve(e.data);
// 			}
// 		};
// 		window.addEventListener("message", handler);
// 	});
// };

// export const executeRandomness = (account, userInput) => {
// 	const msg = JSON.stringify({
// 		request_random: {
// 			input: btoa(userInput),
// 		},
// 	});

// 	const payload = {
// 		type: "/cosmwasm.wasm.v1beta1.MsgExecuteContract",
// 		gasType: "auto",
// 		value: {
// 			msg: [
// 				{
// 					type: "/cosmwasm.wasm.v1beta1.MsgExecuteContract",
// 					value: {
// 						contract: contract,
// 						msg,
// 						sender: account,
// 						sent_funds: null,
// 					},
// 				},
// 			],
// 			fee: {
// 				amount: [0],
// 				gas: 200000,
// 			},
// 			signatures: null,
// 			memo: "",
// 		},
// 	};

// 	// const popup = window.open(`${config.walletapi}/auth?signInFromScan=true`, "", "resizable=1, scrollbars=1, fullscreen=0, width=470, height=760");
// 	const popup = myKeystation.openWindow("transaction", payload, account);

// 	return new Promise((resolve, reject) => {
// 		const loop = setInterval(function() {
// 			if (!popup) {
// 				clearInterval(loop);
// 				reject("window-blocked");
// 			} else if (popup.closed) {
// 				clearInterval(loop);
// 				reject("window-closed");
// 			}
// 		}, 500);
// 		const handler = e => {
// 			if (e.data.res) {
// 				clearInterval(loop);
// 				window.removeEventListener("message", handler);
// 				resolve(e.data.res);
// 			}
// 		};
// 		window.addEventListener("message", handler);
// 	});
// };
