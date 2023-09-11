import React, { memo } from "react";
import classNames from "classnames/bind";
import { checkStatus } from "../NFTTable/NFTTable";
import { NavLink } from "react-router-dom";
import { _, reduceString, setAgoTime } from "src/lib/scripts";
import { formatOrai } from "src/helpers/helper";
import consts from "src/constants/consts";
import styles from "./NFTCard.module.scss";

const cx = classNames.bind(styles);

const NFTCard = memo(({ data = [], address }) => {
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
		<div className='nftToken-card-list'>
			{data.map(item => {
				return (
					<div className={cx("nftToken-card-list-item")} key={"nftToken-card-list-item-" + item?.id}>
						<table>
							<tbody>
								{reduceStringAdress("TxHash", item?.tx_hash, `${consts.PATH.TXLIST}/${item.tx_hash}`)}
								<tr>
									<td>
										<div className={cx("item-title")}>Token ID</div>
									</td>
									<td>
										<span className={cx("item-text")}>{item?.nft_id}</span>
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("item-title")}>NFT Name </div>
									</td>
									<td>
										<span className={cx("item-text")}>{item?.nft_name}</span>
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("item-title")}>Type</div>
									</td>
									<td>
										<span className={cx("type-data-cell")}>
											<span className={cx("first-message-type")}>{(item.creator_type)}</span>
										</span>
									</td>
								</tr>
								{reduceStringAdress("Owner", item?.owner, `${consts.PATH.TXLIST}/${item.owner}`)}
								{reduceStringAdress("Creator", item?.creator, `${consts.PATH.TXLIST}/${item.creator}`)}
								{reduceStringAdress("Contract address", item?.contract_address, `${consts.PATH.TXLIST}/${item.contract_address}`)}
								{reduceStringAdress("Contract", item?.contract, `${consts.PATH.TXLIST}/${item.contract}`)}

								<tr>
									<td>
										<div className={cx("item-title")}>Time</div>
									</td>
									<td>
										<span className={cx("item-text")}>{setAgoTime(item?.timestamp)}</span>
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("item-title")}>Description</div>
									</td>
									<td>
										<span className={cx("item-text")}>{item?.description}</span>
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

export default NFTCard;
