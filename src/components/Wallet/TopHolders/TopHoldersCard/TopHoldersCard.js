import React, { memo } from "react";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import { _, reduceString, setAgoTime } from "src/lib/scripts";
import { formatOrai } from "src/helpers/helper";
import consts from "src/constants/consts";
import styles from "./TopHoldersCard.module.scss";

const cx = classNames.bind(styles);

const TopHoldersCard = memo(({ data = [], tokenInfo }) => {
	if (!Array.isArray(data)) {
		return <></>;
	}
	const renderMobileField = (title, value, toHref = "") => {
		return (
			<tr>
				<td>
					<div className={cx("item-title")}>{title}</div>
				</td>
				<td>
					{value ? (
						<div className={cx("address-data-cell")}>
							<NavLink className={cx("address")} to={toHref}>
								{value}
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
								{renderMobileField("Address", item?.address, `${consts.PATH.ACCOUNTS}/${item.address}`)}
								{renderMobileField(
									"Balance",
									`${formatOrai(Number(item.balance), Math.pow(10, tokenInfo?.decimals))} ${tokenInfo?.symbol.toUpperCase()}`,
									`${consts.PATH.ACCOUNTS}/${item.address}`
								)}
							</tbody>
						</table>
					</div>
				);
			})}
		</div>
	);
});

export default TopHoldersCard;
