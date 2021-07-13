import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {showAlert} from "src/store/modules/global";

export default function() {
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		const callBack = function(e) {
			if (e?.data?.res?.txhash) {
				dispatch(
					showAlert({
						show: true,
						message: "Transaction Successful!",
						autoHideDuration: 3000,
					})
				);

				history.push({
					pathname: `/txs/${e.data.res.txhash}`,
					state: e.data,
				});
				// setIsLoading(true);
				// const checkTimeout = async () => {
				// 	const result = await axios.get(`${consts.API_BASE}${consts.API.TX}/${e.data.txhash}`);
				// 	if (!result || !result.data || !result.data.result) {
				// 		setTimeout(checkTimeout, 2000);
				// 	} else {
				// 		history.push(`/txs/${e.data.txhash}`);
				// 		setIsLoading(false);
				// 	}
				// };
				// setTimeout(checkTimeout, 2000);
			}
		};
		window.addEventListener("message", callBack, false);
		return () => {
			window.removeEventListener("message", callBack);
		};
	}, []);
}
