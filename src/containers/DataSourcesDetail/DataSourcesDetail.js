import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import {Infomation, DataSourceDetailListTable} from "src/components/DataSourcesDetail";
import consts from "src/constants/consts";
import {useFetch} from "src/hooks";
import styles from "./DataSourcesDetail.scss";

const cx = cn.bind(styles);

export default function(props) {
	const url = `${consts.LCD_API_BASE}${consts.API.DATA_SOURCES.replace("datasources", "datasource")}/${window.location.href.split("/").pop()}`;
	const [state, , , , setUrl] = useFetch(`${url}`);
	const pages = parseInt(state?.data?.result?.count || 0);
	const onPageChange = page => {
		setUrl(`${url}`);
	};
	const dataForStatusBox = [
		{
			label: "Price",
			value: "$455.73",
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
				<PageTitle title='Data Sources Details' />
				<StatusBox data={dataForStatusBox} />
			</TitleWrapper>

			<div className={cx("detail-section")}>
				{state.data !== undefined && state.data !== null && (
					<Infomation name={state.data.result.name} owner={state.data.result.owner} description={state.data.result.description} />
				)}
			</div>

			<DataSourceDetailListTable pages={pages} onPageChange={onPageChange} />
		</Container>
	);
}
