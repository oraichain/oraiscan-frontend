// @ts-nocheck
import React, {useState, useRef, useEffect} from "react";
import cn from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import PropTypes from "prop-types";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useGet} from "restful-react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {useHistory} from "react-router-dom";
import queryString from "query-string";
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
import OracleRequestsCard from "src/components/OracleRequests/OracleRequestsCard";
import OracleRequestGridView from "src/components/OracleRequests/OracleRequestGridView";
import OracleRequestGridViewSkeleton from "src/components/OracleRequests/OracleRequestGridView/OracleRequestGridViewSkeleton";
import OracleRequestListView from "src/components/OracleRequests/OracleRequestListView";
import OracleRequestListViewSkeleton from "src/components/OracleRequests/OracleRequestListView/OracleRequestListViewSkeleton";
import styles from "./OracleRequests.module.scss";
import {isNil} from "lodash";

const cx = cn.bind(styles);

const OracleRequests = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	// const history = useHistory();
	// const queryStringParse = queryString.parse(history.location.search) || {};
	// const creator = queryStringParse?.creator ?? "";
	const [isGridView, setIsGridView] = useState(false);
	const [keyword, setKeyword] = useState("");
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);
	// const listRequestsRef = useRef([]);

	const onPageChange = page => {
		setPageId(page);
	};

	const basePath = `${consts.API.ORACLE_REQUESTS}?limit=${consts.REQUEST.LIMIT}`;
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
	let oracleRequestCard;
	let paginationSection;

	// const createAIRequest = () => {
	// 	myKeystation.openWindow("ai-request", "");
	// };

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
		oracleRequestCard = (
			<OracleRequestsCard totalItems={<Skeleton className={cx("skeleton")} variant='text' width={24} height={30} />}>
				{isGridView ? <OracleRequestGridViewSkeleton /> : <OracleRequestListViewSkeleton />}
			</OracleRequestsCard>
		);
	} else {
		if (error) {
			totalPagesRef.current = null;
			oracleRequestCard = (
				<OracleRequestsCard totalItems='-'>{isGridView ? <OracleRequestGridView data={[]} /> : <OracleRequestListView data={[]} />}</OracleRequestsCard>
			);
		} else {
			// let filterData = null;
			// if (!isNil(creator)) {
			// 	filterData = data?.tx_responses?.filter(item => {
			// 		return item?.tx?.body?.messages?.[0]?.creator === creator;
			// 	});
			// }
			// const calculateTotalPage = data?.pagination?.total / consts.REQUEST.LIMIT;
			// totalPagesRef.current = calculateTotalPage !== parseInt(calculateTotalPage) ? parseInt(calculateTotalPage) + 1 : calculateTotalPage;
			if (!isNaN(data?.page?.total_page)) {
				totalPagesRef.current = data.page.total_page;
			} else {
				totalPagesRef.current = null;
			}

			oracleRequestCard = (
				<OracleRequestsCard totalItems={isNaN(data?.page?.total_item) ? "-" : formatInteger(data?.page?.total_item)}>
					{isGridView ? <OracleRequestGridView data={data?.data} /> : <OracleRequestListView data={data?.data} />}
				</OracleRequestsCard>
			);
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<>
			{titleSection}
			<Container fixed className={cx("requests")}>
				{filterSection}
				{oracleRequestCard}
				{paginationSection}
			</Container>
		</>
	);
};

OracleRequests.propTypes = {};
OracleRequests.defaultProps = {};

export default OracleRequests;
