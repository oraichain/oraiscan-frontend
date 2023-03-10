import React, {memo} from "react";
import classNames from "classnames/bind";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import styles from "./TopProposalCardList.module.scss";

const cx = classNames.bind(styles);

const TopProposalCardListSkeleton = memo(({rows = 4}) => {
	let topProposalCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		topProposalCardListItems.push(
			<Grid item lg={6} xs={12}>
				<div className={cx("top-proposal-card")} key={"top-proposal-card-" + i}>
					<div className={cx("top-proposal-card-header")}>
						<div className={cx("proposal-id")}>
							<Skeleton variant='text' width={25} height={21} className={cx("skeleton")} />
						</div>
						<Skeleton variant='text' width={70} height={24} className={cx("skeleton")} />
					</div>
					<div className={cx("top-proposal-card-body")}>
						<table>
							<tbody>
								<tr>
									<td colSpan={2}>
										<div className={cx("proposal-title")}>
											<Skeleton variant='text' width={100} height={24} className={cx("skeleton")} />
										</div>
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Title</div>
									</td>
									<td>
										<div className={cx("item-text")}>
											<Skeleton variant='text' width={100} height={21} className={cx("skeleton")} />
										</div>
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Voting Start</div>
									</td>
									<td>
										<div className={cx("item-text")}>
											<Skeleton variant='text' width={100} height={21} className={cx("skeleton")} />
										</div>
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Voting End</div>
									</td>
									<td>
										<div className={cx("item-text")}>
											<Skeleton variant='text' width={100} height={21} className={cx("skeleton")} />
										</div>
									</td>
								</tr>

								<tr>
									<td colSpan={2}>
										<Skeleton variant='text' height={21} />
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</Grid>
		);
	}

	return (
		<div className={cx("top-proposal-card-list")}>
			<Grid container spacing={2}>
				{topProposalCardListItems}
			</Grid>
		</div>
	);
});

export default TopProposalCardListSkeleton;
