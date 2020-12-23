import React from "react";
import classNames from "classnames/bind";
import Router from "src/containers/Router/Router";
import Header from "src/containers/Header";
import SearchArea from "src/components/Dashboard/SearchArea";
import Tab from "src/containers/Tab";
import Footer from "src/containers/Footer";
import styles from "./App.scss";

const cx = classNames.bind(styles);

export default function() {
	return (
		<div className={cx("app")}>
			<Header />
			<SearchArea />
			<Tab />
			<Router />
			<Footer />
		</div>
	);
}
