import Web3 from "web3";
import BigNumber from "bignumber.js";
import _ from "lodash";

import {abiPolygon} from "./abj";

const web3 = new Web3("https://rpc-mumbai.matic.today");
const contract = new web3.eth.Contract(abiPolygon, "0x95Fc3900DF04103abd466F276ff8DF98508af708");

async function getPricePolygon(listPair) {
	let lastUpdate = new Date().toString();
	const listPairResult = _.cloneDeep(listPair);
	const listCoin = listPair.map(v => v.name);
	const priceArr = await contract.methods["getPriceBulk"](listCoin).call({
		from: "0x0000000000000000000000000000000000000000",
		latest: true,
	});

	console.log(priceArr, "== ==== === =");

	for (let i = 0; i < listCoin.length; i++) {
		if (!priceArr[i][0]) {
			continue;
		}
		listPairResult[i].price = parseFloat(
			new BigNumber(priceArr[i][0])
				.dividedBy(Math.pow(10, 18))
				.toFixed(9)
				.toString()
		);
		listPairResult[i].status = "Active";
		lastUpdate = new Date(parseInt(priceArr[i]["resolveTime"]) * 1000).toString();
	}

	return {
		data: listPairResult,
		lastUpdate,
	};
}

export {getPricePolygon};
