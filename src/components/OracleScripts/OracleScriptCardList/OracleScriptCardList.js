// @ts-nocheck
import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import Address from "src/components/common/Address";
import styles from "./OracleScriptCardList.module.scss";
import {_} from "src/lib/scripts";

const OracleScriptCardList = memo(({data = []}) => {
	const cx = classNames.bind(styles);

	return data?.map((item, index) => (
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
									{/* <div className={cx("oracle-script-tag")}>{item?.tag || "#D2"}</div> */}
									<NavLink className={cx("oracle-script-name")} to={`${consts.PATH.ORACLE_SCRIPTS}/${item?.name}`}>
										{item?.name}
									</NavLink>
								</div>
							)}
						</td>
					</tr>

					<tr>
						<td colSpan={2}>
							<div className={cx("item-title")}>Requests</div>
							{_.isNil(item?.request) ? (
								<div className={cx("request-and-response-time")}>
									<span className={cx("request-value")}>-</span>
								</div>
							) : (
								<div className={cx("request-and-response-time")}>
									<span className={cx("request-value")}>{item?.request}</span>
								</div>
							)}
						</td>
					</tr>

					<tr>
						<td colSpan={2}>
							<div className={cx("item-title")}>Owner</div>
							{_.isNil(item?.owner) ? (
								<div className={cx("owner")}>-</div>
							) : (
								<div className={cx("owner")}>
									<Address address={item.owner} link={`${consts.PATH.ACCOUNT}/${item.owner}`} size='lg' showCopyIcon={false} />
								</div>
							)}
						</td>
					</tr>

					<tr>
						<td colSpan={2}>
							<div className={cx("item-title")}>Description</div>
							{_.isNil(item?.description) ? <div className={cx("description")}>-</div> : <div className={cx("description")}>{item?.description}</div>}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	));
});

export default OracleScriptCardList;
