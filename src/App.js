import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {makeStyles, useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {notification} from "antd";
import classNames from "classnames/bind";
import _ from "lodash";
import {useEffect, useState} from "react";
import {isMobile} from "react-device-detect";
import {useDispatch, useSelector} from "react-redux";
import DarkModeTopBackground from "src/assets/common/dark_mode_top_background.png";
import {ReactComponent as CloseIcon} from "src/assets/icons/close.svg";
import Alert from "src/components/common/Alert/Alert";
import SearchArea from "src/components/Dashboard/SearchArea";
import consts from 'src/constants/consts';
import {themes} from "src/constants/themes";
import Footer from "src/containers/Footer";
import Header from "src/containers/Header";
import Router from "src/containers/Router/Router";
import Tabs from "src/containers/Tabs";
import {onMessageListener, updateToken} from "src/firebase-cloud-message";
import {GlobalStyles} from "src/GlobalStyles";
import {showAlert} from "src/store/modules/global";
import {ThemeProvider} from "styled-components";
import * as yup from "yup";
import styles from "./App.scss";
import {ThemeSetup} from "./helpers/helper";
import useGlobalApp from "./useGlobalApp";

import * as Sentry from '@sentry/react';
import {BrowserTracing} from '@sentry/tracing';
import { network } from "./lib/config/networks";
import { initWallet } from "./store/modules/wallet";

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

	if (process.env.REACT_APP_SENTRY_ENVIRONMENT === 'production') {
		Sentry.init({
			environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
			dsn: 'https://6c7dc9a65b774e5d90f1ff8fcfd95171@o1323226.ingest.sentry.io/4504630913269760',
			integrations: [new BrowserTracing()],
			denyUrls: [
				/extensions\//i,
				/extension/i,
				/vendor/i,
				/^chrome:\/\//i,
				/^chrome-extension:\/\//i,
				/^moz-extension:\/\//i
			],
			ignoreErrors: ['Request rejected', 'Failed to fetch', 'Load failed', 'Request aborted'],
			// Set tracesSampleRate to 1.0 to capture 100%
			// of transactions for performance monitoring.
			// We recommend adjusting this value in production
			tracesSampleRate: 0.5,
		});
	}

	const keplrHandler = async () => {
		try {
			console.log("Key store in Keplr is changed. You may need to refetch the account info.");
			await window.Keplr.suggestChain(network.chainId);
			await updateAddress();
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
		</ThemeProvider>
	);
}
