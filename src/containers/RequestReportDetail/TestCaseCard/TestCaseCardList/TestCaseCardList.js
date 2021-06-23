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
import styles from "./TestCaseCardList.module.scss";

const cx = classNames.bind(styles);

const TestCaseCardList = memo(({data}) => {
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
						case "success":
							statusElement = (
								<div className={cx("status")}>
									<CheckIcon className={cx("status-icon", "status-icon-success")} />
									<span className={cx("status-text")}>Success</span>
								</div>
							);
							break;
						case "pending":
							statusElement = (
								<div className={cx("status")}>
									<ClockIcon className={cx("status-icon", "status-icon-pending")} />
									<span className={cx("status-text")}>Pending</span>
								</div>
							);
							break;
						case "fail":
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
										<div className={cx("item-title")}>Name</div>
									</td>
									<td>{_.isNil(item?.name) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{item?.name}</div>}</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Result</div>
									</td>
									<td>
										{_.isNil(item?.result) ? <div className={cx("item-text")}>-</div> : <div className={cx("item-text")}>{Base64.decode(item?.result)}</div>}
									</td>
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

TestCaseCardList.propTypes = {
	data: PropTypes.any,
};
TestCaseCardList.defaultProps = {
	data: [],
};

export default TestCaseCardList;
