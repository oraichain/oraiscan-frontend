import React, {memo, useState} from "react";
import {useGet} from "restful-react";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import AccountTable from "src/components/ValidatorList/AccountTable/AccountTable.js";
import AccountTableSkeleton from "src/components/ValidatorList/AccountTable/AccountTableSkeleton.js";
import AccountCardList from "src/components/ValidatorList/AccountCardList/AccountCardList.js";
import AccountCardListSkeleton from "src/components/ValidatorList/AccountCardList/AccountCardListSkeleton.js";
import Pagination from "src/components/common/Pagination";
import EmptyTable from "src/components/common/EmptyTable";
import {useRef} from "react";
import {Container} from "@material-ui/core";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import styles from "./AccountList.scss";

const cx = classNames.bind(styles);
const columns = [
	{title: "Rank", align: "center"},
	{title: "Address", align: "left"},
	{title: "Name Tag", align: "left"},
	{title: "Balance", align: "left"},
	{title: "Percentage", align: "left"},
	{title: "Txn Count", align: "left"},
];

const AccountList = memo(() => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);

	const onPageChange = page => {
		setPageId(page);
	};

	const basePath = `${consts.API.ACCOUNTS}?limit=${consts.REQUEST.LIMIT}`;
	const path = `${basePath}&page_id=${pageId}`;

	const {data, loading, error} = useGet({
		path: path,
	});

	let titleSection;
	let tableSection;
	let paginationSection;

	titleSection = isLargeScreen ? (
		<Container fixed>
			<TitleWrapper>
				<PageTitle title={"Accounts"} />
				<StatusBox />
			</TitleWrapper>
		</Container>
	) : (
		<TogglePageBar type='accounts' />
	);

	if (loading) {
		tableSection = isLargeScreen ? <AccountTableSkeleton /> : <AccountCardListSkeleton />;
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
				tableSection = isLargeScreen ? <AccountTable data={data.data} /> : <AccountCardList data={data.data} />;
			} else {
				tableSection = <EmptyTable columns={columns} />;
			}
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<>
			{titleSection}
			<Container fixed className={cx("account-list")}>
				{tableSection}
				{paginationSection}
			</Container>
		</>
	);
});

export default AccountList;
