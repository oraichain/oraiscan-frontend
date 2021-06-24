import axios from "axios";

import consts from "src/constants/consts";

export const getPriceFeedMainnet = async () => {
	const {data: aiRequestData} = await axios.get(
		`${consts.LCD_API_BASE}${consts.LCD_API.AI_REQUEST_DATA}?events=ai_request_data.oscript_name%3D%27oscript_price_special%27&order_by=2`
	);

	if (aiRequestData?.txs?.length > 0) {
		for (let tx of aiRequestData.txs) {
			const reqId = tx.body.messages[0].request_id;
			const {data: fullRequestData} = await axios.get(`${consts.LCD_API_BASE}/airesult/fullreq/${reqId}`);

			if (fullRequestData?.result?.results?.length > 0) {
				let finalResultList = [],
					aggregatedResult = [];

				const {data: blockData} = await axios.get(`${consts.API_BASE}/blocks?&limit=1&before=${parseInt(fullRequestData?.ai_request?.block_height) + 1}`);

				for (let item of fullRequestData.result.results) {
					const resultDecode = JSON.parse(atob(item.result));
					aggregatedResult = aggregatedResult.concat(resultDecode);
				}
				aggregatedResult = aggregatedResult.map(result => ({...result, price: parseFloat(result.price)}));

				let holder = {};
				let uniqueSymbols = [];

				aggregatedResult.forEach(d => {
					if (holder.hasOwnProperty(d.name)) {
						holder[d.name] = holder[d.name] + d.price;
						holder[d.name + "count"] += 1;
					} else {
						uniqueSymbols.push(d.name);
						holder[d.name] = d.price;
						holder[d.name + "count"] = 1;
					}
				});

				uniqueSymbols.forEach(d => {
					holder[d] /= holder[d + "count"];
					delete holder[d + "count"];
				});

				for (let prop in holder) {
					finalResultList.push({name: prop, price: holder[prop]});
				}

				return {
					data: finalResultList,
					lastUpdate: blockData?.data[0]?.timestamp,
					reports: fullRequestData?.reports,
				};
			}
		}
	}
};
