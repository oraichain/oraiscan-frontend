import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import cn from "classnames/bind";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Select from "antd/lib/select";
import Avatar from "antd/lib/avatar";

// styles
import styles from "./RelayerAsset.module.scss";

const cx = cn.bind(styles);
const {Option} = Select;

const RelayerAsset = () => {
	const options = {
		chart: {
			type: "column",
		},

		title: {
			text: "Highcharts responsive chart",
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
			categories: ["Apples", "Oranges", "Bananas"],
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

		series: [
			{
				name: "Christmas Eve",
				data: [1, 4, 3],
			},
			{
				name: "Christmas Day before dinner",
				data: [6, 4, 2],
			},
			{
				name: "Christmas Day after dinner",
				data: [8, 4, 3],
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
								<Select defaultValue='received' style={{width: 100}}>
									<Option value='received'>Received</Option>
									<Option value='send'>Send</Option>
								</Select>
							</div>
						</div>

						<Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} className={cx("asset-header")}>
							<Col span={12}>Name</Col>
							<Col span={4}>Total Txs</Col>
							<Col span={4}>Total Amount</Col>
							<Col span={4}>Total Value</Col>
						</Row>

						<Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}} className={cx("asset-body")}>
							<Col span={12} className={cx("info-container")}>
								<Avatar size='default' />
								<div className={cx("channel-info")}>
									<div className={cx("channel-name")}>ATOM</div>
									<div className={cx("channel-desc")}>channel-0 (transfer)</div>
								</div>
							</Col>
							<Col span={4}>xxx</Col>
							<Col span={4}>Txxx</Col>
							<Col span={4}>xxxx</Col>
						</Row>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default RelayerAsset;
