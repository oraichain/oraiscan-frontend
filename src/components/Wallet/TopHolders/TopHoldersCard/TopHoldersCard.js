import React, { memo } from "react";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import { _, reduceString, setAgoTime } from "src/lib/scripts";
import { formatOrai } from "src/helpers/helper";
import consts from "src/constants/consts";
import styles from "./TopHoldersCard.module.scss";

const cx = classNames.bind(styles);

const TopHoldersCard = memo(({ data = [], address }) => {
	if (!Array.isArray(data)) {
		return <></>;
	}
	const reduceStringAdress = (title, value, toHref = "") => {
		return (
			<tr>
				<td>
					<div className={cx("item-title")}>{title}</div>
				</td>
				<td>
					{value ? (
						<div className={cx("address-data-cell")}>
							<NavLink className={cx("address")} to={toHref}>
								{reduceString(value, 6, 6)}
							</NavLink>
						</div>
					) : (
						<div className={cx("item-link")}>-</div>
					)}
				</td>
			</tr>
		);
	};

	return (
		<div className='TopHoldersToken-card-list'>
			{data.map(item => {
				return (
					<div className={cx("TopHoldersToken-card-list-item")} key={"TopHoldersToken-card-list-item-" + item?.id}>
						<table>
							<tbody>
								{reduceStringAdress("TxHash", item?.tx_hash, `${consts.PATH.TXLIST}/${item.tx_hash}`)}
								{reduceStringAdress("From", item?.sender, `${consts.PATH.TXLIST}/${item.sender}`)}
							</tbody>
						</table>
					</div>
				);
			})}
		</div>
	);
});

export default TopHoldersCard;
