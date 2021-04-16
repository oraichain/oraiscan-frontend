// @ts-nocheck
import React, {memo} from "react";
import classNames from "classnames/bind";
import {logoBrand} from "src/constants/logoBrand";
import {formatFloat, formatInteger} from "src/helpers/helper";
import {_} from "src/lib/scripts";
import CheckIcon from "src/icons/Validators/CheckIcon";
import ClockIcon from "src/icons/ClockIcon";
import styles from "./ResultCardList.module.scss";
import aiIcon from "src/assets/common/ai_ic.svg";

const cx = classNames.bind(styles);

const ResultCardList = memo(({data = []}) => {
	return (
		<div className='result-card-list'>
			{data.map((item, index) => {
				let validatorName;
				let validatorIcon;
				if (!_.isNil(item?.address)) {
					const matchedLogoItem = logoBrand.find(logoBrandItem => item.address === logoBrandItem.operatorAddress);

					if (matchedLogoItem) {
						validatorName = matchedLogoItem?.name ?? "-";
						validatorIcon = matchedLogoItem?.logo ?? aiIcon;
					}
				}

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
					<div className={cx("result-card-list-item")} key={"result-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Validator</div>
									</td>
									<td>
										{_.isNil(validatorName) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<div className={cx("validator")}>
												<img className={cx("validator-icon")} src={validatorIcon} alt='' />
												<span className={cx("validator-name")}>{validatorName}</span>
											</div>
										)}
									</td>
								</tr>

								<tr>
									<td colSpan={2}>
										<div className={cx("item-title")}>Address</div>
										{_.isNil(item?.address) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{item.address}</div>}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Result</div>
									</td>
									<td>{_.isNil(item?.result) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{item.result}</div>}</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Voting Power</div>
									</td>
									<td>
										{_.isNil(item?.voting_power?.value) || _.isNil(item?.voting_power?.percent) ? (
											<div className={cx("item-text")}>-</div>
										) : (
											<div className={cx("voting-power")}>
												<div className={cx("voting-power-value")}>{formatInteger(item.voting_power.value)}</div>
												<div className={cx("voting-power-percent")}>{formatFloat(item.voting_power.percent)}%</div>
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
							</tbody>
						</table>
					</div>
				);
			})}
		</div>
	);
});

export default ResultCardList;
