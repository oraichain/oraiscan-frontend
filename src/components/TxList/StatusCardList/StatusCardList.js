// @ts-nocheck
import React, {memo} from "react";
import {useSelector} from "react-redux";
import cn from "classnames/bind";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import {formatInteger, formatSeconds, formatFloat} from "src/helpers/helper";
import StatusCard from "src/components/common/StatusCard";
import styles from "./StatusCardList.scss";
import heightIcon from "src/assets/validators/height_ic.svg";
import validatorsIcon from "src/assets/validators/validators_ic.svg";
import bondedTokensIcon from "src/assets/validators/bonded_tokens_ic.svg";
import blockTimeIcon from "src/assets/validators/clock.svg";

const cx = cn.bind(styles);

const StatusCardList = memo(() => {
	const status = useSelector(state => state.blockchain.status);

	let data;
	if (status) {
		data = [
			{
				icon: heightIcon,
				label: "Height",
				value: status?.latest_block_height ? formatInteger(status.latest_block_height) : "-",
			},
			{
				icon: validatorsIcon,
				label: "Validators",
				value: status?.total_validator_num ? status.total_validator_num + "/" + status.total_validator_num : "-",
			},
			{
				icon: bondedTokensIcon,
				label: "Bonded Tokens",
				value: status?.bonded_tokens ? formatFloat(status.bonded_tokens / 1000000) + " ORAI " : "-",
				comment: status?.price ? formatFloat(status.price * (status.bonded_tokens / 1000000)) + " USD" : "-",
			},
			{
				icon: blockTimeIcon,
				label: "Block Time",
				value: status?.block_time ? formatSeconds(status.block_time) + "s" : "-",
			},
		];
	} else {
		data = [
			{
				icon: heightIcon,
				label: "Height",
				value: <Skeleton className={cx("skeleton-inline-block")} variant='text' width={100} height={36} />,
			},
			{
				icon: validatorsIcon,
				label: "Validators",
				value: <Skeleton className={cx("skeleton-inline-block")} variant='text' width={100} height={36} />,
			},
			{
				icon: bondedTokensIcon,
				label: "Bonded Tokens",
				value: <Skeleton className={cx("skeleton-inline-block")} variant='text' width={100} height={36} />,
				comment: <Skeleton className={cx("skeleton-inline-block")} />,
			},
			{
				icon: blockTimeIcon,
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
