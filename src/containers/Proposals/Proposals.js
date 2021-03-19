import React, {useState} from "react";
import {useGet} from "restful-react";
import cn from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import consts from "src/constants/consts";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import FilterSection from "src/components/common/FilterSection";
import FilterSectionSkeleton from "src/components/common/FilterSection/FilterSectionSkeleton";
import EmptyTable from "src/components/common/EmptyTable";
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
	const [pageId, setPageId] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const topPath = `${consts.API.PROPOSALS}?status&limit=4&page_id=1`;
	const {data: topData} = useGet({
		path: topPath,
	});

	const statusPath = consts.API.PROPOSAL_STATUS;
	const {data: statusData} = useGet({
		path: statusPath,
	});

	const basePath = `${consts.API.PROPOSALS}?limit=${consts.REQUEST.LIMIT}`;
	let path;
	if (status === "PROPOSAL_STATUS_ALL") {
		path = `${basePath}&page_id=${pageId}`;
	} else {
		path = `${basePath}&status=${status}&page_id=${pageId}`;
	}
	const {data} = useGet({
		path: path,
	});

	const onPageChange = page => {
		setPageId(page);
	};

	let titleSection;
	let topProposalCardList;
	let filterSection;
	let tableSection;
	let paginationSection;

	if (isLargeScreen) {
		titleSection = (
			<TitleWrapper>
				<PageTitle title={"Proposals"} />
				<StatusBox />
			</TitleWrapper>
		);
	} else {
		titleSection = <TogglePageBar type='proposals' />;
	}

	if (!topData) {
		topProposalCardList = <TopProposalCardListSkeleton />;
	} else {
		topProposalCardList = <TopProposalCardList data={topData.data} />;
	}

	if (!Array.isArray(statusData)) {
		filterSection = <FilterSectionSkeleton />;
	} else {
		const filterData = statusData.map(value => {
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

		filterSection = (
			<FilterSection
				data={filterData}
				value={status}
				onChange={value => {
					setStatus(value);
				}}
			/>
		);
	}

	if (!data) {
		tableSection = isLargeScreen ? <ProposalsTableSkeleton /> : <ProposalCardListSkeleton />;
	} else {
		if (!isNaN(data?.page?.total_page) && data.page.total_page != totalPages) {
			setTotalPages(data.page.total_page);
		}

		if (Array.isArray(data?.data) && data.data.length > 0) {
			tableSection = isLargeScreen ? <ProposalsTable data={data.data} /> : <ProposalCardList data={data.data} />;
		} else {
			const columns = [
				{title: "#ID", align: "center"},
				{title: "Title", align: "left"},
				{title: "Status", align: "center"},
				{title: "Voting Start", align: "right"},
				{title: "Submit Time", align: "right"},
				{title: "Total Deposit", align: "right"},
			];
			tableSection = <EmptyTable columns={columns} />;
		}
	}

	paginationSection = totalPages > 1 ? <Pagination pages={totalPages} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	return (
		<Container fixed className={cx("proposals")}>
			{titleSection}
			{topProposalCardList}
			{filterSection}
			{tableSection}
			{paginationSection}
		</Container>
	);
}
