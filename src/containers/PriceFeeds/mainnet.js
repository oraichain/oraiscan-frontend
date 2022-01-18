import axios from "axios";
import config from "src/config";

import consts from "src/constants/consts";

export const getAiOracleRequests = async () => {
	const { data: fullRequestData } = await axios.get(
		`${consts.LCD_API_BASE}${consts.LCD_API.WASM}/${config.AIORACLE_CONTRACT_ADDR}/smart/eyJnZXRfcmVxdWVzdHMiOnsibGltaXQiOjEwLCJvcmRlciI6Mn19`
	);
	if (fullRequestData?.data?.length > 0) {
		for (let stageData of fullRequestData.data) {
			// only collect data from the latest stage that has merkle root.
			if (stageData.merkle_root) {
				return stageData.stage;
			}
		}
	}
}

export const getRequestMerkleRootInfor = async (stage) => {
	const { data: transactionInfor } = await axios.get(
		`${consts.LCD_API_BASE}${consts.LCD_API.AI_REQUEST_DATA}?events=wasm.contract_address%3D%27${process.env.REACT_APP_AIORACLE_CONTRACT_ADDR}%27&events=wasm.current_stage%3D%27${stage}%27&events=wasm.action%3D%27register_merkle_root%27`);
	return [transactionInfor?.tx_responses[0].height, transactionInfor?.tx_responses[0].txhash]
}


export const getPriceFeedMainnet = async () => {

	// collect request id
	const stage = await getAiOracleRequests();
	const [merkleRootHeight, merkleRootTxHash] = await getRequestMerkleRootInfor(stage);
	if (stage) {
		const { data: fullRequestData } = await axios.get(
			`${config.AIORACLE_BACKEND}/report-info/get-reports?request_id=${parseInt(stage)}&contract_addr=${config.AIORACLE_CONTRACT_ADDR}`
		);

		if (fullRequestData?.data.length > 0) {
			let aggregatedResult = [];
			aggregatedResult = fullRequestData.data.map(item => JSON.parse(atob(item.data)));

			// collect block data to display last updated info
			const { data: blockData } = await axios.get(
				`${consts.API_BASE}/blocks?&limit=1&before=${parseInt(merkleRootHeight) + 1}`
			);
			for (let item of aggregatedResult) {
				// const data = atob(item.data); // decode base64
				// console.log("data: ", data);
				// let finalResultList = [],
				// 	aggregatedResult = [];

				// const { data: blockData } = await axios.get(
				// 	`${consts.API_BASE}/blocks?&limit=1&before=${parseInt(item?.reports?.[item?.reports?.length - 1]?.block_height) + 1}`
				// );

				// // append all reports together
				// aggregatedResult = aggregatedResult.concat(data);

				// aggregatedResult = aggregatedResult.map(result => {
				// 	let names = result.name;
				// 	let prices = result.price;
				// 	let newAggregatedResult = [];
				// 	for (let i = 0; i < names.length; i++) {
				// 		newAggregatedResult.push({
				// 			name: names[i],
				// 			price: parseFloat(prices[i]),
				// 		});
				// 	}
				// 	return newAggregatedResult;
				// });

				// let holder = {};
				// let uniqueSymbols = [];

				// aggregatedResult.forEach(result => {
				// 	result.forEach(d => {
				// 		if (holder.hasOwnProperty(d.name)) {
				// 			holder[d.name] = holder[d.name] + d.price;
				// 			holder[d.name + "count"] += 1;
				// 		} else {
				// 			uniqueSymbols.push(d.name);
				// 			holder[d.name] = d.price;
				// 			holder[d.name + "count"] = 1;
				// 		}
				// 	});
				// });

				// uniqueSymbols.forEach(d => {
				// 	holder[d] /= holder[d + "count"];
				// 	delete holder[d + "count"];
				// });

				// for (let prop in holder) {
				// 	finalResultList.push({ name: prop, price: holder[prop] });
				// }

				// return {
				// 	priceData: finalResultList,
				// 	lastUpdate: blockData?.data[0]?.timestamp,
				// 	requestData: item,
				// };
				// const reqId = tx.body.messages[0].request_id;
				// const {data: fullRequestData} = await axios.get(`${consts.LCD_API_BASE}/airesult/fullreq/${reqId}`);
			}
			return {
				priceData: aggregatedResult[0],
				lastUpdate: blockData?.data[0]?.timestamp,
				requestData: [stage, merkleRootHeight, merkleRootTxHash] // only need request id to query the transaction hash of it
			}
		}
	}
};
