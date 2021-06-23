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

const TransactionModal = ({open, closeDialog, reports}) => {
	const [txTableData, setTxTableData] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function getTxTableData() {
			setLoading(true);
			const results = [];
			const blockHeights = [];
			for (let i = 0; i < reports.length; i++) {
				const {blockHeight} = reports[i];
				if (blockHeights.includes(blockHeight)) {
					continue;
				} else {
					blockHeights.push(blockHeight);
				}
				const {data: blockHeightInfo} = await axios.get(
					`${consts.LCD_API_BASE}${consts.LCD_API.AI_REQUEST_DATA}?events=message.action%3D%27create_report%27&order_by=2&events=tx.height%3D${blockHeight}`
				);
				if (blockHeightInfo && blockHeightInfo.tx_responses && blockHeightInfo.tx_responses.length) {
					blockHeightInfo.tx_responses.forEach(tx => {
						results.push({
							requestID: reports[i].requestID,
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
	}, [reports, open]);

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
