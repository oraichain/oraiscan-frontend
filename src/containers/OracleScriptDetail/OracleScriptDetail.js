import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import _ from "lodash";
import {useParams} from "react-router-dom";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import {Infomation, OracleScriptDetailTable} from "src/components/OracleScriptDetail";
import consts from "src/constants/consts";
import {useFetch} from "src/hooks";
import styles from "./DataSourcesDetail.scss";

const cx = cn.bind(styles);

export default function(props) {
	const {id} = useParams();
	const url = `${consts.LCD_API_BASE}${consts.LCD_API.ORACLE_SCRIPT_DETAIL}/${id}`;
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
				<PageTitle title='Oracle Scripts Details' />
				<StatusBox data={dataForStatusBox} />
			</TitleWrapper>

			<div className={cx("detail-section")}>{!_.isNil(state.data) && <Infomation data={state.data.result} />}</div>

			<OracleScriptDetailTable pages={pages} onPageChange={onPageChange} />
		</Container>
	);
}
