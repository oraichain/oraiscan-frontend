// @ts-nocheck
import React, {memo} from "react";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import styles from "./RequestCardList.module.scss";

const cx = classNames.bind(styles);

const RequestCardList = memo(({data}) => {
	return (
		<div className='request-card-list'>
			{data.map((item, index) => {
				return (
					<div className={cx("request-card-list-item")} key={"request-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Requests</div>
									</td>
									<td>
										{_.isNil(item?.request) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to='/'>
												{item?.request}
											</NavLink>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Fees</div>
									</td>
									<td>{_.isNil(item?.fees) ? <div className={cx("item-link")}>-</div> : <div className={cx("item-text")}>{item?.fees}</div>}</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Block Height</div>
									</td>
									<td>
										{_.isNil(item?.block_height) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to={`${consts.PATH.BLOCKLIST}/${item?.block_height}`}>
												{item?.block_height}
											</NavLink>
										)}
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Creator</div>
									</td>
									<td>
										{_.isNil(item?.creator) ? (
											<div className={cx("item-link")}>-</div>
										) : (
											<NavLink className={cx("item-link")} to={`${consts.PATH.ACCOUNT}/${item?.creator}`}>
												{item?.creator}
											</NavLink>
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

RequestCardList.propTypes = {
	data: PropTypes.any,
};
RequestCardList.defaultProps = {
	data: [],
};

export default RequestCardList;
