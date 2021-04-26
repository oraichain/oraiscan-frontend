// @ts-nocheck
import React, {useMemo, useState} from "react";
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
import AIDataSources from "src/components/RequestDetails/AIDataSources/AIDataSources";
import Reports from "src/components/RequestDetails/Reports";
import Result from "src/components/RequestDetails/Result";
import styles from "./RequestDetails.module.scss";
import NavigateBackBar from "src/components/common/NavigateBackBar";

const cx = cn.bind(styles);

export const tabs = {
	AI_DATA_SOURCES: "Ai data sources",
	REPORTS: "Reports",
	RESULT: "Result",
};

const RequestDetails = ({}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [activeTab, setActiveTab] = React.useState(tabs.AI_DATA_SOURCES);
	const params = useParams();
	const id = params?.["id"];

	let titleSection;
	let detailsCard;

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

	switch (activeTab) {
		case tabs.AI_DATA_SOURCES:
			detailsCard = <AIDataSources id={id} activeTab={activeTab} setActiveTab={setActiveTab} />;
			break;
		case tabs.REPORTS:
			detailsCard = <Reports id={id} activeTab={activeTab} setActiveTab={setActiveTab} />;
			break;
		case tabs.RESULT:
			detailsCard = <Result id={id} activeTab={activeTab} setActiveTab={setActiveTab} />;
			break;
		default:
			break;
	}

	return (
		<>
			{titleSection}
			<Container fixed className={cx("request-details")}>
				{detailsCard}
			</Container>
		</>
	);
};

RequestDetails.propTypes = {};
RequestDetails.defaultProps = {};

export default RequestDetails;
