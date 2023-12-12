import { Grid } from "@material-ui/core";
import classNames from "classnames/bind";
import React from "react";
import { useSelector } from "react-redux";
import Countdown from "./Countdown";
import styles from "./CountdownRemainingBlock.module.scss";

import { formatNumber } from "src/lib/scripts";
const cx = classNames.bind(styles);

export default function CountdownRemainingBlock({ remainingBlock, height }) {
	const { status } = useSelector(state => state.blockchain);
	return (
		<div className={cx("countdown-container")}>
			<Countdown remainingBlock={remainingBlock} />

			<Grid container lg={8}>
				<Grid className={cx("countdown-average")} item lg={12} xs={12}>
					<div>
						<span>Avg. Block time calculated from past (Blocktime: {status.block_time.toFixed(4)}s)</span>
					</div>
				</Grid>
				<Grid className={cx("countdown-block")} item lg={12} xs={12} spacing={2}>
					<div className={cx("countdown-for-block")}>
						<div>Countdown For Blocks:</div>
						<strong>#{formatNumber(height)}</strong>
					</div>
					<div className={cx("current-block")}>
						<div>Current Blocks:</div>
						<strong>#{formatNumber(status.latest_block_height)}</strong>
					</div>
					<div className={cx("remaining-block")}>
						<div>Remaining Blocks:</div>
						<strong>#{formatNumber(remainingBlock)}</strong>
					</div>
				</Grid>
			</Grid>
		</div>
	);
}
