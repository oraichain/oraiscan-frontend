import React, {useState, useEffect} from "react";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useTheme} from "@material-ui/core/styles";

import TogglePageBar from "src/components/common/TogglePageBar";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import {DataSourceTable} from "src/components/Datasources";
import consts from "src/constants/consts";
import {useFetch} from "src/hooks";
import styles from "./DataSources.scss";

const cx = cn.bind(styles);

export default function(props) {
	const url = `${consts.LCD_API_BASE}${consts.LCD_API.DATA_SOURCES}`;
	const [currentPage, setCurrentPage] = useState(1);
	const [currentTextSearch, setCurrentTextSearch] = useState("");
	const [state, , , , setUrl] = useFetch(`${url}?limit=${consts.TABLE.PAGE_SIZE}&page=1`);
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

	const pages = Math.ceil(parseInt(state?.data?.result?.count || 0) / consts.TABLE.PAGE_SIZE);

	const onPageChange = page => {
		setCurrentPage(page);
		setUrl(`${url}?limit=${consts.TABLE.PAGE_SIZE}&page=${page}&name=${currentTextSearch}`);
	};

	const handleSearch = textSearch => {
		setCurrentTextSearch(textSearch);
		setUrl(`${url}?limit=${consts.TABLE.PAGE_SIZE}&page=${currentPage}&name=${textSearch}`);
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
			{isDesktop ? (
				<TitleWrapper>
					<PageTitle title='Data Sources' />
					<StatusBox data={dataForStatusBox} />
				</TitleWrapper>
			) : (
				<TogglePageBar type='data-sources' />
			)}

			<DataSourceTable dataSources={state?.data?.result?.data_sources || []} pages={pages} onPageChange={onPageChange} handleSearch={handleSearch} />
		</Container>
	);
}
