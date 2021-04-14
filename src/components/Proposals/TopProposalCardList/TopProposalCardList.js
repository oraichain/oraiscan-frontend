import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import {_} from "src/lib/scripts";
import styles from "./TopProposalCardList.scss";
import viewMoreIcon from "src/assets/proposals/view_more.svg";

import PassedIcon from "src/icons/Proposals/PassedIcon";
import RejectedIcon from "src/icons/Proposals/RejectedIcon";
import MostVotedIcon from "src/icons/Proposals/MostVotedIcon";

import consts from "src/constants/consts";
import {formatDateTime} from "src/helpers/helper";

const cx = classNames.bind(styles);

const TopProposalCardList = memo(({data = []}) => {
	if (!Array.isArray(data)) {
		return <></>;
	}

	return (
		<div className={cx("top-proposal-card-list")}>
			<Grid container spacing={2}>
				{data.map((item, index) => {
					let statusStateClassName;
					let statusIcon;
					let statusText;
					if (item?.status == "PROPOSAL_STATUS_PASSED") {
						statusStateClassName = "proposal-status-passed";
						statusIcon = <PassedIcon className={cx("proposal-status-icon-passed")}></PassedIcon>;
						statusText = "Passed";
					} else if (item?.status == "PROPOSAL_STATUS_REJECTED") {
						statusStateClassName = "proposal-status-rejected";
						statusIcon = <RejectedIcon className={cx("proposal-status-icon-rejected")}></RejectedIcon>;
						statusText = "Rejected";
					}

					return (
						<Grid item lg={3} xs={12} key={"top-proposal-card-list-item-" + index}>
							<div className={cx("top-proposal-card")}>
								<div className={cx("top-proposal-card-header")}>
									<div className={cx("proposal-id")}>{item?.proposal_id ? "#" + item.proposal_id : "-"}</div>
									<div className={cx("proposal-status", statusStateClassName)}>
										{statusIcon}
										<span className={cx("proposal-status-text")}>{statusText}</span>
									</div>
								</div>
								<div className={cx("top-proposal-card-body")}>
									<table>
										<tbody>
											<tr>
												<td colSpan={2}>
													<div className={cx("proposal-title")}>{item?.title ?? "-"}</div>
												</td>
											</tr>

											<tr>
												<td>
													<div className={cx("item-title")}>Voting Start</div>
												</td>
												<td>
													<div className={cx("item-text")}>{item?.voting_start_time ? formatDateTime(item.voting_start_time) : "-"}</div>
												</td>
											</tr>

											<tr>
												<td>
													<div className={cx("item-title")}>Voting End</div>
												</td>
												<td>
													<div className={cx("item-text")}>{item?.voting_end_time ? formatDateTime(item.voting_end_time) : "-"}</div>
												</td>
											</tr>

											<tr>
												<td colSpan={2}>
													{isNaN(item?.yes_percentage) ||
													isNaN(item?.no_percentage) ||
													isNaN(item?.no_with_veto_percentage) ||
													isNaN(item?.abstain_percentage) ? (
														<div className={cx("graph")}></div>
													) : (
														<div className={cx("graph")}>
															<Tooltip title={"Yes: " + item.yes_percentage + "%"} placement='top' arrow>
																<div className={cx("graph-yes")} style={{flexBasis: item.yes_percentage + "%"}}></div>
															</Tooltip>

															<Tooltip title={"No: " + item.no_percentage + "%"} placement='top' arrow>
																<div className={cx("graph-no")} style={{flexBasis: item.no_percentage + "%"}}></div>
															</Tooltip>

															<Tooltip title={"NoWithVeto: " + item.no_with_veto_percentage + "%"} placement='top' arrow>
																<div className={cx("graph-no-with-veto")} style={{flexBasis: item.no_with_veto_percentage + "%"}}></div>
															</Tooltip>

															<Tooltip title={"Abstain: " + item.abstain_percentage + "%"} placement='top' arrow>
																<div className={cx("graph-abstain")} style={{flexBasis: item.abstain_percentage + "%"}}></div>
															</Tooltip>
														</div>
													)}
												</td>
											</tr>

											<tr>
												<td>
													<div className={cx("item-title")}>Most voted on</div>
													<div className={cx("proposal-voted")}>
														<MostVotedIcon className={cx("proposal-voted-icon")}></MostVotedIcon>
														<span className={cx("proposal-voted-text")}>{!isNaN(item?.most_voted_on) ? "Yes " + item.most_voted_on + "%" : "-"}</span>
													</div>
												</td>
												<td>
													<NavLink className={cx("view-more")} to={`${consts.PATH.PROPOSALS}/${item?.proposal_id ?? 0}`}>
														<span className={cx("view-more-text")}>View more</span>
														<img className={cx("view-more-icon")} src={viewMoreIcon} alt='' />
													</NavLink>
												</td>
											</tr>
										</tbody>
									</table>
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
