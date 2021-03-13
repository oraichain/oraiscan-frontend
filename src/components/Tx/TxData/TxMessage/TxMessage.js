import * as React from "react";
import {useSelector} from "react-redux";
import cn from "classnames/bind";
import {Fade, Tooltip} from "@material-ui/core";
import consts from "src/constants/consts";
import txTypes from "src/constants/txTypes";
import getTxType from "src/constants/getTxType";
import getTxTypeIcon from "src/constants/getTxTypeIcon";
import {formatOrai, formatFloat, extractValueAndUnit} from "src/helpers/helper";
import {divide} from "src/lib/Big";
import {_} from "src/lib/scripts";
import Address from "src/components/common/Address";
import InfoRow from "src/components/common/InfoRow/InfoRow";
import BigNumber from "bignumber.js";
import styles from "./TxMessage.scss";

const cx = cn.bind(styles);

export default function({msg, txData}) {
	const fees = useSelector(state => state.blockchain.fees);
	const status = useSelector(state => state.blockchain.status);

	const {type, value} = msg;
	const {memo} = txData;
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
					<span>{formatOrai(valueString)} </span>
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
			const priceInUSD = new BigNumber(amount || 0).multipliedBy(status?.price || 0).toFormat(2);
			return (
				<InfoRow label={label}>
					<span>{formatOrai(amount) + " "}</span>
					<span className={cx(unitClassNames)}>{denom}</span>
					<span className={cx("usd")}>{status?.price ? " ($" + formatFloat((amount / 1000000) * status.price, 4) + ")" : ""}</span>
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
				<Address address={address} showCopyIcon={true} size='md' />
			</InfoRow>
		);

		const getLinkRow = (label, href) => {
			if (_.isNil(href)) {
				return (
					<InfoRow label={label}>
						<span>-</span>
					</InfoRow>
				);
			}

			return (
				<InfoRow label={label}>
					<a href={href} target='_blank' className={cx("blueColor")}>
						{href}
					</a>
				</InfoRow>
			);
		};

		const getTitleRow = label => <InfoRow label={label}></InfoRow>;

		return (
			<div className={cx("grid")}>
				{type === txTypes.COSMOS_SDK.MSG_CREATE_VALIDATOR && (
					<>
						{getAddressRow("Delegator Address", value?.delegator_address)}
						{getAddressRow("Validator Address", value?.validator_address)}
						{getCurrencyRowFromObject("Amount", value?.value, ["uppercase"])}
						{getInfoRow("Min Self Delegation", value?.min_self_delegation)}
						{getTitleRow("Pubkey")}
						<div className={cx("grid-wrapper")}>
							<div className={cx("grid")}>
								{getInfoRow("Type", value?.pubkey?.type)}
								{getInfoRow("Value", value?.pubkey?.value)}
							</div>
						</div>
						{getTitleRow("Commission")}
						<div className={cx("grid-wrapper")}>
							<div className={cx("grid")}>
								{getInfoRow("Rate", formatFloat(value?.commission?.rate, 6))}
								{getInfoRow("Max Rate", formatFloat(value?.commission?.max_rate, 6))}
							</div>
						</div>
						{getTitleRow("Description")}
						<div className={cx("grid-wrapper")}>
							<div className={cx("grid")}>
								{getInfoRow("Details", value?.description?.details)}
								{getInfoRow("Moniker", value?.description?.moniker)}
								{getLinkRow("Website", value?.description?.website)}
								{getInfoRow("Identity", value?.description?.identity)}
								{getInfoRow("Security Contact", value?.description?.security_contact)}
							</div>
						</div>
					</>
				)}

				{type === txTypes.COSMOS_SDK.MSG_DELEGATE && (
					<>
						{getAddressRow("Delegator Address", value?.delegator_address)}
						{getAddressRow("Validator Address", value?.validator_address)}
						{getCurrencyRowFromObject("Amount", value?.amount, ["uppercase"])}
					</>
				)}

				{type === txTypes.COSMOS_SDK.MSG_UNDELEGATE && (
					<>
						{getAddressRow("Delegator Address", value?.delegator_address)}
						{getAddressRow("Validator Address", value?.validator_address)}
						{getCurrencyRowFromObject("Amount", value?.amount, ["uppercase"])}
					</>
				)}

				{type === txTypes.COSMOS_SDK.MSG_SEND && (
					<>
						{getAddressRow("From Address", value?.from_address)}
						{getAddressRow("To Address", value?.to_address)}
						{getCurrencyRowFromObject("Amount", value?.amount?.[0], ["uppercase"])}
						{getAddressRow("Memo", memo)}
					</>
				)}

				{type === txTypes.COSMOS_SDK.MSG_EDIT_VALIDATOR && (
					<>
						{getAddressRow("Validator Address", value?.validator_address)}
						{getTitleRow("Description")}
						<div className={cx("grid-wrapper")}>
							<div className={cx("grid")}>
								{getInfoRow("Details", value?.description?.details)}
								{getInfoRow("Moniker", value?.description?.moniker)}
								{getLinkRow("Website", value?.description?.website)}
								{getInfoRow("Identity", value?.description?.identity)}
								{getInfoRow("Security Contact", value?.description?.security_contact)}
							</div>
						</div>
					</>
				)}

				{type === txTypes.COSMOS_SDK.MSG_BEGIN_REDELEGATE && (
					<>
						{getAddressRow("Delegator Address", value?.delegator_address)}
						{getAddressRow("Validator Dst Address", value?.validator_dst_address)}
						{getAddressRow("Validator Src Address", value?.validator_src_address)}
						{getCurrencyRowFromObject("Amount", value?.amount, ["uppercase"])}
					</>
				)}

				{type === txTypes.COSMOS_SDK.MSG_WITHDRAW_DELEGATION_REWARD && (
					<>
						{getAddressRow("Delegator Address", value?.delegator_address)}
						{getAddressRow("Validator Address", value?.validator_address)}
					</>
				)}

				{type === txTypes.COSMOS_SDK.MSG_WITHDRAW_VALIDATOR_COMMISSION && <>{getAddressRow("Validator Address", value?.validator_address)}</>}

				{type === txTypes.PROVIDER.CREATE_AI_DATA_SOURCE && (
					<>
						{getInfoRow("Contract", value?.contract)}
						{getInfoRow("Description", value?.description)}
						{getInfoRow("Name", value?.name)}
						{getAddressRow("Owner", value?.owner)}
						{getCurrencyRowFromString("Transaction Fee", value?.transaction_fee, ["uppercase"])}
					</>
				)}

				{type === txTypes.PROVIDER.EDIT_AI_DATA_SOURCE && (
					<>
						{getInfoRow("Contract", value?.contract)}
						{getInfoRow("Description", value?.description)}
						{getInfoRow("New Name", value?.new_name)}
						{getInfoRow("Old Name", value?.old_name)}
						{getCurrencyRowFromString("New Transaction Fee", value?.new_transaction_fee, ["uppercase"])}
						{getAddressRow("Owner", value?.owner)}
					</>
				)}

				{type === txTypes.PROVIDER.CREATE_ORACLE_SCRIPT && (
					<>
						{getInfoRow("Contract", value?.contract)}
						{getInfoRow("Description", value?.description)}
						{getInfoRow("Name", value?.name)}
						{getAddressRow("Owner", value?.owner)}
					</>
				)}

				{type === txTypes.PROVIDER.EDIT_ORACLE_SCRIPT && (
					<>
						{getInfoRow("Contract", value?.contract)}
						{getInfoRow("Description", value?.description)}
						{getInfoRow("New Name", value?.new_name)}
						{getInfoRow("Old Name", value?.old_name)}
						{getAddressRow("Owner", value?.owner)}
					</>
				)}

				{type === txTypes.PROVIDER.SET_TESTCASE && (
					<>
						{getInfoRow("Contract", value?.contract)}
						{getInfoRow("Description", value?.description)}
						{getAddressRow("Owner", value?.owner)}
						{getInfoRow("Test Case Name", value?.test_case_name)}
						{getCurrencyRowFromString("Transaction Fee", value?.transaction_fee, ["uppercase"])}
					</>
				)}

				{type === txTypes.WEBSOCKET.ADD_REPORT && (
					<>
						{getInfoRow("Aggregated Result", atob(value?.aggregated_result))}
						{getCurrencyRowFromObject("Report Fee", value?.report_fee?.[0], ["uppercase"])}
						{getAddressRow("Report Address", value?.reporter?.reporter_address)}

						{getTitleRow("Data Source Results")}
						{Array.isArray(value?.data_source_results) &&
							value.data_source_results.map((item, index) => (
								<div className={cx("grid-wrapper")}>
									<div className={cx("type-wrapper")}>{item?.type ?? ""}</div>
									<div className={cx("grid")}>
										{getInfoRow("Data Source", item?.value?.data_source)}
										{getInfoRow("Result", atob(item?.value?.result))}
										{getInfoRow("Result Status", item?.value?.result_status)}
									</div>
								</div>
							))}
						{getAddressRow("Reporter Address", value?.reporter?.reporter_address)}
						{getInfoRow("Reporter Name", value?.reporter?.reporter_name)}
						{getAddressRow("Reporter Validator", value?.reporter?.reporter_validator)}
						{getInfoRow("Request Id", value?.request_id)}
					</>
				)}

				{type === txTypes.WEBSOCKET.ADD_REPORTER && (
					<>
						{getAddressRow("Adder", value?.adder)}
						{getAddressRow("Reporter", value?.reporter)}
						{getAddressRow("Validator", value?.validator)}
					</>
				)}

				{(type === txTypes.AIREQUEST.SET_CLASSIFICATION_REQUEST ||
					type === txTypes.AIREQUEST.SET_OCR_REQUEST ||
					type === txTypes.AIREQUEST.SET_KYC_REQUEST) && (
					<>
						{getInfoRow("Image Hash", value?.image_hash)}
						{getInfoRow("Image Name", value?.image_name)}
						{getAddressRow("Creator", value?.msg_set_ai_request?.creator)}
						{getInfoRow("Expected Output", atob(value?.msg_set_ai_request?.expected_output))}
						{getInfoRow("Oscript Name", value?.msg_set_ai_request?.oscript_name)}
						{getInfoRow("Request Id", value?.msg_set_ai_request?.request_id)}
						{getCurrencyRowFromString("Transaction Fee", value?.msg_set_ai_request?.transaction_fee, ["uppercase"])}
						{getInfoRow("Validator_count", value?.msg_set_ai_request?.validator_count)}
					</>
				)}

				{type === txTypes.AIREQUEST.SET_PRICE_REQUEST && (
					<>
						{getAddressRow("Creator", value?.msg_set_ai_request?.creator)}
						{getInfoRow("Expected Output", atob(value?.msg_set_ai_request?.expected_output))}
						{getInfoRow("Oscript Name", value?.msg_set_ai_request?.oscript_name)}
						{getInfoRow("Request Id", value?.msg_set_ai_request?.request_id)}
						{getCurrencyRowFromString("Transaction Fee", value?.msg_set_ai_request?.transaction_fee, ["uppercase"])}
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
										{getInfoRow("Result", atob(item?.value?.result))}
										{getInfoRow("Data Source", item?.value?.data_source)}
										{getInfoRow("Result Status", item?.value?.result_status)}
									</div>
								</div>
							))}
					</>
				)}
			</div>
		);
	}, [type, value]);

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
