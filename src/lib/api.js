import axios from "axios";
import consts from "src/constants/consts";
import { _ } from "src/lib/scripts";

export const getAssets = cancelToken => {
	return axios.get(`${consts.API_BASE}${consts.API.ASSETS}`, { cancelToken });
};

export const getBep8Assets = cancelToken => {
	return axios.get(`${consts.API_BASE}${consts.API.ASSETS_BEP8}`, { cancelToken });
};

export const getAssetPrices = cancelToken => {
	return axios.get(`${consts.API_BASE}${consts.API.ASSET_PRICES}`, { cancelToken });
};

export const getStatus = cancelToken => {
	return axios.get(`${consts.API_BASE}${consts.API.STATUS}`, { cancelToken });
};

export const getBasicData = (id, currency, cancelToken) => {
	return axios.get(`${consts.API_BASE}/market?id=${id}`, { cancelToken });
};

export const getMarketChartRange = (id, currency, from, to, cancelToken) => {
	return axios.get(`${consts.API_BASE}/market/chart?id=${id}`, { cancelToken });
};

export const getFees = cancelToken => {
	return axios.get(`${consts.API_BASE}${consts.API.FEE}`, { cancelToken });
};

export const getMinFee = cancelToken => {
	return axios.get(`${consts.API_BASE}/${consts.API.MIN_FEE}`, { cancelToken });
};

export const getValidators = cancelToken => {
	return axios.get(`${consts.API_BASE}${consts.API.VALIDATORS}?limit=100`, { cancelToken });
};

const pingServer = (api, cancelToken) => {
	return axios.get(`${api}/ping`, { cancelToken });
};

export const getFastestNode = (apiArr = []) => {
	const promiseArr = _.map(
		apiArr,
		api =>
			new Promise((resolve, reject) =>
				pingServer(api)
					.then(res => resolve(api))
					.catch(ex => console.warn(`${api} is unavailable`))
			)
	);
	return Promise.race(promiseArr);
};

export const getValidator = async (validatorInfo, cancelToken) => {
	return await axios(`${consts.API_BASE}${consts.API.VALIDATOR}/${validatorInfo}`, cancelToken);
};

export const getDelegators = async (validatorInfo, page, cancelToken) => {
	return await axios(`${consts.API_BASE}${consts.API.DELEGATOR}/${validatorInfo}?page_id=${page}&limit=7`, cancelToken);
};

export const getProposedBlocks = async (validatorInfo, page, cancelToken) => {
	return await axios(`${consts.API_BASE}${consts.API.PROPOSED_BLOCKS}/${validatorInfo}?limit=7&page_id=${page}`, cancelToken);
};

export const getMissedBlocks = async (validatorInfo, cancelToken) => {
	return await axios(`${consts.API_BASE}${consts.API.MISSED_BLOCKS}/${validatorInfo}`, cancelToken);
};

export const getValidatorAnalytics = async cancelToken => {
	return await axios(`${consts.API_BASE}${consts.API.VALIDATOR_ANALYTICS}`, cancelToken);
};

export const getListTxs = cancelToken => {
	return axios.get(`${consts.API_BASE}${consts.API.TXS_LIST}`, cancelToken);
};

export const getListCwToken = (address, page) => {
	return `${consts.API_BASE}${consts.API.OW20_SMART_CONTRACTS}/${address}?limit=${page?.limit || 1}&page_id=${page?.page_id || 1}`
}

export const getListNFTToken = (address, page) => {
	return `https://api.testnet.scan.orai.io/v1/nft_transaction/${address}?limit=${page?.limit || 1}&page_id=${page?.page_id || 1}`;
};

export const getListOWContract = (address, page) => {
	return `${consts.API_BASE}${consts.API.OW20_SMART_CONTRACTS}${consts.API.OW20_CONTRACT}/${address}?limit=${page?.limit || 1}&page_id=${page?.page_id || 1}`
}

export const getGeckoMarketBalance = async (ids = '', currency = 'usd') => {
	// remove undefined
	ids = ids.replace(new RegExp("\,undefined", "gm"), "");
	return ids ? await axios(`${consts.API_COINGECKO.PRICE(ids, currency)}`) : { data: {} };
};

export const getImagesValidator = async (address) => {
	return await axios.get(`${consts.API_BASE}${consts.API.GET_IMAGES_VALIDATORS}/${address}`);
}

export const getListRequest = (aiOracle, aiRequest) => {
	return axios.get(`${consts.LCD_API_BASE}${consts.LCD_API.WASM}/${aiOracle}/smart/${aiRequest}`);
};

export const uploadImagesValidator = async (data) => {
	return await axios({ url: `${consts.API_BASE}${consts.API.UPLOAD_IMAGES_VALIDATORS}`, ...data });
};

export const uploadSchema = async (data) => {
	return await axios({ url: `${consts.API_CONTRACT_DEPLOY}${consts.PATH_CONTRACT.UPLOAD_SCHEMA}`, ...data });
};

export const axiosCall = async (data) => {
	return await axios({ ...data });
};