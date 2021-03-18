import React, {memo, useState} from "react";
import {useGet} from "restful-react";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import TransactionTable from "src/components/TxList/TransactionTable";
import TransactionTableSkeleton from "src/components/TxList/TransactionTable/TransactionTableSkeleton";
import TransactionCardList from "src/components/TxList/TransactionCardList";
import TransactionCardListSkeleton from "src/components/TxList/TransactionCardList/TransactionCardListSkeleton";
import Pagination from "src/components/common/Pagination";
import EmptyTable from "src/components/common/EmptyTable";
import styles from "./TransactionsCard.scss";

const cx = classNames.bind(styles);

const TransactionsCard = memo(({}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const basePath = `${consts.API.TXLIST}?limit=${consts.REQUEST.LIMIT}`;
	const [path, setPath] = useState(`${basePath}&page_id=1`);
	const {data} = useGet({
		path: path,
	});

	if (!data || typeof data === "string") {
		return isLargeScreen ? <TransactionTableSkeleton /> : <TransactionCardListSkeleton />;
	}

	const totalPages = data?.page?.total_page ?? 0;
	const currentPage = data?.page?.page_id ?? 1;

	const onPageChange = page => {
		setPath(`${basePath}&page_id=${page}`);
	};

	const columns = [{title: "TxHash"}, {title: "Type"}, {title: "Result"}, {title: "Amount"}, {title: "Fee"}, {title: "Height"}, {title: "Time"}];

	let headerSection;
	let bodySection;

	headerSection = (
		<div className={cx("transactions-card-header")}>
			<div className={cx("title")}>Transactions</div>
		</div>
	);

	bodySection = (
		<div className={cx("transactions-card-body")}>
			{Array.isArray(data?.data) && data.data.length > 0 ? (
				<>
					{isLargeScreen ? <TransactionTable data={data.data} /> : <TransactionCardList data={data.data} />}
					{totalPages > 0 && <Pagination pages={totalPages} page={currentPage} onChange={(e, page) => onPageChange(page)} />}
				</>
			) : (
				<EmptyTable columns={columns} />
			)}
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
