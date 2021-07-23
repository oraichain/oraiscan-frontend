// @ts-nocheck
import React, {memo, useState, useEffect} from "react";
import cn from "classnames/bind";
import {useForm, FormProvider} from "react-hook-form";
import {withStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import consts from "src/constants/consts";
import LoadingOverlay from "src/components/common/LoadingOverlay";
import TransactionTable from "./TransactionTable";
import styles from "./TransactionModal.scss";

const cx = cn.bind(styles);

const TransactionModal = ({open, closeDialog, requestData}) => {
	const [txTableData, setTxTableData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function getTxTableData() {
			setLoading(true);
			const results = [];
			const blockHeights = [];
			if (!requestData) {
				setLoading(false);
				return;
			}
			for (let i = 0; i < requestData.reports.length; i++) {
				// const blockHeight = reports[i].block_height;
				// if (blockHeights.includes(blockHeight)) {
				// 	continue;
				// } else {
				// 	blockHeights.push(blockHeight);
				// }
				const {data: transactionInfor} = await axios.get(
					`${consts.LCD_API_BASE}${consts.LCD_API.AI_REQUEST_DATA}?events=wasm.contract_address%3D%27${process.env.REACT_APP_CONTRACT_PRICE_FEED}%27&events=wasm.request_id%3D%27${requestData.request_id}%27&events=wasm.function_type%3D%27aggregate_and_report%27&order_by=2`
				);

				if (transactionInfor && transactionInfor.tx_responses && transactionInfor.tx_responses.length) {
					transactionInfor.tx_responses.forEach(tx => {
						results.push({
							requestID: requestData.request_id,
							blockHeight: tx.height,
							txhash: tx.txhash,
						});
					});
				}
			}
			console.log("results = ", results);
			setTxTableData(results);
			setLoading(false);
		}

		if (open) {
			getTxTableData();
		}
	}, [requestData, open]);

	if (loading) {
		return <LoadingOverlay />;
	}

	return (
		<Dialog onClose={closeDialog} aria-labelledby='delegate-dialog' open={open} maxWidth='lg' fullWidth={true}>
			<div className={cx("tx")}>
				<div className={cx("title")}> List Transactions Report Price</div>
				<TransactionTable data={txTableData} />
			</div>
		</Dialog>
	);
};

export default TransactionModal;
