import { parseTxFee } from "./helper";

export const payloadTransaction = (type, msg, minGasFee, gas, memo, props) => {
	return {
		type,
		...props,
		value: {
			msg,
			fee: {
				amount: [parseTxFee(minGasFee)],
				gas,
			},
			signatures: null,
			memo,
		},
	};
};

export const args = ({ type, totalAmount, fromAddress, toAddress, msg }) => {
	return {
		type,
		totalAmount,
		fromAddress,
		toAddress,
		msg,
		arr_send: msg.map(ms => ({
			coins: ms.value.amount,
			address: ms.value.to_address,
		})),
	};
};

export const minusFees = (fee = 0, amount = 0) => {
	return String(+amount - fee);
};
