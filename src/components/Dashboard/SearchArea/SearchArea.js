import * as React from "react";
import cn from "classnames/bind";
import { Grid } from "@material-ui/core";
import SmartSearchBox from "src/components/common/SmartSearchBox";
import NetworkSwitcher from "src/components/common/NetworkSwitcher";
import styles from "./SearchArea.module.scss";

const cx = cn.bind(styles);
const hasTestnetAPI = !!process.env.REACT_APP_API_TESTNET;

export default function ({ isDropdownVisible = true, closeMobileNavigateBar = () => { } }) {
	return (
		<div className={cx("search-area")}>
			<Grid container spacing={2} alignItems='center'>
				{/* <Grid item lg={4} xs={12}>
					<div className={cx("title")}>Oraichain Explorer</div>
				</Grid> */}
				{isDropdownVisible && (
					<Grid item lg={6} xs={12}>
						<div className={cx("switch-network")}>
							<div className={cx("switch-network-title")}>Choose network: </div>
							{hasTestnetAPI && <NetworkSwitcher />}
						</div>
					</Grid>
				)}

				<Grid item lg={6} xs={12}>
					<SmartSearchBox closeMobileNavigateBar={closeMobileNavigateBar} />
				</Grid>
			</Grid>
		</div>
	);
}
