import React, {useMemo, useState} from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import cn from "classnames/bind";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import {Select} from "antd";
import Avatar from "antd/lib/avatar";
import Pagination from "antd/lib/pagination";
import "antd/dist/antd.css";

// styles
import styles from "./RelayerAsset.module.scss";

// constants
import {TX_TYPE} from "./index";

const cx = cn.bind(styles);
const {Option} = Select;
const dataLimit = 10;

const RelayerAsset = ({relayerAssetDaily, relayerAssetList, changeTxType, txType}) => {
	const [currentPage, setCurrentPage] = useState(1);
	const dataCategories = relayerAssetDaily && Object.keys(relayerAssetDaily);
	const dataReceived = dataCategories?.map(item => relayerAssetDaily[item]?.Receive);
	const dataTransfer = dataCategories?.map(item => relayerAssetDaily[item]?.Transfer);

	const options = {
		chart: {
			type: "column",
		},

		title: {
			text: "Weekly Transferred Value",
		},

		subtitle: {
			text: "Resize the frame or click buttons to change appearance",
		},

		legend: {
			align: "right",
			verticalAlign: "middle",
			layout: "vertical",
		},

		xAxis: {
			categories: dataCategories,
			labels: {
				x: -10,
			},
		},

		yAxis: {
			allowDecimals: false,
			title: {
				text: "Amount",
			},
		},

		plotOptions: {
			column: {
				stacking: "normal",
			},
		},

		series: [
			{
				name: "Received",
				data: dataReceived,
			},
			{
				name: "Transfer",
				data: dataTransfer,
			},
		],

		responsive: {
			rules: [
				{
					condition: {
						maxWidth: 500,
					},
					chartOptions: {
						legend: {
							align: "center",
							verticalAlign: "bottom",
							layout: "horizontal",
						},
						yAxis: {
							labels: {
								align: "left",
								x: 0,
								y: -5,
							},
							title: {
								text: null,
							},
						},
						subtitle: {
							text: null,
						},
						credits: {
							enabled: false,
						},
					},
				},
			],
		},
	};

	const onChangePage = page => {
		setCurrentPage(page);
	};

	const getPaginatedData = () => {
		const startIndex = currentPage * dataLimit - dataLimit;
		const endIndex = startIndex + dataLimit;
		return relayerAssetList?.slice(startIndex, endIndex);
	};

	const listAssets = getPaginatedData();

	const renderListAssets = useMemo(() => {
		return listAssets?.map(item => (
			<Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} className={cx("asset-body")}>
				<Col span={12} className={cx("info-container")}>
					<Avatar size='default' src={item?.images?.large} />
					<div className={cx("channel-info")}>
						<div className={cx("channel-name")}>{item?.denom}</div>
						<div className={cx("channel-desc")}>{item?.channel_id}</div>
					</div>
				</Col>
				<Col span={4}>{item?.total_txs}</Col>
				<Col span={4}>{item?.total_value.toFixed(2)}</Col>
			</Row>
		));
	}, [listAssets]);

	return (
		<div className={cx("relayer-asset")}>
			<Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} style={{height: "100%"}}>
				<Col span={8}>
					<div className={cx("chart")}>
						<HighchartsReact highcharts={Highcharts} options={options} />
					</div>
				</Col>

				<Col span={16} className={cx("asset-container")}>
					<div className={cx("asset")}>
						<div className={cx("header")}>
							<div className={cx("title")}>Relayed Assets</div>
							<div className={cx("select")}>
								<Select defaultValue={TX_TYPE.RECEIVE} style={{width: 100}} onChange={changeTxType}>
									<Option value={TX_TYPE.RECEIVE}>Received</Option>
									<Option value={TX_TYPE.TRANSFER}>Transfer</Option>
								</Select>
							</div>
						</div>

						<Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} className={cx("asset-header")}>
							<Col span={12}>Name</Col>
							<Col span={4}>Total Txs</Col>
							<Col span={4}>Total Value</Col>
						</Row>

						{renderListAssets}

						<div className={cx("pagination")}>
							{relayerAssetList?.length > 10 && (
								<Pagination
									defaultCurrent={1}
									total={relayerAssetList?.length}
									size='small'
									onChange={onChangePage}
									current={currentPage}
									pageSize={dataLimit}
								/>
							)}
						</div>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default RelayerAsset;
