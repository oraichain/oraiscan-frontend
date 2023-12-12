// @ts-nocheck
import Container from "@material-ui/core/Container";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import cn from "classnames/bind";
import React, {useEffect, useRef, useState} from "react";
import ChainBox from 'src/components/common/ChainBox';
import PageTitle from "src/components/common/PageTitle";
import Pagination from "src/components/common/Pagination";
import TitleWrapper from "src/components/common/TitleWrapper";
import TogglePageBar from "src/components/common/TogglePageBar";
import consts from "src/constants/consts";

import ExecutorsList from "src/components/Executors/ExecutorsTable";
import ExecutorsTableSkeleton from "src/components/Executors/ExecutorsTable/ExecutorsTableSkeleton";
import ExecutorsCardList from "src/components/Executors/ExecutorsTableCardList";
import ExecutorsTableCardListCardListSkeleton from "src/components/Executors/ExecutorsTableCardList/ExecutorsTableCardListCardListSkeleton";
import config from "src/config";
import * as api from "src/lib/api";
import styles from "./Executors.module.scss";

const cx = cn.bind(styles);

const Executors = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(0);
	const [total, setTotal] = useState(0);
	const totalPagesRef = useRef(null);
	const [listExecutors, setListExecutors] = useState([]);
	const onPageChange = page => {
		setPageId(page);
	};

	let titleSection;
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
		let offset = pageId ? ((pageId - 1) * consts.REQUEST.LIMIT) - 1 : undefined;
		if (offset < 0) offset = undefined;
		let objList = { get_executors_by_index: { offset, limit: consts.REQUEST.LIMIT, order: 1 } }
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
