import React from "react";
import cn from "classnames/bind";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Select } from "antd";
import "antd/dist/antd.css";

// helper
import { ThemeSetup } from "src/helpers/helper";

// styles
import styles from "./RelayerAsset.module.scss";

// constants
const cx = cn.bind(styles);
const { Option } = Select;
const dataLimit = 5;

const RelayerAsset = ({relayerAssetDaily}) => {
	const dataCategories = relayerAssetDaily && Object.keys(relayerAssetDaily);
	const dataReceived = dataCategories?.map(item => relayerAssetDaily[item]?.Receive);
	const dataTransfer = dataCategories?.map(item => relayerAssetDaily[item]?.Transfer);
	const { isDarkTheme } = ThemeSetup();
	const options = {
		chart: {
			type: "column",
			height: 460,
			backgroundColor: isDarkTheme ? "#302737" : "#FFFF",
		},
		title: {
			text: "Weekly Transferred Value",
			style: {
				fontSize: "14px",
				fontWeight: 1000,
				color: isDarkTheme ? "#F6F7FB" : "#181818",
			},
		},
		subtitle: {
			text: "Resize the frame or click buttons to change appearance",
		},
		legend: {
			align: "right",
			verticalAlign: "middle",
			layout: "vertical",
			itemStyle: {
				color: isDarkTheme ? "#F6F7FB" : "#181818",
			},
		},
		xAxis: {
			categories: dataCategories,
			labels: {
				x: -10,
				style: {
					color:  isDarkTheme ? "#F6F7FB" : "#181818",
				}
			},
			title: {
				style: {
					color: "red",
				},
			},
		},
		credits: {
			enabled: false,
		},

		yAxis: {
			allowDecimals: false,
			title: {
				text: "Amount",
			},
			labels: {
				style: {
					color:  isDarkTheme ? "#F6F7FB" : "#181818",
				}
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
						maxWidth: 280,
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
								y: -5
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
		<div className={cx("chart")}>
			<div className={cx("chart-list")}>
				<HighchartsReact highcharts={Highcharts} options={options} />
			</div>
		</div>
	);
};

export default RelayerAsset;
