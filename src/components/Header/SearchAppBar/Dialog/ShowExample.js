/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import {Menu, Dropdown} from "antd";
import {DownOutlined} from "@ant-design/icons";
import cn from "classnames/bind";
import {ReactComponent as TxtIcon} from "src/assets/icons/txt-icons.svg";
import styles from "./ShowExample.scss";
import "./ShowExample.css";

const cx = cn.bind(styles);

const menu = (
	<Menu className={cx("show-example-dropdown")}>
		<Menu.Item>
			<div className={cx("dropdown-item")}>
				<TxtIcon /> <span> TXT </span>
			</div>
		</Menu.Item>
	</Menu>
);

export default function() {
	return (
		<Dropdown overlay={menu} trigger='click'>
			<a href='/' className='ant-dropdown-link' onClick={e => e.preventDefault()}>
				Show Example <DownOutlined />
			</a>
		</Dropdown>
	);
}
