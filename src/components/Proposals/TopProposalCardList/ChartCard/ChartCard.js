// @ts-nocheck
import classNames from "classnames/bind";
import {memo} from "react";
import DonutChart from "react-donut-chart";
import styles from "./ChartCard.module.scss";

const cx = classNames.bind(styles);

const ChartCard = memo(({data}) => {
	const colors = {
		YES: "#0BB783",
		NO: "#F64E60" ,
		NO_WITH_VETO:"#3699FF",
		ABSTAIN: "#9FA4AD"
	};
	const isVotingPeriod = data?.status === "PROPOSAL_STATUS_VOTING_PERIOD";
	const votePercentage = Math.min(100, Math.max(0, Number(data?.vote_percentage) || 0));
	const chartData = isVotingPeriod
		? [
			{value: parseFloat(data?.yes_percentage ?? 0), label: "YES"},
			{value: parseFloat(data?.no_percentage ?? 0), label: "NO"},
			{value: parseFloat(data?.no_with_veto_percentage ?? 0), label: "NO WITH VETO"},
			{value: parseFloat(data?.abstain_percentage ?? 0), label: "ABSTAIN"},
		]
		: [
			{value: votePercentage, label: "VOTE"},
			{value: 100 - votePercentage, label: "NOT VOTED"},
		];
	const chartColors = isVotingPeriod
		? [colors.YES, colors.NO, colors.NO_WITH_VETO, colors.ABSTAIN]
		: [colors.YES, colors.ABSTAIN];

	return (
		<div className={cx("chart-card")}>
			<div className={cx("chart-card-body")}>
				<DonutChart
					// startAngle={-90}
					width={144}
					height={144}
					outerRadius={0.95}
					innerRadius={0.5}
					legend={false}
					data={chartData}
					colors={chartColors}
					strokeColor={false}
				/>
			</div>
		</div>
	);
});

export default ChartCard;
