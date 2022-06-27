import _ from "lodash";
import empty from "is-empty";
import moment from "moment";
import consts from "src/constants/consts";
export { _, empty };

//  remove t from bnb address
export const refineAddress = address => (_.isString(address) ? (address.charAt(0) === "t" ? address.substr(1) : address) : "-");

export const omitProperty = (arr, valueArray) => _.map(arr, v => _.omit(v, valueArray));

export const nilCheck = arr => !_.every(arr, el => !_.isNil(el));

const gravityCheck = (str = "-") => {
	return str && str.substring(0, 7).toLowerCase() === consts.GRAVITY ? consts.ORAIB + str.substring(7, str.length) : str;
};
//  planning on recreating this with css and components in the future(already mostly done)
export const reduceString = (str, from, end) => {
	let strCustom = gravityCheck(str);
	if (!from) return strCustom;
	return strCustom ? strCustom.substring(0, from) + " ... " + strCustom.substring(str.length - end) : "-";
};

export const reduceStringAssets = (str, from, end) => {
	let strCustom = gravityCheck(str);
	if (!from) return strCustom && strCustom.length > 15 ? strCustom.substring(0, 8) + "..." + strCustom.substring(strCustom.length - 8) : strCustom;
	return strCustom ? strCustom.substring(0, from) + (strCustom.length > from ? "..." + strCustom.substring(strCustom.length - end) : "") : "-";
};

export const parseIbcMsgTransfer = (rawLog, type = "send_packet", key = "packet_data") => {
	const arrayIbcDemonPacket = rawLog && rawLog?.[0]?.events?.find(e => e.type === type);
	const ibcDemonPackData = arrayIbcDemonPacket && arrayIbcDemonPacket?.attributes?.find(ele => ele.key === key);
	const ibcDemonObj = _.isString(ibcDemonPackData.value) ? JSON.parse(ibcDemonPackData.value) : { denom: "" };
	return ibcDemonObj;
};

export const processText = inputText => {
	var output = [];
	var json = inputText.split(" ");
	json.forEach(function (item) {
		output.push(
			item
				.replace(/\'/g, "")
				.split(/(\d+)/)
				.filter(Boolean)
		);
	});
	return output;
};

export const parseIbcMsgRecvPacket = denom => {
	return denom?.slice(0, 1) === "u" ? denom?.slice(1, denom?.length) : denom;
};

export const stringNumCheck = input => !empty(input) && !isNaN(Number(input));

const removeCommas = str => _.replace(str, new RegExp(",", "g"), "");
const reverseString = str => removeCommas(_.toString(_.reverse(_.toArray(str))));

const recursiveReverse = input => {
	if (_.isArray(input)) return _.toString(_.reverse(_.map(input, v => recursiveReverse(v))));
	if (_.isString) return reverseString(input);
	return reverseString(`${input}`);
};

//  honestly not the brightest implementation, but it works so whatev.
export const formatNumber = (v = 0, size = 3) => {
	let str = `${v}`;
	if (empty(str)) return "NaN";
	let substr = str.split(".");
	str = reverseString(substr[0]);
	const regex = `.{1,${size}}`;
	const arr = str.match(new RegExp(regex, "g"));
	return `${recursiveReverse(arr)}${substr[1] ? `.${substr[1]}` : ""}`;
};

export const getPercentage = (num1 = 0, num2 = 100, decimal = 4) => {
	if (num2 === 0 || isNaN(num2) || isNaN(num2)) return `0.${_.repeat("0", decimal)}`;
	return `${Math.floor((num1 / num2) * 100 * Math.pow(10, decimal)) / Math.pow(10, decimal)}`;
};

//  not needed atm but will in the future
// const phoneRegex = Object.freeze([/Android/i, /BlackBerry/i, /iPhone|iPad|iPod/i, /iPhone|iPad|iPod/i, /Opera Mini/i, /IEMobile/i, /WPDesktop/i]);
// export const isMobile = () => _.find(phoneRegex, regex => window.navigator.userAgent.match(regex)) !== undefined;
// export const isIOS = () => window.navigator.userAgent.match(/iPhone|iPad|iPod/i);

export const recursiveGetFirstValue = obj => {
	if (_.isArray(obj)) return recursiveGetFirstValue(obj[0]);
	if (_.isObject(obj)) return recursiveGetFirstValue(obj[_.keys(obj)[0]]);
	return obj;
};

//  uppercases everything
export const searchProperties = (targetObject = {}, propertyArr = [], targetStr = "") =>
	!_.every(propertyArr, property => !_.includes(targetObject[property].toUpperCase(), targetStr));

//  this should work with letters as well -> https://javascript.info/comparison
export const compareProperty = (a = {}, b = {}, property = "", defaultProperty = "id", asc = false) => {
	if (_.isString(a[property]))
		return asc ? a[property].toLowerCase().localeCompare(b[property]) : b[property].toLowerCase().localeCompare(a[property].toLowerCase());
	if (a[property] > b[property]) return asc ? 1 : -1;
	else if (a[property] < b[property]) return asc ? -1 : 1;
	if (a[defaultProperty] <= b[defaultProperty]) return asc ? 1 : -1;
	return asc ? -1 : 1;
};

//  time related

export const setAgoTime = time => {
	const x = new moment();
	const y = new moment(time);
	const duration = moment.duration(x.diff(y));
	let ret = "0s";
	if (duration._data.years) ret = `${duration._data.years} years`;
	else if (duration._data.months) ret = `${duration._data.months} months`;
	else if (duration._data.days) ret = `${duration._data.days} days`;
	else if (duration._data.hours) ret = `${duration._data.hours}h`;
	else if (duration._data.minutes) ret = `${duration._data.minutes}m`;
	else if (duration._data.seconds) ret = `${duration._data.seconds}s`;
	return ret + " ago";
};

export const getUnixTimes = (value, unit, startOf = "hour") => [
	moment()
		.startOf(startOf)
		.subtract(value, unit)
		.unix(),
	moment()
		.startOf(startOf)
		.add(3, "minute")
		.unix(),
];
export const getTotalTime = unix => moment(unix).format("YYYY-MM-DD / HH:mm:ss");
export const get24Hours = unix => moment(unix).format("HH:mm");
export const getHours = unix =>
	moment(unix)
		.add(30, "minutes")
		.format("H:00");

export const getTime = unix => moment(unix).format("YYYY-MM-DD HH:mm");

// TODO
//  make better
//  upgrade version if you find it better
//  delete if not
//  please consider your deadlines before working on this

//  version 1 - it was quite shite
// export const recursiveExpand = (x, result) => {
// 	if (_.isObject(x) && !_.isArray(x)) return _.map(x, val => `${result} ${recursiveExpand(val, result)}`);
// 	else if (_.isArray(x)) return _.reduce(x, (res, val) => `${recursiveExpand(val, result)} ${res}`, result);
// 	else return `${result} ${x}`;
// };

//  version 2 - not bad, but can it be better?
// export const recursiveExpand = (x, result) => {
// 	if (_.isObject(x) && !_.isArray(x)) return _.map(x, (val, key) => [`<${key}>`, recursiveExpand(val, result), `</${key}>`]);
// 	else if (_.isArray(x)) return _.reduce(x, (res, val) => `${recursiveExpand(val, result)} ${res}`, result);
// 	else return `${result} ${x}`;
// };
//  ok it's 24:00 I'm gonna call it a night trying out useless stuff

//  version 3 - I'm getting rid of undefined
const refined = v => (empty(v) ? "" : `${v} `);
export const recursiveExpand = (x, result) => {
	if (_.isObject(x) && !_.isArray(x)) return _.map(x, (val, key) => [`<${key}>`, recursiveExpand(val, result), `</${key}>`]);
	else if (_.isArray(x))
		return _.reduce(
			x,
			(res, val) => {
				const recurse = recursiveExpand(val, result);
				return `${refined(res)}${refined(recurse)}`;
			},
			result
		);
	else return `${refined(result)}${x}`;
};

export const tryParseMessage = obj => {
	try {
		if (!obj) return;
		for (let key in obj) {
			if (obj[key].msg && typeof obj[key].msg === "string") {
				try {
					obj[key].msg = JSON.parse(atob(obj[key].msg));
				} catch { }
			}
		}
		return obj;
	} catch (e) {
		return { data: obj };
	}
};

export const parseNumberToCurrency = (number) => {
	const currencyData = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',

		// These options are needed to round to whole numbers if that's what you want.
		//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
		//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
	}).format(number);
	if (isNaN(+currencyData)) return `$${number}`; // fallback case. If number is already in currency or other form string => get raw number
	return currencyData;
}