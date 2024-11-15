import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useGet } from "restful-react";
import queryString from "query-string";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import consts from "src/constants/consts";
import { arraysEqual, calculateBefore, decodeTx, mergeArrays } from "src/helpers/helper";
import { _ } from "src/lib/scripts";
import TogglePageBar from "src/components/common/TogglePageBar";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import TransactionTable from "src/components/TxList/TransactionTable";
import TransactionTableSkeleton from "src/components/TxList/TransactionTable/TransactionTableSkeleton";
import TransactionCardList from "src/components/TxList/TransactionCardList";
import TransactionCardListSkeleton from "src/components/TxList/TransactionCardList/TransactionCardListSkeleton";
import styles from "./TxList.module.scss";

const cx = cn.bind(styles);

const TxList = () => {
	const history = useHistory();
	const theme = useTheme();
	const prevPendingRef = useRef(null);
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const queryStringParse = queryString.parse(history.location.search) || {};
	const pendingBasePath = `${consts.RPC_API_BASE}/unconfirmed_txs?limit=${consts.REQUEST.LIMIT}`;
	const restBasePath = `${consts.API.TXLIST}?limit=${consts.REQUEST.LIMIT}`;
	const [firstLoadCompleted, setFirstLoadCompleted] = useState(false);
	const [loadCompleted, setLoadCompleted] = useState(false);
	const [pageId, setPageId] = useState(1);
	const totalItemsRef = useRef(null);
	const totalPagesRef = useRef(null);
	const canRefetchRef = useRef(true);
	const prevDataRef = useRef([]);

	const prevOldPage = useRef(null);
	const [beforelItemsRef, setBeforelItemsRef] = useState(0);
	const [type, setType] = useState("before");

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

		prevOldPage.current = pageId;
		setType(prevOldPage.current < page ? "before" : "after");
		setBeforelItemsRef(prevOldPage.current < page ? data.paging.before : data.paging.after);
	};

	if (!firstLoadCompleted) {
		prevDataRef.current = null;
	}

	let path;
	const pending = queryStringParse.type === "pending" ? true : false;

	if (_.isNil(prevPendingRef.current)) {
		prevPendingRef.current = pending;
	}

	if (prevPendingRef.current != pending) {
		cleanUp();
		setFirstLoadCompleted(false);
		setLoadCompleted(false);
		setPageId(1);
		prevPendingRef.current = pending;
	}

	if (pending) {
		path = pendingBasePath;
	} else {
		path = restBasePath;
		if (totalItemsRef.current) {
			// path += "&before=" + calculateBefore(totalItemsRef.current, consts.REQUEST.LIMIT, pageId);
			path += `&${type}=` + beforelItemsRef;
			if (pageId === 1) {
				path = restBasePath + "&before=0";
			}
		}
	}

	const { data, loading, error, refetch } = useGet({
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
		<Container fixed>
			<TitleWrapper>
				<PageTitle title={"Transactions"} />
				<StatusBox />
			</TitleWrapper>
		</Container>
	) : (
		<TogglePageBar type='transactions' />
	);

	let tableData;
	if (pending && Array.isArray(data?.result?.txs)) {
		tableData = data.result.txs.map(tx => {
			const decodedTx = decodeTx(tx);
			return {
				tx_hash: decodedTx.hash,
				result: "pending",
				fee: decodedTx.fee,
				messages: [
					{
						type: decodedTx.messageType,
						value: decodedTx.messageValue,
					},
				],
			};
		});
	} else {
		tableData = data?.data ?? [];
	}

	if (loading) {
		if (firstLoadCompleted) {
			tableSection = isLargeScreen ? (
				<TransactionTable txHashClick={pending} data={tableData} />
			) : (
				<TransactionCardList txHashClick={pending} data={tableData} />
			);
		} else {
			tableSection = isLargeScreen ? <TransactionTableSkeleton /> : <TransactionCardListSkeleton />;
		}
	} else {
		if (error) {
			totalItemsRef.current = null;
			totalPagesRef.current = null;
			tableSection = <NoResult />;
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

			if (Array.isArray(tableData) && tableData.length > 0) {
				if (firstLoadCompleted && prevDataRef.current !== null && !arraysEqual(prevDataRef.current, tableData)) {
					const key = "height";
					const mergedData = mergeArrays(tableData, prevDataRef.current, key);
					const rowMotions = mergedData.map((mergedItem, index) => {
						if (prevDataRef.current.find(prevItem => mergedItem[key] == prevItem[key]) && !tableData.find(item => mergedItem[key] == item[key])) {
							return -1;
						}

						if (!prevDataRef.current.find(prevItem => mergedItem[key] == prevItem[key]) && tableData.find(item => mergedItem[key] == item[key])) {
							return 1;
						}

						return 0;
					});
					tableSection = isLargeScreen ? (
						<TransactionTable txHashClick={pending} data={mergedData} rowMotions={rowMotions} />
					) : (
						<TransactionCardList txHashClick={pending} data={tableData} />
					);
				} else {
					tableSection = isLargeScreen ? (
						<TransactionTable txHashClick={pending} data={tableData} />
					) : (
						<TransactionCardList txHashClick={pending} data={tableData} />
					);
				}
				prevDataRef.current = [...tableData];
			} else {
				tableSection = <NoResult />;
			}
		}
	}
	paginationSection = totalPagesRef.current ? (
		<Pagination disabled={loading} isCustomPaging={true} pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} />
	) : (
		<></>
	);

	return (
		<>
			{titleSection}
			<Container fixed className={cx("tx-list")}>
				{tableSection}
				{paginationSection}
			</Container>
		</>
	);
};

TxList.propTypes = {};

TxList.defaultProps = {};

export default TxList;
