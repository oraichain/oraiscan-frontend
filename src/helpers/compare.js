import {sortDirections} from "src/constants/sortDirections";

const isGreater = (value1, value2) => {
	if (!isNaN(value1) && !isNaN(value2)) {
		return parseFloat(value1) > parseFloat(value2);
	}

	return value1.toString().toLowerCase() > value2.toString().toLowerCase();
};

const isLess = (value1, value2) => {
	if (!isNaN(value1) && !isNaN(value2)) {
		return parseFloat(value1) < parseFloat(value2);
	}

	return value1.toString().toLowerCase() < value2.toString().toLowerCase();
};

export const compareTwoValues = (value1, value2, direction = sortDirections.ASC) => {
	if (direction === sortDirections.ASC) {
		if (isGreater(value1, value2)) {
			return 1;
		} else if (isLess(value1, value2)) {
			return -1;
		} else {
			return 0;
		}
	} else {
		if (isLess(value1, value2)) {
			return 1;
		} else if (isGreater(value1, value2)) {
			return -1;
		} else {
			return 0;
		}
	}
};
