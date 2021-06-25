import * as React from "react";
import cn from "classnames/bind";
import {Grid} from "@material-ui/core";
import SearchBox from "src/components/common/SearchBox";
import NetworkSwitcher from "src/components/common/NetworkSwitcher";
import styles from "./SearchArea.scss";

const cx = cn.bind(styles);
const hasTestnetAPI = !!process.env.REACT_APP_API_TESTNET;

export default function() {
	return (
		<div className={cx("search-area")}>
			<Grid container spacing={2} alignItems='center'>
				<Grid item lg={4} xs={12}>
					<div className={cx("title")}>Oraichain Explorer</div>
				</Grid>

				<Grid item lg={2} xs={12}>
					{hasTestnetAPI && <NetworkSwitcher />}
				</Grid>

				<Grid item lg={6} xs={12}>
					<SearchBox interactiveWidth={true} />
				</Grid>
			</Grid>
		</div>
	);
}
