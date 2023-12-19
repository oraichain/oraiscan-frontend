import React, { memo, useState, useRef } from "react";
import { useGet } from "restful-react";
import { useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import TransactionTable from "src/components/TxList/TransactionTable";
import TransactionTableSkeleton from "src/components/TxList/TransactionTable/TransactionTableSkeleton";
import TransactionCardList from "src/components/TxList/TransactionCardList";
import TransactionCardListSkeleton from "src/components/TxList/TransactionCardList/TransactionCardListSkeleton";
import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import CwToken from "src/components/Wallet/CwToken";
import TopHolders from "src/components/Wallet/TopHolders";
import Tabs from "src/components/TxList/Tabs";
import styles from "./TransactionCard.module.scss";

const cx = classNames.bind(styles);

const TransactionCard = memo(({ address = "", account = "" }) => {
	const theme = useTheme();
	const history = useHistory();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(1);
	const isCw20Tab = window.location.search === "?cw20";
	const initActiveTab = isCw20Tab ? 2 : 0;
	if (!isCw20Tab && window.location.search) history.replace(`${consts.PATH.SMART_CONTRACT}/${address}`);
	const [activeTab, setActiveTab] = useState(initActiveTab);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const basePath = `${consts.API.TXS_CONTRACT}/${address}?limit=${consts.REQUEST.LIMIT}`;
	const path = `${basePath}&page_id=${pageId}`;

	const { data, loading, error } = useGet({
		path: path,
	});

	let tableSection;
	let paginationSection;

	if (loading) {
		tableSection = isLargeScreen ? <TransactionTableSkeleton /> : <TransactionCardListSkeleton />;
	} else {
		if (error) {
			totalPagesRef.current = null;
			tableSection = <NoResult />;
		} else {
			if (!isNaN(data?.page?.total_page)) {
				totalPagesRef.current = data.page.total_page;
			} else {
				totalPagesRef.current = null;
			}

			if (Array.isArray(data?.data) && data.data.length > 0) {
				tableSection = isLargeScreen ? <TransactionTable data={data.data} account={account} /> : <TransactionCardList data={data.data} account={account} />;
			} else {
				tableSection = <NoResult />;
			}
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	const handleSetActiveTab = tabId => {
		let str = `${consts.PATH.SMART_CONTRACT}/${address}`;
		if (tabId === 2) str += "?cw20";
		history.replace(str);
		setActiveTab(tabId);
	};

	return (
		<div className={cx("transaction-card")}>
			<div className={cx("transaction-card-header")}>
				<Tabs activeTab={activeTab} setActiveTab={handleSetActiveTab} address={address} isTab />
			</div>
			<div className={cx("transaction-card-body")}>
				{activeTab === 0 && tableSection}
				{activeTab === 2 && <CwToken address={address} isOw20 />}
				{activeTab === 4 && <TopHolders address={address} isOw20 />}
				{activeTab !== 2 && activeTab !== 4 ? paginationSection : null}
			</div>
		</div>
	);
});

export default TransactionCard;
