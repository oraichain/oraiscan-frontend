// @ts-nocheck
import React, {memo} from "react";
import {useSelector} from "react-redux";
import cn from "classnames/bind";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import {formatInteger, formatSeconds, formatFloat} from "src/helpers/helper";
import StatusCard from "src/components/common/StatusCard";
import styles from "./StatusCardList.scss";

import ValidatorsIcon from "src/icons/Validators/ValidatorsIcon";
import HeightIcon from "src/icons/Validators/HeightIcon";
import BondedTokensIcon from "src/icons/Validators/BondedTokensIcon";
import BlockTimeIcon from "src/icons/Validators/BlockTimeIcon";

const cx = cn.bind(styles);

const StatusCardList = memo(() => {
	const status = useSelector(state => state.blockchain.status);

	let data;
	if (status) {
		data = [
			{
				icon: <HeightIcon></HeightIcon>,
				label: "Height",
				value: status?.latest_block_height ? formatInteger(status.latest_block_height) : "-",
			},
			{
				icon: <ValidatorsIcon></ValidatorsIcon>,
				label: "Validators",
				value: status?.total_validator_num ? status.total_validator_num + "/" + status.total_validator_num : "-",
			},
			{
				icon: <BondedTokensIcon></BondedTokensIcon>,
				label: "Bonded Tokens",
				value: status?.bonded_tokens ? formatFloat(status.bonded_tokens / 1000000) + " ORAI " : "-",
				comment: status?.price ? formatFloat(status.price * (status.bonded_tokens / 1000000)) + " USD" : "-",
			},
			{
				icon: <BlockTimeIcon></BlockTimeIcon>,
				label: "Block Time",
				value: status?.block_time ? formatSeconds(status.block_time) + "s" : "-",
			},
		];
	} else {
		data = [
			{
				icon: <HeightIcon></HeightIcon>,
				label: "Height",
				value: <Skeleton className={cx("skeleton-inline-block")} variant='text' width={100} height={36} />,
			},
			{
				icon: <ValidatorsIcon></ValidatorsIcon>,
				label: "Validators",
				value: <Skeleton className={cx("skeleton-inline-block")} variant='text' width={100} height={36} />,
			},
			{
				icon: <BondedTokensIcon></BondedTokensIcon>,
				label: "Bonded Tokens",
				value: <Skeleton className={cx("skeleton-inline-block")} variant='text' width={100} height={36} />,
				comment: <Skeleton className={cx("skeleton-inline-block")} />,
			},
			{
				icon: <BlockTimeIcon></BlockTimeIcon>,
				label: "Block Time",
				value: <Skeleton className={cx("skeleton-inline-block")} width={100} height={36} />,
			},
		];
	}

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
