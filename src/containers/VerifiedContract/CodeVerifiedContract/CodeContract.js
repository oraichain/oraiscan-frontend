import React, { memo, useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./CodeContract.module.scss";
import RegularFileIcon from "src/icons/RegularFileIcon";
import _ from "lodash";
import copy from "copy-to-clipboard";
import { showAlert } from "src/store/modules/global";
import { useDispatch, useSelector } from "react-redux";
import { ItemCodeContract, ItemContract } from "../ComponentContract";
const cx = classNames.bind(styles);
const CodeContract = memo(({ data }) => {
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

	return (
		<div>
			<ItemCodeContract contractName={data?.contract_name} compilerVersion={data?.compiler_version} contractVerification={data?.contract_verification} />
			<div>Link Source Code:</div>
			<div className={cx("source-code")}>
				<div className={cx("source-code-link")}>
					<span style={{ cursor: 'pointer' }} onClick={() => window.open(href, "_blank")}>{href}</span>
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
			<ItemContract activeThemeId={activeThemeId} label=' schema' onClickCopy={onClickCopy} msg={data?.schema} />
		</div>
	);
});

export default CodeContract;
