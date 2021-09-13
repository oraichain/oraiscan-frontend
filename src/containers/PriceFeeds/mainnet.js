import axios from "axios";

import consts from "src/constants/consts";

export const getPriceFeedMainnet = async () => {
	const {data: fullRequestData} = await axios.get(
		`${consts.LCD_API_BASE}${consts.LCD_API.WASM}/${process.env.REACT_APP_CONTRACT_PRICE_FEED}/smart/eyJvcmFjbGVfcXVlcnkiOnsibXNnIjp7ImdldF9yZXF1ZXN0cyI6eyJsaW1pdCI6NX19fX0=`
	);

	if (fullRequestData?.data?.items?.length > 0) {
		for (let item of fullRequestData.data.items) {
			if (item?.status === true) {
				let finalResultList = [],
					aggregatedResult = [];

				const {data: blockData} = await axios.get(
					`${consts.API_BASE}/blocks?&limit=1&before=${parseInt(item?.reports?.[item?.reports?.length - 1]?.block_height) + 1}`
				);

				for (let report of item.reports) {
					const resultDecode = JSON.parse(atob(report.aggregated_result));
					aggregatedResult = aggregatedResult.concat(resultDecode);
				}
				aggregatedResult = aggregatedResult.map(result => {
					let names = result.name;
					let prices = result.price;
					let newAggregatedResult = [];
					for (let i = 0; i < names.length; i++) {
						newAggregatedResult.push({
							name: names[i],
							price: parseFloat(prices[i]),
						});
					}
					return newAggregatedResult;
				});

				let holder = {};
				let uniqueSymbols = [];

				aggregatedResult.forEach(result => {
					result.forEach(d => {
						if (holder.hasOwnProperty(d.name)) {
							holder[d.name] = holder[d.name] + d.price;
							holder[d.name + "count"] += 1;
						} else {
							uniqueSymbols.push(d.name);
							holder[d.name] = d.price;
							holder[d.name + "count"] = 1;
						}
					});
				});

				uniqueSymbols.forEach(d => {
					holder[d] /= holder[d + "count"];
					delete holder[d + "count"];
				});

				for (let prop in holder) {
					finalResultList.push({name: prop, price: holder[prop]});
				}

				return {
					priceData: finalResultList,
					lastUpdate: blockData?.data[0]?.timestamp,
					requestData: item,
				};
			}
			// const reqId = tx.body.messages[0].request_id;
			// const {data: fullRequestData} = await axios.get(`${consts.LCD_API_BASE}/airesult/fullreq/${reqId}`);
		}
	}
};
