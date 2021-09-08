// @ts-nocheck
import React, {useMemo, useState} from "react";
import cn from "classnames/bind";
import {useParams, useHistory} from "react-router-dom";
import queryString from "query-string";
import consts from "src/constants/consts";
import PropTypes from "prop-types";
import {useTheme} from "@material-ui/core/styles";
import {useGet} from "restful-react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import DataSources from "src/components/OracleRequestDetail/DataSources/DataSources";
import Reports from "src/components/OracleRequestDetail/Reports";
import Results from "src/components/OracleRequestDetail/Results";
import styles from "./OracleRequestDetails.module.scss";
import NavigateBackBar from "src/components/common/NavigateBackBar";

const cx = cn.bind(styles);

export const tabs = {
	AI_DATA_SOURCES: "AI data sources",
	TEST_CASE: "Test cases",
	REPORTS: "Reports",
	RESULT: "Result",
};

const OracleRequestDetail = ({}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [activeTab, setActiveTab] = React.useState(tabs.AI_DATA_SOURCES);
	const params = useParams();
	const id = params?.["id"];
	// const history = useHistory();
	// const queryStringParse = queryString.parse(history.location.search) || {};
	// const contract = queryStringParse?.contract ?? "";
	const contract = params?.["contract"];

	let titleSection;
	if (isLargeScreen) {
		titleSection = (
			<Container fixed>
				<TitleWrapper>
					<PageTitle title={"Request details"} />
					<StatusBox />
				</TitleWrapper>
			</Container>
		);
	} else {
		titleSection = (
			<>
				<TogglePageBar type='ai_requests' />
				<NavigateBackBar type='ai_requests' />
			</>
		);
	}

	let dataSourcesCard = <DataSources contract={contract} id={id} />;
	// let testCasesCard = <DataSources contract={contract} id={id} />;
	let reportsCard = <Reports contract={contract} id={id} />;
	let resultsCard = <Results contract={contract} id={id} />;

	return (
		<>
			{titleSection}
			<Container fixed className={cx("request-details")}>
				{dataSourcesCard}
				{/* {testCasesCard} */}
				{reportsCard}
				{resultsCard}
			</Container>
		</>
	);
};

OracleRequestDetail.propTypes = {};
OracleRequestDetail.defaultProps = {};

export default OracleRequestDetail;
