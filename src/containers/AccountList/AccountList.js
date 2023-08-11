import React, { memo, useState, useEffect } from "react";
import { useGet } from "restful-react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import AccountTable from "src/components/ValidatorList/AccountTable/AccountTable.js";
import AccountTableSkeleton from "src/components/ValidatorList/AccountTable/AccountTableSkeleton.js";
import AccountCardList from "src/components/ValidatorList/AccountCardList/AccountCardList.js";
import AccountCardListSkeleton from "src/components/ValidatorList/AccountCardList/AccountCardListSkeleton.js";
import Pagination from "src/components/common/Pagination";
import NoResult from "src/components/common/NoResult";
import { useRef } from "react";
import { Container } from "@material-ui/core";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import styles from "./AccountList.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

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

	const [listBalance, setListBalance] = useState([]);

	const { data, loading, error } = useGet({
		path: path,
	});

	let titleSection;
	let tableSection;
	let paginationSection;

	//TODO: hardcode hotfix with balance
	const fetchBalance = async address => {
		const resp = await axios.get(`https://api.scan.orai.io/v1/account/coins/${address}`);
		return resp?.data;
	};

	const fetchAllBalance = async data => {
		const bal = data.map(e => {
			return fetchBalance(e.address);
		});
		const balanceList = await Promise.all(bal);
		setListBalance(balanceList);
	};

	useEffect(() => {
		if (data?.data?.length) {
			fetchAllBalance(data.data);
		}
		return () => {};
	}, [data]);

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
			tableSection = <NoResult />;
		} else {
			if (!isNaN(data?.page?.total_page)) {
				totalPagesRef.current = data.page.total_page;
			} else {
				totalPagesRef.current = null;
			}

			const dataWithBalance = data?.data?.map((e, i) => {
				return {
					...e,
					balance: listBalance[i]?.total,
				};
			});
			if (Array.isArray(data?.data) && data.data.length > 0) {
				tableSection = isLargeScreen ? <AccountTable data={dataWithBalance} /> : <AccountCardList data={dataWithBalance} />;
			} else {
				tableSection = <NoResult />;
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
