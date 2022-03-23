import React, {useCallback, useState} from "react";
import cn from "classnames/bind";
import Container from "@material-ui/core/Container";
import {useGet} from "restful-react";
import {useParams} from "react-router-dom";

// components
import RelayerInfo from "./RelayerInfo";
import RelayerAsset from "./RelayerAssset";
import RelayerTransaction from "./RelayerTransactions";

// constants
import consts from "src/constants/consts";

// styles
import styles from "./RelayerDetail.module.scss";

const cx = cn.bind(styles);

export const TX_TYPE = {
	RECEIVE: "RECEIVE",
	TRANSFER: "TRANSFER",
};

const RelayerDetail = () => {
	const {channelId} = useParams();
	const [txType, setTxType] = useState(TX_TYPE.RECEIVE);
	const [pagination, setPagination] = useState({});
	console.log("🚀 ~ file: index.js ~ line 29 ~ RelayerDetail ~ pagination", pagination);

	const {data: relayerInfoData} = useGet({
		path: `${consts.API.IBC_RELAYERS_DETAIL}/${channelId}`,
	});

	const {data: relayerAssetDaily} = useGet({
		path: `/ibc/channel/${channelId}/daily-transfer-value`,
	});

	const {data: relayerAssetList} = useGet({
		path: `/ibc/channel/${channelId}/assets?tx_type=${txType}`,
	});

	const {data: dataTransactions} = useGet(
		{
			path: `/ibc/channel/${channelId}/txs?page_id=${pagination?.current}`,
		},
		[pagination]
	);

	const changeTxType = useCallback(
		txType => {
			setTxType(txType);
		},
		[setTxType]
	);

	const handleOnChange = useCallback(
		pagination => {
			setPagination(pagination);
		},
		[setPagination]
	);

	return (
		<Container fixed className={cx("relayers")}>
			<div className={cx("page-title")}>
				<h1>IBC Relayer Detail</h1>
			</div>
			<RelayerInfo data={relayerInfoData} />
			<RelayerAsset relayerAssetDaily={relayerAssetDaily} relayerAssetList={relayerAssetList} changeTxType={changeTxType} txType={txType} />
			<RelayerTransaction dataTransactions={dataTransactions} handleOnChange={handleOnChange} pagination={pagination} />
		</Container>
	);
};

export default RelayerDetail;
