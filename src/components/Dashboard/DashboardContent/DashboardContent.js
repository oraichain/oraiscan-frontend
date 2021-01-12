import React, {useState} from "react";
import cn from "classnames/bind";
import styles from "./DashboardContent.scss";
import {_} from "src/lib/scripts";
import useMediaQuery from "@material-ui/core/useMediaQuery";

//  components
import GraphDisplay from "./GraphDisplay";
import PriceDisplay from "./PriceDisplay";
import DetailDisplay from "./DetailDisplay";
import BlocksDisplay from "./BlocksDisplay";
import TxDisplay from "./TxDisplay";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";

const cx = cn.bind(styles);

export default function(props) {
	const isDesktop = useMediaQuery("(min-width:500px)");
	return (
		<div className={cx("DashboardContent-wrapper")}>
			{isDesktop ? (
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
					{!isDesktop && <div className={cx("hr-price")}></div>}
				</div>
			</div>
			<div className={cx("BlockTx-wrapper")}>
				<BlocksDisplay />
				<div className={cx("CardFixed")}>
					<TxDisplay />
				</div>
			</div>
		</div>
	);
}
