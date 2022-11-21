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

export const args = ({ type, totalAmount, fromAddress, toAddress, msg, contractAddress, ...props }) => {
	return {
		type,
		totalAmount,
		fromAddress,
		toAddress,
		contractAddress,
		msg,
		arr_send: Array.isArray(msg) && msg?.map(ms => ({
			coins: ms.value.amount,
			address: ms.value.to_address,
		})),
		...props
	};
};

export const minusFees = (fee = 0, amount = 0) => {
	return String(+amount - fee);
};

export const handleTransactionResponse = (response, notification, history, setLoadingTransaction, typeSubmit) => {
	setLoadingTransaction(false);
	if (typeSubmit && typeSubmit == 'send-cw20') return history.push(`/txs/${response?.transactionHash}`);
	if (response?.code === 0) {
		notification.success({ message: "Transaction successful!" });
		history.push(`/txs/${response?.transactionHash}`);
	} else notification.error({ message: `Transaction failed with tx hash: ${response?.transactionHash}` });
};
