import * as React from "react";
import {useSelector} from "react-redux";
import cn from "classnames/bind";
import {Fade, Tooltip} from "@material-ui/core";
import txTypes from "src/constants/txTypes";
import {extractValueAndUnit} from "src/helpers/helper";
import {divide} from "src/lib/Big";
import {_} from "src/lib/scripts";
import consts from "src/constants/consts";
import getTxType from "src/constants/getTxType";
import getTxTypeIcon from "src/constants/getTxTypeIcon";
import InfoRow from "src/components/common/InfoRow/InfoRow";
import TxGetAddress from "src/components/Tx/TxData/TxGetAddress/TxGetAddress";
import styles from "./TxMessage.scss";

const cx = cn.bind(styles);

export default function({msg, txData}) {
	const fees = useSelector(state => state.blockchain.fees);

	const {type, value} = msg;
	const MsgGridRender = React.useMemo(() => {
		const getInfoRow = (label, value, classNames) => (
			<InfoRow label={label}>{_.isNil(value) ? <span>-</span> : <span className={cx(classNames)}>{value}</span>}</InfoRow>
		);

		const getCurrencyRowFromString = (label, inputString, unitClassNames) => {
			if (_.isNil(value)) {
				return (
					<InfoRow label={label}>
						<span>-</span>
					</InfoRow>
				);
			}

			const {valueString, unitString} = extractValueAndUnit(inputString);

			return (
				<InfoRow label={label}>
					<span>{valueString} </span>
					<span className={cx(unitClassNames)}>{unitString}</span>
				</InfoRow>
			);
		};

		const getCurrencyRowFromObject = (label, inputObject, unitClassNames) => {
			if (_.isNil(inputObject?.amount) || _.isNil(inputObject?.denom)) {
				return (
					<InfoRow label={label}>
						<span>-</span>
					</InfoRow>
				);
			}

			const {amount, denom} = inputObject;
			return (
				<InfoRow label={label}>
					<span>{amount} </span>
					<span className={cx(unitClassNames)}>{denom}</span>
				</InfoRow>
			);
		};

		const getImageRow = (label, src, imgClassNames = "responsiveImage") => (
			<InfoRow label={label}>
				<img src={src} className={cx(imgClassNames)} />
			</InfoRow>
		);

		const getAddressRow = (label, address) => (
			<InfoRow label={label}>
				<TxGetAddress address={address} cx={cx} />
			</InfoRow>
		);

		const getTitleRow = label => <InfoRow label={label}></InfoRow>;

		return (
			<div className={cx("grid")}>
				{type === txTypes.COSMOS.MSG_SEND && (
					<>
						{getAddressRow("From Address", value?.from_address)}
						{getAddressRow("To Address", value?.to_address)}
						{getCurrencyRowFromObject("Amount", value?.amount?.[0], ["blueColor", "uppercase"])}
					</>
				)}

				{type === txTypes.PROVIDER.CREATE_AI_DATA_SOURCE && (
					<>
						{getInfoRow("Code", value?.code)}
						{getInfoRow("Description", value?.description)}
						{getInfoRow("Name", value?.name)}
						{getInfoRow("Owner", value?.owner)}
						{getCurrencyRowFromString("Transaction Fee", value?.transaction_fee, ["blueColor", "uppercase"])}
					</>
				)}

				{type === txTypes.PROVIDER.EDIT_AI_DATA_SOURCE && (
					<>
						{getInfoRow("Code", value?.code)}
						{getInfoRow("Description", value?.description)}
						{getInfoRow("New Name", value?.new_name)}
						{getInfoRow("Old Name", value?.old_name)}
						{getCurrencyRowFromString("New Transaction Fee", value?.new_transaction_fee, ["blueColor", "uppercase"])}
						{getInfoRow("Owner", value?.owner)}
					</>
				)}

				{type === txTypes.PROVIDER.CREATE_ORACLE_SCRIPT && (
					<>
						{getInfoRow("Code", value?.code)}
						{getInfoRow("Description", value?.description)}
						{getInfoRow("Name", value?.name)}
						{getInfoRow("Owner", value?.owner)}
					</>
				)}

				{type === txTypes.PROVIDER.EDIT_ORACLE_SCRIPT && (
					<>
						{getInfoRow("Code", value?.code)}
						{getInfoRow("Description", value?.description)}
						{getInfoRow("New Name", value?.new_name)}
						{getInfoRow("Old Name", value?.old_name)}
						{getInfoRow("Owner", value?.owner)}
					</>
				)}

				{type === txTypes.WEBSOCKET.ADD_REPORT && (
					<>
						{getInfoRow("Aggregated Result", atob(value?.aggregated_result))}
						{getCurrencyRowFromObject("Report Fee", value?.report_fee?.[0], ["blueColor", "uppercase"])}
						{getAddressRow("Report Address", value?.reporter?.reporter_address)}

						{getTitleRow("Data Source Results")}
						{Array.isArray(value?.data_source_results) &&
							value.data_source_results.map((item, index) => (
								<div className={cx("grid-wrapper")}>
									<div className={cx("type-wrapper")}>{item?.type ?? ""}</div>
									<div className={cx("grid")}>
										{getInfoRow("Data Source", item?.value?.data_source)}
										{getInfoRow("Result", item?.value?.result)}
										{getInfoRow("Result Status", item?.value?.result_status)}
									</div>
								</div>
							))}
						{getInfoRow("Reporter Address", value?.reporter?.reporter_address)}
						{getInfoRow("Reporter Name", value?.reporter?.reporter_name)}
						{getInfoRow("Reporter Validator", value?.reporter?.reporter_validator)}
						{getInfoRow("Request Id", value?.request_id)}
					</>
				)}

				{(type === txTypes.AIREQUEST.SET_CLASSIFICATION_REQUEST ||
					type === txTypes.AIREQUEST.SET_OCR_REQUEST ||
					type === txTypes.AIREQUEST.SET_KYC_REQUEST) && (
					<>
						{getInfoRow("Image Hash", value?.image_hash)}
						{getInfoRow("Image Name", value?.image_name)}
						{getInfoRow("Creator", value?.msg_set_ai_request?.creator)}
						{getInfoRow("Expected Output", atob(value?.msg_set_ai_request?.expected_output))}
						{getInfoRow("Oscript Name", value?.msg_set_ai_request?.oscript_name)}
						{getInfoRow("Request Id", value?.msg_set_ai_request?.request_id)}
						{getCurrencyRowFromString("Transaction Fee", value?.msg_set_ai_request?.transaction_fee, ["blueColor", "uppercase"])}
						{getInfoRow("Validator_count", value?.msg_set_ai_request?.validator_count)}
					</>
				)}

				{type === txTypes.AIREQUEST.SET_PRICE_REQUEST && (
					<>
						{getInfoRow("Creator", value?.msg_set_ai_request?.creator)}
						{getInfoRow("Expected Output", atob(value?.msg_set_ai_request?.expected_output))}
						{getInfoRow("Oscript Name", value?.msg_set_ai_request?.oscript_name)}
						{getInfoRow("Request Id", value?.msg_set_ai_request?.request_id)}
						{getCurrencyRowFromString("Transaction Fee", value?.msg_set_ai_request?.transaction_fee, ["blueColor", "uppercase"])}
						{getInfoRow("Validator_count", value?.msg_set_ai_request?.validator_count)}
					</>
				)}

				{type === txTypes.WEBSOCKET.TEST_CASE_RESULT && (
					<>
						{getInfoRow("Test Case", value?.test_case)}

						{getTitleRow("Data Source Results")}
						{Array.isArray(value?.data_source_results) &&
							value.data_source_results.map((item, index) => (
								<div className={cx("grid-wrapper")}>
									<div className={cx("type-wrapper")}>{item?.type ?? ""}</div>
									<div className={cx("grid")}>
										{getInfoRow("Result", item?.value?.result)}
										{getInfoRow("Data Source", item?.value?.data_source)}
										{getInfoRow("Result Status", item?.value?.result_status)}
									</div>
								</div>
							))}
					</>
				)}
			</div>
		);
	}, [txData, type, value]);

	const toolTippedImg = React.useMemo(() => {
		const feeValue = !_.isNil(fees[type]?.fee) ? divide(fees[type].fee, consts.NUM.BASE_MULT) : "none";
		return (
			<Tooltip
				placement='right-start'
				TransitionComponent={Fade}
				TransitionProps={{timeout: 300}}
				title={`Tx Fee: ${feeValue}${feeValue !== "none" ? ` BNB` : ""}`}
				disableTouchListener
				disableFocusListener>
				<img className={cx("txType-img")} src={getTxTypeIcon(type)} alt={"icon"} />
			</Tooltip>
		);
	}, [type, fees]);

	// console.log(txData);
	return (
		<div className={cx("grid-wrapper")}>
			<div className={cx("type-wrapper")}>
				{toolTippedImg}
				<span>{getTxType(type)}</span>
			</div>
			{MsgGridRender}
		</div>
	);
}
