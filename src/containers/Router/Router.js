import React, {lazy, Suspense} from "react";
import {Route, Switch} from "react-router-dom";
import cn from "classnames/bind";
import Loading from "src/components/common/Loading";
import {usePreload} from "src/hooks";
import ScrollToTop from "./ScrollToTop";
import styles from "./Router.module.scss";

const cx = cn.bind(styles);

const Dashboard = lazy(() => lazyRetry(() => import(/* webpackChunkName: "Dashboard" */ 'src/containers/Dashboard'), "Dashboard"));
const ValidatorList = lazy(() => lazyRetry(() => import(/* webpackChunkName: "ValidatorList" */ 'src/containers/ValidatorList'), 'ValidatorList'));
const ValidatorDetails = lazy(() => lazyRetry(() => import(/* webpackChunkName: "ValidatorDetails" */ 'src/containers/ValidatorDetails'), 'ValidatorDetails'));
const AccountList = lazy(() => lazyRetry(() => import(/* webpackChunkName: "AccountList" */ 'src/containers/AccountList'), 'AccountList'));
const Block = lazy(() => lazyRetry(() => import(/* webpackChunkName: "Block" */ 'src/containers/Block'), 'Block'));
const TxList = lazy(() => lazyRetry(() => import(/* webpackChunkName: "TxList" */ 'src/containers/TxList'), 'TxList'));
const Tx = lazy(() => lazyRetry(() => import(/* webpackChunkName: "Tx" */ 'src/containers/Tx'), 'Tx'));
const NotFound = lazy(() => lazyRetry(() => import(/* webpackChunkName: "NotFound" */ 'src/containers/NotFound'), 'NotFound'));
const Account = lazy(() => lazyRetry(() => import(/* webpackChunkName: "Account" */ 'src/containers/Account'), 'Account'));
const DataSources = lazy(() => lazyRetry(() => import(/* webpackChunkName: "DataSources" */ 'src/containers/DataSources'), 'DataSources'));
const DataSourcesDetail = lazy(() => lazyRetry(() => import(/* webpackChunkName: "DataSourcesDetail" */ 'src/containers/DataSourcesDetail'), 'DataSourcesDetail'));
const TestCases = lazy(() => lazyRetry(() => import(/* webpackChunkName: "TestCases" */ 'src/containers/TestCases'), 'TestCases'));
const OracleScriptDetail = lazy(() => lazyRetry(() => import(/* webpackChunkName: "OracleScriptDetail" */ 'src/containers/OracleScriptDetail'), 'OracleScriptDetail'));
const Proposals = lazy(() => lazyRetry(() => import(/* webpackChunkName: "Proposals" */ 'src/containers/Proposals'), 'Proposals'));
const ProposalsDetail = lazy(() => lazyRetry(() => import(/* webpackChunkName: "ProposalsDetail" */ 'src/containers/ProposalsDetail'), 'ProposalsDetail'));
const SmartContract = lazy(() => lazyRetry(() => import(/* webpackChunkName: "SmartContract" */ 'src/containers/SmartContract'), 'SmartContract'));
const SmartContracts = lazy(() => lazyRetry(() => import(/* webpackChunkName: "SmartContracts" */ 'src/containers/SmartContracts'), 'SmartContracts'));
const VerifiedContract = lazy(() => lazyRetry(() => import(/* webpackChunkName: "VerifiedContract" */ 'src/containers/VerifiedContract'), 'VerifiedContract'));
const VerifiedContracts = lazy(() => lazyRetry(() => import(/* webpackChunkName: "VerifiedContracts" */ 'src/containers/VerifiedContracts'), 'VerifiedContracts'));
const Requests = lazy(() => lazyRetry(() => import(/* webpackChunkName: "Requests" */ 'src/containers/Requests'), 'Requests'));
const RequestReportDetail = lazy(() => lazyRetry(() => import(/* webpackChunkName: "RequestReportDetail" */ 'src/containers/RequestReportDetail'), 'RequestReportDetail'));
const RequestDetails = lazy(() => lazyRetry(() => import(/* webpackChunkName: "RequestDetails" */ 'src/containers/RequestDetails'), 'RequestDetails'));
const Wallet = lazy(() => lazyRetry(() => import(/* webpackChunkName: "Wallet" */ 'src/containers/Wallet'), 'Wallet'));
const RandomnessDetail = lazy(() => lazyRetry(() => import(/* webpackChunkName: "RandomnessDetail" */ 'src/components/Randomness/RandomnessDetail'), 'RandomnessDetail'));
const OracleRequestDetail = lazy(() => lazyRetry(() => import(/* webpackChunkName: "OracleRequestDetail" */ 'src/containers/OracleRequestDetail'), 'OracleRequestDetail'));
const OracleReportDetail = lazy(() => lazyRetry(() => import(/* webpackChunkName: "OracleReportDetail" */ 'src/containers/OracleReportDetail'), 'OracleReportDetail'));
const ExportData = lazy(() => lazyRetry(() => import(/* webpackChunkName: "ExportData" */ 'src/containers/ExportData'), 'ExportData'));
const WasmCodeDetail = lazy(() => lazyRetry(() => import(/* webpackChunkName: "WasmCodeDetail" */ 'src/containers/WasmCode'), 'WasmCodeDetail'));
const BlockList = lazy(() => lazyRetry(() => import(/* webpackChunkName: "BlockListV2" */ 'src/containers/BlockListV2'), "BlockListV2"));
	
// a function to retry loading a chunk to avoid chunk load error for out of date code
const lazyRetry = function(componentImport, name) {
    return new Promise((resolve, reject) => {
        // check if the window has already been refreshed
        const hasRefreshed = JSON.parse(
            window.sessionStorage.getItem(`retry-${name}-refreshed`) || 'false'
        );

         // try to import the component
        componentImport().then((component) => {
			window.sessionStorage.setItem(`retry-${name}-refreshed`, 'false'); // success so reset the refresh
            resolve(component);
        }).catch((error) => {
            if (!hasRefreshed) { 
                window.sessionStorage.setItem(`retry-${name}-refreshed`, 'true'); // we are now going to refresh
                return window.location.reload(); // refresh the page
            }
            reject(error); 
        });
    });
};
 

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
					<Route path='/wallet' component={Wallet} />
					<Route path={`/randomness/:contract/:round`} component={RandomnessDetail} />
					<Route path='/smart-contracts' component={SmartContracts} />
					<Route path='/smart-contract/:address' component={SmartContract} />
					<Route path='/verified-contracts' component={VerifiedContracts} />
					<Route path='/verified-contract/:address' component={VerifiedContract} />
					<Route path='/ai-request/:contract/:id/report' component={OracleReportDetail} />
					<Route path='/ai-request/:contract/:id' component={OracleRequestDetail} />
					<Route path='/export-data/:account' component={ExportData} />
					<Route path='/wasm-code/:codeId' component={WasmCodeDetail} />
					<Route render={() => <NotFound />} />
				</Switch>
			</Suspense>
		</main>
	);
}
