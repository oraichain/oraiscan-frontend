/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import {Menu, Dropdown} from "antd";
import {DownOutlined} from "@ant-design/icons";

import "./ShowExample.css";

const menu = (
	<Menu>
		<Menu.Item>
			<a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
				1st menu item
			</a>
		</Menu.Item>
		<Menu.Item icon={<DownOutlined />} disabled>
			<a target='_blank' rel='noopener noreferrer' href='https://www.aliyun.com'>
				2nd menu item
			</a>
		</Menu.Item>
		<Menu.Item disabled>
			<a target='_blank' rel='noopener noreferrer' href='https://www.luohanacademy.com'>
				3rd menu item
			</a>
		</Menu.Item>
		<Menu.Item danger>a danger item</Menu.Item>
	</Menu>
);

export default function() {
	return (
		<Dropdown overlay={menu} trigger='click'>
			<a href='/' className='ant-dropdown-link' onClick={e => e.preventDefault()}>
				Hover me <DownOutlined />
			</a>
		</Dropdown>
	);
}
