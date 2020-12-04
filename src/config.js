/*
 * enter backend apis
 */

const config = Object.freeze({
	// API_DEV: "https://api-binance-testnet.cosmostation.io/v1",
	API_DEV: process.env.REACT_APP_API_DEV || "http://localhost:5000/v1",
	API_PROD: process.env.REACT_APP_API_PROD || "https://api-binance-mainnet.cosmostation.io/v1",
});

export default config;
