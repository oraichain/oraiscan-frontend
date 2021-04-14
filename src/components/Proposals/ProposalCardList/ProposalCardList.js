/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo} from "react";
import classNames from "classnames/bind";
import {_} from "src/lib/scripts";
import {formatOrai} from "src/helpers/helper";
import styles from "./ProposalCardList.scss";
import passedIcon from "src/assets/proposals/passed.svg";
import rejectedIcon from "src/assets/proposals/rejected.svg";

const cx = classNames.bind(styles);

const ProposalCardList = memo(({data = []}) => {
	if (!Array.isArray(data)) {
		return <></>;
	}

	return (
		<div className='proposal-card-list'>
			{data.map((item, index) => {
				let statusStateClassName;
				let statusIcon;
				let statusText;
				if (item?.status === "PROPOSAL_STATUS_PASSED") {
					statusStateClassName = "status-passed";
					statusIcon = passedIcon;
					statusText = "Passed";
				} else if (item?.status === "PROPOSAL_STATUS_REJECTED") {
					statusStateClassName = "status-rejected";
					statusIcon = rejectedIcon;
					statusText = "Rejected";
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
										{_.isNil(item?.title) ? <div className={cx("item-link")}>-</div> : <div className={cx("item-link")}>{item.title}</div>}
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
													<img className={cx("status-icon")} src={statusIcon} alt='' />
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
										{_.isNil(item?.voting_start_time) ? (
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
