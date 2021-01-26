import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import consts from "src/constants/consts";
import TogglePageBar from "src/components/common/TogglePageBar";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import {RequestsListTable} from "src/components/Requests";
import styles from "./Requests.scss";

const cx = cn.bind(styles);

export default function(props) {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	let titleSection;
	if (isLargeScreen) {
		titleSection = (
			<TitleWrapper>
				<PageTitle title={"All requests"} />
				<StatusBox />
			</TitleWrapper>
		);
	} else {
		titleSection = <TogglePageBar type='requests' />;
	}

	return (
		<Container fixed className={cx("request-list")}>
			{titleSection}
			<h1 className={cx("coming-soon")}>COMING SOON</h1>
		</Container>
	);
}
