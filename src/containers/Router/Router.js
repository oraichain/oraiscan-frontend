import React, {lazy, Suspense} from "react";
import {Route, Switch} from "react-router-dom";
import cn from "classnames/bind";
import Loading from "src/components/common/Loading";
import {usePreload} from "src/hooks";
import ScrollToTop from "./ScrollToTop";
import config from "src/config.js";
import styles from "./Router.module.scss";

const cx = cn.bind(styles);
const contract = config.randomnessContractAddress;

const Dashboard = lazy(() => import(`src/containers/Dashboard`));
const ValidatorList = lazy(() => import(`src/containers/ValidatorList`));
const ValidatorDetails = lazy(() => import(`src/containers/ValidatorDetails`));
const AccountList = lazy(() => import(`src/containers/AccountList`));
const Block = lazy(() => import(`src/containers/Block`));
// const BlockList = lazy(() => import(`src/containers/BlockList`));
const BlockList = lazy(() => import(`src/containers/BlockListV2`));
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
const SmartContracts = lazy(() => import(`src/containers/SmartContracts`));
const VerifiedContract = lazy(() => import(`src/containers/VerifiedContract`));
const VerifiedContracts = lazy(() => import(`src/containers/VerifiedContracts`));
const Requests = lazy(() => import(`src/containers/Requests`));
const RequestReportDetail = lazy(() => import(`src/containers/RequestReportDetail`));
const RequestDetails = lazy(() => import(`src/containers/RequestDetails`));
const Wallet = lazy(() => import(`src/containers/Wallet`));
const Randomness = lazy(() => import(`src/components/Randomness`));
const RandomnessDetail = lazy(() => import(`src/components/Randomness/RandomnessDetail`));
const OracleRequestDetail = lazy(() => import(`src/containers/OracleRequestDetail`));
const OracleReportDetail = lazy(() => import(`src/containers/OracleReportDetail`));
const ExportData = lazy(() => import(`src/containers/ExportData`));
const WasmCodeDetail = lazy(() => import(`src/containers/WasmCode`));
const DelegatedValidator = lazy(() => import(`src/components/DelegatedValidator/DelegatedValidator`));

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
					<Route path='/delegated-validator' component={DelegatedValidator}/>
					<Route render={() => <NotFound />} />
				</Switch>
			</Suspense>
		</main>
	);
}
