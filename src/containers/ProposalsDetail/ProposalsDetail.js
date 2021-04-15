import React from "react";
import {useGet} from "restful-react";
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

const cx = cn.bind(styles);

export default function(props) {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const proposalId = props?.match?.params?.id;

	const path = `${consts.API.PROPOSALS}/${proposalId}`;
	const {data, loading, error} = useGet({
		path: path,
	});

	let titleSection;
	let detailsCard;
	let chartCard;
	let transactionsCard;

	titleSection = isLargeScreen ? (
		<Container fixed>
			<TitleWrapper>
				<PageTitle title={"Proposals Details"} />
				<StatusBox />
			</TitleWrapper>
		</Container>
	) : (
		<>
			<TogglePageBar type='proposals' />
			<NavigateBackBar type='proposals' />
		</>
	);

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
	}

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
		</>
	);
}
