import React, {useState} from "react";
import {useSelector} from "react-redux";
import classNames from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Router from "src/containers/Router/Router";
import {ThemeProvider} from "styled-components";
import {themes} from "src/constants/themes";
import Header from "src/containers/Header";
import Tabs from "src/containers/Tabs";
import Footer from "src/containers/Footer";
import Alert from "src/components/common/Alert/Alert";
import SearchArea from "src/components/Dashboard/SearchArea";
import {GlobalStyles} from "src/GlobalStyles";
import {ReactComponent as CloseIcon} from "src/assets/icons/close.svg";
import useGlobalApp from "./useGlobalApp";
import styles from "./App.scss";

const cx = classNames.bind(styles);

const useStyles = makeStyles({
	dialog: {
		position: "absolute",
		top: "40px",
	},
});

export default function() {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const {openPageBar} = useSelector(state => state.global);
	const activeThemeId = useSelector(state => state.activeThemeId);
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

	if (isLargeScreen) {
		searchArea = (
			<Container>
				<SearchArea />
			</Container>
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
