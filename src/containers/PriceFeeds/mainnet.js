import axios from "axios";
import config from "src/config";
import { Buffer } from "buffer";

import consts from "src/constants/consts";

export const getAiOracleRequests = async () => {
	const qData = { get_requests_by_service: { service: "orchai_price", limit: 10, order: 2 } };
	const encodeData = Buffer.from(JSON.stringify(qData)).toString("base64");

  const endpoint = `${consts.LCD_API_BASE}${consts.LCD_API.WASM}/${config.AIORACLE_CONTRACT_ADDR}/smart/${encodeData}`;
	const { data: fullRequestData } = await axios.get(endpoint);

	if (fullRequestData?.data?.length > 0) {
		for (let stageData of fullRequestData.data) {
			// only collect data from the latest stage that has merkle root.
			if (stageData.merkle_root) {
				return stageData.stage;
			}
		}
	}
};

export const getRequestMerkleRootInfor = async stage => {
	// url: events=wasm._contract_address='contract_address'&events=wasm.current_stage='stage'&events=wasm.action='register_merkle_root'
	const { data: transactionInfor } = await axios.get(
		`${consts.LCD_API_BASE}${consts.LCD_API.AI_REQUEST_DATA}` +
			`?events=wasm._contract_address=${encodeURIComponent("'" + config.AIORACLE_CONTRACT_ADDR + "'")}` +
			`&events=wasm.current_stage=${encodeURIComponent("'" + stage + "'")}` +
			"&events=wasm.action='register_merkle_root'"
	);

	return [transactionInfor?.tx_responses[0].height, transactionInfor?.tx_responses[0].txhash];
};

export const getPriceFeedMainnet = async () => {
	// collect request id
	const stage = await getAiOracleRequests();
	const [merkleRootHeight, merkleRootTxHash] = await getRequestMerkleRootInfor(stage);
	if (stage) {
		const { data: fullRequestData } = await axios.get(
			`${config.AIORACLE_BACKEND}/report/reports?request_id=${parseInt(stage)}&contract_addr=${config.AIORACLE_CONTRACT_ADDR}`
		);

		if (fullRequestData?.data?.data.length > 0) {
			let aggregatedResult = [];
			aggregatedResult = fullRequestData.data.data.map(item => JSON.parse(atob(item.report.data)));

			// collect block data to display last updated info
			const { data: blockData } = await axios.get(`${consts.API_BASE}/blocks?&limit=1&before=${parseInt(merkleRootHeight) + 1}`);

			return {
				priceData: aggregatedResult[0],
				lastUpdate: blockData?.data[0]?.timestamp,
				requestData: [stage, merkleRootHeight, merkleRootTxHash], // only need request id to query the transaction hash of it
			};
		}
	}
};
