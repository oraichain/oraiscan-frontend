import React from "react";
import {useSelector} from "react-redux";
import classNames from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import Countdown from "react-countdown";
import Router from "src/containers/Router/Router";
import Header from "src/containers/Header";
import SearchArea from "src/components/Dashboard/SearchArea";
import Tabs from "src/containers/Tabs";
import Footer from "src/containers/Footer";
import Alert from "src/components/common/Alert/Alert";
import styles from "./App.scss";
import CustomCountDown from "./CustomCountDown";

const cx = classNames.bind(styles);

export default function() {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const {openPageBar} = useSelector(state => state.global);

	const renderer = ({completed, ...rest}) => {
		if (completed) {
			return (
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
			);
		}

		return <CustomCountDown {...rest} />;
	};

	let releaseDate = Date.parse("2021-02-24T19:30:00.000+07:00");
	if (window.location.href.indexOf("staging") > -1 || window.location.href.indexOf("localhost") > -1) {
		releaseDate = Date.parse("2020-02-24T19:30:00.000+07:00");
	}
	// const releaseDate = Date.parse('2021-02-23T19:08:00.000+07:00');

	return <Countdown date={releaseDate} renderer={renderer} />;

	// return (
	// 	<div className={cx("app")}>
	// 		<Alert />
	// 		<Header />
	// 		{isLargeScreen && (
	// 			<Container>
	// 				<SearchArea />
	// 			</Container>
	// 		)}
	// 		{(isLargeScreen || openPageBar) && <Tabs />}
	// 		<Router />
	// 		<Footer />
	// 	</div>
	// );
}
