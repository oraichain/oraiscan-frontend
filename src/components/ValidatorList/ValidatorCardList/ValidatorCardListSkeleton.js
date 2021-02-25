import React, {memo} from "react";
import Skeleton from "react-loading-skeleton";
import classNames from "classnames/bind";
import styles from "./ValidatorCardList.scss";

const ValidatorCardListSkeleton = memo(({rows = 10}) => {
	const cx = classNames.bind(styles);

	let validatorCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		validatorCardListItems.push(
			<div className={cx("validator-card-list-item")} key={"validator-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>Rank </div>
							</td>
							<td>
								<div className={cx("item-link")}>
									<Skeleton />
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Proposer</div>
							</td>
							<td>
								<div className={cx("item-link")}>
									<Skeleton />
								</div>
							</td>
						</tr>

						<tr>
							<td colSpan={2}>
								<div className={cx("item-title")}>Voting power</div>
								<div className={cx("voting-power-data-cell")}>
									<span>
										<Skeleton />
									</span>
									<span>
										<Skeleton />
									</span>
								</div>
							</td>
						</tr>

						<tr>
							<td colSpan={2}>
								<div className={cx("item-title")}>Cumulative Share %</div>
								<div className={cx("cumulative-share-data-cell")}>
									<div className={cx("graph")}>
										<Skeleton />
									</div>
									<div className={cx("total-value")}>
										<Skeleton />
									</div>
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Uptime</div>
								<div className={cx("item-text")}>
									<Skeleton />
								</div>
							</td>
							<td>
								<div className={cx("item-title")}>Commisson</div>
								<div className={cx("item-text")}>
									<Skeleton />
								</div>
							</td>
						</tr>

						<tr>
							<td colSpan={2}>
								<Skeleton />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	return <div className='validator-card-list'>{validatorCardListItems}</div>;
});

export default ValidatorCardListSkeleton;
