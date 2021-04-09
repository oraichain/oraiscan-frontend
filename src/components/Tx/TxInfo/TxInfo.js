import * as React from "react";
import styles from "./TxInfo.scss";
import cn from "classnames/bind";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";

import {getTotalTime, setAgoTime} from "src/lib/scripts";
//  components
import InfoRow from "src/components/common/InfoRow";
import DisplayLongString from "src/components/common/DisplayLongString";
import {showAlert} from "src/store/modules/global";
//  assets
import failSVG from "src/assets/transactions/fail_ic.svg";
import successSVG from "src/assets/transactions/success_ic.svg";
import copyIcon from "src/assets/common/copy_ic.svg";

import copy from "copy-to-clipboard";

const cx = cn.bind(styles);

export default function({txData}) {
	const dispatch = useDispatch();
	return (
		<div className={cx("TxInfo-wrapper")}>
			<div className={cx("title")}>Information</div>
			<div className={cx("grid-wrapper")}>
				<InfoRow label='TxHash'>
					<DisplayLongString inputString={txData.tx_hash} showCopyIcon={true} long />
					<img
						src={copyIcon}
						alt=''
						className={cx("txHash-copy")}
						onClick={() => {
							copy(txData.tx_hash);
							dispatch(
								showAlert({
									show: true,
									message: "Copied",
									autoHideDuration: 1500,
								})
							);
						}}
					/>
				</InfoRow>
				<InfoRow label='Status'>
					<span>
						<img className={cx("status-img")} src={txData?.result ? successSVG : failSVG} alt={"status"} />
						{txData?.result ? "Success" : "fail"}
					</span>
				</InfoRow>
				<InfoRow label='Height'>
					<NavLink className={cx("blueColor")} to={`/blocks/${txData.height}`}>
						{txData.height}
					</NavLink>
				</InfoRow>
				<InfoRow label='Time'>
					<span>
						{setAgoTime(txData.timestamp)} ( {getTotalTime(txData.timestamp)} )
					</span>
				</InfoRow>
			</div>
		</div>
	);
}
