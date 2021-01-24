import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {formatOrai} from "src/helpers/helper";
import {_} from "src/lib/scripts";
import Address from "src/components/common/Address";
import styles from "./OracleScriptCardList.scss";

const OracleScriptCardList = memo(({data = []}) => {
	const cx = classNames.bind(styles);

	return (
		<div className='oracle-script-card-list'>
			<div className={cx("oracle-script-card-list-item")}>
				<table>
					<tbody>
						<tr>
							<td colSpan={2}>
								<div className={cx("item-title")}>Oracle Script</div>
								<div className={cx("oracle-script")}>
									<NavLink className={cx("oracle-script-tag")} to={`${consts.PATH.ORACLE_SCRIPTS}/orai1234`}>
										#D2
									</NavLink>
									<span className={cx("oracle-script-name")}>CoinGecko</span>
								</div>
							</td>
						</tr>

						<tr>
							<td colSpan={2}>
								<div className={cx("item-title")}>Requets & Response Time</div>
								<div className={cx("request-and-response-time")}>
									<span className={cx("request-value")}>181,139</span>
									<span className={cx("response-time-value")}>(8.18 s)</span>
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Owner</div>
							</td>
							<td>
								<div className={cx("owner")}>
									<Address address='Owner 001' link={`${consts.PATH.ACCOUNT}/orai1234`} size='md' showCopyIcon={false} />
								</div>
							</td>
						</tr>

						<tr>
							<td colSpan={2}>
								<div className={cx("item-title")}>Description</div>
								<div className={cx("description")}>Query latest cryptocurrency token prices from CoinGecko. Accepts multiple space-separated symbols.</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			{/* Bỏ comment này và xóa các dòng trên khi có data */}
			{/* {data.map((item, index) => (
				<div className={cx("oracle-script-card-list-item")} key={"oracle-script-card-list-item-" + index}>
					<table>
						<tbody>
							<tr>
								<td colSpan={2}>
									<div className={cx("item-title")}>Oracle Script</div>
									{_.isNil(item?.name) ? (
										<div className={cx("oracle-script")}>-</div>
									) : (
										<div className={cx("oracle-script")}>
											<NavLink className={cx("oracle-script-tag")} to={`${consts.PATH.ORACLE_SCRIPTS}/${item.tag}`}>
												{item.tag}
											</NavLink>
											<span className={cx("oracle-script-name")}>{item.name}</span>
										</div>
									)}
								</td>
							</tr>

							<tr>
								<td colSpan={2}>
									<div className={cx("item-title")}>Requets & Response Time</div>
									{_.isNil(item?.requests) ? (
										<div className={cx("request-and-response-time")}>
											<span className={cx("request-value")}>_</span>
											<span className={cx("response-time-value")}>(-)</span>
										</div>
									) : (
										<div className={cx("request-and-response-time")}>
											<span className={cx("request-value")}>{item.requests}</span>
											<span className={cx("response-time-value")}>({item.response_time})</span>
										</div>
									)}
								</td>
							</tr>

							<tr>
								<td>
									<div className={cx("item-title")}>Owner</div>
								</td>
								<td>
									{_.isNil(item?.owner) ? (
										<div className={cx("owner")}>-</div>
									) : (
										<div className={cx("owner")}>
											<Address address={item.owner} link={`${consts.PATH.ACCOUNT}/${item.owner}`} size='md' showCopyIcon={false} />
										</div>
									)}
								</td>
							</tr>

							<tr>
								<td colSpan={2}>
									<div className={cx("item-title")}>Description</div>
									{
										_.isNil(item?.description) ? (
											<div className={cx("description")}>-</div>
										) : (
											<div className={cx("description")}>{item.description}</div>
										)
									}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			))} */}
		</div>
	);
});

export default OracleScriptCardList;
