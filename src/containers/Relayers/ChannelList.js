import React from "react";
import cn from "classnames/bind";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Pagination from "antd/lib/pagination";

// styles
import styles from "./Channel.module.scss";

const cx = cn.bind(styles);

const ChannelList = () => {
	const dataSource = [
		{
			key: "1",
			channel1: "channel1",
			channel2: "channel2",
			operatingPeriod: "52 Days",
			txs: "120",
			value: "000000000",
		},
		{
			key: "2",
			channel1: "channel1",
			channel2: "channel2",
			operatingPeriod: "52 Days",
			txs: "120",
			value: "000000000",
		},
	];

	const columns = [
		{
			title: "#",
			dataIndex: "key",
			key: "key",
		},
		{
			title: "channel1",
			dataIndex: "channel1",
			key: "channel1",
		},
		{
			title: "channel2",
			dataIndex: "channel2",
			key: "channel2",
		},
		{
			title: "Operating Period",
			dataIndex: "operatingPeriod",
			key: "operatingPeriod",
		},
		{
			title: "24h Txs",
			dataIndex: "txs",
			key: "txs",
		},
		{
			title: "Value",
			dataIndex: "value",
			key: "value",
		},
	];

	return (
		<div className={cx("channel-list-wrapper")}>
			<Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
				<Col span={1}>
					<div>#</div>
				</Col>
				<Col span={4}>
					<div className={cx("flexCenter")}>channel1</div>
				</Col>
				<Col span={1} />
				<Col span={4}>
					<div className={cx("flexCenter")}>channel2</div>
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

			<Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} className={cx("body-list", "flexCenter")}>
				<Col span={1}>
					<div>1</div>
				</Col>
				<Col span={4}>
					<div className={cx("channel-name", "flexCenter")}>
						<div>channel1</div>
						<span className={cx("dot")} />
					</div>
				</Col>
				<Col span={1}>
					<div className={cx("line-wrapper")} />
				</Col>
				<Col span={4}>
					<div className={cx("channel-name", "flexCenter")}>
						<span className={cx("dot")} />
						<div>channel2</div>
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
			<div className={cx("pagination")}>
				<Pagination simple defaultCurrent={2} total={50} />
			</div>
		</div>
	);
};

export default ChannelList;
