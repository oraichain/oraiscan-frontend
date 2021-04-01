import React, {memo, useState, useRef} from "react";
import {useGet} from "restful-react";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import TransactionTable from "src/components/TxList/TransactionTable";
import TransactionTableSkeleton from "src/components/TxList/TransactionTable/TransactionTableSkeleton";
import TransactionCardList from "src/components/TxList/TransactionCardList";
import TransactionCardListSkeleton from "src/components/TxList/TransactionCardList/TransactionCardListSkeleton";
import Pagination from "src/components/common/Pagination";
import EmptyTable from "src/components/common/EmptyTable";
import styles from "./TransactionCard.scss";

const cx = classNames.bind(styles);
const columns = [
	{title: "TxHash", align: "left"},
	{title: "Type", align: "left"},
	{title: "Result", align: "center"},
	{title: "Amount", align: "right"},
	{title: "Fee", align: "right"},
	{title: "Height", align: "right"},
	{title: "Time", align: "right"},
];

const TransactionCard = memo(({account = ""}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [status, setStatus] = useState("PROPOSAL_STATUS_ALL");
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const basePath = `${consts.API.TXS_ACCOUNT}/${account}?limit=${consts.REQUEST.LIMIT}`;
	const path = `${basePath}&page_id=${pageId}`;

	const {data, loading, error} = useGet({
		path: path,
	});

	let tableSection;
	let paginationSection;

	if (loading) {
		tableSection = isLargeScreen ? <TransactionTableSkeleton /> : <TransactionCardListSkeleton />;
	} else {
		if (error) {
			totalPagesRef.current = null;
			tableSection = <EmptyTable columns={columns} />;
		} else {
			if (!isNaN(data?.page?.total_page)) {
				totalPagesRef.current = data.page.total_page;
			} else {
				totalPagesRef.current = null;
			}

			if (Array.isArray(data?.data) && data.data.length > 0) {
				tableSection = isLargeScreen ? <TransactionTable data={data.data} account={account} /> : <TransactionCardList data={data.data} account={account} />;
			} else {
				tableSection = <EmptyTable columns={columns} />;
			}
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<div className={cx("transaction-card")}>
			<div className={cx("transaction-card-header")}>Transactions</div>
			<div className={cx("transaction-card-body")}>
				{tableSection}
				{paginationSection}
			</div>
		</div>
	);
});

export default TransactionCard;
