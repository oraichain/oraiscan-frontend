// @ts-nocheck
import React from "react";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import RequestCard from "src/components/OracleScriptDetail/RequestCard";
import DetailsCard from "src/components/OracleScriptDetail/DetailsCard";
import TogglePageBar from "src/components/common/TogglePageBar";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import styles from "./DataSourcesDetail.scss";

const cx = cn.bind(styles);

const OracleScriptDetail = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	let titleSection;
	let detailsCard;
	let requestCard;

	if (isLargeScreen) {
		titleSection = (
			<Container fixed>
				<TitleWrapper>
					<PageTitle title={"Oracle Script Details"} />
					<StatusBox />
				</TitleWrapper>
			</Container>
		);
	} else {
		titleSection = <TogglePageBar type='oracle-scripts' />;
	}

	detailsCard = <DetailsCard />;

	requestCard = <RequestCard />;

	return (
		<>
			{titleSection}
			<Container fixed className={cx("oracle-script-detail")}>
				{detailsCard}
				{requestCard}
			</Container>
		</>
	);
};

export default OracleScriptDetail;
