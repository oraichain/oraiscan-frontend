import React, {memo} from "react";
import classNames from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import styles from "./DetailsCard.scss";

const cx = classNames.bind(styles);

const DetailsCardSkeleton = memo(({data}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	const idElement = <Skeleton className={cx("skeleton")} variant='text' width={32} height={24} />;
	const statusElement = <Skeleton className={cx("skeleton")} variant='text' width={70} height={24} />;
	const titleElement = <Skeleton variant='text' height={24} />;
	const proposerElement = <Skeleton className={cx("skeleton")} variant='text' width={60} height={24} />;
	const initialDepositElement = <Skeleton className={cx("skeleton")} variant='text' width={90} height={24} />;
	const typeElement = <Skeleton className={cx("skeleton")} variant='text' width={100} height={24} />;

	const totalDepositElement = <Skeleton className={cx("skeleton")} variant='text' width={90} height={24} />;
	const votingStartElement = <Skeleton className={cx("skeleton")} variant='text' width={140} height={24} />;
	const submitTimeElement = <Skeleton className={cx("skeleton")} variant='text' width={140} height={24} />;
	const votingEndElement = <Skeleton className={cx("skeleton")} variant='text' width={140} height={24} />;
	const depositEndTimeElement = <Skeleton className={cx("skeleton")} variant='text' width={140} height={24} />;

	const descriptionElement = (
		<div className={cx("description")}>
			<div className={cx("description-header")}>Description</div>
			<div className={cx("description-body")}>
				<Skeleton variant='rect' height={210} />
			</div>
		</div>
	);

	return (
		<div className={cx("details-card")}>
			{isLargeScreen ? (
				<Grid container spacing={2}>
					<Grid item xs={7}>
						<table className={cx("table-desktop")}>
							<tbody>
								<tr>
									<td colSpan={2}>
										{idElement}
										{statusElement}
									</td>
								</tr>
								<tr>
									<td colSpan={2}>{titleElement}</td>
								</tr>
								<tr>
									<td>
										<div className={cx("item-title")}>Proposer</div>
										{proposerElement}
									</td>
									<td>
										<div className={cx("item-title")}>Initial Deposit</div>
										{initialDepositElement}
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("item-title")}>Type</div>
										{typeElement}
									</td>
									<td>
										<div className={cx("item-title")}>Total Deposit</div>
										{totalDepositElement}
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("item-title")}>Voting Start</div>
										{votingStartElement}
									</td>
									<td>
										<div className={cx("item-title")}>Submit Time</div>
										{submitTimeElement}
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("item-title")}>Voting End</div>
										{votingEndElement}
									</td>
									<td>
										<div className={cx("item-title")}>Deposit End Time</div>
										{depositEndTimeElement}
									</td>
								</tr>
							</tbody>
						</table>
					</Grid>
					<Grid item xs={5}>
						{descriptionElement}
					</Grid>
				</Grid>
			) : (
				<table className={cx("table-mobile")}>
					<tbody>
						<tr>
							<td>{idElement}</td>
							<td>{statusElement}</td>
						</tr>
						<tr>
							<td colSpan={2}>{titleElement}</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>Proposer</div>
							</td>
							<td>{proposerElement}</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>Type</div>
							</td>
							<td>{typeElement}</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>Initial Deposit</div>
								{initialDepositElement}
							</td>
							<td>
								<div className={cx("item-title")}>Total Deposit</div>
								{totalDepositElement}
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>Voting Start</div>
								{votingStartElement}
							</td>
							<td>
								<div className={cx("item-title")}>Voting End</div>
								{votingEndElement}
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>Summit Time</div>
								{submitTimeElement}
							</td>
							<td>
								<div className={cx("item-title")}>Deposit End Time</div>
								{depositEndTimeElement}
							</td>
						</tr>
						<tr>
							<td colSpan={2}>{descriptionElement}</td>
						</tr>
					</tbody>
				</table>
			)}
		</div>
	);
});

export default DetailsCardSkeleton;
