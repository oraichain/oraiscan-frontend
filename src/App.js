import React from "react";
import classNames from "classnames/bind";
import styles from "./App.scss";
//  components
import Router from "src/containers/Router/Router";
import Header from "src/containers/Header";
import SearchArea from "src/components/Dashboard/SearchArea";
import Tab from "src/containers/Tab";
import Footer from "src/containers/Footer";

//redux
//  import redux stuff

const cx = classNames.bind(styles);

export default function() {
	return (
		<div className={cx("App")}>
			<Header />
			<SearchArea />
			<Tab />
			<Router />
			<Footer />
		</div>
	);
}
