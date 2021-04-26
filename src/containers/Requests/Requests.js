// @ts-nocheck
import React, {useState, useRef} from "react";
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
import Pagination from "src/components/common/Pagination";

const cx = cn.bind(styles);

const Requests = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [isGridView, setIsGridView] = useState(true);
	const [keyword, setKeyword] = useState("");
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const path = `${consts.API.REQUESTS}?limit=${consts.REQUEST.REQUESTS_LIMIT}&page_id=${pageId}`;

	const {data, loading, error} = useGet({
		path: path,
	});

	let titleSection;
	let filterSection;
	let requestView;
	let paginationSection;

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
		titleSection = <TogglePageBar type='ai_requests' />;
	}

	filterSection = <FilterSection isGridView={isGridView} keyword={keyword} setIsGridView={setIsGridView} setKeyword={setKeyword} />;

	if (loading) {
		requestView = isGridView ? <RequestGridViewSkeleton /> : <RequestListViewSkeleton />;
	} else {
		if (error) {
			totalPagesRef.current = null;
			requestView = isGridView ? <RequestGridView data={[]} /> : <RequestListView data={[]} />;
		} else {
			if (!isNaN(data?.page?.total_page)) {
				totalPagesRef.current = data.page.total_page;
			} else {
				totalPagesRef.current = null;
			}

			requestView = isGridView ? <RequestGridView data={data?.data} /> : <RequestListView data={data?.data} />;
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<>
			{titleSection}
			<Container fixed className={cx("request-list")}>
				{filterSection}
				{requestView}
				{paginationSection}
			</Container>
		</>
	);
};

Requests.propTypes = {};
Requests.defaultProps = {};

export default Requests;
