import React from "react";
import {useSelector} from "react-redux";
import classNames from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import Router from "src/containers/Router/Router";
import {ThemeProvider} from "styled-components";
import {themes} from "src/constants/themes";
import Header from "src/containers/Header";
import Tabs from "src/containers/Tabs";
import Footer from "src/containers/Footer";
import Alert from "src/components/common/Alert/Alert";
import SearchArea from "src/components/Dashboard/SearchArea";
import {GlobalStyles} from "src/GlobalStyles";
import styles from "./App.scss";

const cx = classNames.bind(styles);

export default function() {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const {openPageBar} = useSelector(state => state.global);
	const activeThemeId = useSelector(state => state.activeThemeId);

	return (
		<ThemeProvider theme={themes.byIds[activeThemeId]}>
			<GlobalStyles />
			<div className={cx("app")}>
				<Alert />
				<Header />
				{isLargeScreen && (
					<Container>
						<SearchArea />
					</Container>
				)}
				{(isLargeScreen || openPageBar) && <Tabs />}
				<Router />
				<Footer />
			</div>
		</ThemeProvider>
	);
}
