import React, {memo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import styles from "./ResultCardList.module.scss";

const cx = classNames.bind(styles);

const ResultCardListSkeleton = memo(({rows = 10}) => {
	let dataSourceCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		dataSourceCardListItems.push(
			<div className={cx("result-card-list-item")} key={"result-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>Validator</div>
							</td>
							<td>
								<div className={cx("validator")}>
									<Skeleton className={cx("validator-icon")} variant='circle' width={40} height={40} />
									<span className={cx("validator-name")}>
										<Skeleton variant='text' width={60} height={21} className={cx("skeleton")} />
									</span>
								</div>
							</td>
						</tr>

						<tr>
							<td colSpan={2}>
								<div className={cx("item-title")}>Address</div>
								<div className={cx("item-text")}>
									<Skeleton variant='text' width={150} height={21} className={cx("skeleton")} />
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Result</div>
							</td>
							<td>
								<div className={cx("item-text")}>
									<Skeleton variant='text' width={90} height={21} className={cx("skeleton")} />
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Voting Power</div>
							</td>
							<td>
								<div className={cx("voting-power")}>
									<div className={cx("voting-power-value")}>
										<Skeleton variant='text' width={70} height={21} className={cx("skeleton")} />
									</div>
									<div className={cx("voting-power-percent")}>
										<Skeleton variant='text' width={50} height={21} className={cx("skeleton")} />
									</div>
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Status</div>
							</td>
							<td>
								<div className={cx("status")}>
									<Skeleton variant='rect' width={11} height={8} className={cx("skeleton", "status-icon")} />
									<span className={cx("status-text")}>
										<Skeleton variant='text' width={50} height={21} className={cx("skeleton")} />
									</span>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	return <div className='result-card-list'>{dataSourceCardListItems}</div>;
});

export default ResultCardListSkeleton;
