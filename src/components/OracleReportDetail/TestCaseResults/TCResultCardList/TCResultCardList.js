// @ts-nocheck
import React, {memo} from "react";
import {NavLink, useParams} from "react-router-dom";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import {Base64} from "js-base64";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import CheckIcon from "src/icons/Validators/CheckIcon";
import ClockIcon from "src/icons/ClockIcon";
import FailedIcon from "src/icons/Transactions/FailedIcon";
import styles from "./TCResultCardList.module.scss";

const cx = classNames.bind(styles);

const TCResultCardList = memo(({data}) => {
	const params = useParams();
	const requestId = params?.["id"];
	return (
		<div className='test-case-card-list'>
			{data.map((item, index) => {
				let statusElement;
				if (_.isNil(item?.status)) {
					statusElement = <div className={cx("status")}>-</div>;
				} else {
					switch (item?.status) {
						case true:
							statusElement = (
								<div className={cx("status")}>
									<CheckIcon className={cx("status-icon", "status-icon-success")} />
									<span className={cx("status-text")}>Success</span>
								</div>
							);
							break;
						case false:
							statusElement = (
								<div className={cx("status")}>
									<FailedIcon className={cx("status-icon", "status-icon-fail")} />
									<span className={cx("status-text")}>Failed</span>
								</div>
							);
							break;
						default:
							break;
					}
				}

				return (
					<div className={cx("test-case-card-list-item")} key={"test-case-card-list-item-" + index}>
						<table>
							<tbody>
								<tr>
									<td>
										<div className={cx("item-title")}>Contract</div>
									</td>
									<td>{_.isNil(item?.contract) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{item?.contract}</div>}</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Result</div>
									</td>
									<td>{_.isNil(item?.result) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{item?.result}</div>}</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Status</div>
									</td>
									<td>{statusElement}</td>
								</tr>
							</tbody>
						</table>
					</div>
				);
			})}
		</div>
	);
});

TCResultCardList.propTypes = {
	data: PropTypes.any,
};
TCResultCardList.defaultProps = {
	data: [],
};

export default TCResultCardList;
