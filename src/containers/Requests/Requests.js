// @ts-nocheck
import React, {useState} from "react";
import cn from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useGet} from "restful-react";
import Container from "@material-ui/core/Container";
import consts from "src/constants/consts";
import TogglePageBar from "src/components/common/TogglePageBar";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import FilterSection from "src/components/Requests/FilterSection";
import RequestGridView from "src/components/Requests/RequestGridView";
import RequestGridViewSkeleton from "src/components/Requests/RequestGridView/RequestGridViewSkeleton";
import RequestListView from "src/components/Requests/RequestListView";
import RequestListViewSkeleton from "src/components/Requests/RequestListView/RequestListViewSkeleton";
import styles from "./Requests.module.scss";

const cx = cn.bind(styles);

const Requests = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [isGridView, setIsGridView] = useState(true);
	const [keyword, setKeyword] = useState("");

	const path = consts.API.REQUESTS;
	const {data, loading, error} = useGet({
		path: path,
	});

	let titleSection;
	let filterSection;
	let requestView;

	if (isLargeScreen) {
		titleSection = (
			<Container fixed>
				<TitleWrapper>
					<PageTitle title={"All requests"} />
					<StatusBox />
				</TitleWrapper>
			</Container>
		);
	} else {
		titleSection = <TogglePageBar type='requests' />;
	}

	filterSection = <FilterSection isGridView={isGridView} keyword={keyword} setIsGridView={setIsGridView} setKeyword={setKeyword} />;

	if (loading) {
		requestView = isGridView ? <RequestGridViewSkeleton /> : <RequestListViewSkeleton />;
	} else {
		if (error) {
			requestView = isGridView ? <RequestGridView data={[]} /> : <RequestListView data={[]} />;
		} else {
			requestView = isGridView ? <RequestGridView data={data?.data} /> : <RequestListView data={data?.data} />;
		}
	}

	return (
		<>
			{titleSection}
			<Container fixed className={cx("request-list")}>
				{filterSection}
				{requestView}
			</Container>
		</>
	);
};

Requests.propTypes = {};
Requests.defaultProps = {};

export default Requests;
