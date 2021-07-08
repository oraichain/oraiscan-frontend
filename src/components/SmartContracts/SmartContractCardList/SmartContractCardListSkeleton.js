import React, {memo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import styles from "./SmartContractCardList.module.scss";

const SmartContractCardListSkeleton = memo(({rows = 10}) => {
	const cx = classNames.bind(styles);

	let testCaseCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		testCaseCardListItems.push(
			<div className={cx("smart-contract-card-list-item")} key={"smart-contract-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>Address</div>
							</td>
							<td>
								<div className={cx("item-link")}>
									<Skeleton variant='text' className={cx("skeleton")} width={100} height={21} />
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Code id</div>
							</td>
							<td>
								<div className={cx("item-text")}>
									<Skeleton variant='text' className={cx("skeleton")} width={60} height={21} />
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Creator</div>
							</td>
							<td>
								<div className={cx("item-text")}>
									<Skeleton variant='text' className={cx("skeleton")} width={60} height={21} />
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Admin</div>
							</td>
							<td>
								<div className={cx("item-text")}>
									<Skeleton variant='text' className={cx("skeleton")} width={60} height={21} />
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Label</div>
							</td>
							<td>
								<div className={cx("item-text")}>
									<Skeleton variant='text' className={cx("skeleton")} width={60} height={21} />
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Source</div>
							</td>
							<td>
								<div className={cx("item-link")}>
									<Skeleton variant='text' className={cx("skeleton")} width={100} height={21} />
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	return <div className='smart-contract-card-list'>{testCaseCardListItems}</div>;
});

export default SmartContractCardListSkeleton;
