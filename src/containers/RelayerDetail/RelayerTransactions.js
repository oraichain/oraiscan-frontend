import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import cn from "classnames/bind";
import Table from "antd/lib/table";

// styles
import styles from "./RelayerTransaction.module.scss";

const cx = cn.bind(styles);

const RelayerTransaction = () => {
	const dataSource = [
		{
			key: "1",
			name: "Mike",
			age: 32,
			address: "10 Downing Street",
		},
		{
			key: "2",
			name: "John",
			age: 42,
			address: "10 Downing Street",
		},
	];

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Age",
			dataIndex: "age",
			key: "age",
		},
		{
			title: "Address",
			dataIndex: "address",
			key: "address",
		},
	];
	return (
		<div className={cx("transaction-container")}>
			<div>Transactions</div>
			<Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
				<Col span={24}>
					<Table dataSource={dataSource} columns={columns} />
				</Col>
			</Row>
		</div>
	);
};

export default RelayerTransaction;
