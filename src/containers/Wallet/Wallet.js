/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import cn from "classnames/bind";
import Container from "@material-ui/core/Container";
import {useSelector} from "react-redux";
import {useGet} from "restful-react";
import {_} from "src/lib/scripts";
import consts from "src/constants/consts";
import PageTitle from "src/components/common/PageTitle";
import TitleWrapper from "src/components/common/TitleWrapper";
import StatusBar from "src/components/Wallet/StatusBar";
import Tabs from "src/components/Wallet/Tabs";
import Register, {RegisterDetail} from "src/components/Wallet/Register";
import DelegatedValidator from "src/components/Wallet/DelegatedValidator";
import Transaction from "src/components/Wallet/Transaction";
import Contact from "src/components/Wallet/Contact";
import YourDelelgator from "src/components/Wallet/YourDelegator";
import styles from "./Wallet.scss";

const cx = cn.bind(styles);

export default function(props) {
	const [activeTab, setActiveTab] = React.useState(0);
	const {address, account} = useSelector(state => state.wallet);
	const path = consts.API.VALIDATOR + "/" + address;
	const {data} = useGet({
		path: path,
	});
	const isBecomeValidator = !data ? false : data.operator_address ? true : false;

	React.useEffect(() => {
		console.log("data: ", isBecomeValidator);
	}, []);

	return (
		<Container fixed className={cx("wallet")}>
			<TitleWrapper>
				<PageTitle title={"Orai Wallet"} />
			</TitleWrapper>
			<StatusBar />
			<Tabs activeTab={activeTab} setActiveTab={setActiveTab} isBecomeValidator={isBecomeValidator} />
			{activeTab === 0 && <Transaction account={address} />}
			{activeTab === 1 && <Transaction account={address} royalty={true} />}
			{activeTab === 2 && <DelegatedValidator address={address} />}
			{/* {activeTab === 3 && !isBecomeValidator && <Register account={account} address={address} />} */}
			{activeTab === 3 && isBecomeValidator && <RegisterDetail address={address} validatorAddress={data?.operator_address} />}
			{activeTab === 4 && <Contact />}
		</Container>
	);
}
