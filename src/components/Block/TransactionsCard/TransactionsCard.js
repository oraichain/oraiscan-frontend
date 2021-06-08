import React, {useState, useRef} from "react";
import {useGet} from "restful-react";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import {_} from "src/lib/scripts";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import consts from "src/constants/consts";
import TransactionTable from "src/components/TxList/TransactionTable";
import TransactionTableSkeleton from "src/components/TxList/TransactionTable/TransactionTableSkeleton";
import TransactionCardList from "src/components/TxList/TransactionCardList";
import TransactionCardListSkeleton from "src/components/TxList/TransactionCardList/TransactionCardListSkeleton";
import NoResult from "src/components/common/NoResult";
import Pagination from "src/components/common/Pagination";
import styles from "./TransactionsCard.module.scss";

const cx = cn.bind(styles);

const TransactionsCard = ({height}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const basePath = `${consts.API_BASE}${consts.API.TXS_BLOCK}/${height}?limit=${consts.REQUEST.LIMIT}`;
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const path = `${basePath}&page_id=${pageId}`;
	const {data, loading, error} = useGet({
		path,
	});

	let tableSection;
	let paginationSection;

	if (loading) {
		tableSection = isLargeScreen ? <TransactionTableSkeleton /> : <TransactionCardListSkeleton />;
	} else {
		if (error) {
			tableSection = <NoResult />;
		} else {
			if (!isNaN(data?.page?.total_page)) {
				totalPagesRef.current = data?.page?.total_page;
			} else {
				totalPagesRef.current = null;
			}

			if (Array.isArray(data?.data) && data.data.length > 0) {
				tableSection = isLargeScreen ? <TransactionTable data={data.data} /> : <TransactionCardList data={data.data} />;
			} else {
				tableSection = <NoResult />;
			}
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<div className={cx("transactions-card")}>
			<div className={cx("transactions-card-header")}>Transactions</div>
			<div className={cx("transactions-card-body")}>
				{tableSection}
				{paginationSection}
			</div>
		</div>
	);
};

TransactionsCard.propTypes = {
	height: PropTypes.number,
};
TransactionsCard.defaultProps = {};

export default TransactionsCard;
