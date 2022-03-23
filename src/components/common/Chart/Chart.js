import React, {useMemo, useRef, useEffect} from "react";
import HighchartsReact from "highcharts-react-official";
import highcharts from "highcharts";

import {_, formatNumber, getHours, getTime} from "src/lib/scripts";
import {useSelector} from "src/hooks";
import {themeIds} from "src/constants/themes";

import "./Chart.css";

export default function({options, data, showAxis = true, displayMax = false, wrapperWidth}) {
	const activeThemeId = useSelector(state => state.activeThemeId);
	const myRef = useRef();
	useEffect(() => {
		// myRef.current.chart.setSize(wrapperWidth, 250);
	}, [wrapperWidth]);

	const xAxis = {
		visible: true,
		labels: {
			x: 10,
			overflow: "allow",
			align: "center",
			formatter: function() {
				return getHours(this.value);
			},
			maxStaggerLines: 1,
			style: {
				color: activeThemeId === themeIds.LIGHT ? "#4b525d" : "#EBEAEF",
				fontSize: "11px",
				opacity: "0.6",
			},
		},
		minPadding: 0,
		maxPadding: 0,
		gridLineColor: activeThemeId === themeIds.LIGHT ? "#eeeeee" : "#423F5A",
		tickPosition: "outside",
		tickColor: "transaprent",
		endOnTick: false,
	};
	const yAxis = {
		visible: true,
		// opposite: true,
		// endOnTick: true,
		// gridLineColor: "#eeeeee",
		labels: {
			enabled: true,
			align: "left",
			x: -25,
			y: 4,
			style: {
				color: activeThemeId === themeIds.LIGHT ? "#4b525d" : "#EBEAEF",
				fontSize: "11px",
				opacity: "0.8",
			},
			formatter: function() {
				return `$${this.value > 999 ? formatNumber(Math.floor(this.value), 3) : this.value}`;
			},
		},
		gridLineColor: activeThemeId === themeIds.LIGHT ? "#e6e6e6" : "#423F5A",
		title: {
			text: "",
		},
		tickAmount: 5,
		tickPosition: "inside",
	};
	const series =
		activeThemeId === themeIds.LIGHT
			? {
					color: "#682FC5",
					fillColor: {
						linearGradient: {
							x1: 0,
							y1: 0,
							x2: 0,
							y2: 1,
						},
						stops: [
							[
								0,
								highcharts
									.color("#704BD8")
									.setOpacity(0.75)
									.get("rgba"),
							],
							[
								0.6,
								highcharts
									.color("#704BD8")
									.setOpacity(0.5)
									.get("rgba"),
							],
							[
								0.8,
								highcharts
									.color("#704BD8")
									.setOpacity(0.4)
									.get("rgba"),
							],
							[
								0.9,
								highcharts
									.color("#704BD8")
									.setOpacity(0.2)
									.get("rgba"),
							],
							[
								1,
								highcharts
									.color("transparent")
									.setOpacity(0.05)
									.get("rgba"),
							],
						],
					},
			  }
			: {
					color: "#A584DB",
					fillColor: {
						linearGradient: {
							x1: 0,
							y1: 0,
							x2: 0,
							y2: 1,
						},
						stops: [
							[
								0,
								highcharts
									.color("#271E2D")
									.setOpacity(0.6)
									.get("rgba"),
							],
							[
								0.6,
								highcharts
									.color("#704BD8")
									.setOpacity(0.4)
									.get("rgba"),
							],
							[
								0.8,
								highcharts
									.color("#704BD8")
									.setOpacity(0.3)
									.get("rgba"),
							],
							[
								0.9,
								highcharts
									.color("#704BD8")
									.setOpacity(0.2)
									.get("rgba"),
							],
							[
								1,
								highcharts
									.color("transparent")
									.setOpacity(0.05)
									.get("rgba"),
							],
						],
					},
			  };

	const defaultOptions = {
		credits: {
			enabled: false,
		},
		title: {
			text: "",
		},
		legend: {
			enabled: false,
		},
		chart: {
			type: "areaspline",
			margin: [5, 15, 20, 15],
			height: "230px",
			width: null,
			spacing: [20, 20, 20, 20],
			renderTo: "container",
			backgroundColor: activeThemeId === themeIds.LIGHT ? "#ffffff" : "transparent",
		},
		plotOptions: {
			series: {
				states: {
					hover: {
						enabled: true,
						lineWidthPlus: 0,
						halo: {
							size: 0,
							opacity: 0,
						},
					},
					select: {
						enabled: false,
					},
				},
				plotOptions: {
					series: {
						states: {
							hover: {
								enabled: true,
								lineWidthPlus: 0,
								halo: {
									size: 0,
									opacity: 0,
								},
							},
							select: {
								enabled: false,
							},
						},
						allowPointSelect: false,
						marker: {
							enabled: false,
						},
					},
				},
				allowPointSelect: false,
				marker: {
					enabled: false,
				},
			},
		},
		tooltip: {
			enabled: true,
			backgroundColor: activeThemeId === themeIds.LIGHT ? "#ffffff" : "transparent",
			borderColor: activeThemeId === themeIds.LIGHT ? "#e6e6e6" : "#2B5072",
			style: {
				color: activeThemeId === themeIds.LIGHT ? "#333333" : "#F6F7FB",
				fontSize: "25px",
			},
			borderRadius: 10,
			borderWidth: 1,
			headerShape: "callout",
			shadow: true,
			formatter: function() {
				return `<p>
				<span style='font-family: Montserrat,serif; font-size: 15px; font-weight: 500; font-stretch: normal; font-style: normal; line-height: 1.27; letter-spacing: normal; text-align: left; color:${
					activeThemeId === themeIds.LIGHT ? "#222222" : "#F6F7FB"
				}'>
					$ ${this.y > 999 ? formatNumber(Math.floor(this.y), 3) : this.y}
				</span>
				<br />
				<span style='font-family: "Open Sans",serif; font-size: 11px; font-weight: normal; font-stretch: normal; font-style: normal; line-height: 1.8; letter-spacing: normal; text-align: left; color: ${
					activeThemeId === themeIds.LIGHT ? "#4b525d" : "#F6F7FB"
				}'>
					${getTime(this.x)}
				</span>
				</p>
				`;
			},
			useHTML: false,
		},
	};

	const graphOptions = useMemo(() => {
		const [xMax, xMin, yMax, yMin] = [data[data.length - 1][0], data[0][0], _.max(_.map(data, v => v[1])), _.min(_.map(data, v => v[1]))];
		const size = data.length - 1;
		const indexes = [
			0,
			Math.floor(size / 6) + 1,
			Math.floor((size * 2) / 6) + 1,
			Math.floor((size * 3) / 6) + 1,
			Math.floor((size * 4) / 6) + 1,
			Math.floor((size * 5) / 6) + 1,
			size,
		];
		const tickPositions = [..._.map(indexes, idx => data[idx]?.[0])];
		return {
			series: [
				{
					...series,
					data: data,
				},
			],
			yAxis: [
				{
					...yAxis,
					visible: showAxis,
					max: displayMax ? yMax + 0.00000000001 : yMax + (yMax + yMin) / 200,
					min: displayMax ? yMin - 0.00000000001 : yMin - (yMax + yMin) / 200,
					tickPixelInterval: 100,
					tickAmount: displayMax ? 100 : 4,
				},
			],
			xAxis: [
				{
					...xAxis,
					visible: showAxis,
					max: xMax,
					min: xMin,
					tickPositions,
				},
			],
			// ...options,
			...defaultOptions,
		};
	}, [options, data, displayMax, showAxis, activeThemeId]);
	// return <HighchartsReact ref={myRef} highcharts={highcharts} options={graphOptions} containerProps={{style: {height: "100%", width: "100%"}}} />;
	return <HighchartsReact containerProps={{class: "highchart"}} highcharts={highcharts} options={graphOptions} />;
}
