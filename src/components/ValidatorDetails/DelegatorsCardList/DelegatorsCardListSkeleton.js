import React, {memo} from "react";
import classNames from "classnames/bind";
import Skeleton from "@material-ui/lab/Skeleton";
import styles from "./DelegatorsCardList.module.scss";

const DelegatorsCardListSkeleton = memo(({rows = 10}) => {
	const cx = classNames.bind(styles);

	let blockCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		blockCardListItems.push(
			<div className={cx("delegators-card-list-item")} key={"delegators-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>Address</div>
							</td>
							<td>
								<Skeleton variant='text' width={100} height={24} className={cx("skeleton")} />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Amount</div>
								<Skeleton variant='text' width={100} height={24} className={cx("skeleton")} />
							</td>
							<td>
								<div className={cx("item-title")}>Share</div>
								<Skeleton variant='text' width={100} height={24} className={cx("skeleton")} />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	return <div className='delegators-card-list'>{blockCardListItems}</div>;
});

export default DelegatorsCardListSkeleton;
