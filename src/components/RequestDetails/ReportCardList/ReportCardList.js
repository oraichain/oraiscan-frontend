// @ts-nocheck
import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import CheckIcon from "src/icons/Validators/CheckIcon";
import ClockIcon from "src/icons/ClockIcon";
import styles from "./ReportCardList.module.scss";

const cx = classNames.bind(styles);

const ReportCardList = memo(({data}) => {
	return (
		<div className='report-card-list'>
			{data.map((item, index) => {
				let statusElement;
				if (_.isNil(item?.status)) {
					statusElement = <div className={cx("status")}>-</div>;
				} else {
					if (item.status === "success") {
						statusElement = (
							<div className={cx("status")}>
								<CheckIcon className={cx("status-icon", "status-icon-success")} />
								<span className={cx("status-text")}>Success</span>
							</div>
						);
					} else if (item.status === "pending") {
						statusElement = (
							<div className={cx("status")}>
								<ClockIcon className={cx("status-icon", "status-icon-pending")} />
								<span className={cx("status-text")}>Pending</span>
							</div>
						);
					}
				}

				return (
					<div className={cx("report-card-list-item")} key={"report-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td colSpan={2}>
										<div className={cx("item-title")}>Name</div>
										{_.isNil(item?.name) ? <div className={cx("item-link")}>-</div> : <div className={cx("item-link")}>{item.name}</div>}
									</td>
								</tr>

								<tr>
									<td colSpan={2}>
										<div className={cx("item-title")}>Test Case Results</div>
										{_.isNil(item?.name) ? <div className={cx("item-link")}>-</div> : <div className={cx("item-link")}>{item.test_case_results}</div>}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Height</div>
									</td>
									<td>{_.isNil(item?.height) ? <div className={cx("height")}>-</div> : <div className={cx("height")}>{item.height}</div>}</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Result</div>
									</td>
									<td>
										{_.isNil(item?.height) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("amount")}>
												<span className={cx("amount-value")}>{item.result}</span>
												<span className={cx("amount-denom")}>ORAI</span>
											</div>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Status</div>
									</td>
									<td>{statusElement}</td>
								</tr>

								<tr>
									<td colSpan={2}>
										{_.isNil(item?.id) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<NavLink className={cx("more")} to={`${consts.PATH.REQUESTS_REPORTS}/${item.id}`}>
												View more
											</NavLink>
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

ReportCardList.propTypes = {
	data: PropTypes.any,
};
ReportCardList.defaultProps = {
	data: [],
};

export default ReportCardList;
