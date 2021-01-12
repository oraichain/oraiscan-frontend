import React from "react";
import {useSelector, useDispatch} from "react-redux";
import classNames from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Router from "src/containers/Router/Router";
import Header from "src/containers/Header";
import SearchArea from "src/components/Dashboard/SearchArea";
import Tabs from "src/containers/Tabs";
import Footer from "src/containers/Footer";
import Alert from "src/components/common/Alert/Alert";
import styles from "./App.scss";

const cx = classNames.bind(styles);

export default function() {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const {openPageBar} = useSelector(state => state.global);
	return (
		<div className={cx("app")}>
			<Alert />
			<Header />
			{isLargeScreen && <SearchArea />}
			{(isLargeScreen || openPageBar) && <Tabs />}
			<Router />
			<Footer />
		</div>
	);
}
