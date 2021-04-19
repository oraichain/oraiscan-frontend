// @ts-nocheck
import React, {memo} from "react";
import {useSelector} from "react-redux";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import CheckIcon from "src/icons/CheckIcon";
import ClockIcon from "src/icons/ClockIcon";
import styles from "./RequestCardList.module.scss";

const cx = classNames.bind(styles);

const RequestCardList = memo(({data}) => {
	const validators = useSelector(state => state.blockchain.validators);

	return (
		<div className='request-card-list'>
			{data.map((item, index) => {
				let minValue = _.isNil(item?.min) ? "-" : item.min;
				let finishedValue = _.isNil(item?.finished) ? "-" : item.finished;
				let totalValue = _.isNil(item?.total) ? "-" : item.total;
				let graphElement;

				if (isNaN(finishedValue) || isNaN(totalValue)) {
					graphElement = <div className={cx("graph-error")}>-</div>;
				} else {
					finishedValue = parseFloat(finishedValue);
					totalValue = parseFloat(totalValue);

					if (finishedValue === totalValue) {
						graphElement = <div className={cx("graph-success")}></div>;
					} else if (finishedValue < totalValue) {
						graphElement = <div className={cx("graph-pending")} style={{width: `${(finishedValue * 100) / totalValue}%`}}></div>;
					} else {
						graphElement = <div className={cx("graph-error")}>-</div>;
					}
				}

				let statusElement;
				if (isNaN(finishedValue) || isNaN(totalValue) || finishedValue > totalValue) {
					statusElement = <div className={cx("status")}>-</div>;
				} else {
					if (finishedValue === totalValue) {
						statusElement = (
							<div className={cx("status")}>
								<CheckIcon className={cx("status-icon", "status-icon-success")} />
								<span className={cx("status-text")}>Success</span>
							</div>
						);
					} else {
						statusElement = (
							<div className={cx("status")}>
								<ClockIcon className={cx("status-icon", "status-icon-pending")} />
								<span className={cx("status-text")}>Pending</span>
							</div>
						);
					}
				}

				const ownerNames = Object.keys(validators);
				let matchOwnerName = null;
				if (item?.owner_address) {
					for (let ownerName of ownerNames) {
						if (!_.isNil(validators?.[ownerName]?.operatorAddr) && validators[ownerName].operatorAddr === item.owner_address) {
							matchOwnerName = ownerName;
							break;
						}
					}
				}

				return (
					<div className={cx("request-card-list-item")} key={"request-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Request</div>
									</td>
									<td>
										{_.isNil(item?.request) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to='/'>
												{item.request}
											</NavLink>
										)}
									</td>
								</tr>

								<tr>
									<td colSpan={2}>
										<div className={cx("item-title")}>Tx Hash</div>
										{_.isNil(item?.tx_hash) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to={`${consts.PATH.TXLIST}/${item.tx_hash}`}>
												{item.tx_hash}
											</NavLink>
										)}
									</td>
								</tr>

								<tr>
									<td colSpan={2}>
										<div className={cx("item-title")}>Report Status</div>
										<div className={cx("report-status")}>
											<div className={cx("info")}>
												<div className={cx("info-time")}>Min {minValue}</div>
												<div className={cx("info-progress")}>
													{finishedValue} of {totalValue}
												</div>
											</div>
											<div className={cx("graph")}>
												<div className={cx("graph-total")}></div>
												{graphElement}
											</div>
										</div>
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Status</div>
										<div className={cx("status")}>{statusElement}</div>
									</td>
									<td>
										<div className={cx("item-title")}>Owner</div>
										{_.isNil(matchOwnerName) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to={`${consts.PATH.VALIDATORS}/${item.owner_address}`}>
												{matchOwnerName}
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

RequestCardList.propTypes = {
	data: PropTypes.any,
};
RequestCardList.defaultProps = {
	data: [],
};

export default RequestCardList;
