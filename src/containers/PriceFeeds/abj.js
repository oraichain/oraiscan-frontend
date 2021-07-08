export const abiBsc = [
	{inputs: [], stateMutability: "nonpayable", type: "constructor"},
	{
		anonymous: false,
		inputs: [
			{indexed: true, internalType: "address", name: "previousOwner", type: "address"},
			{indexed: true, internalType: "address", name: "newOwner", type: "address"},
		],
		name: "OwnershipTransferred",
		type: "event",
	},
	{anonymous: false, inputs: [{indexed: false, internalType: "uint256", name: "blockNumber", type: "uint256"}], name: "PriceDataUpdate", type: "event"},
	{inputs: [], name: "DOMAIN_SEPARATOR", outputs: [{internalType: "bytes32", name: "", type: "bytes32"}], stateMutability: "view", type: "function"},
	{inputs: [], name: "EIP712DOMAIN_TYPEHASH", outputs: [{internalType: "bytes32", name: "", type: "bytes32"}], stateMutability: "view", type: "function"},
	{inputs: [], name: "NAME", outputs: [{internalType: "string", name: "", type: "string"}], stateMutability: "view", type: "function"},
	{inputs: [], name: "UPDATE_PRICE_TYPEHASH", outputs: [{internalType: "bytes32", name: "", type: "bytes32"}], stateMutability: "view", type: "function"},
	{
		inputs: [{internalType: "string[]", name: "_symbols", type: "string[]"}],
		name: "addAssetSupport",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{internalType: "address", name: "", type: "address"}],
		name: "dataSubmitter",
		outputs: [{internalType: "bool", name: "", type: "bool"}],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{internalType: "string", name: "_base", type: "string"},
			{internalType: "string", name: "_quote", type: "string"},
		],
		name: "getPrice",
		outputs: [
			{
				components: [
					{internalType: "uint128", name: "rate", type: "uint128"},
					{internalType: "uint64", name: "lastUpdatedBase", type: "uint64"},
					{internalType: "uint64", name: "lastUpdatedQuote", type: "uint64"},
				],
				internalType: "struct IOraiBase.ResponsePriceData",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{internalType: "string", name: "_symbol", type: "string"}],
		name: "getPrice",
		outputs: [
			{
				components: [
					{internalType: "uint128", name: "rate", type: "uint128"},
					{internalType: "uint64", name: "resolveTime", type: "uint64"},
				],
				internalType: "struct IOraiBase.PriceData",
				name: "",
				type: "tuple",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [
			{internalType: "string[]", name: "_bases", type: "string[]"},
			{internalType: "string[]", name: "_quotes", type: "string[]"},
		],
		name: "getPriceBulk",
		outputs: [
			{
				components: [
					{internalType: "uint128", name: "rate", type: "uint128"},
					{internalType: "uint64", name: "lastUpdatedBase", type: "uint64"},
					{internalType: "uint64", name: "lastUpdatedQuote", type: "uint64"},
				],
				internalType: "struct IOraiBase.ResponsePriceData[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{internalType: "string[]", name: "_bases", type: "string[]"}],
		name: "getPriceBulk",
		outputs: [
			{
				components: [
					{internalType: "uint128", name: "rate", type: "uint128"},
					{internalType: "uint64", name: "resolveTime", type: "uint64"},
				],
				internalType: "struct IOraiBase.PriceData[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{internalType: "address", name: "", type: "address"}],
		name: "nonces",
		outputs: [{internalType: "uint256", name: "", type: "uint256"}],
		stateMutability: "view",
		type: "function",
	},
	{inputs: [], name: "owner", outputs: [{internalType: "address", name: "", type: "address"}], stateMutability: "view", type: "function"},
	{
		inputs: [{internalType: "uint16", name: "", type: "uint16"}],
		name: "rPrices",
		outputs: [
			{internalType: "uint128", name: "rate", type: "uint128"},
			{internalType: "uint64", name: "resolveTime", type: "uint64"},
		],
		stateMutability: "view",
		type: "function",
	},
	{inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function"},
	{
		inputs: [
			{internalType: "address", name: "_submitter", type: "address"},
			{internalType: "bool", name: "approval", type: "bool"},
		],
		name: "setDataSubmitter",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [{internalType: "string", name: "", type: "string"}],
		name: "supportedAsset",
		outputs: [{internalType: "uint16", name: "", type: "uint16"}],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{internalType: "uint256", name: "", type: "uint256"}],
		name: "symbols",
		outputs: [{internalType: "string", name: "", type: "string"}],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [{internalType: "address", name: "newOwner", type: "address"}],
		name: "transferOwnership",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{internalType: "uint16[]", name: "_symbolIds", type: "uint16[]"},
			{internalType: "uint128[]", name: "_rates", type: "uint128[]"},
			{internalType: "uint64[]", name: "_resolveTimes", type: "uint64[]"},
		],
		name: "updatePrice",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{internalType: "uint16[]", name: "_symbolIds", type: "uint16[]"},
			{internalType: "uint128[]", name: "_rates", type: "uint128[]"},
			{internalType: "uint64[]", name: "_resolveTimes", type: "uint64[]"},
			{internalType: "uint256", name: "deadline", type: "uint256"},
			{internalType: "uint256", name: "nonce", type: "uint256"},
			{internalType: "uint8", name: "v", type: "uint8"},
			{internalType: "bytes32", name: "r", type: "bytes32"},
			{internalType: "bytes32", name: "s", type: "bytes32"},
		],
		name: "updatePricePermit",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{internalType: "bytes32", name: "hash", type: "bytes32"},
			{internalType: "uint256", name: "nonce", type: "uint256"},
			{internalType: "uint8", name: "v", type: "uint8"},
			{internalType: "bytes32", name: "r", type: "bytes32"},
			{internalType: "bytes32", name: "s", type: "bytes32"},
		],
		name: "verify",
		outputs: [{internalType: "address", name: "sender", type: "address"}],
		stateMutability: "nonpayable",
		type: "function",
	},
];


export const abiPolygon = [{"inputs":[{"internalType":"contract IOraiBase","name":"_oracle","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"string","name":"_base","type":"string"},{"internalType":"string","name":"_quote","type":"string"}],"name":"getPrice","outputs":[{"components":[{"internalType":"uint128","name":"rate","type":"uint128"},{"internalType":"uint64","name":"lastUpdatedBase","type":"uint64"},{"internalType":"uint64","name":"lastUpdatedQuote","type":"uint64"}],"internalType":"struct IOraiBase.ResponsePriceData","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_base","type":"string"}],"name":"getPrice","outputs":[{"components":[{"internalType":"uint128","name":"rate","type":"uint128"},{"internalType":"uint64","name":"resolveTime","type":"uint64"}],"internalType":"struct IOraiBase.PriceData","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string[]","name":"_bases","type":"string[]"},{"internalType":"string[]","name":"_quotes","type":"string[]"}],"name":"getPriceBulk","outputs":[{"components":[{"internalType":"uint128","name":"rate","type":"uint128"},{"internalType":"uint64","name":"lastUpdatedBase","type":"uint64"},{"internalType":"uint64","name":"lastUpdatedQuote","type":"uint64"}],"internalType":"struct IOraiBase.ResponsePriceData[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string[]","name":"_bases","type":"string[]"}],"name":"getPriceBulk","outputs":[{"components":[{"internalType":"uint128","name":"rate","type":"uint128"},{"internalType":"uint64","name":"resolveTime","type":"uint64"}],"internalType":"struct IOraiBase.PriceData[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"oracle","outputs":[{"internalType":"contract IOraiBase","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract IOraiBase","name":"_oracle","type":"address"}],"name":"setOracle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}];