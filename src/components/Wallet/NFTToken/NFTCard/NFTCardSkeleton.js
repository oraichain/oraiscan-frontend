import React, { memo } from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import styles from "./NFTCard.module.scss";

const CwCardSkeleton = memo(({ rows = 10 }) => {
	const cx = classNames.bind(styles);
	let CwCardSkeletonItems = [];
	const dataSource = [
		{ title: "TxHash" },
		{ title: "NFT ID" },
		{ title: "NFT Name" },
		{ title: "Creator Type" },
		{ title: "Creator" },
		{ title: "Contract address" },
		{ title: "Contract" },
		{ title: "Time" },
	];

	for (let i = 1; i <= rows; i++) {
		CwCardSkeletonItems.push(
			<div className={cx("NFTToken-card-list-item")} key={"NFTToken-card-list-item-" + i}>
				<table>
					<tbody>
						{dataSource.map(({ title }) => {
							return (
							<tr>
								<td>
									<div className={cx("item-title")}>{title}</div>
								</td>
								<td>
									<Skeleton />
								</td>
							</tr>
						)})}
					
					</tbody>
				</table>
			</div>
		);
	}

	return <div className='NFTToken-card-list'>{CwCardSkeletonItems}</div>;
});

export default CwCardSkeleton;
