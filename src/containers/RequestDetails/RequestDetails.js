// @ts-nocheck
import React, {useState} from "react";
import cn from "classnames/bind";
import {useParams} from "react-router-dom";
import consts from "src/constants/consts";
import PropTypes from "prop-types";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import FilterSection from "src/components/RequestDetails/FilterSection";
import AIDataSources from "src/components/RequestDetails/AIDataSources/AIDataSources";
import Reports from "src/components/RequestDetails/Reports";
import Result from "src/components/RequestDetails/Result";
import styles from "./RequestDetails.module.scss";

const cx = cn.bind(styles);

export const tabIds = {
	AI_DATA_SOURCES: "1",
	REPORTS: "2",
	RESULT: "3",
};

export const tabs = [
	{
		label: "Ai data sources",
		value: tabIds.AI_DATA_SOURCES,
	},
	{
		label: "Reports",
		value: tabIds.REPORTS,
	},
	{
		label: "Result",
		value: tabIds.RESULT,
	},
];

const RequestDetails = ({}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [keyword, setKeyword] = useState("");
	const [tabId, setTabId] = useState(tabIds.REPORTS);
	const params = useParams();
	const id = params?.["id"];

	const onTabChange = value => {
		setTabId(value);
	};

	let titleSection;
	let filterSection;
	let detailsCard;

	if (isLargeScreen) {
		titleSection = (
			<TitleWrapper>
				<PageTitle title={"Request details"} />
				<StatusBox />
			</TitleWrapper>
		);
	} else {
		titleSection = <TogglePageBar type='requests' />;
	}

	filterSection = <FilterSection keyword={keyword} setKeyword={setKeyword} />;

	switch (tabId) {
		case tabIds.AI_DATA_SOURCES:
			detailsCard = <AIDataSources id={id} tabId={tabId} tabs={tabs} onTabChange={onTabChange} />;
			break;
		case tabIds.REPORTS:
			detailsCard = <Reports id={id} tabId={tabId} tabs={tabs} onTabChange={onTabChange} />;
			break;
		case tabIds.RESULT:
			detailsCard = <Result id={id} tabId={tabId} tabs={tabs} onTabChange={onTabChange} />;
			break;
		default:
			break;
	}

	return (
		<Container fixed className={cx("request-details")}>
			{titleSection}
			{filterSection}
			{detailsCard}
		</Container>
	);
};

RequestDetails.propTypes = {};
RequestDetails.defaultProps = {};

export default RequestDetails;
