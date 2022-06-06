import * as React from "react";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import {reduceString, _} from "src/lib/scripts";
import {NavLink, useParams} from "react-router-dom";
import {getTotalTime, setAgoTime} from "src/lib/scripts";
import InfoRow from "src/components/common/InfoRow";
import consts from "src/constants/consts";
import {useGet} from "restful-react";
import WasmCodeSkeleton from "./WasmCodeSkeleton";
import {useTheme} from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import styles from "./WasmCodeInfo.module.scss";

const cx = cn.bind(styles);

const WasmCodeInfo = () => {
	const params = useParams();
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const codeId = params?.["codeId"];
	const basePath = `${consts.API.WASM_CODE}`;
	const path = `${basePath}/${codeId}`;

	const {data: dataInfo, loading, error} = useGet({
		path,
	});

	return (
		<div className={cx("card")}>
			<h2 className={cx("card-header")}>Information</h2>
			<div className={cx("card-body")}>
				{loading ? (
					<WasmCodeSkeleton />
				) : (
					<>
						<InfoRow label='TxHash'>
							{_.isNil(dataInfo?.tx_hash) ? (
								"-"
							) : (
								<NavLink className={cx("height")} to={`${consts.PATH.TXLIST}/${dataInfo?.tx_hash}`}>
									{isLargeScreen ? dataInfo?.tx_hash : reduceString(dataInfo?.tx_hash, 6, 6)}
								</NavLink>
							)}
						</InfoRow>
						<InfoRow label='Code Id'>{_.isNil(dataInfo?.code_id) ? "-" : <div className={cx("height")}>{dataInfo?.code_id}</div>}</InfoRow>
						<InfoRow label='Creator'>
							{_.isNil(dataInfo?.creator) ? (
								"-"
							) : (
								<NavLink className={cx("height")} to={`${consts.PATH.ACCOUNT}/${dataInfo?.creator}`}>
									{dataInfo?.creator}
								</NavLink>
							)}
						</InfoRow>
						<InfoRow label='Time'>
							<div className={cx("time")}>
								{_.isNil(dataInfo?.created_at) ? "-" : `${setAgoTime(dataInfo?.created_at)} (${getTotalTime(dataInfo?.created_at)})`}
							</div>
						</InfoRow>
					</>
				)}
			</div>
		</div>
	);
};

WasmCodeInfo.propTypes = {
	data: PropTypes.any,
};

WasmCodeInfo.defaultProps = {};

export default WasmCodeInfo;
