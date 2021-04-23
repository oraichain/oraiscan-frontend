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
import Tabs from "./TabBar";
import styles from "./RequestDetails.module.scss";

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
	const [keyword, setKeyword] = useState("");
	const params = useParams();
	const id = params?.["id"];

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

	filterSection = (
		<>
			<Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
			{activeTab === tabs.AI_DATA_SOURCES && <AIDataSources />}
			{activeTab === tabs.REPORTS && <Reports />}
			{activeTab === tabs.RESULT && <Result />}
		</>
	);

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
