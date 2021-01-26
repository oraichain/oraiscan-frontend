import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import ReactGA from "react-ga";

export default function ScrollToTop() {
	const {pathname} = useLocation();

	useEffect(() => {
		ReactGA.pageview(window.location.pathname + window.location.search);
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}
