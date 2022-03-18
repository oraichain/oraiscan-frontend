import React, {useMemo, useState} from "react";
import cn from "classnames/bind";
import moment from "moment";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Pagination from "antd/lib/pagination";
import Space from "antd/lib/space";
import Avatar from "antd/lib/avatar/avatar";

// constant
import {STATUS_COLOR} from "./constants";

// logo
import OraiLogo from "src/assets/header/logo.svg";

// styles
import styles from "./Channel.module.scss";

const cx = cn.bind(styles);

const dataLimit = 10;

const ChannelList = ({channels, channelName, image}) => {
	const [currentPage, setCurrentPage] = useState(1);

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
							<Avatar size='small' src={<img src={OraiLogo} />} />
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

	const renderChannels = useMemo(() => {
		const renderChannelItem = (item, index) => {
			var createdAt = moment(item?.channel?.created_at, "YYYY-MM-DD");
			const currentDate = moment().startOf("day");
			const operatingPeriod = moment.duration(currentDate.diff(createdAt)).asDays();

			return (
				<Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} className={cx("body-list")}>
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

		return listChannels.map((item, index) => renderChannelItem(item, index));
	}, [listChannels]);

	return (
		<div className={cx("channel-list-wrapper")}>
			{renderHeaderChannels}
			{renderChannels}
			<div className={cx("pagination")}>
				{channels?.length > 10 && (
					<Pagination defaultCurrent={1} total={channels?.length} size='small' onChange={onChangePage} current={currentPage} pageSize={dataLimit} />
				)}
			</div>
		</div>
	);
};

export default ChannelList;
