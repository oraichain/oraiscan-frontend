// @ts-nocheck
import React, {memo} from "react";
import {NavLink, useParams} from "react-router-dom";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import {Base64} from "js-base64";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import CheckIcon from "src/icons/Validators/CheckIcon";
import ClockIcon from "src/icons/ClockIcon";
import TimesIcon from "src/icons/TimesIcon";
import styles from "./ReportCardList.module.scss";
import {formatOrai} from "src/helpers/helper";
import {logoBrand} from "src/constants/logoBrand";
import aiIcon from "src/assets/common/ai_ic.svg";

const cx = classNames.bind(styles);

const ReportCardList = memo(({data}) => {
	const params = useParams();
	const requestId = params?.["id"];
	return (
		<div className='report-card-list'>
			{data.map((item, index) => {
				let statusElement;
				let validatorName;
				let validatorIcon;
				if (!_.isNil(item?.reporter?.validator)) {
					const matchedLogoItem = logoBrand.find(logoBrandItem => item?.reporter?.validator === logoBrandItem.operatorAddress);

					if (matchedLogoItem) {
						validatorName = matchedLogoItem?.name ?? "-";
						validatorIcon = matchedLogoItem?.logo ?? aiIcon;
					}
				}

				if (_.isNil(item?.resultStatus)) {
					statusElement = <div className={cx("status")}>-</div>;
				} else {
					switch (item?.resultStatus) {
						case "success":
							statusElement = (
								<div className={cx("status")}>
									<CheckIcon className={cx("status-icon", "status-icon-success")} />
									<span className={cx("status-text")}>Success</span>
								</div>
							);
							break;
						case "pending":
							statusElement = (
								<div className={cx("status")}>
									<ClockIcon className={cx("status-icon", "status-icon-pending")} />
									<span className={cx("status-text")}>Pending</span>
								</div>
							);
							break;
						case "fail":
							statusElement = (
								<div className={cx("status")}>
									<TimesIcon className={cx("status-icon", "status-icon-fail")} />
									<span className={cx("status-text")}>Failed</span>
								</div>
							);
							break;
						default:
							break;
					}
				}

				return (
					<div className={cx("report-card-list-item")} key={"report-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td colSpan={2}>
										<div className={cx("item-title")}>Name</div>
										{_.isNil(validatorName) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<div className={cx("validator")}>
												<img className={cx("validator-icon")} src={validatorIcon} alt='' />
												<NavLink className={cx("validator-name")} to={`${consts.PATH.VALIDATORS}/${item?.validator?.address}`}>
													{validatorName?.length > 10 ? validatorName?.substring(0, 10) + "...." : validatorName}
												</NavLink>
											</div>
										)}
									</td>
								</tr>

								<tr>
									<td colSpan={2}>
										<div className={cx("item-title")}>Validator Address</div>
										{_.isNil(item?.reporter?.validator) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<div className={cx("item-link")}>{item?.reporter?.validator}</div>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Height</div>
									</td>
									<td>{_.isNil(item?.blockHeight) ? <div className={cx("height")}>-</div> : <div className={cx("height")}>{item?.blockHeight}</div>}</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Result</div>
									</td>
									<td>
										{_.isNil(item?.aggregatedResult) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("amount")}>
												<div className={cx("amount-value")}>{Base64.decode(item?.aggregatedResult)}</div>
											</div>
										)}
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("item-title")}>Fees</div>
									</td>
									<td>
										{_.isNil(item?.fees) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("amount")}>
												<span className={cx("amount-value")}>{formatOrai(item?.fees)}</span>
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
										{_.isNil(requestId) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<NavLink
												className={cx("more")}
												to={`${consts.PATH.REQUESTS}/${requestId}/report?validator_address=${item?.reporter?.validator ? item?.reporter?.validator : ""}`}>
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
