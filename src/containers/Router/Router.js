import React, {lazy, Suspense} from "react";
import {Route, Switch} from "react-router-dom";
import cn from "classnames/bind";
import Loading from "src/components/common/Loading";
import {usePreload} from "src/hooks";
import ScrollToTop from "./ScrollToTop";
import styles from "./Router.scss";

const cx = cn.bind(styles);

const Dashboard = lazy(() => import(`src/containers/Dashboard`));
// const Validator = lazy(() => import(`src/containers/Validator`));
const ValidatorList = lazy(() => import(`src/containers/ValidatorList`));
const ValidatorDetails = lazy(() => import(`src/containers/ValidatorDetails`));
const AccountList = lazy(() => import(`src/containers/AccountList`));
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
const SmartContract = lazy(() => import(`src/containers/SmartContract`));

const Requests = lazy(() => import(`src/containers/Requests`));
const RequestReportDetail = lazy(() => import(`src/containers/RequestReportDetail`));
const RequestDetails = lazy(() => import(`src/containers/RequestDetails`));
const Wallet = lazy(() => import(`src/containers/Wallet`));
const PriceFeeds = lazy(() => import(`src/containers/PriceFeeds`));

export default function(props) {
	//  preload stuff that needs preloading
	usePreload();
	return (
		<main className={cx("routerContainer")}>
			<Suspense fallback={<Loading />}>
				<ScrollToTop />
				<Switch>
					<Route exact path='/' render={props => <Dashboard {...props} />} />
					<Route path='/validators/:validator' render={props => <ValidatorDetails {...props} />} />
					<Route path='/validators' render={props => <ValidatorList {...props} />} />
					<Route path='/blocks/:height' render={props => <Block {...props} />} />
					<Route path='/blocks' render={props => <BlockList {...props} />} />
					<Route path='/txs/:tx' render={props => <Tx {...props} />} />
					<Route path='/txs' render={props => <TxList {...props} />} />
					<Route path='/account/:account' render={props => <Account {...props} />} />
					<Route path='/accounts' component={AccountList} />
					<Route path='/data-sources/:detailId' component={DataSourcesDetail} />
					<Route path='/data-sources' component={DataSources} />
					<Route path='/test-cases' component={TestCases} />
					<Route path='/proposals/:id' component={ProposalsDetail} />
					<Route path='/proposals' component={Proposals} />
					<Route path='/ai_requests/:id/report' component={RequestReportDetail} />
					<Route path='/ai_requests/:id' component={RequestDetails} />
					<Route path='/ai_requests' component={Requests} />
					<Route path='/oracle-scripts/:id' component={OracleScriptDetail} />
					<Route path='/oracle-scripts' component={OracleScripts} />
					<Route path='/wallet' component={Wallet} />
					<Route path='/price-feeds' component={PriceFeeds} />
					<Route path='/smart-contract/:address' component={SmartContract} />
					<Route render={() => <NotFound />} />
				</Switch>
			</Suspense>
		</main>
	);
}
