import React, {useState} from "react";
import {useGet} from "restful-react";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import styles from "./DelegatedWithdraw.scss";
import {Button} from "@material-ui/core";
import Pagination from "src/components/common/Pagination";
import cn from "classnames/bind";
import consts from "src/constants/consts";
import DelegatedTable from "./DelegatedTable";

const cx = cn.bind(styles);

export default function({setActiveTab}) {
	const theme = useTheme();
	// const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	// const basePath = `${consts.LCD_API_BASE}${consts.LCD_API.CLAIM_REWARD}/${address}/rewards`;
	// const [path, setPath] = useState(`${basePath}`);
	// const { data } = useGet({
	// 	path: path,
	// });

	// const totalPages = data?.page?.total_page ?? 0;
	// const currentPage = data?.page?.page_id ?? 1;

	// const onPageChange = page => {
	// 	setPath(`${basePath}&page_id=${page}`);
	// };

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
			/> */}
			<Pagination pages={10} page={1} />
		</>
	);
}
