export const payloadTransaction = (type, msg, minGasFee, gas, memo, props) => {
	return {
		type,
		...props,
		value: {
			msg,
			fee: {
				amount: [minGasFee],
				gas,
			},
			signatures: null,
			memo,
		},
	};
};
