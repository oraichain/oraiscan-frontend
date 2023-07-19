import Container from "@material-ui/core/Container";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import cn from "classnames/bind";
import { isNaN, isNil } from "lodash-es";
import queryString from "query-string";
import { lazy, useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import FilterSection from "src/components/common/FilterSection";
import { updateProposal } from "src/store/modules/proposal";
import { useSelector, useDispatch } from "react-redux";
import NoResult from "src/components/common/NoResult";
import { calculateTallyProposal } from "src/helpers/helper";
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
import { queryStation } from "src/lib/queryStation";
import { TextProposal } from "cosmjs-types/cosmos/gov/v1beta1/gov";

const CreateProposal = lazy(() => import(`./CreateProposal`));
const cx = cn.bind(styles);

const PROPOSAL_STATUS_ALL = "PROPOSAL_STATUS_ALL";
const arr = ["/cosmos.gov.v1beta1.", "/cosmos.upgrade.v1beta1.", "/cosmos.params.v1beta1."];
const LIMIT = 10;

const ProposalStatus = {
	PROPOSAL_STATUS_ALL: -1, //UNRECOGNIZED
	PROPOSAL_STATUS_UNSPECIFIED: 0,
	PROPOSAL_STATUS_DEPOSIT_PERIOD: 1,
	PROPOSAL_STATUS_VOTING_PERIOD: 2,
	PROPOSAL_STATUS_PASSED: 3,
	PROPOSAL_STATUS_REJECTED: 4,
	PROPOSAL_STATUS_FAILED: 5,
};

const listProposalFilter = (proposals = [], type, status = PROPOSAL_STATUS_ALL) => {
	let data = proposals;
	if (status !== PROPOSAL_STATUS_ALL) data = data.filter(e => e.status == status);
	if (type) data = data.filter(e => [...arr.map(ar => ar + type)].includes(e.type_url));
	return { data };
};

export default function() {
	const theme = useTheme();
	const dispatch = useDispatch();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const { proposals, bondTotal } = useSelector(state => state.proposal);
	const [status, setStatus] = useState(PROPOSAL_STATUS_ALL);
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

	const getDataProposal = async (offset = 0, limit = undefined, isFlag = false) => {
		const { proposals, pagination } = await queryStation.proposalList(-1, "", "", undefined, offset, limit);
		let list = [];

		if (isFlag) {
			list = proposals.map(e => {
				const value = TextProposal.decode(e?.content?.value);
				const status = Object.keys(ProposalStatus)[Object.values(ProposalStatus).indexOf(e.status)];
				const totalVote = Object.values(e?.finalTallyResult).reduce((acc, cur) => acc + parseInt(cur), 0);
				const tallyObj = calculateTallyProposal({ bonded: bondTotal, totalVote, tally: e?.finalTallyResult });
				return {
					...tallyObj,
					proposal_id: e?.proposalId?.toString(),
					status,
					title: value?.title,
					submit_time: e.submitTime.seconds.toNumber() * 1000,
					voting_end_time: e.votingEndTime.seconds.toNumber() * 1000,
					total_deposit: e.totalDeposit.reduce((acc, cur) => acc + parseInt(cur.amount), 0),
					voting_start_time: e.votingStartTime.seconds.toNumber() * 1000,
					deposit_end_time: e.depositEndTime.seconds.toNumber() * 1000,
					type_url: e.content.typeUrl,
					finalTallyResult: e?.finalTallyResult,
				};
			});
		}
		return { list, pagination, proposals };
	};

	const getProposalList = async () => {
		try {
			setLoading(true);
			const { pagination } = await getDataProposal();
			const total = pagination.total.toNumber();
			if (!proposals.length) {
				let listProposalData = [];
				for (let i = 0; i < Math.ceil(total / 100); i++) {
					const p = await getDataProposal(i * 100, undefined, true);
					listProposalData = [...listProposalData, ...p.list];
				}
				return dispatch(updateProposal(listProposalData));
			}

			if (total > proposals.length) {
				const limit = total - proposals.length;
				if (limit && limit > 100) {
					let listProposalData = [];
					for (let i = 0; i < Math.ceil(limit / 100); i++) {
						let limitProposal = i * 100;
						if (i + 1 == Math.ceil(limit / 100)) {
							limitProposal = limit - i * 100;
						}
						const p = await getDataProposal(limitProposal, undefined, true);
						listProposalData = [...listProposalData, ...p.list];
					}
					return dispatch(updateProposal(listProposalData));
				}
				if (limit && limit < 100) {
					const p = await getDataProposal(0, limit, true);
					return dispatch(updateProposal([...p.list]));
				}
			}
		} catch (error) {
			console.log({ error });
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getProposalList();
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

	if (ProposalStatus) {
		let filterData;
		filterData = Object.keys(ProposalStatus).map(value => ({
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
