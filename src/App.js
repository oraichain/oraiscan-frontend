import React from "react";
import classNames from "classnames/bind";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {useSelector, useDispatch} from "react-redux";

import Router from "src/containers/Router/Router";
import Header from "src/containers/Header";
import SearchArea from "src/components/Dashboard/SearchArea";
import Tabs from "src/containers/Tabs";
import Footer from "src/containers/Footer";
import Alert from "src/components/common/Alert/Alert";
import styles from "./App.scss";

const cx = classNames.bind(styles);

export default function() {
	const isDesktop = useMediaQuery("(min-width:500px)");
	const {openPageBar} = useSelector(state => state.global);
	return (
		<div className={cx("app")}>
			<Alert />
			<Header />
			{isDesktop && <SearchArea />}
			{(isDesktop || openPageBar) && <Tabs />}
			<Router />
			<Footer />
		</div>
	);
}
