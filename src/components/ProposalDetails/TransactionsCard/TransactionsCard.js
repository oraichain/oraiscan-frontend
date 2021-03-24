import React, {memo, useState, useRef} from "react";
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
const columns = [
	{title: "TxHash", align: "left"},
	{title: "Type", align: "left"},
	{title: "Result", align: "center"},
	{title: "Amount", align: "right"},
	{title: "Fee", align: "right"},
	{title: "Height", align: "right"},
	{title: "Time", align: "right"},
];

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
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const basePath = `${consts.API.PROPOSALS_TRANSACTIONS}/${proposalId}?limit=${consts.REQUEST.LIMIT}`;
	let path;
	path = `${basePath}&page_id=${pageId}`;
	// if (voteType === voteTypes.ALL) {
	// 	path = `${basePath}&page_id=${pageId}`;
	// } else {
	// 	path = `${basePath}&voteType=${voteType}&page_id=${pageId}`;
	// }
	const {data, loading, error} = useGet({
		path: path,
	});

	let titleSection;
	let filterSection;
	let headerSection;
	let tableSection;
	let paginationSection;
	let bodySection;

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

	if (loading) {
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

		if (error) {
			totalPagesRef.current = null;
			tableSection = <EmptyTable columns={columns} />;
		} else {
			if (!isNaN(data?.page?.total_page)) {
				totalPagesRef.current = data.page.total_page;
			} else {
				totalPagesRef.current = null;
			}

			if (Array.isArray(data?.txs) && data.txs.length > 0) {
				tableSection = isLargeScreen ? <TransactionTable data={data.txs} /> : <TransactionCardList data={data.txs} />;
			} else {
				tableSection = <EmptyTable columns={columns} />;
			}
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

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
