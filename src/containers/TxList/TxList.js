import React, { useState, useEffect, useRef, useMemo } from "react";
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
import axios from "axios";
import styles from "./TxList.module.scss";

const cx = cn.bind(styles);

const TxList = () => {
	const [data, setData] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [loading, setLoading] = useState(false);

	const history = useHistory();
	const theme = useTheme();
	const prevPendingRef = useRef(null);
	const prevOldPage = useRef(null);
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const queryStringParse = queryString.parse(history.location.search) || {};
	const [firstLoadCompleted, setFirstLoadCompleted] = useState(false);

	const [pageId, setPageId] = useState(1);
	const totalItemsRef = useRef(null);
	const totalPagesRef = useRef(null);
	const canRefetchRef = useRef(true);
	const prevDataRef = useRef([]);

	let timerIdRef = useRef(null);
	let timerTxsRef = useRef(null);

	let titleSection;
	let tableSection;
	let paginationSection;

	const cleanUp = () => {
		if (timerIdRef) {
			clearInterval(timerIdRef.current);
		}
	};

	const cleanUpTxs = () => {
		if (timerTxsRef) {
			clearInterval(timerTxsRef.current);
		}
	};

	const onPageChange = page => {
		cleanUp();
		setFirstLoadCompleted(false);
		prevOldPage.current = pageId;
		setPageId(page);
	};

	if (!firstLoadCompleted) {
		prevDataRef.current = null;
	}

	const pending = queryStringParse.type === "pending" ? true : false;

	if (_.isNil(prevPendingRef.current)) {
		prevPendingRef.current = pending;
	}

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

	const fetchTxs = async path => {
		try {
			const res = await axios.get(path);
			return res.data ?? res;
		} catch (error) {
			console.log({ errFetchTxs: error });
		}
	};

	const queryListPending = async () => {
		const result = await fetchTxs(`https://rpc.orai.io/unconfirmed_txs?limit=${consts.REQUEST.LIMIT}`);
		const tableData = result.result.txs?.map(tx => {
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
		setTableData(tableData);
	};

	const queryList = async ({ before = null, type = "" }) => {
		let path = `${consts.API_BASE}${consts.API.TXLIST}?limit=${consts.REQUEST.LIMIT}`;
		if (before && type) {
			path += `&before=${before}&type=${type}`;
		}
		const result = await fetchTxs(path);
		setTableData(result.data ?? []);
		setData(result);
	};

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

	const getListTxs = async (isInterval = false) => {
		try {
			setLoading(true);
			if (pending) {
				await queryListPending();
				return;
			}
			let before = null,
				type = "";
			if (data?.paging?.total && !isInterval) {
				before = prevOldPage.current < pageId ? data.paging.before : data.paging.after;
				type = prevOldPage.current < pageId ? "next" : "previous";
			}
			await queryList({ before, type });
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 800);
		}
	};

	useEffect(() => {
		getListTxs();
	}, []);

	useEffect(() => {
		getListTxs();
		if (pageId == 1) {
			timerIdRef.current = null;
			timerTxsRef.current = setInterval(() => {
				getListTxs(true);
			}, consts.REQUEST.TIMEOUT);
		} else {
			cleanUpTxs();
		}
		return () => {
			cleanUpTxs();
		};
	}, [pageId]);

	useEffect(() => {
		if (!pending) {
			getListTxs(true);
			cleanUp();
			timerIdRef.current = null;
			timerTxsRef.current = setInterval(() => {
				getListTxs(true);
			}, consts.REQUEST.TIMEOUT);
			return;
		}
		setTableData([]);
		clearInterval(timerTxsRef.current);
		timerTxsRef.current = null;
		timerIdRef.current = setInterval(() => {
			getListTxs();
		}, consts.REQUEST.TIMEOUT);
		return () => {
			cleanUp();
		};
	}, [pending]);

	paginationSection = totalPagesRef.current ? (
		!pending && <Pagination disabled={loading} isCustomPaging pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} />
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
