import {floor} from "lodash";
import numeral from "numeral";
import bigInt from "big-integer";
import _ from "lodash";

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

/* Add commas after every 3 digits in large numbers */
export const commafy = num => {
	var str = num.toString().split(".");
	if (str[0].length >= 5) {
		str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
	}
	if (str[1] && str[1].length >= 5) {
		str[1] = str[1].replace(/(\d{3})/g, "$1 ");
	}
	return str.join(",");
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

export const formatOrai = (value, divisor = 1000000, numberOfDigitsAfterDecimalPoint = 6) => {
	if (value === undefined || value === null) {
		return "_";
	}

	let result;

	if (`${value}`.length > 9) {
		result = formatFloat(bigInt(value) / divisor, numberOfDigitsAfterDecimalPoint);
	} else {
		result = formatFloat(parseFloat(value) / divisor, numberOfDigitsAfterDecimalPoint);
	}

	return _.isNaN(result) ? "0.000000" : result;
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
