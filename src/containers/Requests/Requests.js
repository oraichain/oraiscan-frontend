// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import cn from "classnames/bind";
import { useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useGet } from "restful-react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import Skeleton from "@material-ui/lab/Skeleton";
import consts from "src/constants/consts";
import { formatInteger } from "src/helpers/helper";
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
import { isNil } from "lodash";

const cx = cn.bind(styles);

const Requests = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	// const history = useHistory();
	// const queryStringParse = queryString.parse(history.location.search) || {};
	// const creator = queryStringParse?.creator ?? "";
	const [isGridView, setIsGridView] = useState(true);
	const [keyword, setKeyword] = useState("");
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);
	// const listRequestsRef = useRef([]);

	const onPageChange = page => {
		setPageId(page);
	};

	const basePath = `${process.env.REACT_APP_LCD_API ||
		"https://lcd.orai.io"}/cosmos/tx/v1beta1/txs?events=message.action%3D%27set_ai_request%27&order_by=2&pagination.limit=${consts.REQUEST.LIMIT
		}&pagination.offset=${(pageId - 1) * consts.REQUEST.LIMIT}`;
	let path;
	if (keyword) {
		path = `${basePath}&page=${pageId}&request_id=${keyword}`;
	} else {
		path = `${basePath}&page=${pageId}`;
	}

	const { data, loading, error } = useGet({
		path: path,
	});

	// const getItemData = data => {
	// 	{
	// 		!isNil(data) &&
	// 			!loading &&
	// 			data.request_ids.map(async item => {
	// 				const baseItemPath = `${process.env.REACT_APP_LCD_API || "https://lcd.orai.io"}/airequest/aireq/${item.slice(3, item.length)}`;
	// 				await axios
	// 					.get(baseItemPath)
	// 					.then(itemData => {
	// 						listRequestsRef.current.push(itemData?.data);
	// 					})
	// 					.catch(error => {
	// 						console.log(error, "error");
	// 					});
	// 			});
	// 	}
	// };

	// useEffect(() => {
	// 	getItemData(data);
	// }, [data]);

	let titleSection;
	let filterSection;
	let requestCard;
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
			// let filterData = null;
			// if (!isNil(creator)) {
			// 	filterData = data?.tx_responses?.filter(item => {
			// 		return item?.tx?.body?.messages?.[0]?.creator === creator;
			// 	});
			// }
			const calculateTotalPage = data?.pagination?.total / consts.REQUEST.LIMIT;
			totalPagesRef.current = calculateTotalPage !== parseInt(calculateTotalPage) ? parseInt(calculateTotalPage) + 1 : calculateTotalPage;

			requestCard = (
				<RequestsCard totalItems={isNaN(data?.pagination?.total) ? "-" : formatInteger(data?.pagination?.total)}>
					{isGridView ? <RequestGridView data={data} /> : <RequestListView data={data} />}
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
