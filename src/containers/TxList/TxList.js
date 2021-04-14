import React, {useState, useEffect, useRef} from "react";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useGet} from "restful-react";
import queryString from "query-string";
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
import TransactionTable from "src/components/TxList/TransactionTable";
import TransactionTableSkeleton from "src/components/TxList/TransactionTable/TransactionTableSkeleton";
import TransactionCardList from "src/components/TxList/TransactionCardList";
import TransactionCardListSkeleton from "src/components/TxList/TransactionCardList/TransactionCardListSkeleton";
import ComingSoon from "src/components/common/ComingSoon";
import styles from "./TxList.scss";

const cx = cn.bind(styles);
const columns = [
	{title: "TxHash", align: "left"},
	{title: "Type", align: "left"},
	{title: "Result", align: "center"},
	{title: "Amount", align: "right"},
	{title: "Fee", align: "right"},
	{title: "Height", align: "right"},
	{title: "Time", align: "right"},
];

const TxList = ({history}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const queryStringParse = queryString.parse(history.location.search) || {};
	// const basePathPending = "http://23.100.40.156:26657/unconfirmed_txs?limit=10";
	// const basePath = queryStringParse.type === "pending" ? basePathPending : `${consts.API.TXLIST}?limit=${consts.REQUEST.LIMIT}`;
	const basePath = `${consts.API.TXLIST}?limit=${consts.REQUEST.LIMIT}`;
	const [firstLoadCompleted, setFirstLoadCompleted] = useState(false);
	const [loadCompleted, setLoadCompleted] = useState(false);
	const [pageId, setPageId] = useState(1);
	const totalItemsRef = useRef(null);
	const totalPagesRef = useRef(null);
	const canRefetchRef = useRef(true);
	const prevDataRef = useRef([]);

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
				if (canRefetchRef.current) {
					refetch();
				}

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
			<PageTitle title={"Transactions"} />
			<StatusBox />
		</TitleWrapper>
	) : (
		<TogglePageBar type='transactions' />
	);

	if (loading) {
		if (firstLoadCompleted) {
			tableSection = isLargeScreen ? <TransactionTable data={data?.data} /> : <TransactionCardList data={data?.data} />;
		} else {
			tableSection = isLargeScreen ? <TransactionTableSkeleton /> : <TransactionCardListSkeleton />;
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
					canRefetchRef.current = false;
				} else {
					canRefetchRef.current = true;
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
					tableSection = isLargeScreen ? <TransactionTable data={mergedData} rowMotions={rowMotions} /> : <TransactionCardList data={data?.data} />;
				} else {
					tableSection = isLargeScreen ? <TransactionTable data={data?.data} /> : <TransactionCardList data={data?.data} />;
				}
				prevDataRef.current = [...data.data];
			} else {
				tableSection = <EmptyTable columns={columns} />;
			}
		}
	}
	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	if (queryStringParse.type === "pending") {
		return (
			<Container fixed className={cx("tx-list")}>
				{titleSection}
				<ComingSoon />
			</Container>
		);
	}

	return (
		<Container fixed className={cx("tx-list")}>
			{titleSection}
			{tableSection}
			{paginationSection}
		</Container>
	);
};

export default TxList;
