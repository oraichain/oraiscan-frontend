import React, {memo, useState} from "react";
import {useGet} from "restful-react";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import FilterSection from "src/components/common/FilterSection";
import FilterSectionSkeleton from "src/components/common/FilterSection/FilterSectionSkeleton";
import Pagination from "src/components/common/Pagination";
import EmptyTable from "src/components/common/EmptyTable";
import TransactionTable from "src/components/ProposalDetails/TransactionTable";
import TransactionTableSkeleton from "src/components/ProposalDetails/TransactionTable/TransactionTableSkeleton";
import TransactionCardList from "src/components/ProposalDetails/TransactionCardList";
import TransactionCardListSkeleton from "src/components/ProposalDetails/TransactionCardList/TransactionCardListSkeleton";
import styles from "./TransactionsCard.scss";

const cx = classNames.bind(styles);

// const voteTypes = {
// 	ALL: 0,
// 	YES: 1,
// 	NO: 2,
// 	NO_WITH_VETO: 3,
// 	ABSTAIN: 4,
// };

const TransactionsCard = memo(({proposalId}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	// const [voteType, setVoteType] = useState(voteTypes.ALL);
	const [pageId, setPageId] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const basePath = `${consts.API.PROPOSALS_TRANSACTIONS}/${proposalId}?limit=${consts.REQUEST.LIMIT}`;
	let path;
	path = `${basePath}&page_id=${pageId}`;
	// if (voteType === voteTypes.ALL) {
	// 	path = `${basePath}&page_id=${pageId}`;
	// } else {
	// 	path = `${basePath}&voteType=${voteType}&page_id=${pageId}`;
	// }
	const {data} = useGet({
		path: path,
	});

	const onPageChange = page => {
		setPageId(page);
	};

	let titleSection;
	let filterSection;
	let headerSection;
	let tableSection;
	let paginationSection;
	let bodySection;

	const columns = [{title: "TxHash"}, {title: "Type"}, {title: "Result"}, {title: "Amount"}, {title: "Fee"}, {title: "Height"}, {title: "Time"}];
	// const filterData = [
	// 	{
	// 		label: "All",
	// 		value: voteTypes.ALL,
	// 	},
	// 	{
	// 		label: "Yes",
	// 		value: voteTypes.YES,
	// 	},
	// 	{
	// 		label: "No",
	// 		value: voteTypes.NO,
	// 	},
	// 	{
	// 		label: "NoWithVeto",
	// 		value: voteTypes.NO_WITH_VETO,
	// 	},
	// 	{
	// 		label: "Abstain",
	// 		value: voteTypes.ABSTAIN,
	// 	},
	// ];

	if (isLargeScreen) {
		titleSection = <div className={cx("title")}>Transactions</div>;
	} else {
		titleSection = <></>;
	}

	if (!data) {
		// filterSection = <FilterSectionSkeleton />;
		tableSection = isLargeScreen ? <TransactionTableSkeleton /> : <TransactionCardListSkeleton />;
	} else {
		// filterSection = (
		// 	<FilterSection
		// 		data={filterData}
		// 		value={status}
		// 		onChange={value => {
		// 			setStatus(value);
		// 		}}
		// 	/>
		// );

		if (!isNaN(data?.page?.total_page) && data.page.total_page != totalPages) {
			setTotalPages(data.page.total_page);
		}

		if (Array.isArray(data?.txs) && data.txs.length > 0) {
			tableSection = isLargeScreen ? <TransactionTable data={data.txs} /> : <TransactionCardList data={data.txs} />;
		} else {
			const columns = [
				{title: "TxHash", align: "left"},
				{title: "Type", align: "left"},
				{title: "Result", align: "center"},
				{title: "Amount", align: "right"},
				{title: "Fee", align: "right"},
				{title: "Height", align: "right"},
				{title: "Time", align: "right"},
			];
			tableSection = <EmptyTable columns={columns} />;
		}
	}

	paginationSection = totalPages > 1 ? <Pagination pages={totalPages} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	headerSection = (
		<div className={cx("transactions-card-header")}>
			{titleSection}
			{filterSection}
		</div>
	);
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
