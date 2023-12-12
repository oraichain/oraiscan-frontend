import React, { memo, useEffect, useMemo, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ReadContract.module.scss";
import HeaderContract from "../HeaderContract";
import copy from "copy-to-clipboard";
import { showAlert } from "src/store/modules/global";
import { useDispatch, useSelector } from "react-redux";
import { HandleItemContract } from "../ComponentContract";
import { onQuery } from "../ContractInteraction";

const cx = classNames.bind(styles);

const ReadContract = memo(({ data }) => {
	const [activeTab, setActiveTab] = useState(false);
	const dispatch = useDispatch();
	const activeThemeId = useSelector(state => state.activeThemeId);
	const onClickCopy = msg => {
		copy(JSON.stringify(msg));
		dispatch(
			showAlert({
				show: true,
				message: "Copied",
				autoHideDuration: 1500,
			})
		);
	};
	return (
		<div className={cx("read-contract")}>
			<HeaderContract icon={<></>} label={"Read Contract Infomation"} activeTab={activeTab} setActiveTab={setActiveTab} />
			<div style={{ height: 16 }} />
			<HandleItemContract
				activeThemeId={activeThemeId}
				handleText='Query'
				setActiveTab={setActiveTab}
				activeTab={activeTab}
				onClickCopy={onClickCopy}
				contractAddress={data?.contract_address}
				schema={data?.schema?.query}
				onHandle={onQuery}
			/>
		</div>
	);
});

export default ReadContract;
