import React, {memo, useState} from "react";
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

const TransactionCard = memo(({account = ""}) => {
	const cx = classNames.bind(styles);
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const basePath = `${consts.API.TXS_ACCOUNT}/${account}?limit=${consts.REQUEST.LIMIT}&TxType=cosmos-sdk/MsgSend`;
	const path = `${basePath}&page_id=${pageId}`;

	const {data} = useGet({
		path: path,
	});

	const onPageChange = page => {
		setPageId(page);
	};

	let tableSection;
	let paginationSection;

	if (!data || typeof data === "string") {
		return isLargeScreen ? <TransactionTableSkeleton /> : <TransactionCardListSkeleton />;
	} else {
		if (!isNaN(data?.page?.total_page) && data.page.total_page != totalPages) {
			setTotalPages(data.page.total_page);
		}

		if (Array.isArray(data?.data) && data.data.length > 0) {
			tableSection = isLargeScreen ? <TransactionTable data={data.data} account={account} /> : <TransactionCardList data={data.data} account={account} />;
		} else {
			const columns = [{title: "TxHash"}, {title: "Type"}, {title: "Result"}, {title: "Amount"}, {title: "Fee"}, {title: "Height"}, {title: "Time"}];
			tableSection = <EmptyTable columns={columns} />;
		}

		paginationSection = totalPages > 1 ? <Pagination pages={totalPages} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;
	}

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
