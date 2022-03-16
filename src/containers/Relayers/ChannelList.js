import React, {useMemo} from "react";
import cn from "classnames/bind";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Pagination from "antd/lib/pagination";
import Space from "antd/lib/space";
import Avatar from "antd/lib/avatar/avatar";

// styles
import styles from "./Channel.module.scss";

const cx = cn.bind(styles);

const ChannelList = ({channels, channelName}) => {
	const renderHeaderChannels = useMemo(() => {
		return (
			<Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
				<Col span={1}>
					<div>#</div>
				</Col>
				<Col span={4}>
					<div className={cx("flexCenter")}>
						<Space>
							<Avatar size='small' />
							{channelName}
						</Space>
					</div>
				</Col>
				<Col span={1} />
				<Col span={4}>
					<div className={cx("flexCenter")}>
						<Space>
							<Avatar size='small' />
							channel partner
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
			return (
				<Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} className={cx("body-list")}>
					<Col span={1}>
						<div>{index + 1}</div>
					</Col>
					<Col span={4}>
						<div className={cx("channel-name", "flexCenter")}>
							<div>{item?.channel_id}</div>
							<span className={cx("dot")} />
						</div>
					</Col>
					<Col span={1}>
						<div className={cx("line-wrapper")} />
					</Col>
					<Col span={4}>
						<div className={cx("channel-name", "partners")}>
							<span className={cx("dot")} />
							<div>{item?.counterparty_channel_id}</div>
						</div>
					</Col>

					<Col span={4} />

					<Col span={4}>
						<div>52 Days</div>
					</Col>
					<Col span={3}>
						<div>xxxxzzz</div>
					</Col>
					<Col span={3}>
						<div>xxxxx</div>
					</Col>
				</Row>
			);
		};

		return channels.map((item, index) => renderChannelItem(item, index));
	}, [channels]);

	return (
		<div className={cx("channel-list-wrapper")}>
			{renderHeaderChannels}
			{renderChannels}
			<div className={cx("pagination")}>
				<Pagination defaultCurrent={2} total={50} size='small' />
			</div>
		</div>
	);
};

export default ChannelList;
