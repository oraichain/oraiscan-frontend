import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import * as yup from "yup";
import _ from "lodash";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Router from "src/containers/Router/Router";
import { ThemeProvider } from "styled-components";
import { themes } from "src/constants/themes";
import Header from "src/containers/Header";
import Tabs from "src/containers/Tabs";
import Footer from "src/containers/Footer";
import Alert from "src/components/common/Alert/Alert";
import SearchArea from "src/components/Dashboard/SearchArea";
import { GlobalStyles } from "src/GlobalStyles";
import { ReactComponent as CloseIcon } from "src/assets/icons/close.svg";
import DarkModeTopBackground from "src/assets/common/dark_mode_top_background.png";
import useGlobalApp from "./useGlobalApp";
import { updateToken, onMessageListener } from "src/firebase-cloud-message";
import { showAlert } from "src/store/modules/global";
import { isMobile } from "react-device-detect";
import styles from "./App.scss";
import { ThemeSetup } from "./helpers/helper";
import { embedChainInfos } from "src/lib/config/chainInfos";
import Keplr from "src/lib/keplr";
import { initWallet } from "src/store/modules/wallet";
import WalletStation from "./lib/walletStation";
import { network } from "./lib/config/networks";
import { notification } from "antd";
import consts from 'src/constants/consts';

import Under from 'src/assets/assets/undermaintenance.jpeg';

const cx = classNames.bind(styles);

const useStyles = makeStyles({
	dialog: {
		position: "absolute",
		top: "40px",
	},
});

yup.addMethod(yup.string, "isNumeric", function (message) {
	return this.test({
		name: "isNumeric",
		exclusive: false,
		message: _.isNil(message) ? "Value must be a number." : message,
		test(value) {
			return !isNaN(value);
		},
	});
});

export default function () {
	const dispatch = useDispatch();

	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const { isDarkTheme } = ThemeSetup();
	const { openPageBar } = useSelector(state => state.global);
	const activeThemeId = useSelector(state => state.activeThemeId);
	const { address } = useSelector(state => state.wallet);
	const [isSearchAreaVisible, setIsSearchAreaVisible] = useState(false);
	const m = useGlobalApp();
	const classes = useStyles();

	const toggleSearchArea = () => {
		setIsSearchAreaVisible(!isSearchAreaVisible);
	};

	const hideSearchArea = () => {
		setIsSearchAreaVisible(false);
	};

	let searchArea;
	let tabs;

	useEffect(() => {
		if (!isMobile) {
			updateToken(address);
		}
	}, []);

	useEffect(() => {
		keplrHandler();
		window.addEventListener("keplr_keystorechange", keplrHandler);
		return () => {
			window.removeEventListener("keplr_keystorechange", keplrHandler);
		};
	}, []);

	const keplrHandler = async () => {
		try {
			console.log("Key store in Keplr is changed. You may need to refetch the account info.");
			await window.Keplr.suggestChain(network.chainId);
			await updateAddress();
			// window.location.reload();
		} catch (error) {
			notification.error({ message: error });
			dispatch(initWallet({}));
		}
	};

	const updateAddress = async () => {
		// automatically update. If user is also using Oraichain wallet => dont update
		try {
			const keplr = await window.Keplr.getKeplr();
			if (!keplr) throw consts.INSTALL_KEPLR_FIRST;
			const key = await window.Keplr.getKeplrKey();

			if (key?.bech32Address) {
				// if (newAddress === address) {
				// 	dispatch(initWallet({}));
				// }
				dispatch(initWallet({ address: key?.bech32Address, name: key?.name, pubKey: Buffer.from(key?.pubKey).toString("base64") }));
			}
		} catch (error) {
			notification.error({ message: error });
			dispatch(initWallet({}));
		}
	};

	const toastifyMsg = payload => {
		return (
			<>
				<p>{payload.notification.title}</p>
				<p>{payload.notification.body}</p>
			</>
		);
	};

	onMessageListener()
		.then(payload => {
			// console.log(payload);
			dispatch(
				showAlert({
					show: true,
					message: toastifyMsg(payload),
					autoHideDuration: 3000,
				})
			);
		})
		.catch(err => console.log("failed: ", err));

	if (isLargeScreen) {
		searchArea = (
			<>
				{isDarkTheme && <img className={cx("top-background")} src={DarkModeTopBackground} />}
				<Container>
					<SearchArea />
				</Container>
			</>
		);
	} else {
		searchArea = (
			<Dialog
				open={isSearchAreaVisible}
				onClose={hideSearchArea}
				aria-labelledby='dialog'
				classes={{
					paper: classes.dialog,
				}}
				fullWidth={true}
				maxWidth='lg'>
				<DialogTitle className={cx("dialog-title")} onClick={hideSearchArea}>
					<CloseIcon />
				</DialogTitle>
				<DialogContent>
					<SearchArea />
				</DialogContent>
			</Dialog>
		);
	}

	if (isLargeScreen || openPageBar) {
		tabs = <Tabs />;
	} else {
		tabs = <></>;
	}

	return (
		<ThemeProvider theme={themes.byIds[activeThemeId]}>
			<GlobalStyles />
			<div className={cx("app")}>
				<Alert />
				<Header toggleSearchArea={toggleSearchArea} />
				{searchArea}
				{tabs}
				<Router />
				<Footer />
			</div>
			{/* <div style={{ textAlign: 'center' }}>
				<img src={Under} />
				<div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
					<span>To prepare for v0.41.0 Upgrade, services on Oraichain network will be temporarily suspended until our next official announcement.</span>
					<p>Time (estimated): From 2022-11-20 23:59 to 2022-11-21 09:00 (UTC)</p>
				</div>
			</div> */}
		</ThemeProvider>
	);
}
