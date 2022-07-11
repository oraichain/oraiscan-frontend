/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useMemo, useState, useRef, useEffect } from "react";
import { useGet } from "restful-react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import { arraysEqual, mergeArrays } from "src/helpers/helper";
import { formatInteger } from "src/helpers/helper";
import { _ } from "src/lib/scripts";
import FilterSection from "src/components/common/FilterSection";
import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import TransactionTable from "src/components/ProposalDetails/TransactionTable";
import TransactionTableSkeleton from "src/components/ProposalDetails/TransactionTable/TransactionTableSkeleton";
import TransactionCardList from "src/components/ProposalDetails/TransactionCardList";
import TransactionCardListSkeleton from "src/components/ProposalDetails/TransactionCardList/TransactionCardListSkeleton";
import styles from "./Depositors.scss";
import DepositorsTable from "./DepositorsTable";
import DepositorsSkeleton from "./DepositorsSkeleton";
import DepositorsCard from "./DepositorsCard";

const cx = classNames.bind(styles);

const Depositors = memo(({ proposalId }) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const despositorPath = `${consts.API.PROPOSALS}/${proposalId}/depositors?page_id=${pageId}`;
	const { data: despositorData, loading: despositorLoading } = useGet({
		path: despositorPath,
	});

	let headerSection;
	let tableSection;
	let paginationSection;
	let bodySection;

	if (!despositorLoading) {
		if (despositorData?.depositors) {
			totalPagesRef.current = despositorData?.page?.total_page;
			tableSection = isLargeScreen ? <DepositorsTable data={despositorData?.depositors} /> : <DepositorsCard data={despositorData?.depositors} />;
		} else {
			totalPagesRef.current = null;
			tableSection = <NoResult />;
		}
	} else {
		tableSection = <TransactionTableSkeleton />;
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	headerSection = (
		<div className={cx("transactions-card-header")}>
			<div className={cx("title")}>Depositors</div>
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

export default Depositors;
