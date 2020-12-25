import React, {lazy, Suspense} from "react";
import {Route, Switch} from "react-router-dom";
import ReactGA from "react-ga";
import cn from "classnames/bind";
import Loading from "src/components/common/Loading";
import {useHistory, usePreload} from "src/hooks";
import styles from "./Router.scss";

const cx = cn.bind(styles);

const Dashboard = lazy(() => import(`src/containers/Dashboard`));
const Validator = lazy(() => import(`src/containers/Validator`));
const ValidatorList = lazy(() => import(`src/containers/ValidatorList`));
const Block = lazy(() => import(`src/containers/Block`));
const BlockList = lazy(() => import(`src/containers/BlockList`));
const TxList = lazy(() => import(`src/containers/TxList`));
const Tx = lazy(() => import(`src/containers/Tx`));
const NotFound = lazy(() => import(`src/containers/NotFound`));
const Account = lazy(() => import(`src/containers/Account`));
const DataSources = lazy(() => import(`src/containers/DataSources`));
const DataSourcesDetail = lazy(() => import(`src/containers/DataSourcesDetail`));
const TestCases = lazy(() => import(`src/containers/TestCases`));
const OracleScripts = lazy(() => import(`src/containers/OracleScripts`));
const OracleScriptDetail = lazy(() => import(`src/containers/OracleScriptDetail`));
const Proposals = lazy(() => import(`src/containers/Proposals`));
const ProposalsDetail = lazy(() => import(`src/containers/ProposalsDetail`));

const Requests = lazy(() => import(`src/containers/Requests`));
const RequestsDetail = lazy(() => import(`src/containers/RequestsDetail`));

export default function(props) {
	//  preload stuff that needs preloading
	usePreload();
	return (
		<main className={cx("routerContainer")}>
			<Suspense fallback={<Loading />}>
				<ScrollToTop>
					<Switch>
						<Route exact path='/' render={props => <Dashboard {...props} />} />
						{/* <Route path='/validators/:validator' render={props => <Block {...props} />} /> */}
						<Route path='/validators' render={props => <ValidatorList {...props} />} />
						<Route path='/blocks/:height' render={props => <Block {...props} />} />
						<Route path='/blocks' render={props => <BlockList {...props} />} />
						<Route path='/txs/:tx' render={props => <Tx {...props} />} />
						<Route path='/txs' render={props => <TxList {...props} />} />
						<Route path='/account/:account' render={props => <Account {...props} />} />
						<Route path='/data-sources/:detailId' component={DataSourcesDetail} />
						<Route path='/data-sources' component={DataSources} />
						<Route path='/test-cases' component={TestCases} />
						<Route path='/proposals/:id' component={ProposalsDetail} />
						<Route path='/proposals' component={Proposals} />
						<Route path='/requests/:id' component={RequestsDetail} />
						<Route path='/requests' component={Requests} />
						<Route path='/oracle-scripts/:id' component={OracleScriptDetail} />
						<Route path='/oracle-scripts' component={OracleScripts} />
						<Route render={() => <NotFound />} />
					</Switch>
				</ScrollToTop>
			</Suspense>
		</main>
	);
}

const ScrollToTop = props => {
	const history = useHistory();
	React.useEffect(() => {
		ReactGA.pageview(window.location.pathname + window.location.search);
		window.scrollTo(0, 0);
	}, [history.location.pathname]);
	return <>{props.children}</>;
};
