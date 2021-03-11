import React, {memo} from "react";
import classNames from "classnames/bind";
import Skeleton from "@material-ui/lab/Skeleton";
import styles from "./ProposedBlocksCardList.scss";

const ProposedBlocksCardListSkeleton = memo(({rows = 10}) => {
	const cx = classNames.bind(styles);

	let blockCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		blockCardListItems.push(
			<div className={cx("proposed-block-card-list-item")} key={"proposed-block-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>Height</div>
							</td>
							<td>
								<Skeleton variant='text' width={100} height={24} className={cx("skeleton")} />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Block Hash</div>
							</td>
							<td>
								<Skeleton variant='text' width={100} height={24} className={cx("skeleton")} />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>TXS</div>
								<Skeleton variant='text' width={100} height={24} className={cx("skeleton")} />
							</td>
							<td>
								<div className={cx("item-title")}>Time</div>
								<Skeleton variant='text' width={100} height={24} className={cx("skeleton")} />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	return <div className='proposed-block-card-list'>{blockCardListItems}</div>;
});

export default ProposedBlocksCardListSkeleton;
