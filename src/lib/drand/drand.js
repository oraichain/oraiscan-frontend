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
