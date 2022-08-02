import React, {memo} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import cn from "classnames/bind";
import copy from "copy-to-clipboard";
import {showAlert} from "src/store/modules/global";
import {_} from "src/lib/scripts";
import copyIcon from "src/assets/common/copy_ic.svg";
import {Tooltip} from "@material-ui/core";
import styles from "./LinkRow.module.scss";
import "./LinkRow.css";

const cx = cn.bind(styles);

const LinkRow = memo(({id, href, showCopyIcon = true, size = "lg", name}) => {
	const dispatch = useDispatch();

	if (_.isNil(href) || _.isEmpty(href)) {
		return <>-</>;
	}

	return (
		<div className={cx("address")}>
			{name ? (
				<Tooltip title={`${name} (${id})`} arrow placement='top-start'>
					<NavLink className={cx(["address-link", "address-link-" + size])} to={href}>
						{id}
					</NavLink>
				</Tooltip>
			) : (
				<NavLink className={cx(["address-link", "address-link-" + size])} to={href}>
					{id}
				</NavLink>
			)}
			{showCopyIcon && (
				<img
					src={copyIcon}
					alt=''
					className={cx("address-copy")}
					onClick={() => {
						copy(id);
						dispatch(
							showAlert({
								show: true,
								message: "Copied",
								autoHideDuration: 1500,
							})
						);
					}}
				/>
			)}
		</div>
	);
});

export default LinkRow;
