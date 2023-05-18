import Grid from "@material-ui/core/Grid";
import classNames from "classnames/bind";
import { memo } from "react";
import PassedIcon from "src/icons/Proposals/PassedIcon";
import RejectedIcon from "src/icons/Proposals/RejectedIcon";
import ChartCard from './ChartCard/ChartCard';
import { formatDateTime } from "src/helpers/helper";
import styles from "./TopProposalCardList.module.scss";
import { NavLink } from "react-router-dom";
import consts from "src/constants/consts";
import FailedIcon from "src/icons/Proposals/FailedIcon";
import DepositPeriodIcon from "src/icons/Proposals/DepositPeriodIcon";
import VotingPeriodIcon from "src/icons/Proposals/VotingPeriodIcon";
import UnspecifiedIcon from "src/icons/Proposals/UnspecifiedIcon";
import ViewMoreProposalIcon from "src/icons/Proposals/ViewMoreProposalIcon";
import { isNil } from "lodash";
import { reduceString } from "src/lib/scripts";

const cx = classNames.bind(styles);

const TopProposalCardList = memo(({ data = [], type = null }) => {
	if (!Array.isArray(data)) {
		return <></>;
	}

	return (
		<div className={cx("top-proposal-card-list")}>
			<Grid container spacing={4}>
				{data.map((item, index) => {
					let statusStateClassName;
					let statusIcon;
					let statusText;

					switch (item?.status) {
						case "PROPOSAL_STATUS_PASSED":
							statusStateClassName = "proposal-status-passed";
							statusIcon = <PassedIcon className={cx("proposal-status-icon-passed")}></PassedIcon>;
							statusText = "Passed";
							break;
						case "PROPOSAL_STATUS_REJECTED":
							statusStateClassName = "proposal-status-rejected";
							statusIcon = <RejectedIcon className={cx("proposal-status-icon-rejected")}></RejectedIcon>;
							statusText = "Rejected";
							break;
						case "PROPOSAL_STATUS_FAILED":
							statusStateClassName = "proposal-status-failed";
							statusIcon = <FailedIcon className={cx("proposal-status-icon-failed")}></FailedIcon>;
							statusText = "Failed";
							break;
						case "PROPOSAL_STATUS_DEPOSIT_PERIOD":
							statusStateClassName = "proposal-status-deposit-period";
							statusIcon = <DepositPeriodIcon className={cx("proposal-status-icon-deposit-period")}></DepositPeriodIcon>;
							statusText = "Deposit Period";
							break;
						case "PROPOSAL_STATUS_VOTING_PERIOD":
							statusStateClassName = "proposal-status-voting-period";
							statusIcon = <VotingPeriodIcon className={cx("proposal-status-icon-voting-period")}></VotingPeriodIcon>;
							statusText = "Voting Period";
							break;
						case "PROPOSAL_STATUS_UNSPECIFIED":
							statusStateClassName = "proposal-status-unspecified";
							statusIcon = <UnspecifiedIcon className={cx("proposal-status-icon-unspecified")}></UnspecifiedIcon>;
							statusText = "Unspecified";
							break;
						default:
							break;
					}

					switch (item?.status) {
						case "PROPOSAL_STATUS_PASSED":
							statusStateClassName = "proposal-status-passed";
							statusIcon = <PassedIcon className={cx("proposal-status-icon-passed")}></PassedIcon>;
							statusText = "Passed";
							break;
						case "PROPOSAL_STATUS_REJECTED":
							statusStateClassName = "proposal-status-rejected";
							statusIcon = <RejectedIcon className={cx("proposal-status-icon-rejected")}></RejectedIcon>;
							statusText = "Rejected";
							break;
						case "PROPOSAL_STATUS_FAILED":
							statusStateClassName = "proposal-status-failed";
							statusIcon = <FailedIcon className={cx("proposal-status-icon-failed")}></FailedIcon>;
							statusText = "Failed";
							break;
						case "PROPOSAL_STATUS_DEPOSIT_PERIOD":
							statusStateClassName = "proposal-status-deposit-period";
							statusIcon = <DepositPeriodIcon className={cx("proposal-status-icon-deposit-period")}></DepositPeriodIcon>;
							statusText = "Deposit Period";
							break;
						case "PROPOSAL_STATUS_VOTING_PERIOD":
							statusStateClassName = "proposal-status-voting-period";
							statusIcon = <VotingPeriodIcon className={cx("proposal-status-icon-voting-period")}></VotingPeriodIcon>;
							statusText = "Voting Period";
							break;
						case "PROPOSAL_STATUS_UNSPECIFIED":
							statusStateClassName = "proposal-status-unspecified";
							statusIcon = <UnspecifiedIcon className={cx("proposal-status-icon-unspecified")}></UnspecifiedIcon>;
							statusText = "Unspecified";
							break;
						default:
							break;
					}

					return (
						<Grid item lg={6} xs={12} key={"top-proposal-card-list-item-" + index}>
							<div className={cx("top-proposal-card")}>
								<div className={cx("proposal-status", statusStateClassName)}>
									{statusIcon}
									<span className={cx("proposal-status-text")}>{statusText}</span>
								</div>
								<div className={cx("top-proposal-card-header")}>
									<div className={cx("proposal-id-title")}>
										<div className={cx("proposal-id")}>{item?.proposal_id ? "#" + item.proposal_id : "-"}</div>
										<div className={cx("proposal-title")}>{item?.title ?? "-"}</div>
									</div>
									{/* <div className={cx("proposal-status", statusStateClassName)}>
										{statusIcon}
										<span className={cx("proposal-status-text")}>{statusText}</span>
									</div> */}
								</div>

								<div className={cx("top-proposal-card-body-wrapper")}>
									<div className={cx("top-proposal-card-chart")}>
										<ChartCard data={item} />
									</div>

									<div className={cx("top-proposal-card-body")}>
										<table>
											<tbody>
												<tr>
													<td>
														<div className={cx("item-title")}>Proposer</div>
													</td>
													<td>
														<NavLink className={cx("item-text")} to={`${consts.PATH.ACCOUNT}/${item?.proposer ?? 0}`}>
															<span className={cx("item-text-proposer")}>{item?.proposer && reduceString(item?.proposer, 8, 8)}</span>
														</NavLink>
													</td>
												</tr>

												<tr>
													<td>
														<div className={cx("item-title")}>Voting Start</div>
													</td>
													<td>
														<div className={cx("item-text")}>
															{item?.voting_end_time && item.status !== "PROPOSAL_STATUS_DEPOSIT_PERIOD" ? formatDateTime(item.voting_start_time) : "-"}
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<div className={cx("item-title")}>Voting End</div>
													</td>
													<td>
														<div className={cx("item-text")}>
															{item?.voting_end_time && item.status !== "PROPOSAL_STATUS_DEPOSIT_PERIOD" ? formatDateTime(item.voting_end_time) : "-"}
														</div>
													</td>
												</tr>
											</tbody>
										</table>

										<NavLink className={cx("view-more")} to={`${consts.PATH.PROPOSALS}/${item?.proposal_id ?? 0}${!isNil(type) ? "?type=" + type : ""}`}>
											<ViewMoreProposalIcon className={cx("view-more-icon")} />
										</NavLink>
									</div>
								</div>
							</div>
						</Grid>
					);
				})}
			</Grid>
		</div>
	);
});

export default TopProposalCardList;
