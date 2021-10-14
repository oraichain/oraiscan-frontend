import {networks} from "./constants/networks";

export const isTestnet = process.env.REACT_APP_IS_TEST_NET || localStorage?.getItem("network") === networks.TESTNET;

const config = Object.freeze({
	SCAN_API: isTestnet
		? process.env.REACT_APP_API_TESTNET || "https://api.testnet.scan.orai.io/v1"
		: process.env.REACT_APP_API_PROD || process.env.REACT_APP_API_DEV || "https://api.scan.orai.io/v1",
	LCD_API: isTestnet ? process.env.REACT_APP_LCD_API_TESTNET || "https://lcd.testnet.orai.io" : process.env.REACT_APP_LCD_API || "https://lcd.orai.io",
	walletapi: isTestnet
		? process.env.REACT_APP_WALLET_API_TESTNET || "https://testnet-wallet.web.app"
		: process.env.REACT_APP_WALLET_API || "https://api.wallet.orai.io",
	hasTestnetNetwork: process.env.REACT_APP_API_TESTNET && process.env.REACT_APP_WALLET_API_TESTNET,
	randomnessContractAddress: isTestnet
		? process.env.REACT_APP_CONTRACT_RANDOMNESS_TESTNET || "orai1894zzl3d2s388qvyg9paap9wuhghe9v6g0ahcn"
		: process.env.REACT_APP_CONTRACT_RANDOMNESS || "orai1s4ptqk79g5379glas3hwevq73xfm0nye4m0l6h",
	oldRandomnessContractAddress: "orai15vwlf8y9sygv72ju8qszs8n9gnuvwa7fu77tka",
});

export default config;
