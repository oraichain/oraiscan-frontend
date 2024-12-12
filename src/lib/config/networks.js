import { isTestnet } from "src/config";

export const NetworkKey = {
	MAINNET: "mainnet",
	TESTNET: "testnet",
};

const networks = {
	[NetworkKey.MAINNET]: {
		chainId: "Oraichain",
		prefix: "orai",
		denom: "orai",
		coinType: 118,
		lcd: "https://lcd.orai.io",
		rpc: "https://rpc.orai.io",
		id: NetworkKey.MAINNET,
		fee: { gasPrice: "0.00506", amount: "1518", gas: "2000000" },
	},
	[NetworkKey.TESTNET]: {
		chainId: "Oraichain-testnet",
		prefix: "orai",
		denom: "orai",
		coinType: 118,
		lcd: "https://testnet.lcd.orai.io",
		rpc: "https://testnet.rpc.orai.io",
		id: NetworkKey.TESTNET,
		fee: { gasPrice: "0.00506", amount: "1518", gas: "2000000" },
	},
};

export default networks;

export const network =
	// sure have value
	isTestnet ? networks[NetworkKey.TESTNET] : networks[NetworkKey.MAINNET];

export const mobileBlacklistNetworks = [
	network.chainId,
	// 'cosmoshub-4',
	// 'columbus-5'
];
