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
import NoResult from "src/components/common/NoResult";
import styles from "./Transaction.module.scss";

const cx = classNames.bind(styles);

const Transaction = memo(({account = "", royalty = false, minHeight = 222}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	let basePath = `${consts.API.TXS_ACCOUNT}/${account}?limit=${consts.REQUEST.LIMIT}`;
	if (royalty) {
		basePath = `${consts.API.TXS_ROYALTY}/${account}?limit=${consts.REQUEST.LIMIT}`;
	}

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

	return (
		<div className={cx("transaction")}>
			{Array.isArray(data?.data) && data.data.length > 0 ? (
				<>
					{isLargeScreen ? (
						<TransactionTable data={data.data} account={account} royalty={royalty} />
					) : (
						<TransactionCardList data={data.data} account={account} royalty={royalty} />
					)}
					{totalPages > 0 && <Pagination pages={totalPages} page={currentPage} onChange={(e, page) => onPageChange(page)} />}
				</>
			) : (
				<NoResult />
			)}
		</div>
	);
});

export default Transaction;
