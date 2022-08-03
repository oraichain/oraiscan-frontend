// @ts-nocheck
import React, {memo} from "react";
import cn from "classnames/bind";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import {formatInteger, formatSeconds, formatNumber, formatFloat} from "src/helpers/helper";
import StatusCard from "../StatusCard";
import IbcTabIcon from "src/icons/Tabs/IbcTabIcon";
import BondedTokensIcon from "src/icons/Validators/BondedTokensIcon";
import BlockTimeIcon from "src/icons/Validators/BlockTimeIcon";
import moment from "moment";
import styles from "./StatusCardList.module.scss";

const cx = cn.bind(styles);

const StatusCardList = memo(({relayerInfoData}) => {
	let data = [
		{
			// icon: <HeightIcon></HeightIcon>,
			label: "Well-known",
			comment: "Total Transfer value",
			value: `$ ${formatNumber(relayerInfoData?.total_value) || 0}`,
		},
		{
			icon: <IbcTabIcon></IbcTabIcon>,
			label: "IBC Total Txs",
			value: relayerInfoData?.total_txs,
		},
		{
			icon: <BlockTimeIcon></BlockTimeIcon>,
			label: "Last Update Time",
			value: moment(relayerInfoData?.last_updated).fromNow(),
		},
		{
			icon: <BondedTokensIcon></BondedTokensIcon>,
			label: "Operating Period",
			value: moment(relayerInfoData?.channel?.created_at).fromNow(true),
		},
	];

	return (
		<Grid container spacing={2} className={cx("status-card-list")}>
			{data.map((item, index) => (
				<Grid item md={3} sm={6} xs={12} key={"status-card-list-item" + index}>
					<StatusCard icon={item.icon} label={item.label} value={item.value} comment={item?.comment} />
				</Grid>
			))}
		</Grid>
	);
});

export default StatusCardList;
