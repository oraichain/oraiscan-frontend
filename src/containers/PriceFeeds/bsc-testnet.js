import Web3 from "web3";
import BigNumber from "bignumber.js";
import _ from "lodash";

import {abiBsc} from "./abj";

const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
const contract = new web3.eth.Contract(abiBsc, "0x13f54d67fa23ab3caaef681553cd996f7e9d6237");

async function getPriceBSCTestnet(listPair) {
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

export {getPriceBSCTestnet};
