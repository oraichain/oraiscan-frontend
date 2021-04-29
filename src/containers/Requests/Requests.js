// @ts-nocheck
import React, {useState, useRef} from "react";
import cn from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useGet} from "restful-react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Skeleton from "@material-ui/lab/Skeleton";
import consts from "src/constants/consts";
import {formatInteger} from "src/helpers/helper";
import {myKeystation} from "src/lib/Keystation";
import TogglePageBar from "src/components/common/TogglePageBar";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import Pagination from "src/components/common/Pagination";
import FilterSection from "src/components/Requests/FilterSection";
import RequestsCard from "src/components/Requests/RequestsCard";
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
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const basePath = `${consts.API.REQUESTS}?limit=${consts.REQUEST.LIMIT}`;
	let path;
	if (keyword) {
		path = `${basePath}&page_id=${pageId}&request_id=${keyword}`;
	} else {
		path = `${basePath}&page_id=${pageId}`;
	}

	const {data, loading, error} = useGet({
		path: path,
	});

	let titleSection;
	let filterSection;
	let requestCard;
	let paginationSection;

	const createAIRequest = () => {
		myKeystation.openWindow("ai-request", "");
	};

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
		requestCard = (
			<RequestsCard totalItems={<Skeleton className={cx("skeleton")} variant='text' width={24} height={30} />}>
				{isGridView ? <RequestGridViewSkeleton /> : <RequestListViewSkeleton />}
			</RequestsCard>
		);
	} else {
		if (error) {
			totalPagesRef.current = null;
			requestCard = <RequestsCard totalItems='-'>{isGridView ? <RequestGridView data={[]} /> : <RequestListView data={[]} />}</RequestsCard>;
		} else {
			if (!isNaN(data?.page?.total_page)) {
				totalPagesRef.current = data.page.total_page;
			} else {
				totalPagesRef.current = null;
			}

			requestCard = (
				<RequestsCard totalItems={isNaN(data?.page?.total_item) ? "-" : formatInteger(data.page.total_item)}>
					{isGridView ? <RequestGridView data={data?.data} /> : <RequestListView data={data?.data} />}
				</RequestsCard>
			);
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<>
			{titleSection}
			<Container fixed className={cx("requests")}>
				{filterSection}
				{requestCard}
				{paginationSection}
			</Container>
		</>
	);
};

Requests.propTypes = {};
Requests.defaultProps = {};

export default Requests;
