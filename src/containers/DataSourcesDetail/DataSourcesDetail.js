// @ts-nocheck
import React from "react";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import {useParams} from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useTheme} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";

import TogglePageBar from "src/components/common/TogglePageBar";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import {Information, DataSourceDetailListTable, RequestTableMobile} from "src/components/DataSourcesDetail";
import consts from "src/constants/consts";
import {useFetch} from "src/hooks";
import {ReactComponent as BackIcon} from "src/assets/icons/back.svg";
import NavigateBackBar from "src/components/common/NavigateBackBar";
import styles from "./DataSourcesDetail.module.scss";

const cx = cn.bind(styles);

export default function(props) {
	const {detailId} = useParams();
	const url = `${consts.LCD_API_BASE}${consts.LCD_API.DATA_SOURCE_DETAIL}/${detailId}`;
	const [state, , , , setUrl] = useFetch(`${url}`);
	const pages = parseInt(state?.data?.result?.count || 0);
	const history = useHistory();
	const theme = useTheme();
	const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
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
		<>
			{isDesktop ? (
				<Container fixed>
					<TitleWrapper>
						<PageTitle title='Data Sources Details' />
						<StatusBox data={dataForStatusBox} />
					</TitleWrapper>
				</Container>
			) : (
				<>
					<>
						<TogglePageBar type='data-sources' />
						<NavigateBackBar type='data-sources' />
					</>
				</>
			)}
			<Container fixed className={cx("validator-list")}>
				<div className={cx("detail-section")}>
					{state.data !== undefined && state.data !== null && (
						<Information name={state.data.result.name} owner={state.data.result.owner} description={state.data.result.description} isDesktop={isDesktop} />
					)}
				</div>

				{isDesktop ? (
					<DataSourceDetailListTable pages={pages} onPageChange={onPageChange} />
				) : (
					<>
						<RequestTableMobile />
						<RequestTableMobile />
						<RequestTableMobile />
						<RequestTableMobile />
					</>
				)}
			</Container>
		</>
	);
}
