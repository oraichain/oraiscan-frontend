import { floor } from "lodash";
import numeral from "numeral";
import _ from "lodash";
import BigNumber from "bignumber.js";
import moment from "moment";
import sha256 from "js-sha256";
import { useSelector } from "react-redux";
import { themeIds } from "src/constants/themes";
import { reduceString } from "src/lib/scripts";
import consts from "src/constants/consts";
import { decodeTxRaw } from "@cosmjs/proto-signing";
import { Any } from "cosmjs-types/google/protobuf/any";

export const extractValueAndUnit = (inputString = "") => {
	if (inputString === "") {
		return {
			valueString: "",
			unitString: "",
		};
	}
	const valueString = parseInt(inputString).toString();
	const unitString = inputString.substring(inputString.indexOf(valueString) + valueString.length);
	return {
		valueString,
		unitString,
	};
};

export const amountDecimal18 = [
	{
		denom: "ORAI",
		address: "oraib0xA325Ad6D9c92B55A3Fc5aD7e412B1518F96441C0",
		decimal: 18,
		name: "orai bsc",
	},
	{
		denom: "AIRI",
		address: "oraib0x7e2A35C746F2f7C240B664F1Da4DD100141AE71F",
		decimal: 18,
		name: "airi bsc",
	},
	{
		denom: "USDT",
		address: "oraib0x55d398326f99059fF775485246999027B3197955",
		decimal: 18,
		name: "usdt bsc",
	},
	{
		denom: "KWT",
		address: "oraib0x257a8d1E03D17B8535a182301f15290F11674b53",
		decimal: 18,
		name: "kwt bsc",
	},
	{
		denom: "ORAI ERC20",
		address: "eth-mainnet0X4C11249814F11B9346808179CF06E71AC328C1B5",
		decimal: 18,
		name: "orai eth",
	},
	{
		denom: "Milky",
		address: "oraib0x6fE3d0F096FC932A905accd1EB1783F6e4cEc717",
		decimal: 18,
		name: "milky",
	},
];

export const checkTokenCW20 = value => {
	const status = amountDecimal18.find(amo => amo.address.toUpperCase() == (value && value.toUpperCase()) || "");
	return {
		status,
		denom: status?.denom,
		address: status?.address,
		decimal: status?.decimal ?? 18,
	};
};

/* Add commas after every 3 digits in large numbers */
export const commafy = num => {
	var str = num.toString().split(".");
	if (str[0].length >= 5) {
		str[0] = str[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}
	if (str[1] && str[1].length >= 5) {
		str[1] = str[1].replace(/(\d{3})/g, "$1");
	}
	return str.join(".");
};

/* Convert strings like "2020-12-25T17:03:20.962454Z" into strings like "5m ago" */
export const formatTime = timeStr => {
	let date = new Date();
	let now = new Date();
	date.setUTCFullYear(parseInt(timeStr.slice(0, 5)));
	date.setUTCMonth(parseInt(timeStr.slice(5, 7)) - 1);
	date.setUTCDate(parseInt(timeStr.slice(8, 10)));
	date.setUTCHours(parseInt(timeStr.slice(11, 13)));
	date.setUTCMinutes(parseInt(timeStr.slice(14, 16)));
	date.setUTCSeconds(parseInt(timeStr.slice(17, 19)));
	let seconds = (now.getTime() - date.getTime()) / 1000; // unit: second
	if (seconds < 60) return `${floor(seconds)}s ago`;
	else {
		let minutes = seconds / 60;
		if (minutes < 60) return `${floor(minutes)}m ago`;
		else {
			let hours = minutes / 60;
			if (hours < 24) return `${floor(hours)}h ago`;
			else {
				let days = hours / 24;
				return `${floor(days)}d ago`;
			}
		}
	}
};

export const formatInteger = (value, thousandsSeparator = ",") => {
	return parseInt(value)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
};

export const parseIbc = text => {
	let denom = text?.split("/");
	let coin =
		denom?.[denom?.length - 1]?.slice(0, 1) === "u" ? denom?.[denom?.length - 1]?.slice(1, denom?.[denom?.length - 1]?.length) : denom?.[denom?.length - 1];
	return coin.length > 10 ? reduceString(coin, 6, 3) : coin;
};

export const formatSeconds = (value, numberOfDigitsAfterDecimalPoint = 2) => {
	return parseFloat(value).toFixed(numberOfDigitsAfterDecimalPoint);
};

export const formatPercentage = (value, numberOfDigitsAfterDecimalPoint = 1) => {
	return parseFloat((parseFloat(value) * 100).toFixed(numberOfDigitsAfterDecimalPoint));
};

export const formatFloat = (value, numberOfDigitsAfterDecimalPoint = 2) => {
	return numeral(parseFloat(value)).format("0,0." + "0".repeat(numberOfDigitsAfterDecimalPoint));
};

export const calculateBefore = (total, limit, page) => {
	return total + 1 - (page - 1) * limit;
};

export const calculateAfter = (total, limit, page) => {
	return total + 1 - page * limit;
};

export const fromNowMoment = (date = Date.now(), check = false) => {
	return moment(date).fromNow(check);
};

export const formatOrai = (value, divisor = 1000000, numberOfDigitsAfterDecimalPoint = 6) => {
	if (value === undefined || value === null) {
		return "0";
	}

	const bigValue = new BigNumber(value);
	let result = bigValue.dividedBy(divisor).toFormat(numberOfDigitsAfterDecimalPoint);
	return `${result}` === "NaN" ? "0.000000" : result;
};
export const formatNumber = value => {
	if (value === undefined || value === null) {
		return "_";
	}
	return value.toString().replace(/^[+-]?\d+/, function(int) {
		return int.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
	});
};

export const replaceQueryString = (path, key, value) => {
	const searchParams = new URLSearchParams(path);
	if (value === "") {
		if (searchParams.has(key)) {
			searchParams.delete(key);
		}
	} else {
		if (searchParams.has(key)) {
			searchParams.set(key, value);
		} else {
			searchParams.append(key, value);
		}
	}
	return decodeURIComponent(searchParams.toString());
};

export const formatDateTime = time => {
	const m = moment(time);
	return m.format("YYYY-MM-DD HH:mm:ss");
};

export const calRemainingTime = time => {
	const x = new moment();
	const y = new moment(time);
	const duration = moment.duration(y.diff(x));
	let result = "0s";
	if (duration._data.years) result = `${duration._data.years} years`;
	else if (duration._data.months) result = `${duration._data.months} months`;
	else if (duration._data.days) result = `${duration._data.days} days`;
	else if (duration._data.hours) result = `${duration._data.hours}h`;
	else if (duration._data.minutes) result = `${duration._data.minutes}m`;
	else if (duration._data.seconds) result = `${duration._data.seconds}s`;
	return duration._milliseconds > 0 ? `${result} remaining` : `${result.split("-")[1]} ago`;
};

export const arraysEqual = (array1, array2) => {
	return JSON.stringify(array1) == JSON.stringify(array2);
};

export const mergeArrays = (array1, array2, key) => {
	const uniqueValues = new Set(array1.map(item => item[key]));
	const mergedArray = [...array1, ...array2.filter(item => !uniqueValues.has(item[key]))];
	return mergedArray;
};

export const decodeTx = encodedTx => {
	const uintArr = Buffer.from(encodedTx, "base64");
	const msg = decodeTxRaw(uintArr);
	const hash = sha256.sha256(uintArr).toUpperCase();
	const fee = msg?.authInfo?.fee;
	const typeUrl = msg?.body?.messages?.[0].typeUrl.substring(1);
	const value = Any.decode(msg?.body?.messages?.[0]?.value);
	return {
		hash: hash,
		messageType: typeUrl,
		messageValue: value,
		fee: fee,
	};
};

export const formatUSD = (value, orai2usd) => {
	return new BigNumber(value).multipliedBy(orai2usd).toFormat(2);
};

export const generateRandomString = length => {
	let randomString = "";
	let randomASCII;
	let ascii_low = 65;
	let ascii_high = 90;
	for (let i = 0; i < length; i++) {
		randomASCII = Math.floor(Math.random() * (ascii_high - ascii_low) + ascii_low);
		randomString += String.fromCharCode(randomASCII);
	}
	return randomString;
};

export const ThemeSetup = () => {
	const activeThemeId = useSelector(state => state.activeThemeId);
	const isDarkTheme = activeThemeId === themeIds.DARK;

	return {
		isDarkTheme: isDarkTheme,
	};
};

export const parseTxFee = amount => {
	return { denom: consts.DENOM, amount };
};

export const addressDisplay = str => {
	if (!str) return "";
	return str.substring(0, 9) + "..." + str.substring(str.length - 9);
};

export const amountCoinDecimal = (amount, decimal = 1000000) => {
	if (!amount) return "0";
	return (amount.replaceAll(",", "") * decimal).toString();
};

export const calculateInflationFromApr = async () => {
	const fetchData = async endpoint => {
		return fetch(`${consts.LCD_API_BASE}/${endpoint}`).then(data => data.json());
	};

	const VAL_VOTING_POWER = 1000;
	const DAYS_IN_YEARS = 365.2425;
	const APR = 28.5;
	const RATE = 0.03;
	const { block_time } = await fetch("https://api.scan.orai.io/v1/status").then(data => data.json());
	const delegatorsRewardPerDay = APR / ((DAYS_IN_YEARS / VAL_VOTING_POWER) * 100);
	const numBlocksPerDay = (60 / block_time) * 60 * 24;
	const delegatorsRewardPerBlock = delegatorsRewardPerDay / numBlocksPerDay;

	const valRewardPerBlock = delegatorsRewardPerBlock / (1 - RATE);

	let { bonded_tokens } = (await fetchData("cosmos/staking/v1beta1/pool")).pool;
	const { community_tax, base_proposer_reward, bonus_proposer_reward } = (await fetchData("cosmos/distribution/v1beta1/params")).params;
	const voteMultiplier = 1 - parseFloat(community_tax) - (parseFloat(base_proposer_reward) + parseFloat(bonus_proposer_reward));
	const blockRevision = valRewardPerBlock / ((VAL_VOTING_POWER / bonded_tokens) * voteMultiplier);

	const totalSupply = (await fetchData("cosmos/bank/v1beta1/supply/orai")).amount.amount;
	const { blocks_per_year } = (await fetchData("cosmos/mint/v1beta1/params")).params;
	const inflationRate = blockRevision / (totalSupply / blocks_per_year);

	return inflationRate * 100; // display in percentage
};

// check asset is belong Cosmos Hub ( decimals 6 ) or belong to Ethereum, BSC ( decimals 18 ).
export const getDecimals = (denom = "") => {
	const decimalsCosmos = 6;
	const decimalsEthBsc = 18;
	return denom.includes("0x") ? decimalsEthBsc : decimalsCosmos;
};

export const checkAttributeEvents = (rawLog = "[]", key = "send_packet") => {
	try {
		if (!rawLog) return false;
		const parseRawLog = JSON.parse(rawLog);
		const findSendPack = parseRawLog?.[0]?.events?.find(e => e.type == key);
		if (!findSendPack) return false;
		return true;
	} catch (error) {
		return false;
	}
};

export const isJsonString = str => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};
