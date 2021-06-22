import React, {useMemo} from "react";
import {useSelector, useDispatch} from "react-redux";
import ReactJson from "react-json-view";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import {Fade, Tooltip} from "@material-ui/core";
import base64js from "base64-js";
import consts from "src/constants/consts";
import txTypes from "src/constants/txTypes";
import getTxType from "src/constants/getTxType";
import getTxTypeIcon from "src/constants/getTxTypeIcon";
import copy from "copy-to-clipboard";
import copyIcon from "src/assets/common/copy_ic.svg";
import {formatOrai, formatFloat, extractValueAndUnit} from "src/helpers/helper";
import {showAlert} from "src/store/modules/global";
import {divide} from "src/lib/Big";
import {_} from "src/lib/scripts";
import Address from "src/components/common/Address";
import LinkRow from "src/components/common/LinkRow";
import InfoRow from "src/components/common/InfoRow/InfoRow";
import styles from "./TxMessage.module.scss";
import {NavLink} from "react-router-dom";
import ThemedTable from "src/components/common/ThemedTable";
import {themeIds} from "src/constants/themes";

const cx = cn.bind(styles);

const tryParseMessage = obj => {
	if (!obj) return;
	for (let key in obj) {
		if (obj[key].msg && typeof obj[key].msg === "string") {
			try {
				obj[key].msg = JSON.parse(atob(obj[key].msg));
			} catch {}
		}
	}
	return obj;
};

const TxMessage = ({msg, data}) => {
	const dispatch = useDispatch();
	const fees = useSelector(state => state.blockchain.fees);
	const status = useSelector(state => state.blockchain.status);
	const storageData = useSelector(state => state.contact);
	const activeThemeId = useSelector(state => state.activeThemeId);

	const value = msg;
	let type = msg["@type"] || "";
	if (type.indexOf(".") > -1) {
		const typeArr = type.split(".");
		type = "cosmos-sdk/" + typeArr[typeArr.length - 1];
	}
	const {memo} = data;

	const messageDetails = useMemo(() => {
		const getMultiSendHeaderRow = () => {
			const validatorHeaderCell = <div className={cx("header-cell")}>Address</div>;
			const amountHeaderCell = <div className={cx("header-cell")}>Amount</div>;
			const headerCells = [validatorHeaderCell, amountHeaderCell];
			const headerCellStyles = [
				{minWidth: "150px"}, // Address
				{minWidth: "150px"}, // Amount
			];

			return {
				headerCells,
				headerCellStyles,
			};
		};

		const getMultiSendDataRows = data => {
			if (!Array.isArray(data)) {
				return [];
			}

			return data.map(item => {
				const addressDataCell = _.isNil(item?.address) ? (
					<div className={cx("align-center")}>-</div>
				) : (
					<NavLink className={cx("address-data-cell")} to={`${consts.PATH.ACCOUNT}/${item?.address}`}>
						{item?.address}
					</NavLink>
				);

				const amountDataCell =
					_.isNil(item?.coins?.[0]?.amount) || _.isNil(item?.coins?.[0]?.denom) ? (
						<div className={cx("align-center")}>-</div>
					) : (
						<div className={cx("amount-data-cell")}>
							<div className={cx("amount")}>
								<span className={cx("amount-value")}>{formatOrai(item?.coins?.[0]?.amount) + " "}</span>
								<span className={cx("amount-denom")}>{item?.coins?.[0]?.denom}</span>
								<span className={cx("amount-usd")}>
									{status?.price ? " ($" + formatFloat((item?.coins?.[0]?.amount / 1000000) * status.price, 4) + ")" : ""}
								</span>
							</div>
						</div>
					);

				return [addressDataCell, amountDataCell];
			});
		};

		const getInfoRow = (label, value) => (
			<InfoRow label={label}>
				<span className={cx("text")}>{_.isNil(value) ? "-" : value}</span>
			</InfoRow>
		);

		const getCurrencyRowFromString = (label, inputString) => {
			if (_.isNil(value)) {
				return (
					<InfoRow label={label}>
						<span>-</span>
					</InfoRow>
				);
			}

			const {valueString, unitString} = extractValueAndUnit(inputString);
			const amount = parseFloat(valueString);
			const denom = unitString;

			return (
				<InfoRow label={label}>
					<div className={cx("amount")}>
						<span className={cx("amount-value")}>{formatOrai(amount)}</span>
						<span className={cx("amount-denom")}>{denom}</span>
						<span className={cx("amount-usd")}>{!_.isNil(amount) ? " ($" + formatFloat((amount / 1000000) * status.price, 4) + ")" : ""}</span>
					</div>
				</InfoRow>
			);
		};

		const getCurrencyRowFromObject = (label, inputObject) => {
			if (_.isNil(inputObject?.amount) || _.isNil(inputObject?.denom)) {
				return null;
				// (

				// <InfoRow label={label}>
				// 	<span>-</span>
				// </InfoRow>
				// );
			}

			const {amount, denom} = inputObject;
			// const priceInUSD = new BigNumber(amount || 0).multipliedBy(status?.price || 0).toFormat(2);
			return (
				<InfoRow label={label}>
					<div className={cx("amount")}>
						<span className={cx("amount-value")}>{formatOrai(amount) + " "}</span>
						<span className={cx("amount-denom")}>{denom}</span>
						<span className={cx("amount-usd")}>{status?.price ? " ($" + formatFloat((amount / 1000000) * status.price, 4) + ")" : ""}</span>
					</div>
				</InfoRow>
			);
		};

		const getImageRow = (label, src) => (
			<InfoRow label={label}>
				<img src={src} className={cx("responsive-image")} />
			</InfoRow>
		);

		const getNameByAddress = address => {
			return storageData?.[address]?.name;
		};

		const getAddressRow = (label, address) => (
			<InfoRow label={label}>
				<Address name={getNameByAddress(address)} address={address} showCopyIcon={true} size='lg' />
			</InfoRow>
		);

		const getMultiAddressRow = (label, address) => (
			<InfoRow label={label}>
				<ThemedTable
					headerCellStyles={getMultiSendHeaderRow()?.headerCellStyles}
					headerCells={getMultiSendHeaderRow()?.headerCells}
					dataRows={getMultiSendDataRows(address)}
				/>
			</InfoRow>
		);

		const getLinkRow = (label, name, id, href) => (
			<InfoRow label={label}>
				<LinkRow name={name} id={id} href={href} showCopyIcon={true} size='lg' />
			</InfoRow>
		);

		const getWebsiteRow = (label, href) => {
			if (_.isNil(href)) {
				return (
					<InfoRow label={label}>
						<span>-</span>
					</InfoRow>
				);
			}

			return (
				<InfoRow label={label}>
					<a href={href} target='_blank' className={cx("link")}>
						{href}
					</a>
				</InfoRow>
			);
		};

		if (type === "websocket/AddReport") {
			return null;
		}

		return (
			<div className={cx("card-body")}>
				{type === txTypes.COSMOS_SDK.MSG_CREATE_VALIDATOR && (
					<>
						{getAddressRow("Delegator Address", value?.delegator_address)}
						{getAddressRow("Validator Address", value?.validator_address)}
						{getCurrencyRowFromObject("Amount", value?.value)}
						{getInfoRow("Min Self Delegation", value?.min_self_delegation)}
						<div className={cx("card")}>
							<div className={cx("card-header")}>Pubkey</div>
							<div className={cx("card-body")}>
								{getInfoRow("Type", value?.pubkey?.type)}
								{getInfoRow("Value", value?.pubkey?.value)}
							</div>
						</div>
						<div className={cx("card")}>
							<div className={cx("card-header")}>Commission</div>
							<div className={cx("card-body")}>
								{getInfoRow("Rate", formatFloat(value?.commission?.rate, 6))}
								{getInfoRow("Max Rate", formatFloat(value?.commission?.max_rate, 6))}
							</div>
						</div>
						<div className={cx("card")}>
							<div className={cx("card-header")}>Description</div>
							<div className={cx("card-body")}>
								{getInfoRow("Details", value?.description?.details)}
								{getInfoRow("Moniker", value?.description?.moniker)}
								{getWebsiteRow("Website", value?.description?.website)}
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
						{getCurrencyRowFromObject("Amount", value?.amount)}
					</>
				)}
				.
				{type === txTypes.COSMOS_SDK.MSG_UNDELEGATE && (
					<>
						{getAddressRow("Delegator Address", value?.delegator_address)}
						{getAddressRow("Validator Address", value?.validator_address)}
						{getCurrencyRowFromObject("Amount", value?.amount)}
					</>
				)}
				{type === txTypes.COSMOS_SDK.MSG_SEND && (
					<>
						{getAddressRow("From Address", value?.from_address)}
						{getAddressRow("To Address", value?.to_address)}
						{getCurrencyRowFromObject("Amount", value?.amount?.[0])}
						{getInfoRow("Memo", memo)}
					</>
				)}
				{type === txTypes.COSMOS_SDK.MSG_MULTI_SEND && (
					<>
						{getAddressRow("From Address", value?.inputs?.[0]?.address)}
						{getCurrencyRowFromObject("Total Amount", value?.inputs?.[0]?.coins?.[0])}
						{getMultiAddressRow("To Address", value?.outputs)}
						{getInfoRow("Memo", memo)}
					</>
				)}
				{type === txTypes.COSMOS_SDK.MSG_EDIT_VALIDATOR && (
					<>
						{getAddressRow("Validator Address", value?.validator_address)}
						<div className={cx("card")}>
							<div className={cx("card-header")}>Description</div>
							<div className={cx("card-body")}>
								{getInfoRow("Details", value?.description?.details)}
								{getInfoRow("Moniker", value?.description?.moniker)}
								{getWebsiteRow("Website", value?.description?.website)}
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
						{getCurrencyRowFromObject("Amount", value?.amount)}
					</>
				)}
				{type === txTypes.COSMOS_SDK.MSG_WITHDRAW_DELEGATION_REWARD && (
					<>
						{getAddressRow("Delegator Address", value?.delegator_address)}
						{getAddressRow("Validator Address", value?.validator_address)}
						{getCurrencyRowFromObject("Amount", value?.amount)}
					</>
				)}
				{type === txTypes.COSMOS_SDK.MSG_WITHDRAW_DELEGATOR_REWARD && (
					<>
						{getAddressRow("Delegator Address", value?.delegator_address)}
						{getAddressRow("Validator Address", value?.validator_address)}
						{getCurrencyRowFromObject("Amount", value?.amount)}
					</>
				)}
				{type === txTypes.COSMOS_SDK.MSG_WITHDRAW_VALIDATOR_COMMISSION && <>{getAddressRow("Validator Address", value?.validator_address)}</>}
				{type === txTypes.PROVIDER.CREATE_AI_DATA_SOURCE && (
					<>
						{getInfoRow("Contract", value?.contract)}
						{getInfoRow("Description", value?.description)}
						{getInfoRow("Name", value?.name)}
						{getAddressRow("Owner", value?.owner)}
						{getCurrencyRowFromString("Transaction Fee", value?.transaction_fee)}
					</>
				)}
				{type === txTypes.PROVIDER.CREATE_TEST_CASE && (
					<>
						{getInfoRow("Contract", value?.contract)}
						{getInfoRow("Description", value?.description)}
						{getInfoRow("Name", value?.name)}
						{getAddressRow("Owner", value?.owner)}
						{getCurrencyRowFromString("Transaction Fee", value?.transaction_fee)}
					</>
				)}
				{type === txTypes.PROVIDER.EDIT_TEST_CASE && (
					<>
						{getInfoRow("Contract", value?.contract)}
						{getInfoRow("Description", value?.description)}
						{getInfoRow("New Name", value?.new_name)}
						{getInfoRow("Old Name", value?.old_name)}
						{getAddressRow("Owner", value?.owner)}
						{getCurrencyRowFromString("Transaction Fee", value?.transaction_fee)}
					</>
				)}
				{type === txTypes.PROVIDER.EDIT_AI_DATA_SOURCE && (
					<>
						{getInfoRow("Contract", value?.contract)}
						{getInfoRow("Description", value?.description)}
						{getInfoRow("New Name", value?.new_name)}
						{getInfoRow("Old Name", value?.old_name)}
						{getCurrencyRowFromString("New Transaction Fee", value?.new_transaction_fee)}
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
						{getCurrencyRowFromString("Transaction Fee", value?.transaction_fee)}
					</>
				)}
				{type === txTypes.WEBSOCKET.CREATE_REPORT && (
					<>
						{getCurrencyRowFromObject("Report Fee", value?.fees?.[0])}
						{getAddressRow("Reporter Address", value?.reporter?.address)}
						{getInfoRow("Reporter Name", value?.reporter?.name)}
						{getAddressRow("Reporter Validator", value?.reporter?.validator)}
						{getInfoRow("Request Id", value?.requestID)}

						<div className={cx("card")}>
							<div className={cx("card-header")}>Aggregated Result</div>
							<div className={cx("card-body")}>
								{Array.isArray(JSON.parse(atob(value?.aggregatedResult))) &&
									JSON.parse(atob(value?.aggregatedResult)).map((item, index) => (
										<div className={cx("card")} key={"card-index"}>
											<div className={cx("card-body")}>
												{getInfoRow("Name", item?.name)}
												{getInfoRow("Price", item?.price)}
											</div>
										</div>
									))}
							</div>
						</div>
						<div className={cx("card")}>
							<div className={cx("card-header")}>Data Source Results</div>
							<div className={cx("card-body")}>
								{Array.isArray(value?.DataSourceResults) &&
									value.DataSourceResults.map((item, index) => (
										<div className={cx("card")} key={"card-index"}>
											<div className={cx("card-body")}>
												{getInfoRow("Data Source", item?.name)}
												<InfoRow label='Result'>
													<ReactJson
														style={{backgroundColor: "transparent"}}
														name={false}
														theme={activeThemeId === themeIds.DARK ? "monokai" : "rjv-default"}
														displayObjectSize={false}
														displayDataTypes={false}
														collapsed={true}
														src={tryParseMessage(JSON.parse(atob(item?.result)))}
													/>
												</InfoRow>
												{getInfoRow("Result Status", item?.status)}
											</div>
										</div>
									))}
							</div>
						</div>
						<div className={cx("card")}>
							<div className={cx("card-header")}>Test Case Results</div>
							<div className={cx("card-body")}>
								{Array.isArray(value?.TestCaseResults) &&
									value.TestCaseResults.map((testcase, index) => (
										<div className={cx("card")} key={"card-index"}>
											<div className={cx("card-header")}>{getInfoRow("Test Case Name", testcase?.name)}</div>
											<div className={cx("card-body")}>
												{Array.isArray(testcase?.DataSourceResults) &&
													testcase.DataSourceResults.map((item, index) => (
														<div className={cx("card")} key={"card-index"}>
															<div className={cx("card-body")}>
																{getInfoRow("Data Source", item?.name)}
																<InfoRow label='Result'>
																	<ReactJson
																		style={{backgroundColor: "transparent"}}
																		name={false}
																		theme={activeThemeId === themeIds.DARK ? "monokai" : "rjv-default"}
																		displayObjectSize={false}
																		displayDataTypes={false}
																		collapsed={true}
																		src={tryParseMessage(JSON.parse(atob(item?.result)))}
																	/>
																</InfoRow>
																{getInfoRow("Result Status", item?.status)}
															</div>
														</div>
													))}
											</div>
										</div>
									))}
							</div>
						</div>
					</>
				)}
				{type === txTypes.WEBSOCKET.ADD_REPORTER && (
					<>
						{getAddressRow("Adder", value?.adder)}
						{getAddressRow("Reporter", value?.reporter)}
						{getAddressRow("Validator", value?.validator)}
					</>
				)}
				{type === txTypes.AIREQUEST.SET_AI_REQUEST && (
					<>
						{getAddressRow("Creator", value?.creator)}
						{getInfoRow("Expected Output", atob(value?.expected_output) || "-")}
						{getCurrencyRowFromString("Transaction Fee", value?.fees)}
						{getInfoRow("Input", atob(value?.input) || "-")}
						{getInfoRow("Oracle Script Name", value?.oracle_script_name)}
						{getLinkRow("Request Id", "AI Request", value?.request_id, `/ai_requests/${value?.request_id}`)}
						{getInfoRow("Validator Count", value?.validator_count)}
					</>
				)}
				{type === txTypes.COSMOS_SDK.MSG_VOTE && (
					<>
						{getInfoRow("Option", value?.option)}
						{getInfoRow("Proposal ID", value?.proposal_id)}
						{getAddressRow("Voter", value?.voter)}
					</>
				)}
				{type === txTypes.COSMOS_SDK.INSTANTIATE_CONTRACT && (
					<>
						{getInfoRow("Code Id", value?.code_id)}
						{getInfoRow("Label", value?.label)}
						{getAddressRow("Sender", value?.sender)}
						{getCurrencyRowFromObject("Init funds", value?.init_funds)}
						<InfoRow label='Message'>
							<ReactJson
								style={{backgroundColor: "transparent"}}
								name={false}
								theme={activeThemeId === themeIds.DARK ? "monokai" : "rjv-default"}
								displayObjectSize={false}
								displayDataTypes={false}
								src={tryParseMessage(value?.init_msg)}
							/>
						</InfoRow>
					</>
				)}
				{type === txTypes.COSMOS_SDK.EXECUTE_CONTRACT && (
					<>
						{getInfoRow("Contract", value?.contract)}
						{getAddressRow("Sender", value?.sender)}
						{/* {getCurrencyRowFromObject("Amount", value?.sent_funds?.[0])} */}
						{getCurrencyRowFromObject("Sent funds", value?.sent_funds?.[0])}
						<InfoRow label='Message'>
							<ReactJson
								style={{backgroundColor: "transparent"}}
								name={false}
								theme={activeThemeId === themeIds.DARK ? "monokai" : "rjv-default"}
								displayObjectSize={false}
								displayDataTypes={false}
								src={tryParseMessage(value?.msg)}
							/>
						</InfoRow>
					</>
				)}
				{type === txTypes.COSMOS_SDK.STORE_CODE && (
					<>
						{getAddressRow("Sender", value?.sender)}
						{getInfoRow("Builder", value?.builder)}
						{getInfoRow("Instantiate permission", value?.instantiate_permission)}
						<InfoRow label={`Data: gzip; ${value?.wasm_byte_code.length}` + " bytes"}>
							<span>
								<span className={cx("text", "code-textarea")}>
									{_.isNil(value?.wasm_byte_code)
										? "-"
										: base64js.toByteArray(value?.wasm_byte_code)?.length > 500
										? base64js
												.toByteArray(value?.wasm_byte_code)
												?.join("")
												?.slice(0, 500) + "..."
										: base64js.toByteArray(value?.wasm_byte_code)?.join("")}
								</span>
								<img
									src={copyIcon}
									alt=''
									className={cx("code-copy")}
									onClick={() => {
										copy(base64js.toByteArray(value?.wasm_byte_code)?.join(""));
										dispatch(
											showAlert({
												show: true,
												message: "Copied",
												autoHideDuration: 1500,
											})
										);
									}}
								/>
							</span>
						</InfoRow>
					</>
				)}
			</div>
		);
	}, [type, value, storageData, activeThemeId]);

	const toolTippedImg = useMemo(() => {
		const feeValue = !_.isNil(fees[type]?.fee) ? divide(fees[type].fee, consts.NUM.BASE_MULT) : "none";
		return (
			<Tooltip
				placement='right-start'
				TransitionComponent={Fade}
				TransitionProps={{timeout: 300}}
				title={`Tx Fee: ${feeValue}${feeValue !== "none" ? ` BNB` : ""}`}
				disableTouchListener
				disableFocusListener>
				<img className={cx("icon")} src={getTxTypeIcon(type)} alt='' />
			</Tooltip>
		);
	}, [type, fees]);

	return (
		<div className={cx("card")}>
			<div className={cx("card-header")}>
				{toolTippedImg}
				<span className={cx("title")}>{getTxType(type)}</span>
			</div>
			<div className={cx("card-body")}>{messageDetails}</div>
		</div>
	);
};

TxMessage.propTypes = {
	msg: PropTypes.any,
	data: PropTypes.any,
};
TxMessage.defaultProps = {};

export default TxMessage;
