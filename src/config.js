import { networks } from "./constants/networks";

export const isTestnet = process.env.REACT_APP_IS_TEST_NET || localStorage?.getItem("network") === networks.TESTNET;
const config = Object.freeze({
	SCAN_API: isTestnet
		? process.env.REACT_APP_API_TESTNET || "https://api.testnet.scan.orai.io/v1"
		: process.env.REACT_APP_API_PROD || process.env.REACT_APP_API_DEV || "https://api.scan.orai.io/v1",
	LCD_API: isTestnet ? process.env.REACT_APP_LCD_API_TESTNET || "https://lcd.testnet.orai.io" : process.env.REACT_APP_LCD_API || "https://lcd.orai.io",
	RPC_API: isTestnet ? process.env.REACT_APP_RPC_API_TESTNET || "https://rpc.testnet.orai.io" : process.env.REACT_APP_RPC_API || "https://rpc.orai.io",
	CONTRACT_DEPLOY_API: isTestnet
		? process.env.REACT_APP_CONTRACT_API_TESTNET || "https://cosmwasm-verify.testnet.orai.io/api/v1"
		: process.env.REACT_APP_CONTRACT_API || "https://cosmwasm-verify.orai.io/api/v1",
	walletapi: isTestnet
		? process.env.REACT_APP_WALLET_API_TESTNET || "https://testnet-wallet.web.app"
		: process.env.REACT_APP_WALLET_API || "https://api.wallet.orai.io",
	hasTestnetNetwork: process.env.REACT_APP_API_TESTNET && process.env.REACT_APP_WALLET_API_TESTNET,
	randomnessContractAddress: isTestnet
		? process.env.REACT_APP_CONTRACT_RANDOMNESS_TESTNET || "orai18al3kesrjcxp8t24ss6684yq22pua5acwnj5ma"
		: process.env.REACT_APP_CONTRACT_RANDOMNESS || "orai1s4ptqk79g5379glas3hwevq73xfm0nye4m0l6h",
	oldRandomnessContractAddress: "orai15vwlf8y9sygv72ju8qszs8n9gnuvwa7fu77tka",
	AIORACLE_BACKEND: isTestnet
		? process.env.REACT_APP_AIORACLE_BACKEND || "https://testnet-aioracle-svr.orai.io"
		: process.env.REACT_APP_AIORACLE_BACKEND || "https://aioracle-svr.orai.io",
	AIORACLE_CONTRACT_ADDR: isTestnet ? process.env.REACT_APP_AIORACLE_TESTNET_CONTRACT_ADDR : process.env.REACT_APP_AIORACLE_CONTRACT_ADDR,
	AIORACLE_SERVICE_FEES_ADDR: isTestnet ? process.env.REACT_APP_AIORACLE_TESTNET_SERVICE_FEES_ADDR : process.env.REACT_APP_AIORACLE_SERVICE_FEES_ADDR,
	PING_ADDR: isTestnet ? process.env.REACT_APP_TESTNET_PING_ADDR : process.env.REACT_APP_PING_ADDR,
	AIRI_ADDR: isTestnet ? process.env.REACT_APP_AIRI_TESTNET : process.env.REACT_APP_AIRI_MAINNET,
});

export default config;
