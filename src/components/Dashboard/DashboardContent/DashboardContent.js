import React, {useState} from "react";
import cn from "classnames/bind";
import styles from "./DashboardContent.scss";
import {_} from "src/lib/scripts";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useDispatch} from "react-redux";

//  components
import GraphDisplay from "./GraphDisplay";
import PriceDisplay from "./PriceDisplay";
import DetailDisplay from "./DetailDisplay";
import BlocksDisplay from "./BlocksDisplay";
import TxDisplay from "./TxDisplay";
import StatusBox from "src/components/common/StatusBox";
import {openPageBar} from "src/store/modules/global";
//  assets
import exchangeSVG from "src/assets/dashboard/exchange_ic.svg";
import dexSVG from "src/assets/dashboard/dex_ic.svg";
import jexSVG from "src/assets/dashboard/jex_ic.svg";
import launchpadSVG from "src/assets/dashboard/launchpad_ic.svg";
import {ReactComponent as DashBoardIcon} from "src/assets/dashboard/dashboard.svg";
import {ReactComponent as TogglePageIcon} from "src/assets/icons/toggle-page.svg";
//  component
import Skeleton from "react-skeleton-loader";
//  redux
import {useSelector} from "react-redux";

const cx = cn.bind(styles);

export default function(props) {
	const isDesktop = useMediaQuery("(min-width:500px)");
	const dispatch = useDispatch();
	return (
		<div className={cx("DashboardContent-wrapper")}>
			{isDesktop ? (
				<div className={cx("header")}>
					<div className={cx("title")}>Dashboard</div>
					<StatusBox />
				</div>
			) : (
				<div className={cx("header-mobile")}>
					<div className={cx("title")}>
						{" "}
						<DashBoardIcon /> Dashboard
					</div>
					<div className={cx("page-icon")} onClick={() => dispatch(openPageBar())}>
						{" "}
						<TogglePageIcon />{" "}
					</div>
				</div>
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
