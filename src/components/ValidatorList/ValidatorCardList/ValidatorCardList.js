import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {formatPercentage, formatInteger} from "src/helpers/helper";
import {computeTotalVotingPower} from "src/components/ValidatorList/ValidatorTable/ValidatorTable";
import Delegate from "src/components/common/Delegate";
import styles from "./ValidatorCardList.scss";
import aiIcon from "src/assets/common/ai_ic.svg";
import {Progress} from "antd";
import "antd/dist/antd.css";

const cx = classNames.bind(styles);

const getCumulativeShareCell = (previousValue, currentValue, totalValue) => {
	const previousPercent = formatPercentage(previousValue / totalValue);
	const currentPercent = formatPercentage(currentValue / totalValue);
	const totalPercent = formatPercentage((previousValue + currentValue) / totalValue, 2);

	return (
		<div className={cx("cumulative-share-data-cell")}>
			<div className={cx("graph")}>
				<div className={cx("graph-previous")} style={{width: previousPercent + "%"}}></div>
				<div className={cx("graph-current")} style={{left: previousPercent + "%", width: currentPercent + "%"}}></div>
			</div>
			<div className={cx("total-value")}>{totalPercent} %</div>
		</div>
	);
};

const ValidatorCardList = memo(({data = []}) => {
	const totalVotingPower = useMemo(() => computeTotalVotingPower(data), [data]);
	let previousVotingPower = 0;
	return (
		<div className='validator-card-list'>
			{data.map((item, index) => {
				let currentVotingPower = 0;
				let votingPowerDataCell = (
					<div className={cx("voting-power-data-cell")}>
						<div>-</div>
						<div>- %</div>
					</div>
				);
				if (item?.voting_power && totalVotingPower > 0) {
					currentVotingPower = parseFloat(item.voting_power);
					votingPowerDataCell = (
						<div className={cx("voting-power-data-cell")}>
							<span>{formatInteger(currentVotingPower)}</span>
							<span>{formatPercentage(currentVotingPower / totalVotingPower, 2)}%</span>
						</div>
					);
				}

				const cumulativeShareDataCell = getCumulativeShareCell(previousVotingPower, currentVotingPower, totalVotingPower);
				previousVotingPower += currentVotingPower;

				const validatorCardListItem = (
					<div className={cx("validator-card-list-item")} key={"validator-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Rank </div>
									</td>
									<td>
										<div className={cx("item-link")}>{item?.rank ?? "-"}</div>
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Proposer</div>
									</td>
									<td>
										{item?.moniker ? (
											<NavLink className={cx("validator-data-cell")} to={`${consts.PATH.VALIDATORS}/${item.operator_address}`}>
												<img src={aiIcon} alt='' />
												{item.moniker}
											</NavLink>
										) : (
											<div className={cx("item-link")}>-</div>
										)}
									</td>
								</tr>

								<tr>
									<td colSpan={2}>
										<div className={cx("item-title")}>Voting power</div>
										{votingPowerDataCell}
									</td>
								</tr>

								<tr>
									<td colSpan={2}>
										<div className={cx("item-title")}>Cumulative Share %</div>
										{cumulativeShareDataCell}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Uptime</div>
										<div className={cx("item-text")}>
											<div>{item?.uptime ? formatPercentage(item.uptime, 2) + "%" : "-"}</div>
											<div>
												<Progress percent={formatPercentage(item.uptime, 2)} showInfo={false} />
											</div>
										</div>
									</td>
									<td>
										<div className={cx("item-title")}>Commisson</div>
										<div className={cx("item-text")}>{item?.commission_rate ? formatPercentage(item.commission_rate, 2) + "%" : "-"}</div>
									</td>
								</tr>

								<tr>
									<td colSpan={2}>
										<Delegate
											openButtonText='Delegate'
											balance={100}
											onDelegate={data => {
												console.log(data);
											}}
										/>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				);

				return validatorCardListItem;
			})}
		</div>
	);
});

export default ValidatorCardList;
