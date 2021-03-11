import React from "react";
import cn from "classnames/bind";
import {Modal} from "@material-ui/core";
import {CloseOutlined} from "@ant-design/icons";
import {Divider} from "antd";
import QRCode from "qrcode.react";

import listNone from "src/assets/misc/noitem_ic.svg";
import styles from "./QRCode.scss";

const cx = cn.bind(styles);

export default function({address, open, onClose}) {
	return (
		<Modal aria-labelledby='simple-modal-title' aria-describedby='simple-modal-description' open={open} onClose={onClose}>
			<div className={cx("qrcode")}>
				<div className={cx("title")}>
					<div> {address} </div>
					<div onClick={onClose} className={cx("close")}>
						<CloseOutlined />
					</div>
				</div>
				<Divider className={cx("divider")} />
				<div className={cx("img-wrap")}>
					<QRCode value={address} size={350} renderAs='svg' />
				</div>
			</div>
		</Modal>
	);
}
