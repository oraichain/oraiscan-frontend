import React, {useState, useEffect} from "react";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import {DataSourceTable} from "src/components/Datasources";
import consts from "src/constants/consts";
import {useFetch} from "src/hooks";
import styles from "./DataSources.scss";

const cx = cn.bind(styles);

export default function(props) {
	const [dataRows, setDataRows] = useState([
		["1", "Query latest cryptocurrency token prices from CoinGecko.", "800 ORAI", 0, "2020-12-15 06:36:45.738"],
		["1", "Query latest cryptocurrency token prices from CoinGecko.", "800 ORAI", 0, "2020-12-15 06:36:45.738"],
		["1", "Query latest cryptocurrency token prices from CoinGecko.", "800 ORAI", 0, "2020-12-15 06:36:45.738"],
		["1", "Query latest cryptocurrency token prices from CoinGecko.", "800 ORAI", 0, "2020-12-15 06:36:45.738"],
		["1", "Query latest cryptocurrency token prices from CoinGecko.", "800 ORAI", 0, "2020-12-15 06:36:45.738"],
		["1", "Query latest cryptocurrency token prices from CoinGecko.", "800 ORAI", 0, "2020-12-15 06:36:45.738"],
		["1", "Query latest cryptocurrency token prices from CoinGecko.", "800 ORAI", 0, "2020-12-15 06:36:45.738"],
		["1", "Query latest cryptocurrency token prices from CoinGecko.", "800 ORAI", 0, "2020-12-15 06:36:45.738"],
		["1", "Query latest cryptocurrency token prices from CoinGecko.", "800 ORAI", 0, "2020-12-15 06:36:45.738"],
		["1", "Query latest cryptocurrency token prices from CoinGecko.", "800 ORAI", 0, "2020-12-15 06:36:45.738"],
		["1", "Query latest cryptocurrency token prices from CoinGecko.", "800 ORAI", 0, "2020-12-15 06:36:45.738"],
		["1", "Query latest cryptocurrency token prices from CoinGecko.", "800 ORAI", 0, "2020-12-15 06:36:45.738"],
		["1", "Query latest cryptocurrency token prices from CoinGecko.", "800 ORAI", 0, "2020-12-15 06:36:45.738"],
		["1", "Query latest cryptocurrency token prices from CoinGecko.", "800 ORAI", 0, "2020-12-15 06:36:45.738"],
		["1", "Query latest cryptocurrency token prices from CoinGecko.", "800 ORAI", 0, "2020-12-15 06:36:45.738"],
		["1", "Query latest cryptocurrency token prices from CoinGecko.", "800 ORAI", 0, "2020-12-15 06:36:45.738"],
		["1", "Query latest cryptocurrency token prices from CoinGecko.", "800 ORAI", 0, "2020-12-15 06:36:45.738"],
		["1", "Query latest cryptocurrency token prices from CoinGecko.", "800 ORAI", 0, "2020-12-15 06:36:45.738"],
		["1", "Query latest cryptocurrency token prices from CoinGecko.", "800 ORAI", 0, "2020-12-15 06:36:45.738"],
		["1", "Query latest cryptocurrency token prices from CoinGecko.", "800 ORAI", 0, "2020-12-15 06:36:45.738"],
		["1", "Query latest cryptocurrency token prices from CoinGecko.", "800 ORAI", 0, "2020-12-15 06:36:45.738"],
	]);

	const baseURL = `${consts.API_BASE}/api/transaction/ai_data_source?name`;
	const [state, , setUrl] = useFetch(`${baseURL}`);
	console.log(state);

	useEffect(() => {
		// setUrl(baseURL);
	}, []);

	const pages = Math.ceil(state?.data?.data?.length || 0 / consts.TABLE.PAGE_SIZE);
	const onPageChange = page => {
		console.log("onPageChange = ", page);
	};
	const dataForStatusBox = [
		{
			label: "Price",
			value: "$4.73",
		},
		{
			label: "Height",
			value: "4,374,598",
		},
		{
			label: "Bonded",
			value: "189,132,631",
		},
		{
			label: "Inflation",
			value: "7.00%",
		},
	];
	return (
		<Container fixed className={cx("validator-list")}>
			<TitleWrapper>
				<PageTitle title='Data Sources' />
				<StatusBox data={dataForStatusBox} />
			</TitleWrapper>

			{/* <DataSourceTable dataRows={state?.data?.data || []} pages={pages} onPageChange={onPageChange} /> */}
			<DataSourceTable dataRows={dataRows.slice(0, 10)} pages={pages} onPageChange={onPageChange} />
		</Container>
	);
}
