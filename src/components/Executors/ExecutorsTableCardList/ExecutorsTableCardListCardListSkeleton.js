import React, {memo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import styles from "./ExecutorsTableCardList.scss";

const ExecutorsTableCardListCardListSkeleton = memo(({rows = 5}) => {
	const cx = classNames.bind(styles);

	let delegationCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		delegationCardListItems.push(
			<div className={cx("executors-card-list-item")} key={"executors-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>Executor Public Keys</div>
							</td>
							<td>
								<div className={cx("item-link")}>
									<Skeleton />
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Active</div>
								<div className={cx("item-text")}>
									<Skeleton />
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	return <div className='executors-card-list'>{delegationCardListItems}</div>;
});

export default ExecutorsTableCardListCardListSkeleton;
