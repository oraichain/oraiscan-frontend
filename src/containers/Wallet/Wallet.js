/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import cn from "classnames/bind";
import Skeleton from "react-skeleton-loader";
import Container from "@material-ui/core/Container";
import {useDispatch, useSelector} from "react-redux";

import {_, empty} from "src/lib/scripts";
import consts from "src/constants/consts";
import {useFetch, usePrevious} from "src/hooks";
import PageTitle from "src/components/common/PageTitle";
import NotFound from "src/components/common/NotFound";
import TitleWrapper from "src/components/common/TitleWrapper";
import StatusBar from "src/components/Wallet/StatusBar";
import Tabs from "src/components/Wallet/Tabs";
import Register, {RegisterDetail} from "src/components/Wallet/Register";
import DelegatedValidator from "src/components/Wallet/DelegatedValidator";
import Transaction from "src/components/Wallet/Transaction";
import YourDelelgator from "src/components/Wallet/YourDelegator";
import styles from "./Wallet.scss";

const cx = cn.bind(styles);

export default function(props) {
	const [activeTab, setActiveTab] = React.useState(0);
	const {address, account} = useSelector(state => state.wallet);
	const isBecomeValidator = false;
	return (
		<Container fixed className={cx("wallet")}>
			<TitleWrapper>
				<PageTitle title={"Orai Wallet"} />
			</TitleWrapper>
			<StatusBar />
			<Tabs activeTab={activeTab} setActiveTab={setActiveTab} isBecomeValidator={isBecomeValidator} />
			{activeTab === 0 && <Transaction account={address} />}
			{activeTab === 1 && <YourDelelgator />}
			{activeTab === 2 && <DelegatedValidator address={address} />}
			{activeTab === 3 && !isBecomeValidator && <Register account={account} address={address} />}
			{activeTab === 3 && isBecomeValidator && <RegisterDetail account={account} address={address} />}
		</Container>
	);
}
