import React, {memo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import styles from "./TestCaseCard.module.scss";

const DelegationCardListSkeleton = memo(({rows = 5}) => {
	const cx = classNames.bind(styles);

	let delegationCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		delegationCardListItems.push(
			<div className={cx("delegation-card-list-item")} key={"delegation-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}> Name </div>
							</td>
							<td>
								<div className={cx("item-link")}>
									<Skeleton />
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}> Result </div>
							</td>
							<td>
								<div className={cx("item-link")}>
									<Skeleton />
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}> Txs </div>
							</td>
							<td>
								<div className={cx("item-link")}>
									<Skeleton />
								</div>
							</td>
						</tr>

						{/* <tr>
							<td>
								<div className={cx("item-title")}> Blockhash </div>
								<div className={cx("item-text")}>
									<Skeleton />
								</div>
							</td>
							<td>
								<div className={cx("item-title")}> Txs </div>
								<div className={cx("item-text")}>
									<Skeleton />
								</div>
							</td>
						</tr> */}
					</tbody>
				</table>
			</div>
		);
	}

	return <div className='delegation-card-list'>{delegationCardListItems}</div>;
});

export default DelegationCardListSkeleton;
