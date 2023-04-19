import React, { memo, useState, useRef } from "react";
import { useGet } from "restful-react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import CodeContract from '../CodeVerifiedContract';
import WriteContract from '../WriteContract';
import ReadContract from '../ReadContract';
import Tabs from "src/components/VerifiedContract/Tabs";
import styles from "./ContractCard.module.scss";

const cx = classNames.bind(styles);

const ContractCard = memo(({ address = "", data }) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [activeTab, setActiveTab] = useState(0);
	const placeholder = !activeTab ? "Search Source Code" : "Filter Address / Txn Hash / Token";
	let codeSection = <CodeContract data={data} />;
	let readContractSection = <ReadContract data={data} />;
	let WriteContractSection = <WriteContract data={data} />;

	return (
		<div className={cx("contract-card")}>
			<div className={cx("contract-card-header")}>
				<Tabs activeTab={activeTab} setActiveTab={setActiveTab} address={address} placeholder={placeholder} keyword={undefined} setKeyword={undefined} />
			</div>
			<div className={cx("contract-card-body")}>
				{activeTab === 0 && codeSection}
				{activeTab === 1 && readContractSection}
				{activeTab === 2 && WriteContractSection}
			</div>
		</div>
	);
});

export default ContractCard;
