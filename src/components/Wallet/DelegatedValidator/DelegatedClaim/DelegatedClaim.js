import React from "react";
import styles from "./DelegatedClaim.scss";
import {Button} from "@material-ui/core";
import DelegatedTable from "./DelegatedTable";
import Pagination from "src/components/common/Pagination";
import cn from "classnames/bind";

const cx = cn.bind(styles);

export default function({setActiveTab}) {
	return (
		<>
			<div className={cx("header")}>
				<div className={cx("title")}>Claim Reward</div>
				<Button className={cx("withdraw")} onClick={() => setActiveTab(1)}>
					Withdraw <img src={require("../../../../assets/wallet/arrow.svg")} />
				</Button>
			</div>
			<div
				style={{
					height: "300px",
				}}>
				<p style={{fontSize: "28px", fontWeight: "500"}}>Coming soon</p>
			</div>
			{/* <DelegatedTable
				data={[
					{
						address: "0x2371983011533f7d88efc27e87b2982A863B2724",
						stake: 153.3146,
						claim: 153.3146,
					},
					{
						address: "0x2371983011533f7d88efc27e87b2982A863B2724",
						stake: 153.3146,
						claim: 153.3146,
					},
					{
						address: "0x2371983011533f7d88efc27e87b2982A863B2724",
						stake: 153.3146,
						claim: 153.3146,
					},
					{
						address: "0x2371983011533f7d88efc27e87b2982A863B2724",
						stake: 153.3146,
						claim: 153.3146,
					},
					{
						address: "0x2371983011533f7d88efc27e87b2982A863B2724",
						stake: 153.3146,
						claim: 153.3146,
					},
					{
						address: "0x2371983011533f7d88efc27e87b2982A863B2724",
						stake: 153.3146,
						claim: 153.3146,
					},
				]}
			/>
			<Pagination pages={10} page={1} /> */}
		</>
	);
}
