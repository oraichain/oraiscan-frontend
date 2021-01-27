// TODO : use this if prod server is ready
import config from "src/config";
import _ from "lodash";

const api = process.env.NODE_ENV === "production" ? config.API_PROD : config.API_DEV;
const lcdApi = process.env.REACT_APP_LCD_API;

export default Object.freeze({
	DEFAULT_ARRAY: [],
	API_BINANCE_DEX: "https://www.binance.org/en/trade",
	API_BINANCE_ACCELERATED: ["https://dex-asiapacific.binance.org/api/v1", "https://dex-atlantic.binance.org/api/v1", "https://dex-european.binance.org/api/v1"],
	BINANCE_API_ENDPOINTS: {
		TX: tx => `/tx/${tx}?format=json`,
	},
	// API_COINGECKO: {
	// 	BASE: "https://api.coingecko.com/api/v3",
	// 	GET_MARKET_CHART_RANGE: (id = "BNB", from, to) => `/coins/${id}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`,
	// },
	COIN_ID: "oraichain-token",
	DENOM: "orai",
	TABLE: {
		PAGE_SIZE: 20,
	},
	NUM: {
		BASE_MULT: 100000000,
		DEFAULT_DECIMALS: 8,
		PAGE_SIZE: 20,
		SPARE_PAGE_CNT: 2, //  amount of pages to preload in pagination
		BINACE_API_ROWS_LIMIT: 1000, //  max rows binance api allows
		BINANCE_API_PAGES_LIMIT: 100, //  max page binance api allows
		REAL_TIME_DELAY_MS: 2000, //  real-time refetch interval(for indexedPagination)
		DASH_REAL_TIME_DELAY_MS: 3000, //  dashboard refetch interval
		DETAIL_REAL_TIME_DELAY_MS: 7000, // detail display refetch interval
		ACCOUNT_REFETCH_INTERVAL_MS: 5000, // TODO : currently not used
		ASSET_REFETCH_INTERVAL_MS: 80000,
		ASSET_REFETCH_PRICE_INTERVAL_MS: 80000,
		BASIC_DATA_FETCH_INTERVAL_MS: 30000,
	},
	ASSET: {
		NAME_SEARCH_PROPERTY: ["asset", "mappedAsset", "name"],
		ORDER_COMPARE: ["mappedAsset", "marketCap", "price", "supply"],
	},
	GET_LOGO_LINK: symbol =>
		_.isString(symbol) ? `https://raw.githubusercontent.com/cosmostation/cosmostation_token_resource/master/thumnail/${_.split(symbol)[0]}}.png` : "",
	API_BASE: api,
	LCD_API_BASE: lcdApi,
	API: {
		STATUS: "/status",
		BLOCKLIST: "/blocks",
		ACCOUNT: "/account",
		ACCOUNT_TXS: acc => `/account/txs/${acc}?page=1&rows=20`,
		TXLIST: "/txs",
		TX: "/txs",
		ORDERS: "/orders",
		ASSET_IMAGES: "/assets-images?page=1&rows=1000",
		ASSETS: "/assets?page=1&rows=1000",
		ASSETS_BEP8: "/assets/mini-tokens?page=1&rows=1000",
		ASSET_PRICES: "/assets?page=1&rows=1000&only_price=true",
		ASSET: "/asset?asset=",
		ASSET_TXS: "/assets/txs?page=1&rows=20&txAsset=",
		ASSET_HOLDERS: "/asset-holders?&page=1&rows=20&asset=",
		TOP_ASSETS: "/market/coin/list",
		CHARTS: "/stats/assets/chart",
		FEE: "/fees",
		VALIDATORS: "/validators",
		DELEGATORS: "/delegations",
		UNBONDINGS: "/account/unbonding",
		TXS_ACCOUNT: "/txs-account",
		ORAICHAIN_INFO: "/oraichain_info",

		ACCOUNT_COINS: "/account/coins",
		VALIDATOR: "/validator",
		DELEGATOR: "/delegator",
		PROPOSED_BLOCKS: "/proposed-blocks",
		MISSED_BLOCKS: "/validator/missed-block",
		DELEGATIONS: "/delegations",
		PROPOSALS: "proposals",
		VALIDATOR_ANALYTICS: "/validator-analytics",
	},
	LCD_API: {
		DATA_SOURCES: "/provider/datasources",
		DATA_SOURCE_DETAIL: "/provider/datasource",
		TEST_CASES: "/provider/testcases",
		ORACLE_SCRIPTS: "/provider/oscripts",
		ORACLE_SCRIPT_DETAIL: "/provider/oscript",
		ACCOUNT_DETAIL: "/cosmos/auth/v1beta1",
		BALANCES: "/cosmos/bank/v1beta1/balances",
	},
	NETWORK: {
		COSMOS: "cosmoshub-3",
		IRIS: "irishub",
		KAVA: "kava-3",
		BINANCE: "binance",
	},
	PREFIX: {
		COSMOS: "cosmos",
		IRIS: "iris",
		KAVA: "kava",
		ORAI_ADDR: "orai",
		ORAI_OPER: "oraivaloper",
		ORAI_CONS: "oraivalcons",
	},

	LINK: {
		GOOGLE: "https://play.google.com/store/apps/details?id=wannabit.io.cosmostaion",
		IOS: "https://apple.co/2IAM3Xm",
		WEB: "https://wallet.cosmostation.io",
		COSMOSTATION: "https://www.cosmostation.io/",
		BINANCEDEX: "https://www.binance.org/",
		COINGECKO_ORAI: "https://www.coingecko.com/en/coins/oraichain-token",
	},
	MENU: [
		{
			display: "DASHBOARD",
			route: "/",
			primary: true,
		},
		{
			display: "VALIDATOR",
			route: "/validators",
		},
		{
			display: "BLOCKS",
			route: "/blocks",
		},
		{
			display: "TRANSACTIONS",
			route: "/txs",
		},
	],
	REQUEST: {
		LIMIT: 10, // Number of records per page
		TIMEOUT: 10000,
	},
	DOMAIN: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ""}/`,
	PATH: {
		BLOCKLIST: "/blocks",
		VALIDATORS: "/validators",
		TXLIST: "/txs",
		ACCOUNT: "/account",
		DATA_SOURCES: "/data-sources",
		TEST_CASES: "/test-cases",
		ORACLE_SCRIPTS: "/oracle-scripts",
	},
	ADDRESS_PREFIX: {
		VALIDATOR: "oraivaloper1",
		ACCOUNT: "orai1",
	},
});
