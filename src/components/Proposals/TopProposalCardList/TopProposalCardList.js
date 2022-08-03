import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import Grid from "@material-ui/core/Grid";
import {isNil} from "lodash";
import Tooltip from "@material-ui/core/Tooltip";
import {_} from "src/lib/scripts";

import PassedIcon from "src/icons/Proposals/PassedIcon";
import RejectedIcon from "src/icons/Proposals/RejectedIcon";
import ViewMoreIcon from "src/icons/RightArrowIcon";
import MostVotedIcon from "src/icons/Proposals/MostVotedIcon";

import consts from "src/constants/consts";
import {formatDateTime} from "src/helpers/helper";
import styles from "./TopProposalCardList.module.scss";

const cx = classNames.bind(styles);

const TopProposalCardList = memo(({data = [], type = null}) => {
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
						<Grid item lg={4} xs={12} key={"top-proposal-card-list-item-" + index}>
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
													<div className={cx("item-title")}>Type</div>
												</td>
												<td>
													<div className={cx("item-link")}>{item?.type ? item?.type : "-"}</div>
												</td>
											</tr>

											<tr>
												<td>
													<div className={cx("item-title")}>Title</div>
												</td>
												<td>
													<div className={cx("item-link")}>{item?.title ? item?.title : "-"}</div>
												</td>
											</tr>

											<tr>
												<td>
													<div className={cx("item-title")}>Voting Start</div>
												</td>
												<td>
													<div className={cx("item-text")}>
														{item?.voting_start_time && item.status !== "PROPOSAL_STATUS_DEPOSIT_PERIOD" ? formatDateTime(item.voting_start_time) : "-"}
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

											{/* <tr>
												<td colSpan={2}>
													<NavLink className={cx("view-more")} to={`${consts.PATH.PROPOSALS}/${item?.proposal_id ?? 0}${!isNil(type) ? "?type=" + type : ""}`}>
														<span className={cx("view-more-text")}>View more</span>
														<ViewMoreIcon className={cx("view-more-icon")} />
													</NavLink>
												</td>
											</tr> */}
										</tbody>
									</table>
								</div>
								<NavLink className={cx("view-more")} to={`${consts.PATH.PROPOSALS}/${item?.proposal_id ?? 0}${!isNil(type) ? "?type=" + type : ""}`}>
									<span className={cx("view-more-text")}>View more</span>
									<ViewMoreIcon className={cx("view-more-icon")} />
								</NavLink>
							</div>
						</Grid>
					);
				})}
			</Grid>
		</div>
	);
});

export default TopProposalCardList;
