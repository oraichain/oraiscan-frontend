/*
 * enter backend apis
 */

const isTestnetStorage = localStorage.getItem("isTestnet");

const config = Object.freeze({
	// API_DEV: "https://api-binance-testnet.cosmostation.io/v1",
	API_DEV: isTestnetStorage
		? process.env.REACT_APP_API_TESTNET || "https://api-binance-mainnet.cosmostation.io/v1"
		: process.env.REACT_APP_API_DEV || "https://api.scan.orai.io/v1",
	API_PROD: process.env.REACT_APP_API_PROD || "https://api-binance-mainnet.cosmostation.io/v1",
	walletapi: isTestnetStorage
		? process.env.REACT_APP_WALLET_API_TESTNET || "https://api-binance-mainnet.cosmostation.io/v1"
		: process.env.REACT_APP_WALLET_API || "https://api.wallet.orai.io/",
});

export default config;
