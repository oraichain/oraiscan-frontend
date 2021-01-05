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
  // return axios.get(`${coinGeckoAPI}/coins/binancecoin/market_chart/range?id=${id}&vs_currency=${currency}&from=${from}&to=${to}`, {cancelToken});
  return axios.get(`${consts.API_BASE}/market/chart?id=${id}`, { cancelToken });
};

export const getFees = cancelToken => {
  return axios.get(`${consts.API_BASE}${consts.API.FEE}`, { cancelToken });
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
  return await axios(`${consts.API_BASE}${consts.API.DELEGATOR}/${validatorInfo}?page_id=${page}&limit=8`, cancelToken);
};

export const getProposedBlocks = async (validatorInfo, page, cancelToken) => {
  return await axios(`${consts.API_BASE}${consts.API.PROPOSED_BLOCKS}/${validatorInfo}?limit=8&page_id=${page}`, cancelToken);
};

export const getMissedBlocks = async (validatorInfo, cancelToken) => {
  return await axios(`${consts.API_BASE}${consts.API.MISSED_BLOCKS}/${validatorInfo}`, cancelToken);
};

export const getListTxs = cancelToken => {
  console.log("URL!!!", `${consts.API_BASE}${consts.API.TXS_LIST}`);
  return axios.get(`${consts.API_BASE}${consts.API.TXS_LIST}`, cancelToken);
};

//  original api using coingecko
// export const getGeckoMarketChartRange = (id = "binancecoin", currency = "USD", from, to, cancelToken) => {
// 	return axios.get(`${consts.API_COINGECKO.BASE}${consts.API_COINGECKO.GET_MARKET_CHART_RANGE(id, from, to)}`, {cancelToken});
// };
