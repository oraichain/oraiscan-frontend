import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import cn from "classnames/bind";
import Table from "antd/lib/table";

// styles
import styles from "./RelayerTransaction.module.scss";
import moment from "moment";

const cx = cn.bind(styles);

const RelayerTransaction = ({dataTransactions, handleOnChange, pagination}) => {
	const columns = [
		{
			title: "Tx Hash",
			key: "tx_hash",
			render: (text, record, index) => {
				return <p>{record?.transaction?.tx_hash}</p>;
			},
		},
		{
			title: "Type",
			dataIndex: "tx_type",
			key: "tx_type",
		},
		{
			title: "Amount",
			dataIndex: "amount",
			render: (text, record, index) => {
				return <p>{record?.transaction?.amount}</p>;
			},
		},
		{
			title: "Fee",
			dataIndex: "fee",
			render: (text, record, index) => {
				return <p>{record?.transaction?.fee}</p>;
			},
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
			with: 100,
		},
	];
	return (
		<div className={cx("transaction-container")}>
			<div className={cx("title")}>Transactions</div>
			<Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
				<Col span={24}>
					<Table
						dataSource={dataTransactions?.data}
						scroll={{x: 1000}}
						columns={columns}
						className={cx("custom-table")}
						onChange={handleOnChange}
						pagination={{total: dataTransactions?.total, pageSize: 5, current: pagination?.current}}
					/>
				</Col>
			</Row>
		</div>
	);
};

export default RelayerTransaction;
