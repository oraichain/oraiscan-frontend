import React, { memo, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./CodeContract.module.scss";
import RegularFileIcon from "src/icons/RegularFileIcon";
import _ from "lodash";
import copy from "copy-to-clipboard";
import { showAlert } from "src/store/modules/global";
import { useDispatch, useSelector } from "react-redux";
import { ItemCodeContract, ItemContract } from "../ComponentContract";
import { processMsgInput } from "src/helpers/contract";
import { network } from "src/lib/config/networks";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

const cx = classNames.bind(styles);

const CodeContract = memo(({ data }) => {
	// const selectDropdownCode = useRef(null);
	// const selectDropdownMore = useRef(null);

	// const refDropdownCode = useRef(null);
	// const refDropdownMore = useRef(null);

	// const [valueCode, setValueCode] = React.useState('Code');
	// const [valueMore, setValueMore] = React.useState('More Option');
	// @ts-ignore
	const activeThemeId = useSelector(state => state.activeThemeId);
	const dispatch = useDispatch();
	const href = `https://github.com/${data?.github_org}/${data?.github_repo}/commit/${data?.github_commit}`;
	const onClickCopy = (msg, typeCopy) => {
		copy(typeCopy ? msg : JSON.stringify(msg));
		dispatch(
			showAlert({
				show: true,
				message: "Copied",
				autoHideDuration: 1500,
			})
		);
	};

	const onQuery = async msg => {
		try {
			const input = await processMsgInput(msg);
			const wallet = await window.keplr.getOfflineSignerAuto(network.chainId);

			const client = await SigningCosmWasmClient.connectWithSigner(network.rpc, wallet, {
				prefix: network.prefix,
			});

			const ret = await client.queryContractSmart(data.contract_address, input);
			alert(JSON.stringify(ret));
		} catch (ex) {
			alert(ex.message);
		}
	};

	const onExecute = async msg => {
		try {
			const input = await processMsgInput(msg);
			const wallet = await window.keplr.getOfflineSignerAuto(network.chainId);
			const accounts = await wallet.getAccounts();
			const client = await SigningCosmWasmClient.connectWithSigner(network.rpc, wallet, {
				prefix: network.prefix,
				gasPrice: "0.001orai",
			});

			const ret = await client.execute(accounts[0].address, data.contract_address, input, "auto");
			alert(JSON.stringify(ret));
		} catch (ex) {
			alert(ex.message);
		}
	};

	return (
		<div>
			<ItemCodeContract contractName={data?.contract_name} compilerVersion={data?.compiler_version} contractVerification={data?.contract_verification} />
			<div>Link Source Code:</div>
			<div className={cx("source-code")}>
				<div className={cx("source-code-link")}>
					<span>{href}</span>
				</div>
				<div
					className={cx("source-code-btn")}
					onClick={() => {
						onClickCopy(href, true);
					}}>
					Copy
				</div>
			</div>
			<div className={cx("flex")}>
				<RegularFileIcon /> <span style={{ width: 4 }} />
				Contract Source Code
			</div>
			{/* <div className={cx("flex")}>
				<DropDownContract refDrop={refDropdownCode} refSelect={selectDropdownCode} value={valueCode} setValue={setValueCode} arrayList={[1, 2, 3]} />
				<DropDownContract refDrop={refDropdownMore} refSelect={selectDropdownMore} value={valueMore} setValue={setValueMore} arrayList={[1, 2, 3]} />
			</div> */}
			{/* <ItemContract activeThemeId={activeThemeId} label="File 1 of 3: execute msg.ison" onClickCopy={onClickCopy} msg={data?.data?.execute_msg_schema} /> */}
			{/* <ItemContract activeThemeId={activeThemeId} label="File 2 of 3: instantiate msg.json" onClickCopy={onClickCopy} msg={data?.data?.instantiate_msg_schema} />
			<ItemContract activeThemeId={activeThemeId} label="File 3 of 3: query msg.json" onClickCopy={onClickCopy} msg={data?.data?.query_msg_schema} /> */}
			<ItemContract activeThemeId={activeThemeId} label=' schema' onQuery={onQuery} onExecute={onExecute} onClickCopy={onClickCopy} msg={data?.schema} />
		</div>
	);
});

export default CodeContract;
