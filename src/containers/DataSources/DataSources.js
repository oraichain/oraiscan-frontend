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
	const url = `${consts.LCD_API_BASE}${consts.API.DATA_SOURCES}`;
	const [state, , , , setUrl] = useFetch(`${url}?limit=${consts.TABLE.PAGE_SIZE}&page=1`);

	const pages = parseInt(state?.data?.result?.count || 0);
	const onPageChange = page => {
		setUrl(`${url}?limit=${consts.TABLE.PAGE_SIZE}&page=${page}`);
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

			<DataSourceTable dataSources={state?.data?.result?.data_sources || []} pages={pages} onPageChange={onPageChange} />
			{/* <DataSourceTable dataRows={dataRows.slice(0, 10)} pages={pages} onPageChange={onPageChange} /> */}
		</Container>
	);
}
