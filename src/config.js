import {networks} from "./constants/networks";

const isTestnet = process.env.REACT_APP_IS_TEST_NET || localStorage?.getItem("network") === networks.TESTNET;

const config = Object.freeze({
	SCAN_API: isTestnet
		? process.env.REACT_APP_API_TESTNET || "https://api.testnet.scan.orai.io/v1"
		: process.env.REACT_APP_API_PROD || process.env.REACT_APP_API_DEV || "https://api.scan.orai.io/v1",
	LCD_API: isTestnet ? process.env.REACT_APP_LCD_API_TESTNET || "https://lcd.testnet.orai.io/v1" : process.env.REACT_APP_LCD_API || "https://lcd.orai.io",
	walletapi: isTestnet
		? process.env.REACT_APP_WALLET_API_TESTNET || "https://testnet-wallet.web.app"
		: process.env.REACT_APP_WALLET_API || "https://api.wallet.orai.io/",
	hasTestnetNetwork: process.env.REACT_APP_API_TESTNET && process.env.REACT_APP_WALLET_API_TESTNET,
});

export default config;
