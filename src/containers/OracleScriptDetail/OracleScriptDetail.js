// @ts-nocheck
import React, {useState} from "react";
import {useGet} from "restful-react";
import PropTypes from "prop-types";
import {useTheme} from "@material-ui/core/styles";
import {useParams} from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import consts from "src/constants/consts";
import DetailsCard from "src/components/OracleScriptDetail/DetailsCard";
import DetailsCardSkeleton from "src/components/OracleScriptDetail/DetailsCard/DetailsCardSkeleton";
import TogglePageBar from "src/components/common/TogglePageBar";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import RequestCard from "src/components/OracleScriptDetail/RequestCard";
import CodeCard from "src/components/OracleScriptDetail/CodeCard";
import styles from "./OracleScriptDetail.module.scss";

const cx = cn.bind(styles);

const OracleScriptDetail = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [isCodeCardVisible, setIsCodeCardVisible] = useState(false);
	const params = useParams();
	const oracleScriptId = params?.["id"];

	const showCodeCard = () => {
		setIsCodeCardVisible(true);
	};

	const showRequestCard = () => {
		setIsCodeCardVisible(false);
	};

	const path = `${consts.API.ORACLE_SCRIPTS}/${oracleScriptId}`;
	const {data, loading, error} = useGet({
		path: path,
	});

	let titleSection;
	let detailsCard;
	let bottomCard;

	if (isLargeScreen) {
		titleSection = (
			<TitleWrapper>
				<PageTitle title={"Oracle Script Details"} />
				<StatusBox />
			</TitleWrapper>
		);
	} else {
		titleSection = <TogglePageBar type='oracle-scripts' />;
	}

	if (loading) {
		detailsCard = <DetailsCardSkeleton />;
	} else {
		if (error) {
			detailsCard = <DetailsCard data={{}} />;
		} else {
			detailsCard = <DetailsCard data={data} />;
		}
	}

	bottomCard = isCodeCardVisible ? (
		<CodeCard oracleScriptId={oracleScriptId} showRequestCard={showRequestCard} />
	) : (
		<RequestCard oracleScriptId={oracleScriptId} showCodeCard={showCodeCard} />
	);

	return (
		<Container fixed className={cx("oracle-script-detail")}>
			{titleSection}
			{detailsCard}
			{bottomCard}
		</Container>
	);
};

OracleScriptDetail.propTypes = {};
OracleScriptDetail.defaultProps = {};

export default OracleScriptDetail;
