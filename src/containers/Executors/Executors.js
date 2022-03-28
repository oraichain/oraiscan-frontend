// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import cn from "classnames/bind";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import Skeleton from "@material-ui/lab/Skeleton";
import consts from "src/constants/consts";
import { formatInteger } from "src/helpers/helper";
import { myKeystation } from "src/lib/Keystation";
import TogglePageBar from "src/components/common/TogglePageBar";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import Pagination from "src/components/common/Pagination";
import ChainBox from 'src/components/common/ChainBox';
import FilterSection from "src/components/Requests/FilterSection";

import ExecutorsList from "src/components/Executors/ExecutorsTable";
import ExecutorsTableSkeleton from "src/components/Executors/ExecutorsTable/ExecutorsTableSkeleton";
import ExecutorsCardList from "src/components/Executors/ExecutorsTableCardList";
import ExecutorsTableCardListCardListSkeleton from "src/components/Executors/ExecutorsTableCardList/ExecutorsTableCardListCardListSkeleton";
import styles from "./Executors.module.scss";
import * as api from "src/lib/api";
import { isNil } from "lodash";
import config from "src/config";

const cx = cn.bind(styles);

const Executors = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(0);
	const [total, setTotal] = useState(0);
	// const [offset, setOffset] = useState('');
	const totalPagesRef = useRef(null);
	const [listExecutors, setListExecutors] = useState([]);
	const onPageChange = page => {
		if (page > pageId + 2) {
			return;
		}
		setPageId(page);
	};

	let titleSection;
	let filterSection;
	let executorsTable;
	let paginationSection;

	useEffect(() => {
		if (pageId >= 1) {
			fetchData(false);
		}
	}, [pageId]);


	useEffect(() => {
		fetchData(true);
	}, []);

	const fetchData = async (checkOffset) => {
		let objList = { get_executors_by_index: { offset: pageId ? ((pageId - 1) * consts.REQUEST.LIMIT) - 1 : undefined, limit: consts.REQUEST.LIMIT, order: 1 } }
		const buffList = Buffer.from(
			JSON.stringify(objList)
		);
		let listExecutorsParse = buffList.toString('base64');
		let listExecutorsData = await api.getListRequest(config.AIORACLE_CONTRACT_ADDR, listExecutorsParse);
		let dt = listExecutorsData?.data?.data;
		switch (checkOffset) {
			case true:
				fetchFirst(dt);
				break;
			case false:
				fetchSecond(dt);
				break;
		}
	}

	const fetchFirst = async (dt) => {
		let objTotal = {};
		objTotal = { get_executor_size: {} }
		const buff = Buffer.from(
			JSON.stringify(objTotal)
		);
		let totalExecutorsParse = buff.toString('base64');
		let totalExecutors = await api.getListRequest(config.AIORACLE_CONTRACT_ADDR, totalExecutorsParse);
		let total = totalExecutors?.data?.data;
		totalPagesRef.current = Math.ceil(total / consts.REQUEST.LIMIT);
		setTotal(total);
		setListExecutors(dt);
	}

	const fetchSecond = async (dt) => {
		setListExecutors(dt);
	}


	if (isLargeScreen) {
		titleSection = (
			<Container fixed>
				<TitleWrapper>
					<PageTitle title={"All executors"} />
					<ChainBox chainValue={total} label={"Total Executors"} statusValue={true} />
				</TitleWrapper>
			</Container>
		);
	} else {
		titleSection = <TogglePageBar type='ai-executors' />;
	}

	// filterSection = <FilterSection isGridView={isGridView} keyword={keyword} setIsGridView={setIsGridView} setKeyword={setKeyword} />;

	if (!listExecutors?.length) {
		executorsTable = isLargeScreen ? <ExecutorsTableSkeleton /> : <ExecutorsTableCardListCardListSkeleton />;
	} else {
		executorsTable = isLargeScreen ? (
			<ExecutorsList data={listExecutors} />
		) : (
			<ExecutorsCardList data={listExecutors} />
		);
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId ? pageId : 1} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<>
			{titleSection}
			<Container fixed className={cx("requests")}>
				{executorsTable}
				{paginationSection}
			</Container>
		</>
	);
};

Executors.propTypes = {};
Executors.defaultProps = {};

export default Executors;
