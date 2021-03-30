// @ts-nocheck
import React, {memo} from "react";
import classNames from "classnames/bind";
import styles from "./ContactCardList.scss";

const TransactionCardList = memo(({data = []}) => {
	const cx = classNames.bind(styles);

	return (
		<div className='contact-card-list'>
			{data.map((item, index) => {
				return (
					<div className={cx("contact-card-list-item")} key={"contact-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Name</div>
									</td>
									<td>
										<div className={cx("item-link")}>{item.name}</div>
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Address</div>
									</td>
									<div className={cx("address-data-cell")}>{item?.address}</div>
								</tr>
							</tbody>
						</table>
					</div>
				);
			})}
		</div>
	);
});

export default TransactionCardList;
