import Cosmos from "@oraichain/cosmosjs";
import {fromPrivateKey} from "bip32";
import {myKeystation} from "src/lib/Keystation";
import config, {isTestnet} from "src/config.js";

const lcd = config.LCD_API;
// const contract = isTestnet ? "orai15tyssrtmk4dwmadf9gr5ee4xjgtmgq9qu584h6" : "orai1e5rcy5azgah7rllnd7qvzz66mrsq6ehxma6g4m";
const contract = config.randomnessContractAddress;

// init cosmos version
const network = localStorage.getItem("network") || "Oraichain";
const cosmos = new Cosmos(lcd, network);
cosmos.setBech32MainPrefix("orai");
const message = Cosmos.message;

export const getHandleMessage = (contract, msg, sender, amount) => {
	const sent_funds = amount ? [{denom: cosmos.bech32MainPrefix, amount}] : null;
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

export const getTxResponse = async (amount, fees, gas, user_input = "") => {
	// invoke handle message contract to update the randomness value. Min fees is 1orai
	const input = Buffer.from(
		JSON.stringify({
			invoke_add: {
				user_input,
			},
		})
	);

	return new Promise(async (resolve, reject) => {
		try {
			const {privateKey, chainCode, network} = await getChildKey();
			const childKey = fromPrivateKey(Buffer.from(privateKey), Buffer.from(chainCode), network);

			const sender = cosmos.getAddress(childKey);
			const txBody = getHandleMessage(contract, input, sender, amount);

			const response = await cosmos.submit(childKey, txBody, "BROADCAST_MODE_BLOCK", isNaN(fees) ? 0 : parseInt(fees), gas);
			resolve({response, contract});
		} catch (error) {
			reject(error);
		}
	});
};

export const drand = async (round, isNewRandom) => {
	// query current fees required
	const queryFeesInput = JSON.stringify({
		get_fees: {},
	});
	const currentFees = await cosmos.get(`/wasm/v1beta1/contract/${contract}/smart/${Buffer.from(queryFeesInput).toString("base64")}`);

	// query pub key
	const queryPubkeyInput = JSON.stringify({
		pub_key: {},
	});
	const pubkey = await cosmos.get(`/wasm/v1beta1/contract/${contract}/smart/${Buffer.from(queryPubkeyInput).toString("base64")}`);

	if (isNewRandom) {
		const returnValue = await new Promise(async resolve => {
			setTimeout(async () => {
				const queryLatestInput = JSON.stringify({
					latest: {},
				});
				const latest = await cosmos.get(`/wasm/v1beta1/contract/${contract}/smart/${Buffer.from(queryLatestInput).toString("base64")}`);
				const returnValue = {
					latest: latest.data,
					currentFees: currentFees.data,
					pubkey: pubkey.data,
				};
				resolve(returnValue);
			}, 16000);
		});
		return returnValue;
	} else if (round && round !== "") {
		// query a specific round information
		const queryRoundInput = JSON.stringify({
			get: {round},
		});
		const roundOutput = await cosmos.get(`/wasm/v1beta1/contract/${contract}/smart/${Buffer.from(queryRoundInput).toString("base64")}`);
		return {
			latest: roundOutput.data,
			currentFees: currentFees.data,
			pubkey: pubkey.data,
		};
	} else {
		const queryLatestInput = JSON.stringify({
			latest: {},
		});
		const latest = await cosmos.get(`/wasm/v1beta1/contract/${contract}/smart/${Buffer.from(queryLatestInput).toString("base64")}`);
		return {
			latest: latest.data,
			currentFees: currentFees.data,
			pubkey: pubkey.data,
		};
	}
};

export const getChildKey = () => {
	// const popup = window.open(`${config.walletapi}/auth?signInFromScan=true`, "", "resizable=1, scrollbars=1, fullscreen=0, width=470, height=760");
	const popup = myKeystation.openWindow("auth", "");

	return new Promise((resolve, reject) => {
		const loop = setInterval(function() {
			if (!popup) {
				clearInterval(loop);
				reject("window-blocked");
			} else if (popup.closed) {
				clearInterval(loop);
				reject("window-closed");
			}
		}, 500);
		const handler = e => {
			if (e.data.privateKey && e.data.chainCode && e.data.network) {
				clearInterval(loop);
				window.removeEventListener("message", handler);
				resolve(e.data);
			}
		};
		window.addEventListener("message", handler);
	});
};

export default drand;
