/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo, useState, useRef, useEffect} from "react";
import {useGet} from "restful-react";
import {constantCase} from "constant-case";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {arraysEqual, mergeArrays} from "src/helpers/helper";
import {formatInteger} from "src/helpers/helper";
import {_} from "src/lib/scripts";
import FilterSection from "src/components/common/FilterSection";
import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import TransactionTable from "src/components/ProposalDetails/TransactionTable";
import TransactionTableSkeleton from "src/components/ProposalDetails/TransactionTable/TransactionTableSkeleton";
import TransactionCardList from "src/components/ProposalDetails/TransactionCardList";
import TransactionCardListSkeleton from "src/components/ProposalDetails/TransactionCardList/TransactionCardListSkeleton";
import styles from "./TransactionsCard.module.scss";

const cx = classNames.bind(styles);

const TransactionsCard = memo(({proposalId}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [firstLoadTransactionCompleted, setFirstLoadTransactionCompleted] = useState(false);
	const [loadTransactionCompleted, setLoadTransactionCompleted] = useState(false);
	const [loadTotalTxsCompleted, setLoadTotalTxsCompleted] = useState(false);
	const [pageId, setPageId] = useState(1);
	const voteTypesRef = useRef({
		ALL: 0,
	});
	const totalTxsRef = useRef({});
	const [voteType, setVoteType] = useState(voteTypesRef.current["ALL"]);
	const totalPagesRef = useRef(null);
	const prevDataRef = useRef([]);

	let transactionTimerId = useRef(null);
	let totalTxsTimerId = useRef(null);

	const cleanUpTransaction = () => {
		if (transactionTimerId) {
			clearTimeout(transactionTimerId.current);
		}
	};

	const cleanUpTotalTxs = () => {
		if (totalTxsTimerId) {
			clearTimeout(totalTxsTimerId.current);
		}
	};

	const getFilterData = (voteTypes, totalTxs) => {
		const filterData = [];
		for (let key in voteTypes) {
			// const label = `${sentenceCase(key)}(${!isNaN(totalTxs?.[key]) ? formatInteger(totalTxs[key]) : "-"})`;
			if (!voteTypes[key]) {
				continue;
			}
			const labelArr = voteTypes[key].split("_") || [];
			const labelTxt = labelArr[labelArr.length - 1];
			const label = labelArr[labelArr.length - 1] + " (" + (totalTxs[labelTxt] || 0) + ")";
			const value = voteTypes[key];
			filterData.push({
				label: label,
				value: value,
			});
		}
		filterData.push({
			label: "ALL (" + totalTxs["ALL"] + ")",
			value: voteTypes["ALL"],
		});
		return filterData;
	};

	const onPageChange = page => {
		cleanUpTransaction();
		setFirstLoadTransactionCompleted(false);
		setLoadTransactionCompleted(false);
		setPageId(page);
	};

	if (!firstLoadTransactionCompleted) {
		prevDataRef.current = null;
	}

	const votePath = `${consts.API.PROPOSAL_VOTES}`;
	const {data: voteData} = useGet({
		path: votePath,
	});
	if (voteData) {
		const voteTypes = {};
		voteTypes["ALL"] = 0;
		for (let key in voteData) {
			voteTypes[constantCase(key)] = voteData[key];
		}
		voteTypesRef.current = voteTypes;
	}

	const totalTxsPath = `${consts.API.PROPOSALS_TOTAL_TXS}/${proposalId}`;
	const {data: totalTxsData, refetch: refetchTotalTxs} = useGet({
		path: totalTxsPath,
	});

	if (totalTxsData) {
		const totalTxs = {};
		for (let key in totalTxsData) {
			totalTxs[constantCase(key)] = totalTxsData[key];
		}
		totalTxsRef.current = totalTxs;
	}

	const transactionBasePath = `${consts.API.PROPOSALS_TRANSACTIONS}/${proposalId}?limit=${consts.REQUEST.LIMIT}`;
	let transactionPath = `${transactionBasePath}&page_id=${pageId}`;
	if (!_.isNil(voteType) && voteType !== voteTypesRef.current["ALL"]) {
		transactionPath = `${transactionPath}&vote=${voteType}`;
	}
	const {data: transactionData, loading: transactionLoading, error: transactionError, refetch: refetchTransaction} = useGet({
		path: transactionPath,
	});

	useEffect(() => {
		if (loadTotalTxsCompleted) {
			totalTxsTimerId.current = setTimeout(() => {
				refetchTotalTxs();
				setLoadTotalTxsCompleted(false);
			}, consts.REQUEST.TIMEOUT);
			return () => {
				cleanUpTotalTxs();
			};
		}
	}, [loadTotalTxsCompleted]);

	useEffect(() => {
		if (loadTransactionCompleted) {
			transactionTimerId.current = setTimeout(() => {
				refetchTransaction();
				setLoadTransactionCompleted(false);
			}, consts.REQUEST.TIMEOUT);
			return () => {
				cleanUpTransaction();
			};
		}
	}, [loadTransactionCompleted]);

	let titleSection;
	let filterSection;
	let headerSection;
	let tableSection;
	let paginationSection;
	let bodySection;

	if (isLargeScreen) {
		titleSection = <div className={cx("title")}>Transactions</div>;
	} else {
		titleSection = <></>;
	}

	const filterData = getFilterData(voteTypesRef.current, totalTxsRef.current);
	filterSection = (
		<div className={cx("filter-section")}>
			<div className={cx("filter-section-header")}>Transactions</div>
			<FilterSection
				className={cx("filter-section-body")}
				data={filterData}
				value={voteType}
				onChange={value => {
					setVoteType(value);
				}}
			/>
		</div>
	);

	if (transactionLoading) {
		if (firstLoadTransactionCompleted) {
			tableSection = isLargeScreen ? <TransactionTable data={transactionData.txs} /> : <TransactionCardList data={transactionData.txs} />;
		} else {
			tableSection = isLargeScreen ? <TransactionTableSkeleton /> : <TransactionCardListSkeleton />;
		}
	} else {
		if (transactionError) {
			totalPagesRef.current = null;
			tableSection = <NoResult />;
		} else {
			if (!isNaN(transactionData?.page?.total_page)) {
				totalPagesRef.current = transactionData.page.total_page;
			} else {
				totalPagesRef.current = null;
			}

			if (Array.isArray(transactionData?.txs) && transactionData.txs.length > 0) {
				if (firstLoadTransactionCompleted && prevDataRef.current !== null && !arraysEqual(prevDataRef.current, transactionData.txs)) {
					const key = "height";
					const mergedData = mergeArrays(transactionData.txs, prevDataRef.current, key);
					const rowMotions = mergedData.map((mergedItem, index) => {
						if (prevDataRef.current.find(prevItem => mergedItem[key] == prevItem[key]) && !transactionData.txs.find(item => mergedItem[key] == item[key])) {
							return -1;
						}

						if (!prevDataRef.current.find(prevItem => mergedItem[key] == prevItem[key]) && transactionData.txs.find(item => mergedItem[key] == item[key])) {
							return 1;
						}

						return 0;
					});
					tableSection = isLargeScreen ? <TransactionTable data={mergedData} rowMotions={rowMotions} /> : <TransactionCardList data={transactionData?.txs} />;
				} else {
					tableSection = isLargeScreen ? <TransactionTable data={transactionData?.txs} /> : <TransactionCardList data={transactionData?.txs} />;
				}
				prevDataRef.current = [...transactionData.txs];
			} else {
				tableSection = <NoResult />;
			}
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	headerSection = <div className={cx("transactions-card-header")}>{filterSection}</div>;
	bodySection = (
		<div className={cx("transactions-card-body")}>
			{tableSection}
			{paginationSection}
		</div>
	);

	return (
		<div className={cx("transactions-card")}>
			{headerSection}
			{bodySection}
		</div>
	);
});

export default TransactionsCard;
