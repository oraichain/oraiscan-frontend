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
import { myKeystation } from "src/lib/Keystation";
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
import * as api from "src/lib/api";
import { isNil } from "lodash";
import config from "src/config";

const cx = cn.bind(styles);

const OracleRequests = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	// const history = useHistory();
	// const queryStringParse = queryString.parse(history.location.search) || {};
	// const creator = queryStringParse?.creator ?? "";
	const [isGridView, setIsGridView] = useState(true);
	const [keyword, setKeyword] = useState("");
	const [pageId, setPageId] = useState(0);
	const [total, setTotal] = useState(0);
	const totalPagesRef = useRef(null);
	// const listRequestsRef = useRef([]);
	const [listRequest, setListRequest] = useState([]);
	const onPageChange = page => {
		setPageId(page);
	};

	let titleSection;
	let filterSection;
	let oracleRequestCard;
	let paginationSection;

	useEffect(() => {
		fetchData(true);
	}, []);

	useEffect(() => {
		if (pageId) {
			fetchData(false, pageId);
		}
	}, [pageId]);

	const fetchData = async (checkOffset, pageId) => {
		let obj = {};
		if (!checkOffset) {
			let offsetObj = {
				offset: pageId ? total - (pageId - 1) * consts.REQUEST.LIMIT : undefined
			}
			obj = keyword ? { request: { stage: +keyword } } : { get_requests: { order: 2, limit: consts.REQUEST.LIMIT, ...offsetObj } }
		} else {
			obj = { get_requests: { order: 2, limit: consts.REQUEST.LIMIT } }
		}
		const buff = Buffer.from(
			JSON.stringify(obj)
		);
		let aiRequest = buff.toString('base64');
		let listRequestData = await api.getListRequest(config.AIORACLE_CONTRACT_ADDR, aiRequest);
		console.log({ listRequestData });
		switch (checkOffset) {
			case true:
				fetchFirst(listRequestData);
				break;
			case false:
				fetchSecond(listRequestData);
				break;
		}
	}

	const fetchFirst = async (listRequestAPI) => {
		console.log({ fetch: "fetchFirst" });
		let total = listRequestAPI?.data?.data?.[0]?.stage;
		// console.log({ total });
		// totalPagesRef.current = Math.ceil(total / consts.REQUEST.LIMIT)
		setTotal(total)
		setListRequest(listRequestAPI?.data?.data)
	}

	const fetchSecond = async (listRequestAPI) => {
		console.log({ fetch: "fetchSecond", listRequestAPI, keyword });
		// if (keyword) {
		// 	totalPagesRef.current = 1;
		// } else {
		// 	totalPagesRef.current = Math.ceil(total / consts.REQUEST.LIMIT);
		// 	console.log({ totalPagesRef, total });
		// }
		setListRequest(keyword ? [{
			...listRequestAPI?.data?.data,
			stage: +keyword
		}] : listRequestAPI?.data?.data)
	}

	useEffect(() => {
		debounce(fetchData(false), 300);
	}, [keyword]);

	const debounce = (func, wait, immediate) => {
		let timeout;
		return function executedFunction() {
			const context = this;
			const args = arguments;
			const later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			const callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
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

	filterSection = <FilterSection isGridView={isGridView} keyword={keyword} setIsGridView={setIsGridView} setKeyword={setKeyword} />; //setKeyword={setKeyword}

	if (!listRequest?.length) {
		oracleRequestCard = (
			<OracleRequestsCard totalItems={<Skeleton className={cx("skeleton")} variant='text' width={24} height={30} />}>
				{isGridView ? <OracleRequestGridViewSkeleton /> : <OracleRequestListViewSkeleton />}
			</OracleRequestsCard>
		);
	} else {
		oracleRequestCard = (
			<OracleRequestsCard totalItems={isNaN(total) ? "-" : formatInteger(total)}>
				{isGridView ? <OracleRequestGridView data={listRequest} /> : <OracleRequestListView data={listRequest} />}
			</OracleRequestsCard>
		);
	}

	paginationSection = total ? <Pagination pages={Math.ceil(total / consts.REQUEST.LIMIT)} page={pageId ? pageId : pageId + 1} onChange={(e, page) => onPageChange(page)} /> : <></>;

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