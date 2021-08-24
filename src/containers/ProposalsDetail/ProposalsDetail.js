import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useGet} from "restful-react";
import {useHistory} from "react-router-dom";
import queryString from "query-string";
import cn from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
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
import styles from "./ProposalsDetail.scss";
import NavigateBackBar from "src/components/common/NavigateBackBar";
import ProposalVoteModal from "./ProposalVoteModal";
import ProposalDepositModal from "./ProposalDepositModal";

const cx = cn.bind(styles);

export default function(props) {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const proposalId = props?.match?.params?.id;
	const history = useHistory();
	const queryStringParse = queryString.parse(history.location.search) || {};
	const {address, account} = useSelector(state => state.wallet);
	const type = queryStringParse?.type ?? "";
	const path = `${consts.API.PROPOSALS}/${proposalId}`;
	const {data, loading, error} = useGet({
		path: path,
	});
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
	let finalButton;

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
			detailsCard = <DetailsCard data={data} />;
			chartCard = <ChartCard data={data} />;
		}

		// handle button state
		switch (data?.status) {
			case "PROPOSAL_STATUS_DEPOSIT_PERIOD":
				console.log("deposit period");
				finalButton = depositButton;
				break;
			case "PROPOSAL_STATUS_VOTING_PERIOD":
				console.log("voting period");
				finalButton = voteButton;
				break;
			default:
				console.log("Finished");
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
			{finalButton}
		</Container>
	) : (
		<>
			<TogglePageBar type='proposals' />
			<NavigateBackBar type='proposals' />
		</>
	);

	transactionsCard = <TransactionsCard proposalId={proposalId} />;
	return (
		<>
			{titleSection}
			<Container fixed className={cx("proposal-details")}>
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
				</Grid>
			</Container>
			{data && <ProposalDepositModal open={showDepositModal} onClose={handleCloseDepositModal} data={data} />}
			{data && <ProposalVoteModal open={showVoteModal} onClose={handleCloseVoteModal} data={data} />}
		</>
	);
}
