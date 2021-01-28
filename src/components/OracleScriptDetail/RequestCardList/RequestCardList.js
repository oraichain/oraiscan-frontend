import React, {memo, useMemo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import Address from "src/components/common/Address";
import styles from "./RequestCardList.scss";
import successIcon from "src/assets/oracleScripts/success_ic.svg";

const RequestCardList = memo(({data = []}) => {
	const cx = classNames.bind(styles);
	return (
		<div className='request-card-list'>
			<div className={cx("request-card-list-item")}>
				<table>
					<tbody>
						<tr>
							<td>
								<div className={cx("item-title")}>Request</div>
							</td>
							<td>
								<NavLink className={cx("item-link", "align-left")} to='/'>
									608080F5...33E8E8A9
								</NavLink>
							</td>
						</tr>

						<tr>
							<td colSpan={2}>
								<div className={cx("item-title")}>Oracle Script</div>
								<div className={cx("title")}>
									<span className={cx("title-tag")}>#03</span>
									<span className={cx("title-name")}>Band Standard Dataset (Crypto)</span>
								</div>
							</td>
						</tr>

						<tr>
							<td colSpan={2}>
								<div className={cx("item-title")}>Report Status</div>
								<div className={cx("report-status")}>
									<div className={cx("info")}>
										<div className={cx("info-time")}>Min 10</div>
										<div className={cx("info-progress")}>16 of 16</div>
									</div>
									<div className={cx("graph")}>
										<div className={cx("graph-total")}></div>
										{/* <div className={cx("graph-done")} style={{width: "20%"}}></div> */}
										<div className={cx("graph-finished")}></div>
									</div>
								</div>
							</td>
						</tr>

						<tr>
							<td>
								<div className={cx("item-title")}>Status</div>
								<div className={cx("status")}>
									<img src={successIcon} alt='' className={cx("status-icon")} />
									<span className={cx("status-text")}>Success</span>
								</div>
							</td>
							<td>
								<div className={cx("item-title")}>Owner</div>
								<div className={cx("flex-row-end")}>
									<Address address='orai1clmdwn4tjr27rlm9cn8t7vapu9zx5zsdc3efxq' size='md' showCopyIcon={false} />
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
});

export default RequestCardList;
