import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import cn from "classnames/bind";
import consts from "src/constants/consts";
import styles from "./ShowExample.module.scss";
import TXTIcon from "src/icons/TXTIcon";

const cx = cn.bind(styles);

export default function ShowExample() {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const showExampleFile = () => {
		const url = `${consts.DOMAIN}example_orai.txt`;
		const newWindow = window.open(url, "_blank");
		if (newWindow) {
			newWindow.opener = null;
		}
	};

	return (
		<div className={cx("show-example")}>
			<Button aria-controls='show-example-menu' aria-haspopup='true' onClick={handleClick} className={cx("show-example-button")}>
				<span className={cx("show-example-button-text")}>Show Example</span>
				<ArrowDropDownIcon className={cx("show-example-button-icon")} />
			</Button>
			<Menu className={cx("show-example-menu")} id='show-example-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				<MenuItem
					className={cx("menu-item")}
					onClick={() => {
						showExampleFile();
						handleClose();
					}}>
					<TXTIcon className={cx("menu-item-icon")} /> <span className={cx("menu-item-text")}> TXT </span>
				</MenuItem>
			</Menu>
		</div>
	);
}
