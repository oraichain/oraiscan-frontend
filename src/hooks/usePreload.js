import {useEffect} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import consts from "src/constants/consts";
//  reduxy
// import {getCryptoAssets, getCryptoBep8} from "src/store/modules/assets";
import {getCryptoBasicData, getCryptoBasicDataAiri,  getCryptoStatus, getCryptoValidators, getCyptoAcceleratedNode, getMinFee} from "src/store/modules/blockchain";
//  hooks

export default function usePreload() {
	const dispatch = useDispatch();

	//  initial load
	useEffect(() => {
		const cancelToken = axios.CancelToken;
		const source = cancelToken.source();
		dispatch(getCyptoAcceleratedNode());
		dispatch(getCryptoBasicData("oraichain-token", "usd", source.token));
		dispatch(getCryptoBasicDataAiri("airight", "usd", source.token));
		dispatch(getCryptoStatus(source.token));
		//dispatch(getCryptoFees(source.token));
		dispatch(getMinFee());
		if (window.location.pathname !== "/assets/") {
			//	dispatch(getCryptoAssets(source.token));
			//	dispatch(getCryptoBep8(source.token));
		}
	}, [dispatch]);

	//  getWithInterval BASIC_DATA_FETCH_INTERVAL_MS
	useEffect(() => {
		const interval = setInterval(() => {
			const cancelToken = axios.CancelToken;
			const source = cancelToken.source();
			dispatch(getCryptoBasicData(consts.COIN_ID, "usd", source.token));
			dispatch(getCryptoBasicDataAiri(consts.AIRI_ID, "usd", source.token));
			//  spacing out the request
			//  probably won't need a cleanup function because it's never unloaded
			setTimeout(() => {
				const cancelToken = axios.CancelToken;
				const source = cancelToken.source();
				dispatch(getCryptoStatus(source.token));
			}, 1500);
		}, consts.NUM.BASIC_DATA_FETCH_INTERVAL_MS);
		return () => clearInterval(interval);
	}, [dispatch]);
}
