import React, {useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import {useDispatch, useSelector} from "react-redux";
import {Modal} from "@material-ui/core";
import copy from "copy-to-clipboard";

import {showAlert} from "src/store/modules/global";
import {formatOrai} from "src/helpers/helper";
import {useFetch} from "src/hooks";
import consts from "src/constants/consts";
import cn from "classnames/bind";
import styles from "./StatusBar.scss";

const cx = cn.bind(styles);

export default function() {
	const [balance, , , , setUrl] = useFetch();
	const {address} = useSelector(state => state.wallet);
	const [reFetchAmount, setReFetchAmount] = useState(0);
	const amount = balance?.data?.balances?.[0]?.amount ?? 0;
	// const amount = "15000750";
	const denom = balance?.data?.balances?.[0]?.denom ?? "ORAI";
	const [isZoom, setIsZoom] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		if (!address) return;
		setUrl(`${consts.LCD_API_BASE}${consts.LCD_API.BALANCES}/${address}?t=${Date.now()}`);
	}, [address, dispatch, reFetchAmount, setUrl]);

	const handleRefeshAccount = () => {
		setReFetchAmount(prev => prev + 1);
		dispatch(
			showAlert({
				show: true,
				message: "Refreshed",
				autoHideDuration: 1500,
			})
		);
	};

	return (
		<Grid container spacing={2} className={cx("StatusBar")}>
			<Grid item md={6} sm={12} xs={12}>
				<div className={cx("card")}>
					<div className={cx("title")}>Account Details</div>
					<div className={cx("address-title")}>
						Account Address{" "}
						<img
							onClick={() => {
								copy(address);
								dispatch(
									showAlert({
										show: true,
										message: "Copied",
										autoHideDuration: 1500,
									})
								);
							}}
							src={require("../../../assets/wallet/copy.svg")}
							style={{marginLeft: 7.5, cursor: "pointer"}}
						/>
					</div>
					<div className={cx("address")}>{address}</div>
					<a href={`https://scan.orai.io/account/${address}`} target='_blank' className={cx("footer")}>
						<img src={require("../../../assets/wallet/view.svg")} style={{marginRight: 5}} /> View on Oraiscan
					</a>
				</div>
			</Grid>
			<Grid item md={3} sm={6} xs={6}>
				<div className={cx("card")}>
					<div className={cx("title")}>Balance</div>
					<div className={cx("balance")}>
						{formatOrai(amount || 0)} <span className={cx("symbol")}>{denom}</span>
					</div>
					<div className={cx("footer")} onClick={handleRefeshAccount}>
						<img src={require("../../../assets/wallet/refresh.svg")} style={{marginRight: 5}} /> Refresh
					</div>
				</div>
			</Grid>
			<Grid item md={3} sm={6} xs={6}>
				<div
					className={cx("card")}
					style={{
						textAlign: "center",
					}}>
					<img
						src={require("../../../assets/wallet/qrcode.png")}
						style={{
							width: 96,
							height: 96,
						}}
					/>
					<div onClick={() => setIsZoom(true)} className={cx("footer")} style={{position: "unset", display: "flex", justifyContent: "center"}}>
						<img src={require("../../../assets/wallet/zoom.svg")} style={{marginRight: 5}} /> Zoom in
					</div>
				</div>
			</Grid>
			<Modal aria-labelledby='simple-modal-title' aria-describedby='simple-modal-description' open={isZoom} onClose={() => setIsZoom(false)}>
				<div
					style={{
						top: `50%`,
						left: `50%`,
						transform: `translate(-50%, -50%)`,
						position: "absolute",
						width: 300,
						backgroundColor: "white",
						border: "none",
					}}>
					<img
						src={require("../../../assets/wallet/qrcode.png")}
						style={{
							width: 300,
							height: 300,
						}}
					/>
				</div>
			</Modal>
		</Grid>
	);
}
