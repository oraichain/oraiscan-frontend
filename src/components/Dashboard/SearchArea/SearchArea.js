import * as React from "react";
import cn from "classnames/bind";
import {Menu, Dropdown, Button} from "antd";
import {DownOutlined} from "@ant-design/icons";
import config from "src/config";
import SearchArea from "src/components/common/SearchArea";
import styles from "./SearchArea.scss";

const cx = cn.bind(styles);

const isTestnetStorage = localStorage.getItem("isTestnet");

export default function() {
	const [isTestnet, setIsTestnet] = React.useState(!!isTestnetStorage);

	const setNet = net => {
		if (net === "testnet") {
			setIsTestnet(true);
			localStorage.setItem("isTestnet", "true");
			window.location.reload();
		} else {
			setIsTestnet(false);
			localStorage.removeItem("isTestnet");
			window.location.reload();
		}
	};

	const menu = (
		<Menu>
			<Menu.Item key='1' className={cx("item-mainnet")} onClick={() => setNet("mainnet")}>
				Mainnet
			</Menu.Item>
			<Menu.Item key='2' className={cx("item-mainnet")} onClick={() => setNet("testnet")}>
				Testnet
			</Menu.Item>
		</Menu>
	);
	return (
		<div className={cx("search-area")}>
			<div className={cx("wrapper")}>
				<div className={cx("title")}>Oraichain Explorer</div>
				{config.hasTestnetNetwork && (
					<Dropdown overlay={menu} trigger={["click"]}>
						<Button className={cx("btn-mainnet")}>
							{isTestnet ? "Testnet" : "Mainnet"} <DownOutlined />
						</Button>
					</Dropdown>
				)}
				<div className={cx("search-wrapper")}>
					<SearchArea propCx={cx} dropdownStyle={{position: "fixed", zIndex: 15}} interactiveWidth={true} />
				</div>
			</div>
		</div>
	);
}
