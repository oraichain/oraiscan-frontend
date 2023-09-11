import React, { memo } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import styles from "./NFTCard.module.scss";

const NFTCardSkeleton = memo(({ rows = 20 }) => {
	const cx = classNames.bind(styles);
	let NFTCardSkeletonItems = [];

	for (let i = 1; i <= rows; i++) {
		NFTCardSkeletonItems.push(
			<div className={cx("nftToken-card-list-item")} key={"nftToken-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>TxHash</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Token ID</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>NFT Name</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>Type</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>Owner</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>Creator</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>Contract address</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>Contract</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>Time</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>Description</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>
						

					</tbody>
				</table>
			</div>
		);
	}

	return <div className='nftToken-card-list'>{NFTCardSkeletonItems}</div>;
});

export default NFTCardSkeleton;
