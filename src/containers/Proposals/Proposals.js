import Container from "@material-ui/core/Container";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import cn from "classnames/bind";
import { isNaN, isNil } from "lodash-es";
import queryString from "query-string";
import { lazy, useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import FilterSection from "src/components/common/FilterSection";
import { useSelector, useDispatch } from "react-redux";
import NoResult from "src/components/common/NoResult";
import PageTitle from "src/components/common/PageTitle";
import Pagination from "src/components/common/Pagination";
import StatusBox from "src/components/common/StatusBox";
import TitleWrapper from "src/components/common/TitleWrapper";
import TogglePageBar from "src/components/common/TogglePageBar";
import ProposalCardList from "src/components/Proposals/ProposalCardList/ProposalCardList";
import ProposalCardListSkeleton from "src/components/Proposals/ProposalCardList/ProposalCardListSkeleton";
import ProposalsTable from "src/components/Proposals/ProposalsTable/ProposalsTable";
import ProposalsTableSkeleton from "src/components/Proposals/ProposalsTable/ProposalsTableSkeleton";
import TopProposalCardList from "src/components/Proposals/TopProposalCardList";
import TopProposalCardListSkeleton from "src/components/Proposals/TopProposalCardList/TopProposalCardListSkeleton";
import styles from "./Proposals.module.scss";
import { LIMIT, arrFilterType, PROPOSAL_STATUS } from "./constant";
import { handleListProposal, getDataProposal } from "./helper";
import { changeProposal, updateProposal } from "../../store/modules/proposal";

const CreateProposal = lazy(() => import(`./CreateProposal`));
const cx = cn.bind(styles);

const listProposalFilter = (proposals = [], type, status = "PROPOSAL_STATUS_ALL") => {
	let data = proposals;
	if (status !== "PROPOSAL_STATUS_ALL") data = data.filter(e => e.status == status);
	if (type) data = data.filter(e => [...arrFilterType.map(ar => ar + type)].includes(e.type_url));
	return { data };
};

export default function() {
	const theme = useTheme();
	const dispatch = useDispatch();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const { proposals, bondTotal } = useSelector(state => state.proposal);
	const [status, setStatus] = useState("PROPOSAL_STATUS_ALL");
	const [loading, setLoading] = useState(false);
	const [topPageId, setTopPageId] = useState(1);
	const [pageId, setPageId] = useState(1);
	const totalTopPagesRef = useRef(null);
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

	const getListProposal = async () => {
		try {
			setLoading(true);
			const { pagination } = await getDataProposal({ offset: 0, limit: undefined, isFlag: false, bondTotal });
			const total = pagination.total.toNumber();
			const checkCacheDuplicate = total < proposals.length;
			const { list, type } = await handleListProposal({ total, proposals, bondTotal, isNullProposal: checkCacheDuplicate });
			if (type === "changeProposal") dispatch(changeProposal(list));
			if (type === "updateProposal") dispatch(updateProposal(list));
		} catch (error) {
			console.log({ error });
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getListProposal();
	}, []);

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

	if (loading) {
		topProposalCardList = <TopProposalCardListSkeleton />;
	} else {
		const { data } = listProposalFilter(proposals, type, status);
		if (!isNaN(data)) {
			totalTopPagesRef.current = Math.ceil(data.length / 4);
		} else {
			totalTopPagesRef.current = null;
		}
		if (Array.isArray(data) && data?.length > 0) {
			topProposalCardList = <TopProposalCardList data={data.slice((topPageId - 1) * 4, topPageId * 4)} type={type} />;
		} else {
			tableSection = <NoResult />;
		}
	}

	if (PROPOSAL_STATUS) {
		let filterData;
		filterData = Object.keys(PROPOSAL_STATUS).map(value => ({
			label: value.replace("PROPOSAL_STATUS_", ""),
			value,
		}));
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
		const { data } = listProposalFilter(proposals, type, status);
		if (!isNaN(data)) {
			totalPagesRef.current = Math.ceil(data.length / LIMIT);
		} else {
			totalPagesRef.current = null;
		}

		if (Array.isArray(data) && data.length > 0) {
			tableSection = isLargeScreen ? (
				<ProposalsTable data={data.slice((pageId - 1) * LIMIT, LIMIT * pageId)} type={type} />
			) : (
				<ProposalCardList data={data.slice((pageId - 1) * LIMIT, LIMIT * pageId)} type={type} />
			);
		} else {
			tableSection = <NoResult />;
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
				<CreateProposal />
				{topProposalCardList}
				{paginationTopSection}
				{filterSection}
				{tableSection}
				{paginationSection}
			</Container>
		</>
	);
}
