import React, {useState, useEffect} from "react";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import {DataSourceTable} from "src/components/Datasources";
import consts from "src/constants/consts";
import {useFetch} from "src/hooks";
import styles from "./DataSources.scss";

const cx = cn.bind(styles);

export default function(props) {
	const [dataRows, setDataRows] = useState([
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
		["1", "Oraichain", "12,411,351", "6.56%", "100%", "2.5%"],
	]);

	const baseURL = `${consts.API_BASE}/validators`;
	const [state, , setUrl] = useFetch(`${baseURL}`);
	console.log(state);

	useEffect(() => {
		// setUrl(baseURL);
	}, []);

	const pages = Math.ceil(dataRows.length / consts.TABLE.PAGE_SIZE);
	const onPageChange = page => {
		console.log("onPageChange = ", page);
	};
	console.log(pages);
	return (
		<Container fixed className={cx("validator-list")}>
			<TitleWrapper>
				<PageTitle title='All Data Sources' />
			</TitleWrapper>

			<DataSourceTable dataRows={dataRows.slice(0, 10)} pages={pages} onPageChange={onPageChange} />
		</Container>
	);
}
