import Dialog from "@material-ui/core/Dialog";
import classNames from "classnames/bind";
import copy from "copy-to-clipboard";
import {memo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ReactComponent as CloseIcon} from "src/assets/icons/close.svg";
import RegularFileIcon from "src/icons/RegularFileIcon";
import {showAlert} from "src/store/modules/global";
import {ItemCodeContract, ItemContract} from "../ComponentContract";
import styles from "./CodeContract.module.scss";
import consts from "src/constants/consts";
import {network} from "src/lib/config/networks";
import * as api from "src/lib/api";
import {notification} from "antd";

const cx = classNames.bind(styles);
const CodeContract = memo(({ data, refetchSmartContract }) => {
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

	
	const [open, setOpen] = useState(false);
	const [schema, setSchema] = useState();
	const { address } = useSelector(state => state.wallet);

	const schemaRef = useRef()

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = async(e) => {
		e.preventDefault()
		const keplr = await window.Keplr.getKeplr();
		if (!keplr) throw consts.INSTALL_KEPLR_FIRST;
		const key = await keplr.getKey(network.chainId);
		const resNonce = await api.axiosCall({
			method: 'get',
			url: `${consts.API_CONTRACT_DEPLOY}${consts.PATH_CONTRACT.GET_NONCE}`,
			params: {
				publicAddress: key.bech32Address,
				codeId: Number(data?.code_id)
			}
		});

		console.log({resNonce})

		if(resNonce?.data?.error?.Code) {
			notification.error({
				message: "Error authentication",
				description: resNonce?.data?.error?.Message,
			});
			setOpen(false)
			return
		}

		const response = await window.keplr.signArbitrary(network.chainId, key.bech32Address, JSON.stringify({ nonce: resNonce.data.data }));

		const payload = {
			schema: schemaRef?.current?.value,
			code_id: data?.code_id,
			signature: response?.signature,
			pubKey: response.pub_key.value,
			creatorAddress: address,
			contractAddress: data?.contract_address,
			dataVerifySignature: {
				signer: address,
				data: {
					nonce: resNonce.data.data
				}
			},
		}

		try {
			const uploadSchemaRes = await api.uploadSchema({
				method: "post",
				data: payload,
				headers: {"Content-Type": "application/json"},
			});
			if (uploadSchemaRes?.data?.error?.Code) {
				notification.error({
					message: "Upload Schema",
					description: uploadSchemaRes?.data?.error?.Message,
				});
			} else {
				notification.success({
					message: "Upload Schema",
					description: "Upload Schema Success",
				});
				refetchSmartContract();
			} 
		} catch (error) {
			notification.error({
				message: "Upload Schema",
				description: error?.response?.data,
			});
		} finally {
			setOpen(false)
		}

		setTimeout(() => {
			notification.destroy();
		}, 5000);
	}

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

			<div className={cx("verified-button")} onClick={handleOpen}>
				<span className={cx("verified-button-text")}>Upload Schema</span>
			</div>
			<ItemContract activeThemeId={activeThemeId} label='schema' onClickCopy={onClickCopy} msg={data?.schema} />
			<Dialog open={open} maxWidth='sm' fullWidth={true} aria-labelledby='verified--dialog' onClose={handleClose}>
				<form onSubmit={handleSubmit}>
					<div className={cx("dialog-header")}>
						<div className={cx("close-button")} onClick={handleClose}>
							<CloseIcon />
						</div>
					</div>
					<div className={cx("dialog-body")}>
						<div className={cx("field")}>
							<label className={cx("label")} htmlFor='title'>
								Schema
							</label>
							<textarea ref={schemaRef} required rows={10} className={cx("text-field")} placeholder="{
	contract_name: oraiswap-token,
	contract_version: 0.0.0,
	execute:{
	$schema:http://json-schema.org/draft-07/schema#
	....
}"
 name='contract_address' 
  />
						</div>
					</div>
					<div className={cx("dialog-footer")}>
						<button type='submit' className={cx("submit-button")}>
							<span className={cx("submit-button-text")}>Upload</span>
						</button>
					</div>
				</form>
			</Dialog>
		</div>
	);
});

export default CodeContract;
