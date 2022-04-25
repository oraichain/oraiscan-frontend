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
