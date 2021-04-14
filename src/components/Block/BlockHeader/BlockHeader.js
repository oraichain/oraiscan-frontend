/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import cn from "classnames/bind";
import styles from "./BlockHeader.scss";
import {useDispatch} from "react-redux";

import {_, getTotalTime, setAgoTime} from "src/lib/scripts";
//  components
import InfoRow from "src/components/common/InfoRow";
import Skeleton from "react-skeleton-loader";
import {useSelector} from "react-redux";
import copyIcon from "src/assets/common/copy_ic.svg";
import copy from "copy-to-clipboard";
import {showAlert} from "src/store/modules/global";

const cx = cn.bind(styles);

export default function({blockData, history}) {
	const validators = useSelector(state => state.blockchain.validators);
	const dispatch = useDispatch();
	console.log(validators);
	// console.log(blockData);

	const onClick = React.useCallback(() => history.replace(`/blocks/${Number(blockData?.height) - 1}`), [blockData, history]);

	return React.useMemo(() => {
		return (
			<div className={cx("BlockDetail-wrapper")}>
				{/*{(() => console.table(blockData))()}*/}
				<div className={cx("title")}>Block Data</div>
				<div className={cx("content")}>
					<InfoRow label={"Height"}>{blockData?.height}</InfoRow>
					<InfoRow label={"Block Time"}>
						{_.isNil(blockData?.timestamp) ? <Skeleton /> : `${setAgoTime(blockData?.timestamp)} (${getTotalTime(blockData?.timestamp)})`}
					</InfoRow>
					<InfoRow label={"Block Hash"}>
						{blockData?.block_hash}
						<img
							src={copyIcon}
							alt=''
							className={cx("blockHash-copy")}
							onClick={() => {
								copy(blockData.block_hash);
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
					<InfoRow label={"Parent Hash"}>
						<span className={cx("blueLink")} onClick={onClick}>
							{blockData?.parent_hash}
						</span>
					</InfoRow>
					<InfoRow label={"Number of Tx"}>{blockData?.txs.length}</InfoRow>
					<InfoRow label={"Node"} handleClickCustom={() => blockData?.moniker && history.push(`/validators/${validators[blockData?.moniker]?.operatorAddr}`)}>
						{blockData?.moniker}
					</InfoRow>
					{/*<InfoRow label={"Block Time"}>*/}
					{/*	<span className={cx("no-transform")}>in 438 ms</span>*/}
					{/*</InfoRow>*/}
					{/*<div className={cx("rewardRow")}>*/}
					{/*	<div className={cx("row-label")}>RewardedTo / Fee</div>*/}
					{/*	<div className={cx("row-content")}>*/}
					{/*		<ul className={cx("label-wrapper")}>*/}
					{/*			<li>RewardTo</li>*/}
					{/*			<li>Fee</li>*/}
					{/*		</ul>*/}
					{/*		<ul className={cx("value-wrapper")}>*/}
					{/*			<li>*/}
					{/*				<NavLink className={cx("blueLink")} to={"/account/bnb16k0gajcczwgymfkk0zsysjzl0sxyxdfckplxlr"}>*/}
					{/*					bnb16k0gajcczwgymfkk0zsysjzl0sxyxdfckplxlr*/}
					{/*				</NavLink>*/}
					{/*				- 고정값*/}
					{/*			</li>*/}
					{/*			<li>*/}
					{/*				<span>{formatNumber(split[0])}</span>.<span className={cx("text", "decimal")}>{split[1]}</span> <span className={cx("BNB")}>BNB</span>*/}
					{/*			</li>*/}
					{/*		</ul>*/}
					{/*	</div>*/}
					{/*</div>*/}
				</div>
			</div>
		);
	}, [blockData, onClick]);
}
