// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import copy from "copy-to-clipboard";
import QRCodeReact from "qrcode.react";
import BigNumber from "bignumber.js";
import { useTheme } from "@material-ui/core/styles";
import cn from "classnames/bind";
import Skeleton from "@material-ui/lab/Skeleton";
import { showAlert } from "src/store/modules/global";
import { formatOrai } from "src/helpers/helper";
import consts from "src/constants/consts";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import QRCode from "src/components/common/QRCode";
import { ReactComponent as ExchangeIcon } from "src/assets/icons/exchange.svg";
import styles from "./StatusBar.scss";
import { useGet } from "restful-react";
import config from "src/config";
import { _, reduceStringAssets } from "src/lib/scripts";
const cx = cn.bind(styles);
export default function () {
	const theme = useTheme();
	const { address } = useSelector(state => state.wallet);
	const [path, setPath] = useState(`${consts.LCD_API_BASE}${consts.LCD_API.BALANCES}/${address}`);
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
	const buff = Buffer.from(JSON.stringify({ balance: { address } }));
	const buffBalance = buff.toString("base64");
	const [pathAiri, setPathAiri] = useState(`${config.LCD_API}${consts.LCD_API.WASM}/${config.AIRI_ADDR}/smart/${buffBalance}`);
	const [loadingComplete, setLoadingComplete] = useState(false);

	const { data, loading, refetch } = useGet({
		path: path,
	});

	const { data: balanceAiri, loading: loadingAiri } = useGet({
		path: pathAiri,
	});

	useEffect(() => {
		if (loading === false) setLoadingComplete(true);
	});
	const orai2usd = useSelector(state => state.blockchain.status?.price);
	const airi2usd = useSelector(state => state.blockchain.statusAiri?.price);
	const balance = data?.balances?.find(balance => balance.denom === "orai");
	const amount = balance?.amount ?? 0;
	const denom = balance?.denom ?? "ORAI";
	const [isZoom, setIsZoom] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		if (!address) return;
		setPath(`${consts.LCD_API_BASE}${consts.LCD_API.BALANCES}/${address}`);
		setPathAiri(`${config.LCD_API}${consts.LCD_API.WASM}/${config.AIRI_ADDR}/smart/${buffBalance}`);
	}, [address]);

	const handleRefeshAccount = () => {
		setLoadingComplete(false);
		refetch();
		dispatch(
			showAlert({
				show: true,
				message: "Refreshed",
				autoHideDuration: 1500,
			})
		);
	};

	const handleCloseModal = React.useCallback(() => setIsZoom(false), []);

	const formatUSD = (value, typeusd) => {
		return new BigNumber(value || 0)
			.dividedBy(1000000)
			.multipliedBy(typeusd || 0)
			.toFormat(2);
	};

	console.log();

	let balanceElement;
	let balanceAiriElement;
	if (!data) {
		balanceElement = (
			<div>
				<div className={cx("balance")}>
					<Skeleton className={cx("skeleton-inline")} variant='text' width={121} height={27} />
				</div>
				<div className={cx("orai2usd")}>
					<Skeleton className={cx("skeleton-inline")} variant='text' width={67} height={24} />
				</div>
			</div>
		);
		if (loadingComplete)
			balanceElement = (
				<div>
					<div className={cx("balance")}>-</div>
					<div className={cx("orai2usd")}>-</div>
				</div>
			);
	} else {
		balanceElement = (
			<div>
				<span className={cx("amount")}>{formatOrai(amount || 0) + "  "}</span>
				<span className={cx("symbol")}>{denom}</span>
				<div className={cx("orai2usd")}>
					<ExchangeIcon /> {formatUSD(amount, orai2usd)} USD
				</div>
			</div>
		);
	}

	if (!balanceAiri) {
		balanceAiriElement = (
			<div>
				<div className={cx("balance")}>
					<Skeleton className={cx("skeleton-inline")} variant='text' width={121} height={27} />
				</div>
				<div className={cx("orai2usd")}>
					<Skeleton className={cx("skeleton-inline")} variant='text' width={67} height={24} />
				</div>
			</div>
		);
		if (loadingAiri)
			balanceAiriElement = (
				<div>
					<div className={cx("balance")}>-</div>
					<div className={cx("orai2usd")}>-</div>
				</div>
			);
	} else {
		balanceAiriElement = (
			<div>
				<span className={cx("amount")}>{formatOrai(balanceAiri?.data?.balance || 0) + "  "}</span>
				<span className={cx("symbol")}>AIRI</span>
				{/* <div className={cx("orai2usd")}>
					<ExchangeIcon /> {formatUSD(balanceAiri?.data?.balance,airi2usd)} USD
				</div> */}
			</div>
		);
	}

	return (
		<Grid container spacing={2} className={cx("StatusBar")}>
			<Grid item md={3} sm={12} xs={12}>
				<div className={cx("card")}>
					<div className={cx("title")}>Account Details</div>
					<div className={cx("address-title")}>
						Account Address{" "}
						<img
							alt='/'
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
							style={{ marginLeft: 7.5, cursor: "pointer" }}
						/>
					</div>
					{address ? (
						<div className={cx("address")}>{isLargeScreen ? reduceStringAssets(address, 12, 10) : address}</div>
					) : (
						<Skeleton className={cx("skeleton-inline")} variant='text' width={380} height={24} />
					)}{" "}
					<a href={`https://scan.orai.io/account/${address}`} target='_blank' rel='noopener noreferrer' className={cx("footer")}>
						<img alt='/' src={require("../../../assets/wallet/view.svg")} style={{ marginRight: 5 }} /> View on Oraiscan
					</a>
				</div>
			</Grid>
			<Grid item md={3} sm={12} xs={12}>
				<div className={cx("card")}>
					<div className={cx("title")}>ORAI Balance</div>
					<div className={cx("balance")}>{balanceElement}</div>
					<div className={cx("footer")} onClick={handleRefeshAccount}>
						<img alt='/' src={require("../../../assets/wallet/refresh.svg")} style={{ marginRight: 5 }} /> Refresh
					</div>
				</div>
			</Grid>
			<Grid item md={3} sm={12} xs={12}>
				<div className={cx("card")}>
					<div className={cx("title")}>AIRI Balance</div>
					<div className={cx("balance")}>{balanceAiriElement}</div>
					<div className={cx("footer")} onClick={handleRefeshAccount}>
						<img alt='/' src={require("../../../assets/wallet/refresh.svg")} style={{ marginRight: 5 }} /> Refresh
					</div>
				</div>
			</Grid>
			<Grid item md={3} sm={12} xs={12}>
				<div
					className={cx("card")}
					style={{
						textAlign: "center",
					}}>
					{address ? (
						<QRCodeReact value={address} size={96} renderAs='svg' />
					) : (
						<Skeleton className={cx("skeleton-inline")} variant='rect' width={113} height={106} />
					)}
					<div onClick={() => setIsZoom(true)} className={cx("footer")} style={{ position: "unset", display: "flex", justifyContent: "center" }}>
						<img alt='/' src={require("../../../assets/wallet/zoom.svg")} style={{ marginRight: 5 }} /> Zoom in
					</div>
				</div>
			</Grid>
			<QRCode open={isZoom} onClose={handleCloseModal} address={address} />
		</Grid>
	);
}
