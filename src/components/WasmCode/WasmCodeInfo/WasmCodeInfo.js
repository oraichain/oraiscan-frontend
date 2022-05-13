import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import copy from "copy-to-clipboard";
import {showAlert} from "src/store/modules/global";
import {_} from "src/lib/scripts";
import CopyIcon from "src/icons/CopyIcon";
import {useParams} from "react-router-dom";
import {getTotalTime, setAgoTime} from "src/lib/scripts";
import InfoRow from "src/components/common/InfoRow";
import ShortenedString from "src/components/common/ShortenedString";
import consts from "src/constants/consts";
import {useGet} from "restful-react";
import styles from "./WasmCodeInfo.module.scss";

const cx = cn.bind(styles);

const WasmCodeInfo = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const codeId = params?.["codeId"];
	const page_id = useSelector(state => state.wasmCode.page_id);
	const basePath = `${consts.API.WASM_CODE}?limit=${consts.REQUEST.LIMIT}`;
	let path = `${basePath}&page_id=${page_id}`;
	let wasmInfo;

	const {data: dataInfo, loading, error} = useGet({
		path: path,
	});

	if (loading) {
		wasmInfo = {};
	} else {
		if (error) {
		} else {
			if (Array.isArray(dataInfo.data) && dataInfo.data.length > 0) {
				wasmInfo = dataInfo.data.find(wasm => wasm.id === codeId);
				console.log("wasmInfo", wasmInfo);
			} else {
				wasmInfo = {};
			}
		}
	}

	return (
		<div className={cx("card")}>
			<h2 className={cx("card-header")}>Information</h2>
			<div className={cx("card-body")}>
				<InfoRow label='TxHash'>
					<div className={cx("address")}>
						<span className={cx("address-value")}>
							<ShortenedString inputString={wasmInfo?.tx_hash} showCopyIcon={true} long />
						</span>
						<span
							className={cx("address-copy")}
							onClick={() => {
								copy(wasmInfo.tx_hash);
								dispatch(
									showAlert({
										show: true,
										message: "Copied",
										autoHideDuration: 1500,
									})
								);
							}}>
							<CopyIcon />
						</span>
					</div>
				</InfoRow>
				<InfoRow label='Code Id'>{_.isNil(wasmInfo?.id) ? "-" : <div className={cx("height")}>{wasmInfo.id}</div>}</InfoRow>
				<InfoRow label='Creator'>{_.isNil(wasmInfo?.creator) ? "-" : <div className={cx("height")}>{wasmInfo.creator}</div>}</InfoRow>
				<InfoRow label='Time'>
					<div className={cx("time")}>
						{_.isNil(wasmInfo?.created_at) ? "-" : setAgoTime(wasmInfo.created_at) + " (" + getTotalTime(wasmInfo.created_at) + ")"}
					</div>
				</InfoRow>
			</div>
		</div>
	);
};

WasmCodeInfo.propTypes = {
	data: PropTypes.any,
};

WasmCodeInfo.defaultProps = {};

export default WasmCodeInfo;
