import Cosmos from "@oraichain/cosmosjs";
import config from "src/config";

const lcd = process.env.REACT_APP_LCD_API || "https://lcd.orai.io";

// init cosmos version
const network = localStorage.getItem("network") || "Oraichain";
const cosmos = new Cosmos(lcd, network);
cosmos.setBech32MainPrefix("orai");
const message = Cosmos.message;

const getHandleMessage = (contract, msg, sender, amount) => {
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

const drand = async (address, round, amount, fees, gas, isNewRandom) => {
	// const childKeyyyyyy = cosmos.getChildKey(
	// 	process.env.REACT_APP_TESTING_MNEMONIC ||
	// 		"strong ceiling chimney develop field patient fine absent sunset rookie law anxiety special jacket tide system alter sunny sniff travel drastic champion pigeon thank"
	// );

	const {childKey, address: sender} = await auth();
	console.log("childKey: ", childKey);
	// console.log("childKeyyyyyy: ", childKeyyyyyy);
	// const sender = cosmos.getAddress(childKeyyyyyy);
	// console.log("sender", sender)

	// invoke handle message contract to update the randomness value. Min fees is 1orai
	const input = Buffer.from(
		JSON.stringify({
			invoke_add: {},
		})
	);

	console.log(sender, "SENDER!!!!!!!!!!!!!!!!!!");

	const txBody = getHandleMessage(address, input, sender, amount);
	try {
		const res = await cosmos.submit(childKey, txBody, "BROADCAST_MODE_BLOCK", isNaN(fees) ? 0 : parseInt(fees), gas);
		console.log(res, "===============================");
	} catch (error) {
		console.log("error: ", error);
	}
	getHandleMessage();

	// query latest random round
	const queryLatestInput = JSON.stringify({
		latest: {},
	});
	const latest = await cosmos.get(`/wasm/v1beta1/contract/${address}/smart/${Buffer.from(queryLatestInput).toString("base64")}`);
	console.log("latest round: ", latest);

	// query current fees required
	const queryFeesInput = JSON.stringify({
		get_fees: {},
	});
	const currentFees = await cosmos.get(`/wasm/v1beta1/contract/${address}/smart/${Buffer.from(queryFeesInput).toString("base64")}`);
	console.log("current fees: ", currentFees);

	// query pub key
	const queryPubkeyInput = JSON.stringify({
		pub_key: {},
	});
	const pubkey = await cosmos.get(`/wasm/v1beta1/contract/${address}/smart/${Buffer.from(queryPubkeyInput).toString("base64")}`);
	console.log("pubkey: ", pubkey);

	// query a specific round information
	const queryRoundInput = JSON.stringify({
		get: {round},
	});
	const roundOutput = await cosmos.get(`/wasm/v1beta1/contract/${address}/smart/${Buffer.from(queryRoundInput).toString("base64")}`);
	console.log(`round ${round} information: `, roundOutput);

	if (isNewRandom) {
		return {
			latest: latest.data,
			pubkey: pubkey.data,
		};
	}

	return {
		latest: roundOutput,
		pubkey: pubkey,
	};
};

const auth = () => {
	const popup = window.open(`${config.walletapi}/auth`, "__blank", "resizable=1, scrollbars=1, fullscreen=0, width=470, height=760");

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
			console.log(e.data);
			if (e.data.childKey) {
				clearInterval(loop);
				window.removeEventListener("message", handler);
				resolve(e.data);
			}
		};
		window.addEventListener("message", handler);
	});
};

export default drand;
