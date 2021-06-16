import {networks} from "./constants/networks";

const isTestnet = localStorage?.getItem("network") === networks.TESTNET;

const config = Object.freeze({
	// API_DEV: "https://api-binance-testnet.cosmostation.io/v1",
	API_DEV: isTestnet
		? process.env.REACT_APP_API_TESTNET || "https://api.testnet.scan.orai.io/v1"
		: process.env.REACT_APP_API_DEV || "https://api.scan.orai.io/v1",
	API_PROD: isTestnet
		? process.env.REACT_APP_API_TESTNET || "https://api.testnet.scan.orai.io/v1"
		: process.env.REACT_APP_API_PROD || "https://api.scan.orai.io/v1",
	walletapi: isTestnet
		? process.env.REACT_APP_WALLET_API_TESTNET || "https://testnet-wallet.web.app"
		: process.env.REACT_APP_WALLET_API || "https://api.wallet.orai.io/",
	hasTestnetNetwork: process.env.REACT_APP_API_TESTNET && process.env.REACT_APP_WALLET_API_TESTNET,
});

export default config;
