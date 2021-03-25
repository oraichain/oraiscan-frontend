import React, {useState, useEffect, useRef} from "react";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useGet} from "restful-react";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import consts from "src/constants/consts";
import {calculateBefore} from "src/helpers/helper";
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

const TxList = props => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const basePath = `${consts.API.TXLIST}?limit=${consts.REQUEST.LIMIT}`;
	const [firstLoadCompleted, setFirstLoadCompleted] = useState(false);
	const [loadCompleted, setLoadCompleted] = useState(false);
	const [pageId, setPageId] = useState(1);
	const totalItemsRef = useRef(null);
	const totalPagesRef = useRef(null);

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
				totalItemsRef.current = data.paging.total;
				totalPagesRef.current = Math.ceil(data.paging.total / consts.REQUEST.LIMIT);
			} else {
				totalItemsRef.current = null;
				totalPagesRef.current = null;
			}

			if (Array.isArray(data?.data) && data.data.length > 0) {
				tableSection = isLargeScreen ? <TransactionTable data={data?.data} /> : <TransactionCardList data={data?.data} />;
			} else {
				tableSection = <EmptyTable columns={columns} />;
			}
		}
	}
	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<Container fixed className={cx("tx-list")}>
			{titleSection}
			{tableSection}
			{paginationSection}
		</Container>
	);
};

export default TxList;
