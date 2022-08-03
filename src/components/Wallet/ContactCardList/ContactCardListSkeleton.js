import React, {memo} from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import classNames from "classnames/bind";
import styles from "./ContactCardList.module.scss";

const ContactCardListSkeleton = memo(({rows = 5}) => {
	const cx = classNames.bind(styles);

	let ContactCardListItems = [];
	for (let i = 1; i <= rows; i++) {
		ContactCardListItems.push(
			<div className={cx("contact-card-list-item")} key={"contact-card-list-item-" + i}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>Name</div>
							</td>
							<td>
								<Skeleton />
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Address</div>
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

	return <div className='contact-card-list'>{ContactCardListItems}</div>;
});

export default ContactCardListSkeleton;
