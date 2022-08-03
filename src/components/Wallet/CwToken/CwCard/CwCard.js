import React, {memo} from "react";
import classNames from "classnames/bind";
import {checkStatus} from "../CwTable/CwTable";
import {NavLink} from "react-router-dom";
import {_, reduceString, setAgoTime} from "src/lib/scripts";
import {formatOrai} from "src/helpers/helper";
import consts from "src/constants/consts";
import styles from "./CwCard.module.scss";

const cx = classNames.bind(styles);

const CwCard = memo(({data = [], address}) => {
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
		<div className='cwToken-card-list'>
			{data.map(item => {
				return (
					<div className={cx("cwToken-card-list-item")} key={"cwToken-card-list-item-" + item?.id}>
						<table>
							<tbody>
								{reduceStringAdress("TxHash", item?.tx_hash, `${consts.PATH.TXLIST}/${item.tx_hash}`)}
								{reduceStringAdress("From", item?.sender, `${consts.PATH.TXLIST}/${item.sender}`)}
								{reduceStringAdress("To", item?.receiver, `${consts.PATH.TXLIST}/${item.receiver}`)}

								<tr>
									<td>
										<div className={cx("item-title")}>Status</div>
										<div className={cx("item-status")}>{checkStatus(item?.status_code, address, item?.receiver)}</div>
									</td>
									<td>
										<div className={cx("item-title")}>Time</div>
										<span className={cx("item-text")}>{setAgoTime(item?.transaction_time)}</span>
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Amount</div>
										<span className={cx("item-text")}>
											{formatOrai(item?.amount)} {item?.symbol.toUpperCase()}
										</span>
									</td>
									<td>
										<div className={cx("item-title")}>Token</div>
										{item?.name ? (
											<NavLink className={cx("item-link")} to={`${consts.PATH.SMART_CONTRACT}/${item?.contract_address}`}>
												{reduceString(item?.name, 8, 0)}
											</NavLink>
										) : (
											<span className={cx("item-link")}>-</span>
										)}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				);
			})}
		</div>
	);
});

export default CwCard;
