import React, {useState, useEffect, useRef} from "react";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useGet} from "restful-react";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import consts from "src/constants/consts";
import {arraysEqual, calculateBefore, mergeArrays} from "src/helpers/helper";
import {_} from "src/lib/scripts";
import TogglePageBar from "src/components/common/TogglePageBar";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import Pagination from "src/components/common/Pagination";
import EmptyTable from "src/components/common/EmptyTable";
import BlockTable from "src/components/BlockList/BlockTable";
import BlockTableSkeleton from "src/components/BlockList/BlockTable/BlockTableSkeleton";
import BlockCardList from "src/components/BlockList/BlockCardList";
import BlockCardListSkeleton from "src/components/BlockList/BlockCardList/BlockCardListSkeleton";
import styles from "./BlockList.scss";

const cx = cn.bind(styles);
const columns = [
	{title: "Height", align: "center"},
	{title: "Parent Hash", align: "left"},
	{title: "Proposer", align: "left"},
	{title: "Txs", align: "right"},
	{title: "Time", align: "right"},
];

const BlockList = props => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const basePath = `${consts.API.BLOCKLIST}?limit=${consts.REQUEST.LIMIT}`;
	const [firstLoadCompleted, setFirstLoadCompleted] = useState(false);
	const [loadCompleted, setLoadCompleted] = useState(false);
	const [pageId, setPageId] = useState(1);
	const totalItemsRef = useRef(null);
	const totalPagesRef = useRef(null);
	const prevDataRef = useRef(null);

	let timerIdRef = useRef(null);

	const cleanUp = () => {
		if (timerIdRef) {
			clearTimeout(timerIdRef.current);
		}
	};

	const onPageChange = page => {
		cleanUp();
		setFirstLoadCompleted(false);
		setLoadCompleted(false);
		setPageId(page);
	};

	if (!firstLoadCompleted) {
		prevDataRef.current = null;
	}

	let path = basePath;
	if (totalItemsRef.current) {
		path += "&before=" + calculateBefore(totalItemsRef.current, consts.REQUEST.LIMIT, pageId);
	}

	const {data, loading, error, refetch} = useGet({
		path: path,
		resolve: data => {
			if (!firstLoadCompleted) {
				setFirstLoadCompleted(true);
			}
			setLoadCompleted(true);
			return data;
		},
	});

	useEffect(() => {
		if (loadCompleted) {
			timerIdRef.current = setTimeout(() => {
				refetch();
				setLoadCompleted(false);
			}, consts.REQUEST.TIMEOUT);
			return () => {
				cleanUp();
			};
		}
	}, [loadCompleted]);

	let titleSection;
	let tableSection;
	let paginationSection;

	titleSection = isLargeScreen ? (
		<TitleWrapper>
			<PageTitle title={"Blocks"} />
			<StatusBox />
		</TitleWrapper>
	) : (
		<TogglePageBar type='blocks' />
	);

	if (loading) {
		if (firstLoadCompleted) {
			tableSection = isLargeScreen ? <BlockTable data={data?.data} /> : <BlockCardList data={data?.data} />;
		} else {
			tableSection = isLargeScreen ? <BlockTableSkeleton /> : <BlockCardListSkeleton />;
		}
	} else {
		if (error) {
			totalItemsRef.current = null;
			totalPagesRef.current = null;
			tableSection = <EmptyTable columns={columns} />;
		} else {
			if (!isNaN(data?.paging?.total)) {
				if (totalItemsRef.current != data.paging.total) {
					totalItemsRef.current = data.paging.total;
					totalPagesRef.current = Math.ceil(data.paging.total / consts.REQUEST.LIMIT);
					setLoadCompleted(false);
				}
			} else {
				totalItemsRef.current = null;
				totalPagesRef.current = null;
			}

			if (Array.isArray(data?.data) && data.data.length > 0) {
				if (firstLoadCompleted && prevDataRef.current !== null && !arraysEqual(prevDataRef.current, data.data)) {
					const key = "height";
					const mergedData = mergeArrays(data.data, prevDataRef.current, key);
					const rowMotions = mergedData.map((mergedItem, index) => {
						if (prevDataRef.current.find(prevItem => mergedItem[key] == prevItem[key]) && !data.data.find(item => mergedItem[key] == item[key])) {
							return -1;
						}

						if (!prevDataRef.current.find(prevItem => mergedItem[key] == prevItem[key]) && data.data.find(item => mergedItem[key] == item[key])) {
							return 1;
						}

						return 0;
					});
					tableSection = isLargeScreen ? <BlockTable data={mergedData} rowMotions={rowMotions} /> : <BlockCardList data={data?.data} />;
				} else {
					tableSection = isLargeScreen ? <BlockTable data={data?.data} /> : <BlockCardList data={data?.data} />;
				}
				prevDataRef.current = [...data.data];
			} else {
				tableSection = <EmptyTable columns={columns} />;
			}
		}
	}
	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<Container fixed className={cx("block-list")}>
			{titleSection}
			{tableSection}
			{paginationSection}
		</Container>
	);
};

export default BlockList;
