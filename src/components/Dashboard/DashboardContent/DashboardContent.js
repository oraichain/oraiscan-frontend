// @ts-nocheck
import React from "react";
import cn from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import GraphDisplay from "./GraphDisplay";
import PriceDisplay from "./PriceDisplay";
import DetailDisplay from "./DetailDisplay";
import BlocksDisplay from "./BlocksDisplay";
import TxDisplay from "./TxDisplay";
import styles from "./DashboardContent.scss";

const cx = cn.bind(styles);

export default function(props) {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	return (
		<Container>
			<div className={cx("DashboardContent-wrapper")}>
				{isLargeScreen ? (
					<div className={cx("header")}>
						<div className={cx("title")}>Dashboard</div>
						<StatusBox />
					</div>
				) : (
					<TogglePageBar type='dashboard' />
				)}
				<div className={cx("PriceGraphClickable-wrapper")}>
					<div className={cx("Card", "PriceGraph-wrapper")}>
						<PriceDisplay />
						<GraphDisplay />
						<DetailDisplay />
						{!isLargeScreen && <div className={cx("hr-price")}></div>}
					</div>
				</div>
				<div className={cx("BlockTx-wrapper")}>
					<BlocksDisplay />
					<div className={cx("CardFixed")}>
						<TxDisplay />
					</div>
				</div>
			</div>
		</Container>
	);
}
