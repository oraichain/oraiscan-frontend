import {floor} from "lodash";

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
	let period = (now.getTime() - date.getTime()) / 1000; // unit: second
	if (period < 60) return `${floor(period)}s ago`;
	else return `${floor(period / 60)}m ago`;
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

export const formatFloat = (value, numberOfDigitsAfterDecimalPoint = 2, thousandsSeparator = ",") => {
	return parseFloat(value)
		.toFixed(numberOfDigitsAfterDecimalPoint)
		.replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1" + thousandsSeparator);
};

export const calculateBefore = (total, limit, page) => {
	return total + 1 - (page - 1) * limit;
};

export const calculateAfter = (total, limit, page) => {
	return total + 1 - page * limit;
};

export const formatOrai = (value, divisor = 1000000, numberOfDigitsAfterDecimalPoint = 6, thousandsSeparator = ",") => {
	return formatFloat(parseFloat(value) / divisor, numberOfDigitsAfterDecimalPoint, thousandsSeparator);
};
