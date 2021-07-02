import * as React from "react";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import copy from "copy-to-clipboard";
import {showAlert} from "src/store/modules/global";
import {_} from "src/lib/scripts";
import CopyIcon from "src/icons/CopyIcon";
import CheckIcon from "src/icons/CheckIcon";
import TimesIcon from "src/icons/TimesIcon";
import RedoIcon from "src/icons/RedoIcon";
import {getTotalTime, setAgoTime} from "src/lib/scripts";
import InfoRow from "src/components/common/InfoRow";
import ShortenedString from "src/components/common/ShortenedString";
import styles from "./TxInfo.module.scss";

const cx = cn.bind(styles);

const TxInfo = ({data}) => {
	const dispatch = useDispatch();

	let statusClassName;
	let statusIcon;
	let statusText;

	if (data?.result?.toLowerCase?.() === "success") {
		statusClassName = "status-success";
		statusIcon = <CheckIcon />;
		statusText = "Success";
	} else if (data?.result?.toLowerCase?.() === "failure") {
		statusClassName = "status-fail";
		statusIcon = <TimesIcon />;
		statusText = "Fail";
	} else if (data?.result?.toLowerCase?.() === "pending") {
		statusClassName = "status-pending";
		statusIcon = <RedoIcon />;
		statusText = "Pending";
	}

	return (
		<div className={cx("card")}>
			<h2 className={cx("card-header")}>Information</h2>
			<div className={cx("card-body")}>
				<InfoRow label='TxHash'>
					<div className={cx("address")}>
						<span className={cx("address-value")}>
							<ShortenedString inputString={data.tx_hash} showCopyIcon={true} long />
						</span>
						<span
							className={cx("address-copy")}
							onClick={() => {
								copy(data.tx_hash);
								dispatch(
									showAlert({
										show: true,
										message: "Copied",
										autoHideDuration: 1500,
									})
								);
							}}>
							<CopyIcon />
						</span>
					</div>
				</InfoRow>
				<InfoRow label='Status'>
					<div className={cx("status", statusClassName)}>
						<span className={cx("status-icon")}>{statusIcon}</span>
						<span className={cx("status-text")}>{statusText}</span>
					</div>
				</InfoRow>
				<InfoRow label='Height'>
					{_.isNil(data?.height) ? (
						"-"
					) : (
						<NavLink className={cx("height")} to={`/blocks/${data.height}`}>
							{data.height}
						</NavLink>
					)}
				</InfoRow>
				<InfoRow label='Time'>
					<div className={cx("time")}>{_.isNil(data?.timestamp) ? "-" : setAgoTime(data.timestamp) + " (" + getTotalTime(data.timestamp) + ")"}</div>
				</InfoRow>
			</div>
		</div>
	);
};

TxInfo.propTypes = {
	data: PropTypes.any,
};

TxInfo.defaultProps = {};

export default TxInfo;
