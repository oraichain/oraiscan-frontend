import * as React from "react";
import cn from "classnames/bind";
import {Menu, Dropdown, Button} from "antd";
import {DownOutlined} from "@ant-design/icons";
import config from "src/config";
import SearchBox from "src/components/common/SearchBox";
import styles from "./SearchArea.scss";
import {Grid} from "@material-ui/core";

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
		<Menu className={cx("menu")}>
			<Menu.Item key='1' className={cx("menu-item")} onClick={() => setNet("mainnet")}>
				Mainnet
			</Menu.Item>
			<Menu.Item key='2' className={cx("menu-item")} onClick={() => setNet("testnet")}>
				Testnet
			</Menu.Item>
		</Menu>
	);

	return (
		<div className={cx("search-area")}>
			<Grid container spacing={2} alignItems='center'>
				<Grid item lg={4} xs={12}>
					<div className={cx("title")}>Oraichain Explorer</div>
				</Grid>
				<Grid item lg={2} xs={12}>
					{config.hasTestnetNetwork && (
						<Dropdown overlay={menu} trigger={["click"]}>
							<Button className={cx("button")}>
								{isTestnet ? "Testnet" : "Mainnet"} <DownOutlined />
							</Button>
						</Dropdown>
					)}
				</Grid>
				<Grid item lg={6} xs={12}>
					<SearchBox interactiveWidth={true} />
				</Grid>
			</Grid>
		</div>
	);
}
