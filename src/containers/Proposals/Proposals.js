import React, {useState, useRef} from "react";
import {useGet} from "restful-react";
import cn from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import queryString from "query-string";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import consts from "src/constants/consts";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import FilterSection from "src/components/common/FilterSection";
import FilterSectionSkeleton from "src/components/common/FilterSection/FilterSectionSkeleton";
import NoResult from "src/components/common/NoResult";
import Pagination from "src/components/common/Pagination";
import TopProposalCardList from "src/components/Proposals/TopProposalCardList";
import TopProposalCardListSkeleton from "src/components/Proposals/TopProposalCardList/TopProposalCardListSkeleton";
import ProposalsTable from "src/components/Proposals/ProposalsTable/ProposalsTable";
import ProposalsTableSkeleton from "src/components/Proposals/ProposalsTable/ProposalsTableSkeleton";
import ProposalCardList from "src/components/Proposals/ProposalCardList/ProposalCardList";
import ProposalCardListSkeleton from "src/components/Proposals/ProposalCardList/ProposalCardListSkeleton";
import styles from "./Proposals.scss";

const cx = cn.bind(styles);

export default function(props) {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [status, setStatus] = useState("PROPOSAL_STATUS_ALL");
	const [topPageId, setTopPageId] = useState(1);
	const totalTopPagesRef = useRef(null);
	const [pageId, setPageId] = useState(1);
	const totalPagesRef = useRef(null);
	const history = useHistory();
	const queryStringParse = queryString.parse(history.location.search) || {};
	const type = queryStringParse?.type ?? null;

	const onTopPageChange = page => {
		setTopPageId(page);
	};

	const onPageChange = page => {
		setPageId(page);
	};

	const topPath = `${consts.API.PROPOSALS}?status&type=${type}&limit=3&page_id=${topPageId}`;
	const {data: topData, loading: topLoading, error: topError} = useGet({
		path: topPath,
	});

	const statusPath = consts.API.PROPOSAL_STATUS;
	const {data: statusData, loading: statusLoading, error: statusError} = useGet({
		path: statusPath,
	});

	const basePath = `${consts.API.PROPOSALS}?limit=${consts.REQUEST.LIMIT}&type=${type}`;
	let path;
	if (status === "PROPOSAL_STATUS_ALL") {
		path = `${basePath}&page_id=${pageId}`;
	} else {
		path = `${basePath}&status=${status}&page_id=${pageId}`;
	}
	const {data, loading, error} = useGet({
		path: path,
	});

	let titleSection;
	let topProposalCardList;
	let filterSection;
	let tableSection;
	let paginationTopSection;
	let paginationSection;

	if (isLargeScreen) {
		titleSection = (
			<Container fixed>
				<TitleWrapper>
					<PageTitle title={"Proposals"} />
					<StatusBox />
				</TitleWrapper>
			</Container>
		);
	} else {
		titleSection = <TogglePageBar type='proposals' />;
	}

	if (topLoading) {
		topProposalCardList = <TopProposalCardListSkeleton />;
	} else {
		if (topError) {
			totalPagesRef.current = null;
			topProposalCardList = <TopProposalCardList data={[]} />;
		} else {
			if (!isNaN(topData?.page?.total_page)) {
				totalTopPagesRef.current = topData?.page?.total_page;
			} else {
				totalTopPagesRef.current = null;
			}

			if (Array.isArray(topData?.data) && topData?.data?.length > 0) {
				topProposalCardList = <TopProposalCardList data={topData?.data} type={type} />;
			} else {
				tableSection = <NoResult />;
			}
		}
	}

	if (statusLoading) {
		filterSection = <FilterSectionSkeleton />;
	} else {
		let filterData;
		if (statusError) {
			filterData = [
				{
					label: "ALL",
					value: "PROPOSAL_STATUS_ALL",
				},
			];
		} else {
			filterData = statusData.map(value => {
				const filterItem = {
					label: value.replace("PROPOSAL_STATUS_", "").replace("_", " "),
					value: value,
				};
				return filterItem;
			});

			filterData.unshift({
				label: "ALL",
				value: "PROPOSAL_STATUS_ALL",
			});
		}

		filterSection = (
			<FilterSection
				className={cx("filter-section")}
				data={filterData}
				value={status}
				onChange={value => {
					setStatus(value);
				}}
			/>
		);
	}

	if (loading) {
		tableSection = isLargeScreen ? <ProposalsTableSkeleton /> : <ProposalCardListSkeleton />;
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
				tableSection = isLargeScreen ? <ProposalsTable data={data.data} type={type} /> : <ProposalCardList data={data.data} type={type} />;
			} else {
				tableSection = <NoResult />;
			}
		}
	}
	paginationTopSection = totalTopPagesRef.current ? (
		<Pagination pages={totalTopPagesRef.current} page={topPageId} onChange={(e, page) => onTopPageChange(page)} />
	) : (
		<></>
	);
	paginationSection = totalPagesRef.current ? <Pagination pages={totalPagesRef.current} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<>
			{titleSection}
			<Container fixed className={cx("proposals")}>
				{topProposalCardList}
				{paginationTopSection}
				{filterSection}
				{tableSection}
				{paginationSection}
			</Container>
		</>
	);
}
