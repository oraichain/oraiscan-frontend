import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import {formatDateTime, formatOrai} from "src/helpers/helper";
import styles from "./DetailsCard.scss";
import passedIcon from "src/assets/proposals/passed.svg";
import rejectedIcon from "src/assets/proposals/rejected.svg";

const cx = classNames.bind(styles);

const DetailsCard = memo(({data}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	let statusStateClassName;
	let statusIcon;
	let statusText;
	if (data?.status == "PROPOSAL_STATUS_PASSED") {
		statusStateClassName = "status-passed";
		statusIcon = passedIcon;
		statusText = "Passed";
	} else if (data?.status == "PROPOSAL_STATUS_REJECTED") {
		statusStateClassName = "status-rejected";
		statusIcon = rejectedIcon;
		statusText = "Rejected";
	}

	const idElement = <span className={cx("proposal-id")}>{data?.proposal_id ? "#" + data.proposal_id : "-"}</span>;
	const statusElement = (
		<div className={cx("status", statusStateClassName)}>
			<img className={cx("status-icon")} src={statusIcon} alt='' />
			<span className={cx("status-text")}>{statusText}</span>
		</div>
	);
	const titleElement = <div className={cx("proposal-title")}>{data?.title ?? "-"}</div>;
	const proposerElement = (
		<>
			<div className={cx("item-link")}>{data?.proposer ?? "-"}</div>
		</>
	);
	const initialDepositElement = (
		<>
			<div className={cx("amount")}>
				<span className={cx("amount-value")}>{data?.initial_deposit ? formatOrai(data.initial_deposit) : "-"}</span>
				<span className={cx("amount-denom")}>ORAI</span>
			</div>
		</>
	);
	const typeElement = (
		<>
			<div className={cx("item-text")}>{data?.type ? data.type.split(".").pop() : "-"}</div>
		</>
	);

	const totalDepositElement = (
		<>
			<div className={cx("amount")}>
				<span className={cx("amount-value")}>{data?.total_deposit ? formatOrai(data.total_deposit) : "-"}</span>
				<span className={cx("amount-denom")}>ORAI</span>
			</div>
		</>
	);
	const votingStartElement = (
		<>
			<div className={cx("item-text")}>{data?.voting_start ? formatDateTime(data.voting_start) : "-"}</div>
		</>
	);
	const submitTimeElement = (
		<>
			<div className={cx("item-text")}>{data?.submit_time ? formatDateTime(data.submit_time) : "-"}</div>
		</>
	);
	const votingEndElement = (
		<>
			<div className={cx("item-text")}>{data?.voting_end ? formatDateTime(data.voting_end) : "-"}</div>
		</>
	);
	const depositEndTimeElement = (
		<>
			<div className={cx("item-text")}>{data?.deposit_end_time ? formatDateTime(data.deposit_end_time) : "-"}</div>
		</>
	);

	const descriptionElement = (
		<div className={cx("description")}>
			<div className={cx("description-header")}>Description</div>
			<div className={cx("description-body")}>
				{data?.description ?? "-"}
				<div className={cx("show-more")}>Show more</div>
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
										<div className={cx("item-header")}>
											{idElement}
											{statusElement}
										</div>
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
							<td colSpan={2}>
								<div className={cx("item-header")}>
									{idElement}
									{statusElement}
								</div>
							</td>
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

export default DetailsCard;
