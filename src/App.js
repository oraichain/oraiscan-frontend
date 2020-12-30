import React from "react";
import classNames from "classnames/bind";
import Router from "src/containers/Router/Router";
import Header from "src/containers/Header";
import SearchArea from "src/components/Dashboard/SearchArea";
import Tabs from "src/containers/Tabs";
import Footer from "src/containers/Footer";
import Alert from "src/components/common/Alert/Alert";
import styles from "./App.scss";

const cx = classNames.bind(styles);

export default function() {
	return (
		<div className={cx("app")}>
			<Alert />
			<Header />
			<SearchArea />
			<Tabs />
			<Router />
			<Footer />
		</div>
	);
}
