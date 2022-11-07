import React, {memo, useState} from "react";
import {isNil} from "lodash";
import classNames from "classnames/bind";
import Grid from "@material-ui/core/Grid";
import {Dialog} from "@material-ui/core";
import PriceDisplay from "../DashboardContent/PriceDisplay";
import GraphDisplay from "../DashboardContent/GraphDisplay";
import DetailDisplay from "../DashboardContent/DetailDisplay";
import {ReactComponent as CloseIcon} from "src/assets/icons/close.svg";
import styles from "./PopupDashboard.module.scss";

const cx = classNames.bind(styles);

const PopupDashboard = memo(({}) => {
	const [openDialog, setOpenDialog] = useState(true);
	const popupOpened = localStorage.getItem("popupOpened");

	const closeDialog = () => {
		localStorage.setItem("popupOpened", "true");
		setOpenDialog(false);
	};

	return (
		<div>
			<Dialog
				className={cx("popup-dashboard")}
				onClose={closeDialog}
				aria-labelledby='delegate-dialog'
				open={!isNil(popupOpened) || popupOpened === "true" ? false : openDialog}
				maxWidth='sm'
				fullWidth={true}>
				<div className={cx("close-button")} onClick={closeDialog}>
					<CloseIcon />
				</div>
				<div className={cx("text")}>
					To increase the security experience, please use Keplr extension to continue. <br /> Coming soon with OWallet extension.
				</div>
			</Dialog>
		</div>
	);
});

export default PopupDashboard;
