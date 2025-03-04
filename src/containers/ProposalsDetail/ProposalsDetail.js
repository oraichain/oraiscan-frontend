import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGet } from "restful-react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import cn from "classnames/bind";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import consts from "src/constants/consts";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import DetailsCard from "src/components/ProposalDetails/DetailsCard/DetailsCard";
import DetailsCardSkeleton from "src/components/ProposalDetails/DetailsCard/DetailsCardSkeleton";
import ChartCard from "src/components/ProposalDetails/ChartCard";
import ChartCardSkeleton from "src/components/ProposalDetails/ChartCard/ChartCardSkeleton";
import TransactionsCard from "src/components/ProposalDetails/TransactionsCard";
import NavigateBackBar from "src/components/common/NavigateBackBar";
import ProposalVoteModal from "./ProposalVoteModal";
import ProposalDepositModal from "./ProposalDepositModal";
import ValidatorVotes from "src/components/ProposalDetails/ValidatorVotes";
import Depositors from "src/components/ProposalDetails/Depositors";
import styles from "./ProposalsDetail.module.scss";
import { queryStation } from "src/lib/queryStation";
import { TextProposal } from "cosmjs-types/cosmos/gov/v1beta1/gov";
import { calculateTallyProposal } from "src/helpers/helper";

import moment from "moment";
import useFetchLCD from "../../hooks/useFetchLCD";

const cx = cn.bind(styles);

export default function(props) {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const proposalId = props?.match?.params?.id;
	const history = useHistory();
	const queryStringParse = queryString.parse(history.location.search) || {};
	const { address, account } = useSelector(state => state.wallet);
	const { bondTotal, proposals } = useSelector(state => state.proposal);
	const [des, setDes] = useState({});
	const [tally, setTally] = useState({});
	const type = queryStringParse?.type ?? "";
	const path = `${consts.API.PROPOSALS}/${proposalId}`;
	const { data: dataDetail, loading, error } = useGet({
		path: path,
	});
	const [data, setData] = useState({});
	const { result } = useFetchLCD(`cosmos/gov/v1/proposals/${proposalId}`);

	useEffect(() => {
		if (!!result) {
			const proposal = result.proposal;

			if (!!proposal) {
				const type = proposal?.messages?.[0]["@type"];
				const title = proposal?.title || proposal?.authority;
				const deposit_end_time = proposal.deposit_end_time;
				const description = proposal?.description;
				const voting_start = proposal.voting_start_time;
				const voting_end = proposal.voting_end_time;
				const submit_time = proposal.submit_time;
				const status = proposal.status;
				const total_deposit = Array.isArray(proposal.total_deposit) ? proposal.total_deposit[0]?.amount : null;
				const proposal_id = proposal.proposer;
				setData({
					...dataDetail,
					type,
					title,
					deposit_end_time,
					description,
					voting_start,
					voting_end,
					submit_time,
					status,
					total_deposit,
					proposal_id: proposal.id,
					proposer: proposal_id,
				});
			}
		}
	}, [result, dataDetail]);

	async function getDescriptionProposal() {
		const description = await queryStation.proposalId(proposalId);
		setDes(TextProposal.decode(description.proposal.content.value));
	}

	async function getTallyProposal() {
		const { tally } = await queryStation.tally(proposalId);
		const totalVote = Object.values(tally).reduce((acc, cur) => acc + parseInt(cur), 0);
		const tallyProposal = calculateTallyProposal({
			bonded: bondTotal,
			totalVote,
			tally: tally,
		});
		setTally({
			total_orai: totalVote,
			...tallyProposal,
		});
	}

	useEffect(() => {
		if (proposalId) {
			getDescriptionProposal();
			getTallyProposal();
		}
	}, [data]);

	const [showDepositModal, setShowDepositModal] = useState(false);
	const handleCloseDepositModal = () => {
		setShowDepositModal(false);
	};

	const [showVoteModal, setShowVoteModal] = useState(false);
	const handleCloseVoteModal = () => {
		setShowVoteModal(false);
	};

	const [voteOption, setVoteOption] = useState("VOTE_OPTION_YES");

	const onDeposit = () => {
		setShowDepositModal(true);
	};

	const onVote = () => {
		setShowVoteModal(true);
	};

	let titleText;
	let titleSection;
	let detailsCard;
	let chartCard;
	let transactionsCard;
	let depositorsTable;
	let validatorVotesTable;
	let finalButton;
	let isValidDepositEndTime = false;

	let voteButton = (
		<div className={cx("create-button")} onClick={onVote}>
			<span className={cx("create-button-text")}>Vote proposal</span>
		</div>
	);

	let depositButton = (
		<div className={cx("create-button")} onClick={onDeposit}>
			<span className={cx("create-button-text")}>Deposit tokens</span>
		</div>
	);

	switch (type) {
		case "SoftwareUpgradeProposal":
			titleText = "Upgrade Proposal";
			break;
		case "ParameterChangeProposal":
			titleText = "Change Proposal";
			break;
		case "TextProposal":
			titleText = "Text Proposal";
			break;
		default:
			titleText = "Proposal Details";
			break;
	}

	if (loading) {
		detailsCard = <DetailsCardSkeleton />;
		chartCard = <ChartCardSkeleton />;
	} else {
		if (error) {
			detailsCard = <DetailsCard data={{}} />;
			chartCard = <ChartCard data={{}} />;
		} else {
			let dataDescription = {
				...data,
			};
			if (!data.description) {
				dataDescription.description = des?.description;
			}

			detailsCard = <DetailsCard data={dataDescription} />;
			chartCard = <ChartCard data={tally} />;
		}

		// if (moment(data?.deposit_end_time).isValid()) {
		// 	isValidDepositEndTime = new Date(data?.deposit_end_time).getTime() <= new Date().getTime();
		// }
		isValidDepositEndTime = moment(data?.deposit_end_time).isAfter(moment());

		// handle button state
		switch (data?.status) {
			case "PROPOSAL_STATUS_DEPOSIT_PERIOD":
				finalButton = depositButton;
				break;
			case "PROPOSAL_STATUS_VOTING_PERIOD":
				finalButton = voteButton;
				break;
			default:
				finalButton = <div></div>;
				break;
		}
	}

	titleSection = isLargeScreen ? (
		<Container fixed>
			<TitleWrapper>
				<PageTitle title={titleText} />
				<StatusBox />
			</TitleWrapper>
		</Container>
	) : (
		<>
			<TogglePageBar type='proposals' />
			<NavigateBackBar type='proposals' />
		</>
	);

	transactionsCard = <TransactionsCard proposalId={proposalId} />;
	depositorsTable = <Depositors proposalId={proposalId} />;
	validatorVotesTable = <ValidatorVotes proposalId={proposalId} />;
	return (
		<>
			{titleSection}
			<Container fixed className={cx("proposal-details")}>
				{isValidDepositEndTime && finalButton}
				<Grid container spacing={2}>
					<Grid item lg={9} xs={12}>
						{detailsCard}
					</Grid>
					<Grid item lg={3} xs={12}>
						{chartCard}
					</Grid>
					<Grid item xs={12}>
						{transactionsCard}
					</Grid>
					<Grid item xs={12}>
						{validatorVotesTable}
					</Grid>
					<Grid item xs={12}>
						{depositorsTable}
					</Grid>
				</Grid>
			</Container>
			{data && <ProposalDepositModal open={showDepositModal} onClose={handleCloseDepositModal} data={data} />}
			{data && <ProposalVoteModal open={showVoteModal} onClose={handleCloseVoteModal} data={data} />}
		</>
	);
}
