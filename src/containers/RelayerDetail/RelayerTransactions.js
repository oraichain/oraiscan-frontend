import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import cn from "classnames/bind";
import Table from "antd/lib/table";
import moment from "moment";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// components
import Pagination from "src/components/common/Pagination";

// styles
import styles from "./RelayerTransaction.module.scss";

const cx = cn.bind(styles);

const RelayerTransaction = ({dataTransactions, handleOnChange, pagination}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const columns = [
		{
			title: "Tx Hash",
			key: "tx_hash",
			render: (text, record, index) => {
				return <p>{record?.transaction?.tx_hash}</p>;
			},
			width: 100,
		},
		{
			title: "Type",
			dataIndex: "tx_type",
			key: "tx_type",
			width: 100,
		},
		{
			title: "Amount",
			dataIndex: "amount",
			render: (text, record, index) => {
				return <p>{record?.transaction?.amount}</p>;
			},
			width: 100,
		},
		{
			title: "Fee",
			dataIndex: "fee",
			render: (text, record, index) => {
				return <p>{record?.transaction?.fee}</p>;
			},
			width: 100,
		},
		{
			title: "Height",
			dataIndex: "height",
			render: (text, record, index) => {
				return <p>{record?.transaction?.height}</p>;
			},
			width: 100,
		},
		{
			title: "Time",
			dataIndex: "tx_type",
			render: (text, record, index) => {
				const time = moment(record?.transaction?.timestamp).fromNow();
				return <p>{time}</p>;
			},
			width: 100,
		},
	];

	const renderListCardMobile = () => {
		return dataTransactions?.data?.map(item => {
			const time = moment(item?.transaction?.timestamp).fromNow();
			return (
				<Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} className={cx("list-card-mobile")}>
					<Col span={12}>
						<div>
							<div>Tx Hash</div>
							<div>Type</div>
							<div>Amount</div>
							<div>Fee</div>
							<div>Height</div>
							<div>Time</div>
						</div>
					</Col>

					<Col span={12}>
						<div className={cx("list-card-mobile-right")}>
							<div> {item?.transaction?.tx_hash}</div>
							<div>{item?.tx_type}</div>
							<div>{item?.transaction?.amount}</div>
							<div>{item?.transaction?.fee}</div>
							<div>{item?.transaction?.height}</div>
							<div>{time}</div>
						</div>
					</Col>
				</Row>
			);
		});
	};

	return (
		<div className={cx("transaction-container")}>
			<div className={cx("title")}>Transactions</div>
			<Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
				<Col span={24}>
					<div style={{width: "100%"}}>
						{isLargeScreen ? (
							<Table dataSource={dataTransactions?.data} size='middle' columns={columns} className={cx("custom-table")} pagination={false} />
						) : (
							renderListCardMobile()
						)}
						<Pagination pages={dataTransactions?.total} page={pagination?.current} onChange={(e, page) => handleOnChange({current: page})} />
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default RelayerTransaction;
