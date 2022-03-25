import React, {useMemo, useState} from "react";
import cn from "classnames/bind";
import moment from "moment";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Space from "antd/lib/space";
import Avatar from "antd/lib/avatar/avatar";
import {useHistory} from "react-router-dom";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// constant
import {STATUS_COLOR, STATE} from "./constants";

// components
import Pagination from "src/components/common/Pagination";

// logo
import OraiLogoLight from "src/assets/header/logo.svg";
import OraiLogoDark from "src/assets/header/logo.svg";

import OraiIcon from "src/icons/OraiIcon";

// styles
import styles from "./Channel.module.scss";

const cx = cn.bind(styles);

const dataLimit = 5;

const ChannelList = ({channels, channelName, image}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [currentPage, setCurrentPage] = useState(1);
	const history = useHistory();
	const totalPages = Math.ceil(channels?.length / dataLimit);

	const onChangePage = page => {
		setCurrentPage(page);
	};

	const getPaginatedData = () => {
		const startIndex = currentPage * dataLimit - dataLimit;
		const endIndex = startIndex + dataLimit;
		return channels.slice(startIndex, endIndex);
	};

	const listChannels = getPaginatedData();

	const renderHeaderChannels = useMemo(() => {
		return (
			<Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
				<Col span={1}>
					<div>#</div>
				</Col>
				<Col span={4}>
					<div className={cx("flexCenter")}>
						<Space>
							<Avatar size='small' src={<OraiIcon className={cx("logo-icon")} />} />
							Oraichain
						</Space>
					</div>
				</Col>
				<Col span={1} />
				<Col span={4}>
					<div className={cx("flexCenter")}>
						<Space>
							<Avatar size='small' src={image} />
							{channelName}
						</Space>
					</div>
				</Col>

				<Col span={4} />

				<Col span={4}>
					<div>Operating Period</div>
				</Col>
				<Col span={3}>
					<div>24h Txs</div>
				</Col>
				<Col span={3}>
					<div>Value</div>
				</Col>
			</Row>
		);
	}, [channelName]);

	const redirectRelayerDetail = (channelId, status) => {
		if (status === STATE.STATE_CLOSED) return;

		return history.push(`/ibc/relayers/${channelId}`);
	};

	const renderChannels = useMemo(() => {
		const renderChannelItem = (item, index) => {
			var createdAt = moment(item?.channel?.created_at, "YYYY-MM-DD");
			const currentDate = moment().startOf("day");
			const operatingPeriod = moment.duration(currentDate.diff(createdAt)).asDays();

			return (
				<Row
					gutter={{xs: 8, sm: 16, md: 24, lg: 32}}
					className={cx("body-list")}
					style={{cursor: "pointer"}}
					onClick={() => redirectRelayerDetail(item?.channel?.channel_id, item?.channel?.status)}>
					<Col span={1}>
						<div>{index + 1}</div>
					</Col>
					<Col span={4}>
						<div className={cx("channel-name", "flexCenter")}>
							<div>{item?.channel?.channel_id}</div>
							<span className={cx("dot")} style={{background: STATUS_COLOR[item?.channel?.status]}} />
						</div>
					</Col>
					<Col span={1} style={{zIndex: 1}}>
						<div className={cx("line-wrapper")} style={{background: STATUS_COLOR[item?.channel?.status]}} />
					</Col>
					<Col span={4}>
						<div className={cx("channel-name", "partners")}>
							<span className={cx("dot")} style={{background: STATUS_COLOR[item?.channel?.status]}} />
							<div>{item?.channel?.counterparty_channel_id}</div>
						</div>
					</Col>

					<Col span={4} />

					<Col span={4}>
						<div>
							{operatingPeriod}&nbsp;{operatingPeriod > 1 ? "Days" : "Day"}
						</div>
					</Col>
					<Col span={3}>
						<div>{item?.total_txs_within_24h}</div>
					</Col>
					<Col span={3}>
						<div>$&nbsp;{item?.total_value_within_24h?.toFixed(2)}</div>
					</Col>
				</Row>
			);
		};

		const renderChangeItemMobile = (item, index) => {
			var createdAt = moment(item?.channel?.created_at, "YYYY-MM-DD");
			const currentDate = moment().startOf("day");
			const operatingPeriod = moment.duration(currentDate.diff(createdAt)).asDays();
			return (
				<Row
					gutter={{xs: 8, sm: 16, md: 24, lg: 32}}
					className={cx("body-list", "mobile")}
					onClick={() => redirectRelayerDetail(item?.channel?.channel_id, item?.channel?.status)}>
					<Col span={11}>
						<div>
							<div className={cx("channel-name", "flexCenter")}>
								<div>
									<div className={cx("fontSize12")}>Oraichain</div>
									<div>{item?.channel?.channel_id}</div>
								</div>
								<span className={cx("dot")} style={{background: STATUS_COLOR[item?.channel?.status]}} />
							</div>
							<div>Operating Period</div>
							<div>24h Txs</div>
							<div>Value</div>
						</div>
					</Col>

					<Col span={2} style={{zIndex: 1}}>
						<div className={cx("line-wrapper", "mobile")} style={{background: STATUS_COLOR[item?.channel?.status]}} />
					</Col>

					<Col span={11}>
						<div style={{textAlign: "end"}}>
							<div className={cx("channel-name", "partners")} style={{justifyContent: "space-between"}}>
								<span className={cx("dot")} style={{background: STATUS_COLOR[item?.channel?.status]}} />
								<div>
									<div className={cx("fontSize12")}>{channelName}</div>
									<div>{item?.channel?.counterparty_channel_id}</div>
								</div>
							</div>
							<div>
								{operatingPeriod}&nbsp;{operatingPeriod > 1 ? "Days" : "Day"}
							</div>
							<div>{item?.total_txs_within_24h}</div>
							<div>$&nbsp;{item?.total_value_within_24h?.toFixed(2)}</div>
						</div>
					</Col>
				</Row>
			);
		};

		return listChannels.map((item, index) => (isLargeScreen ? renderChannelItem(item, index) : renderChangeItemMobile(item, index)));
	}, [listChannels, isLargeScreen]);

	return (
		<div className={cx("channel-list-wrapper")}>
			{isLargeScreen && renderHeaderChannels}
			{renderChannels}
			<div className={cx("pagination")}>
				{totalPages > 1 && <Pagination pages={totalPages} page={currentPage} onChange={(e, page) => onChangePage(page)} />}
			</div>
		</div>
	);
};

export default ChannelList;
