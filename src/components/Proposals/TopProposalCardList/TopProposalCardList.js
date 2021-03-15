import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import {_} from "src/lib/scripts";
import styles from "./TopProposalCardList.scss";
import passedIcon from "src/assets/proposals/passed.svg";
import rejectedIcon from "src/assets/proposals/rejected.svg";
import viewMoreIcon from "src/assets/proposals/view_more.svg";
import votedIcon from "src/assets/proposals/voted.svg";
import consts from "src/constants/consts";

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
						statusIcon = passedIcon;
						statusText = "Passed";
					} else if (item?.status == "PROPOSAL_STATUS_REJECTED") {
						statusStateClassName = "proposal-status-rejected";
						statusIcon = rejectedIcon;
						statusText = "Rejected";
					}

					return (
						<Grid item lg={3} xs={12} key={"top-proposal-card-list-item-" + index}>
							<div className={cx("top-proposal-card")}>
								<div className={cx("top-proposal-card-header")}>
									<div className={cx("proposal-id")}>{item?.proposal_id ? "#" + item.proposal_id : "-"}</div>
									<div className={cx("proposal-status", statusStateClassName)}>
										<img className={cx("proposal-status-icon")} src={statusIcon} alt='' />
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
													<div className={cx("item-text")}>{item?.voting_start_time ?? "-"}</div>
												</td>
											</tr>

											<tr>
												<td>
													<div className={cx("item-title")}>Voting End</div>
												</td>
												<td>
													<div className={cx("item-text")}>{item?.voting_end_time ?? "-"}</div>
												</td>
											</tr>

											<tr>
												<td colSpan={2}>
													<div className={cx("graph")}>
														<Tooltip title='Available' placement='top' arrow>
															<div className={cx("graph-available")} style={{flexBasis: "12.67%"}}></div>
														</Tooltip>

														<Tooltip title='Delegated' placement='top' arrow>
															<div className={cx("graph-delegated")} style={{flexBasis: "81.96%"}}></div>
														</Tooltip>

														<Tooltip title='Unbonding' placement='top' arrow>
															<div className={cx("graph-unbonding")} style={{flexBasis: "0%"}}></div>
														</Tooltip>

														<Tooltip title='Reward' placement='top' arrow>
															<div className={cx("graph-reward")} style={{flexBasis: "5.37%"}}></div>
														</Tooltip>
													</div>
												</td>
											</tr>

											<tr>
												<td>
													<div className={cx("item-title")}>Most voted on</div>
													<div className={cx("proposal-voted")}>
														<img className={cx("proposal-voted-icon")} src={votedIcon} alt='' />
														<span className={cx("proposal-voted-text")}>{!isNaN(item?.most_voted_on) ? "Yes" + item.most_voted_on + "%" : "-"}</span>
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
