import React from "react";
import styles from "./DelegatedWithdraw.scss";
import {Button} from "@material-ui/core";
import DelegatedTable from "./DelegatedTable";
import Pagination from "src/components/common/Pagination";
import cn from "classnames/bind";

const cx = cn.bind(styles);

export default function({setActiveTab}) {
	return (
		<>
			<div className={cx("header")}>
				<div className={cx("title")}>Withdraw</div>
				<Button className={cx("withdraw")} onClick={() => setActiveTab(0)}>
					Claim Reward <img src={require("../../../../assets/wallet/arrow.svg")} />
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
						validator: "Oraichain",
						stake: 153.123,
						reward: 153.123,
						unbonded: 123.123,
						withdraw: 153.123,
					},
					{
						validator: "Oraichain",
						stake: 153.123,
						reward: 153.123,
						unbonded: 123.123,
						withdraw: 153.123,
					},
					{
						validator: "Oraichain",
						stake: 153.123,
						reward: 153.123,
						unbonded: 123.123,
						withdraw: 153.123,
					},
					{
						validator: "Oraichain",
						stake: 153.123,
						reward: 153.123,
						unbonded: 123.123,
						withdraw: 153.123,
					},
					{
						validator: "Oraichain",
						stake: 153.123,
						reward: 153.123,
						unbonded: 123.123,
						withdraw: 153.123,
					},
					{
						validator: "Oraichain",
						stake: 153.123,
						reward: 153.123,
						unbonded: 123.123,
						withdraw: 153.123,
					},
					{
						validator: "Oraichain",
						stake: 153.123,
						reward: 153.123,
						unbonded: 123.123,
						withdraw: 153.123,
					},
					{
						validator: "Oraichain",
						stake: 153.123,
						reward: 153.123,
						unbonded: 123.123,
						withdraw: 153.123,
					},
				]}
			/>
			<Pagination pages={10} page={1} /> */}
		</>
	);
}
