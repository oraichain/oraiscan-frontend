import React, {useState} from "react";
import {useGet} from "restful-react";
import cn from "classnames/bind";
import DonutChart from "react-donut-chart";
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

const cx = cn.bind(styles);

export default function(props) {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const proposalsId = props?.match?.params?.id;

	const path = `${consts.API.PROPOSALS}/${proposalsId}`;
	const {data} = useGet({
		path: path,
	});

	// const chartData = {
	// 	totalOrai: 11050300.54,
	// 	delegatedPercent: 81.96,
	// 	unbondingPercent: 0,
	// 	rewardPercent: 5.37,
	// 	availablePercent: 12.67,
	// };

	let titleSection;
	let detailsCard;
	let chartCard;
	let transactionsCard;

	titleSection = isLargeScreen ? (
		<TitleWrapper>
			<PageTitle title={"Proposals Details"} />
			<StatusBox />
		</TitleWrapper>
	) : (
		<TogglePageBar type='proposals' />
	);

	if (data) {
		detailsCard = <DetailsCard data={data} />;
	} else {
		detailsCard = <DetailsCardSkeleton />;
	}

	// chartCard = <ChartCard data={chartData} />;
	// chartCard = <ChartCardSkeleton />;
	// transactionsCard = <TransactionsCard />;
	return (
		<Container fixed className={cx("proposal-details")}>
			{titleSection}
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
	);
}
