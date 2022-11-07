/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo} from "react";
import {isNil} from "lodash";
import classNames from "classnames/bind";
import {_} from "src/lib/scripts";
import {formatOrai} from "src/helpers/helper";

import PassedIcon from "src/icons/Proposals/PassedIcon";
import DepositPeriodIcon from "src/icons/Proposals/DepositPeriodIcon";
import FailedIcon from "src/icons/Proposals/FailedIcon";
import RejectedIcon from "src/icons/Proposals/RejectedIcon";
import UnspecifiedIcon from "src/icons/Proposals/UnspecifiedIcon";
import VotingPeriodIcon from "src/icons/Proposals/VotingPeriodIcon";
import {NavLink} from "react-router-dom";
import consts from "src/constants/consts";
import styles from "./ProposalCardList.module.scss";

const cx = classNames.bind(styles);

const ProposalCardList = memo(({data = [], type = ""}) => {
	if (!Array.isArray(data)) {
		return <></>;
	}

	return (
		<div className='proposal-card-list'>
			{data.map((item, index) => {
				let statusStateClassName;
				let statusIcon;
				let statusText;
				switch (item?.status) {
					case "PROPOSAL_STATUS_PASSED":
						statusStateClassName = "status-passed";
						statusIcon = <PassedIcon className={cx("status-icon-passed")}></PassedIcon>;
						statusText = "Passed";
						break;
					case "PROPOSAL_STATUS_REJECTED":
						statusStateClassName = "status-rejected";
						statusIcon = <RejectedIcon className={cx("status-icon-rejected")}></RejectedIcon>;
						statusText = "Rejected";
						break;
					case "PROPOSAL_STATUS_FAILED":
						statusStateClassName = "status-failed";
						statusIcon = <FailedIcon className={cx("status-icon-failed")}></FailedIcon>;
						statusText = "Failed";
						break;
					case "PROPOSAL_STATUS_DEPOSIT_PERIOD":
						statusStateClassName = "status-deposit-period";
						statusIcon = <DepositPeriodIcon className={cx("status-icon-deposit-period")}></DepositPeriodIcon>;
						statusText = "Deposit Period";
						break;
					case "PROPOSAL_STATUS_VOTING_PERIOD":
						statusStateClassName = "status-voting-period";
						statusIcon = <VotingPeriodIcon className={cx("status-icon-voting-period")}></VotingPeriodIcon>;
						statusText = "Voting Period";
						break;
					case "PROPOSAL_STATUS_REJECTED":
						statusStateClassName = "status-unspecified";
						statusIcon = <UnspecifiedIcon className={cx("status-icon-unspecified")}></UnspecifiedIcon>;
						statusText = "Unspecified";
						break;
					default:
						break;
				}

				return (
					<div className={cx("proposal-card-list-item")} key={"proposal-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Id</div>
									</td>
									<td>{_.isNil(item?.proposal_id) ? <div className={cx("item-link")}>-</div> : <div className={cx("item-link")}>#{item.proposal_id}</div>}</td>
								</tr>

								<tr>
									<td colSpan={2}>
										<div className={cx("item-title")}>Title</div>
										{_.isNil(item?.title) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<NavLink
												className={cx("item-link", "align-left")}
												to={`${consts.PATH.PROPOSALS}/${item?.proposal_id ?? 0}${!isNil(type) && type !== "" ? "?type=" + type : ""}`}>
												{item?.title}
											</NavLink>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Status</div>
									</td>
									<td>
										{_.isNil(item?.status) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("status-data-cell")}>
												<div className={cx("status", statusStateClassName)}>
													{statusIcon}
													<span className={cx("status-text")}>{statusText}</span>
												</div>
											</div>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Voting Start</div>
									</td>
									<td>
										{_.isNil(item?.voting_start_time) || item.status === "PROPOSAL_STATUS_DEPOSIT_PERIOD" ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("item-text")}>{item.voting_start_time}</div>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Submit time</div>
									</td>
									<td>{_.isNil(item?.submit_time) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{item.submit_time}</div>}</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Total deposit</div>
									</td>
									<td>
										{_.isNil(item?.total_deposit) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("total-deposit-data-cell")}>
												<div className={cx("amount")}>
													<span className={cx("amount-value")}>{formatOrai(item.total_deposit)}</span>
													<span className={cx("amount-denom")}>ORAI</span>
												</div>
											</div>
										)}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				);
			})}
		</div>
	);
});

export default ProposalCardList;
