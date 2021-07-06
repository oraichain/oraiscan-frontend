/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import {Menu, Dropdown} from "antd";
import {DownOutlined} from "@ant-design/icons";
import cn from "classnames/bind";
import consts from "src/constants/consts";
import {ReactComponent as TxtIcon} from "src/assets/icons/txt-icons.svg";
import styles from "./ShowExample.scss";
import "./ShowExample.css";

const cx = cn.bind(styles);

const menu = () => {
	const showExampleFile = () => {
		const url = `${consts.DOMAIN}example_orai.txt`;
		const newWindow = window.open(url, "_blank");
		if (newWindow) {
			newWindow.opener = null;
		}
	};

	return (
		<Menu className={cx("show-example-dropdown")}>
			<Menu.Item className={cx("test!!!!!!!!!")}>
				<div className={cx("dropdown-item")} onClick={showExampleFile}>
					<TxtIcon /> <span> TXT </span>
				</div>
			</Menu.Item>
		</Menu>
	);
};

export default function() {
	return (
		<Dropdown overlay={menu} trigger={["click"]}>
			<a href='/' className='ant-dropdown-link' onClick={e => e.preventDefault()}>
				Show Example <DownOutlined />
			</a>
		</Dropdown>
	);
}
