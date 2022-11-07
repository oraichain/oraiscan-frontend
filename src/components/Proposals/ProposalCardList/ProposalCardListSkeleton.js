import React, {memo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import styles from "./ProposalCardList.module.scss";

const cx = classNames.bind(styles);

const ProposalCardListSkeleton = memo(({rows = 5}) => {
	let proposalCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		proposalCardListItems.push(
			<div className={cx("proposal-card-list-item")} key={"proposal-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>Id</div>
							</td>
							<td>
								<Skeleton variant='text' width={28} height={24} className={cx("skeleton")} />
							</td>
						</tr>

						<tr>
							<td colSpan={2}>
								<div className={cx("item-title")}>Title</div>
								<Skeleton variant='text' height={24} />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Status</div>
							</td>
							<td>
								<Skeleton variant='text' width={70} height={24} className={cx("skeleton")} />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Voting Start</div>
							</td>
							<td>
								<Skeleton variant='text' width={100} height={21} className={cx("skeleton")} />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Submit time</div>
							</td>
							<td>
								<Skeleton variant='text' width={100} height={21} className={cx("skeleton")} />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Total deposit</div>
							</td>
							<td>
								<td>
									<Skeleton variant='text' width={90} height={24} className={cx("skeleton")} />
								</td>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	return <div className='proposal-card-list'>{proposalCardListItems}</div>;
});

export default ProposalCardListSkeleton;
