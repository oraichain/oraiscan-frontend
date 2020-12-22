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
		.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
};

export const calculateBefore = (total, limit, page) => {
	return total + 1 - (page - 1) * limit;
};

export const calculateAfter = (total, limit, page) => {
	return total + 1 - page * limit;
};
