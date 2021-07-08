import React, {useState, useEffect} from "react";
import {useParams, useLocation} from "react-router-dom";
import _ from "lodash";
import axios from "axios";
import consts from "src/constants/consts";
import {isTestnet} from "src/config";

const convertData = (pendingTxState, txHash) => {
	if (!pendingTxState) {
		return {};
	}
	const result = {};
	result.result = "pending";
	result.tx_hash = txHash;
	result.messages = [];
	result.messages[0] = {
		...pendingTxState.msg[0].value,
		"@type": pendingTxState.msg[0].type,
	};
	result.memo = pendingTxState.fee.memo;
	result.fee = {};
	return result;
};

const isTxFetchSuccess = txRpc => {
	return txRpc?.data?.result?.height && parseInt(txRpc?.data?.result?.height) > 0;
};

const isBlockContainTxhash = (blockInfo, txhash) => {
	if (!blockInfo?.data?.data || !_.isArray(blockInfo.data.data)) {
		return false;
	}
	
	for (let i = 0; i < blockInfo.data.data.length; i++) {
		if (blockInfo.data.data[i].tx_hash === txhash) {
			return true;
		}
	}
	return false;
};

async function getDataAsync(path) {
	try {
		const result = await axios.get(path);
		return result;
	} catch (e) {
		return null;
	}
}

const useGetTx = txHash => {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(true);
	const path = `${consts.API_BASE}${consts.API.TX}/${txHash}`;

	const location = useLocation();
	const pendingTxState = location.state;

	console.log("pendingTxState  = ", pendingTxState);

	useEffect(() => {
		const cancelToken = axios.CancelToken;
		const source = cancelToken.source();
		async function getTxFromRpc(count) {
			const txRpc = await getDataAsync(`https://rpc.orai.io/tx?hash=0x${txHash}`);
			if (isTxFetchSuccess(txRpc) || isTestnet) {
				const getTxScan = async () => {
					const tx = await getDataAsync(path);
					if (tx?.data?.height && parseInt(tx?.data?.height) > 0) {
						setData(tx?.data);
						setLoading(false);
						return;
					}
					setTimeout(getTxScan, 2000);
				};
				getTxScan();
				return;
			}

			if (count === 4) {
				setData(null);
				setLoading(false);
				return;
			}

			if (pendingTxState) {
				setData(convertData(pendingTxState.source, txHash));
				setLoading(false);
			}

			setTimeout(() => {
				getTxFromRpc(count + 1);
			}, 2000);
		}

		async function getTxFromBlock(initHeight, height) {
			const blockInfo = await getDataAsync( `${consts.API_BASE}${consts.API.TXS_BLOCK}/${height}?limit=1000`);
			console.log('blockInfo === ', blockInfo)
			if (!blockInfo?.data?.data) {
				setTimeout(() => {
					getTxFromBlock(initHeight, height);
				}, 2000);
			} else if (!isBlockContainTxhash(blockInfo, txHash) && initHeight - height < 7) {
				setTimeout(() => {
					getTxFromBlock(initHeight, height + 1);
				}, 2000);
			} else if (isBlockContainTxhash(blockInfo, txHash)) {
				const tx = await getDataAsync(path);
				if (tx?.data?.height && parseInt(tx?.data?.height) > 0) {
					setData(tx?.data);
					setLoading(false);
					return;
				}
			} else {
				setData(null);
				setLoading(false);
				return;
			}
		}

		if (pendingTxState?.res?.height && parseInt(pendingTxState?.res?.height)) {
			getTxFromBlock(parseInt(pendingTxState?.res?.height), parseInt(pendingTxState?.res?.height));
		} else {
			getTxFromRpc(1);
		}

		return () => {
			source.cancel("cleanup cancel");
		};
	}, [txHash]);

	return {
		loading,
		data,
	};
};

export {useGetTx};
