import React from "react";
import ReactJson from "src/components/ReactJson";
import InfoRow from "src/components/common/InfoRow";
import { checkAttributeEvents, formatFloat } from "src/helpers/helper";
import { tryParseMessage, compareTypeMessage } from "src/lib/scripts";
import BigNumber from "bignumber.js";
import cn from "classnames/bind";
import styles from "./TxMessage.module.scss";

const cx = cn.bind(styles);

const TxMessageContent = ({
	type,
	txTypes,
	data,
	value,
	memo,
	getTxTypeNew,
	getAddressRow,
	getCurrencyRowFromObject,
	getCurrencyRowFromString,
	getInfoRow,
	getInfoRowSummary,
	getWebsiteRow,
	getLinkRow,
	getContractAddress,
	getFundsRow,
	getHtmlRow,
	getMultiAddressRow,
	getAmountValidatorCommission,
	getIbcReceivedRows,
	getTransferRow,
	getMultiRoyaltyRow,
	getSubmitProposalContent,
	getInfoRowThreeDots,
	getTotalTransfer,
	tryParseMessageBinary,
	activeThemeId,
	themeIds,
	key,
	storeCodeElement,
	ind,
	getRawLog,
	getInfoRowFromRawData,
	getWasmDataJson,
	getPriceInfoFromRawData,
	getIBCProgressRow,
}) => {
	const { base, quote, wasmAttributes } = getWasmDataJson(data?.raw_log) || {};

	return (
		<>
			<div className={cx("card-header")}>
				<span className={cx("title")}>{getTxTypeNew(type, data?.result, value)}</span>
			</div>
			<div className={cx("card-body")}>
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_CREATE_VALIDATOR, txTypes.COSMOS_SDK_NEW_VERSION.MSG_CREATE_VALIDATOR]) && (
					<>
						{getAddressRow("Delegator Address", value?.delegator_address, value?.delegator_address_tag)}
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
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_UPDATE_ADMIN_CONTRACT, txTypes.COSMOS_SDK_NEW_VERSION.MSG_UPDATE_ADMIN_CONTRACT]) && (
					<>
						{getAddressRow("Contract", value?.contract)}
						{getAddressRow("Sender", value?.sender)}
						{getAddressRow("New Admin", value?.new_admin)}
						{getCurrencyRowFromObject("Init funds", value?.init_funds ?? value?.funds)}
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_DELEGATE, txTypes.COSMOS_SDK_NEW_VERSION.MSG_DELEGATE]) && (
					<>
						{getAddressRow("Delegator Address", value?.delegator_address, value?.delegator_address_tag)}
						{getAddressRow("Validator Address", value?.validator_address)}
						{getCurrencyRowFromObject("Amount", value?.amount)}
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_UNDELEGATE, txTypes.COSMOS_SDK_NEW_VERSION.MSG_UNDELEGATE]) && (
					<>
						{getAddressRow("Delegator Address", value?.delegator_address, value?.delegator_address_tag)}
						{getAddressRow("Validator Address", value?.validator_address)}
						{getCurrencyRowFromObject("Amount", value?.amount)}
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_SEND, txTypes.COSMOS_SDK_NEW_VERSION.MSG_SEND]) && (
					<>
						{getAddressRow("From Address", value?.from_address, value?.from_address_tag)}
						{getAddressRow("To Address", value?.to_address, value?.to_address_tag)}
						{getCurrencyRowFromObject("Amount", value?.amount?.[0])}
						{getInfoRow("Memo", memo)}
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_MULTI_SEND, txTypes.COSMOS_SDK_NEW_VERSION.MSG_MULTI_SEND]) && (
					<>
						{getAddressRow("From Address", value?.inputs?.[0]?.address, value?.inputs?.[0]?.address_tag)}
						{getCurrencyRowFromObject("Total Amount", value?.inputs?.[0]?.coins?.[0])}
						{getMultiAddressRow("To Address", value?.outputs)}
						{getInfoRow("Memo", memo)}
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_EDIT_VALIDATOR, txTypes.COSMOS_SDK_NEW_VERSION.MSG_EDIT_VALIDATOR]) && (
					<>
						{getAddressRow("Validator Address", value?.validator_address)}
						{getInfoRow("Commission Rate", new BigNumber(value?.commission_rate || 0).toFixed(6))}
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
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_WITHDRAW_DELEGATOR_REWARD, txTypes.COSMOS_SDK_NEW_VERSION.MSG_WITHDRAW_DELEGATOR_REWARD]) && (
					<>
						{getAddressRow("Delegator Address", value?.delegator_address, value?.delegator_address_tag)}
						{getAddressRow("Validator Address", value?.validator_address)}
						{getCurrencyRowFromObject("Amount", value?.amount)}
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_WITHDRAW_VALIDATOR_COMMISSION, txTypes.COSMOS_SDK_NEW_VERSION.MSG_WITHDRAW_VALIDATOR_COMMISSION]) && (
					<>
						{getAddressRow("Validator Address", value?.validator_address)}
						{getCurrencyRowFromObject("Amount", data?.amount)}
					</>
				)}
				{type === txTypes.PROVIDER.CREATE_AI_DATA_SOURCE && (
					<>
						{getInfoRow("Contract", value?.contract)}
						{getInfoRow("Description", value?.description)}
						{getInfoRow("Name", value?.name)}
						{getAddressRow("Owner", value?.owner, value?.owner_tag)}
						{getCurrencyRowFromString("Transaction Fee", value?.transaction_fee)}
					</>
				)}
				{type === txTypes.PROVIDER.CREATE_TEST_CASE && (
					<>
						{getInfoRow("Contract", value?.contract)}
						{getInfoRow("Description", value?.description)}
						{getInfoRow("Name", value?.name)}
						{getAddressRow("Owner", value?.owner, value?.owner_tag)}
						{getCurrencyRowFromString("Transaction Fee", value?.transaction_fee)}
					</>
				)}
				{type === txTypes.PROVIDER.EDIT_TEST_CASE && (
					<>
						{getInfoRow("Contract", value?.contract)}
						{getInfoRow("Description", value?.description)}
						{getInfoRow("New Name", value?.new_name)}
						{getInfoRow("Old Name", value?.old_name)}
						{getAddressRow("Owner", value?.owner, value?.owner_tag)}
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
						{getAddressRow("Owner", value?.owner, value?.owner_tag)}
					</>
				)}
				{type === txTypes.PROVIDER.CREATE_ORACLE_SCRIPT && (
					<>
						{getInfoRow("Contract", value?.contract)}
						{getInfoRow("Description", value?.description)}
						{getInfoRow("Name", value?.name)}
						{getAddressRow("Owner", value?.owner, value?.owner_tag)}
					</>
				)}
				{type === txTypes.PROVIDER.EDIT_ORACLE_SCRIPT && (
					<>
						{getInfoRow("Contract", value?.contract)}
						{getInfoRow("Description", value?.description)}
						{getInfoRow("New Name", value?.new_name)}
						{getInfoRow("Old Name", value?.old_name)}
						{getAddressRow("Owner", value?.owner, value?.owner_tag)}
					</>
				)}
				{type === txTypes.PROVIDER.SET_TESTCASE && (
					<>
						{getInfoRow("Contract", value?.contract)}
						{getInfoRow("Description", value?.description)}
						{getAddressRow("Owner", value?.owner, value?.owner_tag)}
						{getInfoRow("Test Case Name", value?.test_case_name)}
						{getCurrencyRowFromString("Transaction Fee", value?.transaction_fee)}
					</>
				)}
				{type === txTypes.WEBSOCKET.CREATE_REPORT && (
					<>
						{getCurrencyRowFromObject("Report Fee", value?.fees?.[0])}
						{getAddressRow("Reporter Address", value?.reporter?.address, value?.reporter?.address_tag)}
						{getInfoRow("Reporter Name", value?.reporter?.name)}
						{getAddressRow("Reporter Validator", value?.reporter?.validator)}
						{getInfoRow("Request Id", value?.requestID)}

						<div className={cx("card")}>
							<div className={cx("card-header")}>Aggregated Result</div>
							<div className={cx("card-body")}>
								{Array.isArray(JSON.parse(atob(value?.aggregatedResult))) ? (
									JSON.parse(atob(value?.aggregatedResult)).map((item, index) => (
										<div className={cx("card")} key={"card-index"}>
											<div className={cx("card-body")}>
												{getInfoRow("Name", item?.name)}
												{getInfoRow("Price", item?.price)}
											</div>
										</div>
									))
								) : (
									<ReactJson
										style={{ backgroundColor: "transparent" }}
										name={false}
										theme={activeThemeId === themeIds.DARK ? "monokai" : "rjv-default"}
										displayObjectSize={false}
										displayDataTypes={false}
										collapsed={true}
										src={tryParseMessageBinary(value?.aggregatedResult)}
									/>
								)}
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
														style={{ backgroundColor: "transparent" }}
														name={false}
														theme={activeThemeId === themeIds.DARK ? "monokai" : "rjv-default"}
														displayObjectSize={false}
														displayDataTypes={false}
														collapsed={true}
														// src={tryParseMessage(JSON.parse(atob(item?.result)))}
														src={tryParseMessageBinary(item?.result)}
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
																		style={{ backgroundColor: "transparent" }}
																		name={false}
																		theme={activeThemeId === themeIds.DARK ? "monokai" : "rjv-default"}
																		displayObjectSize={false}
																		displayDataTypes={false}
																		collapsed={true}
																		// src={tryParseMessage(JSON.parse(atob(item?.result)))}
																		src={tryParseMessageBinary(item?.result)}
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
						{getAddressRow("Creator", value?.creator, value?.creator_tag)}
						{getInfoRow("Expected Output", atob(value?.expected_output) || "-")}
						{getCurrencyRowFromString("Transaction Fee", value?.fees)}
						{getInfoRow("Input", atob(value?.input) || "-")}
						{getInfoRow("Oracle Script Name", value?.oracle_script_name)}
						{getLinkRow("Request ID", "AI Request", value?.request_id, `/ai_requests/${value?.request_id}`)}
						{getInfoRow("Validator Count", value?.validator_count)}
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_VOTE, txTypes.COSMOS_SDK_NEW_VERSION.MSG_VOTE]) && (
					<>
						{getInfoRow("Option", value?.option)}
						{getLinkRow("Proposal ID", "Proposal", value?.proposal_id, `/proposals/${value?.proposal_id}`)}
						{getAddressRow("Voter", value?.voter, value?.voter_tag)}
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.INSTANTIATE_CONTRACT, txTypes.COSMOS_SDK_NEW_VERSION.INSTANTIATE_CONTRACT]) && (
					<>
						{getInfoRow("Code Id", value?.code_id)}
						{getInfoRow("Label", value?.label)}
						{getAddressRow("Sender", value?.sender, value?.sender_tag)}
						{getCurrencyRowFromObject("Init funds", value?.init_funds ?? value?.funds)}
						<InfoRow label='Message'>
							<ReactJson
								style={{ backgroundColor: "transparent" }}
								name={false}
								theme={activeThemeId === themeIds.DARK ? "monokai" : "rjv-default"}
								displayObjectSize={false}
								displayDataTypes={false}
								src={tryParseMessage(value?.init_msg ?? value?.msg)}
							/>
						</InfoRow>
						{getInfoRow("Contract Address", getContractAddress(data?.raw_log))}
					</>
				)}
				{/* update 23/3/2023: add IBC progress for MsgExecute */}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.EXECUTE_CONTRACT, txTypes.COSMOS_SDK_NEW_VERSION.EXECUTE_CONTRACT]) && (
					<>
						{getAddressRow("Contract", value?.contract, "", true)}
						{getAddressRow("Sender", value?.sender, value?.sender_tag)}
						{getTotalTransfer("Total Amount", data?.messages)}
						{getInfoRowFromRawData(wasmAttributes, "pair", "Pair")}
						{getPriceInfoFromRawData(wasmAttributes, "take_profit", "Take profit", quote)}
						{getPriceInfoFromRawData(wasmAttributes, "stop_loss", "Stop loss", quote)}
						{getPriceInfoFromRawData(wasmAttributes, "pnl", "Pnl", quote)}
						{getPriceInfoFromRawData(wasmAttributes, "withdraw_amount", "Withdraw amount", quote)}
						{getFundsRow("Sent funds", key, data?.messages?.[ind]?.sent_funds, data?.result, data?.amount)}
						<InfoRow label='Message'>
							<ReactJson
								style={{ backgroundColor: "transparent" }}
								name={false}
								theme={activeThemeId === themeIds.DARK ? "monokai" : "rjv-default"}
								displayObjectSize={false}
								displayDataTypes={false}
								src={tryParseMessage(value?.msg)}
							/>
						</InfoRow>
						{getTransferRow("Transfer", key, data?.raw_log, data?.result)}
						{getMultiRoyaltyRow("Royalty", key, data?.raw_log, data?.result)}
						{checkAttributeEvents(data?.raw_log, "send_packet") && getIBCProgressRow("IBC Progress", data)}
					</>
				)}
				{/* add IBC Progress */}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_IBC_TRANSFER, txTypes.COSMOS_SDK_NEW_VERSION.MSG_IBC_TRANSFER]) && (
					<>
						{getInfoRow("Source Port", value?.source_port)}
						{getInfoRow("Source Channel", value?.source_channel)}
						{getCurrencyRowFromObject("Token", value?.amount)}
						{getAddressRow("Sender", value?.sender)}
						{getAddressRow("Receiver", value?.receiver)}
						{getInfoRow("Timeout Height", value?.timeout_height?.revision_height)}
						{getInfoRow("Timeout Timestamp", value?.timeout_timestamp)}
						{getInfoRow("Memo Messages", data?.messages?.[ind]?.memo)}
						{checkAttributeEvents(data?.raw_log, "send_packet") && getIBCProgressRow("IBC Progress", data)}
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_IBC_UPDATE_CLIENT, txTypes.COSMOS_SDK_NEW_VERSION.MSG_IBC_UPDATE_CLIENT]) && (
					<>
						{getAddressRow("Signer", value?.signer)}
						{getInfoRow("Client ID", value?.client_id)}
						{getInfoRow("Block", value?.header.signed_header.header.version.block)}
						{getInfoRow("App", value?.header.signed_header.header.version.app)}
						{getInfoRow("Chain ID", value?.header.signed_header.header.chain_id)}
						{getInfoRow("Height", value?.header.signed_header.header.height)}
						{getInfoRow("Time", value?.header.signed_header.header.time)}
						{getInfoRow("Last Commit Hash", value?.header.signed_header.header.last_commit_hash)}
						{getInfoRow("Data Hash", value?.header.signed_header.header.data_hash)}
						{getInfoRow("Validators Hash", value?.header.signed_header.header.validators_hash)}
						{getInfoRow("Next Validators Hash", value?.header.signed_header.header.next_validators_hash)}
						{getInfoRow("Consensus Hash", value?.header.signed_header.header.consensus_hash)}
						{getInfoRow("App Hash", value?.header.signed_header.header.app_hash)}
						{getInfoRow("Last Results Hash", value?.header.signed_header.header.last_results_hash)}
						{getInfoRow("Evidence Hash", value?.header.signed_header.header.evidence_hash)}
						{getInfoRow("Proposer Address", value?.header.signed_header.header.proposer_address)}
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_IBC_RECV_PACKET, txTypes.COSMOS_SDK_NEW_VERSION.MSG_IBC_RECV_PACKET]) && (
					<>
						{getAddressRow("Signer", value?.signer)}
						{getInfoRow("Sequence", value?.packet.sequence)}
						{getInfoRow("Source Channel", value?.packet.source_channel)}
						{getInfoRow("Destination Channel", value?.packet.destination_channel)}
						{getInfoRow("Proof Height", value?.proof_height.revision_height)}
						{getIbcReceivedRows(value?.packet.data)}
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.STORE_CODE, txTypes.COSMOS_SDK_NEW_VERSION.STORE_CODE]) && (
					<>
						{getInfoRow("Code Id", value?.code_id)}
						{getAddressRow("Sender", value?.sender, value?.sender_tag)}
						{getInfoRow("Builder", value?.builder)}
						{getInfoRow("Instantiate permission", value?.instantiate_permission)}
						<InfoRow
							customValueClassName={cx("store-code-value")}
							label={<div className={cx("store-code-title")}>Data: gzip - {value?.wasm_byte_code.length} bytes</div>}>
							{storeCodeElement}
						</InfoRow>
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_SUBMIT_PROPOSAL, txTypes.COSMOS_SDK_NEW_VERSION.MSG_SUBMIT_PROPOSAL]) && (
					<>
						{getAddressRow("Proposer", value?.proposer, value?.proposer_tag)}
						{value?.content && getInfoRow("Proposal type", value?.content["@type"])}
						{getInfoRow("Title", value?.content?.title)}
						{getHtmlRow("Description", value?.content?.description)}
						{value?.content && getSubmitProposalContent(value?.content["@type"])}
						{getCurrencyRowFromObject("Initial deposit", value?.initial_deposit?.[0])}
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_DEPOSIT, txTypes.COSMOS_SDK_NEW_VERSION.MSG_DEPOSIT]) && (
					<>
						{getAddressRow("Depositor", value?.depositor, value?.depositor_tag)}
						{getCurrencyRowFromObject("Amount", value?.amount?.[0])}
						{getLinkRow("Proposal ID", "Proposal", value?.proposal_id, `/proposals/${value?.proposal_id}`)}
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_BEGIN_REDELEGATE, txTypes.COSMOS_SDK_NEW_VERSION.MSG_BEGIN_REDELEGATE]) && (
					<>
						{getAddressRow("Delegator Address", value?.delegator_address, "")}
						{getAddressRow("Source Validator", value?.validator_src_address, "")}
						{getAddressRow("Destination Validator", value?.validator_dst_address, "")}
						{getCurrencyRowFromObject("Amount", value?.amount)}
						{/* <InfoRow label='Time'>
							<div className={cx("text")}>
								{_.isNil(getRedelegateTime(key, data?.raw_log, data?.result))
									? "-"
									: setAgoTime(getRedelegateTime(key, data?.raw_log, data?.result)) +
									" (" +
									getTotalTime(getRedelegateTime(key, data?.raw_log, data?.result)) +
									")"}
							</div>
						</InfoRow> */}
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_CONNECTION_OPEN_CONFIRM, txTypes.COSMOS_SDK_NEW_VERSION.MSG_CONNECTION_OPEN_CONFIRM]) && (
					<>
						{getAddressRow("Signer", value?.signer)}
						{getInfoRow("Connection ID", value?.connection_id)}
						{getInfoRow("Height", value?.proof_height?.revision_height)}
						{getInfoRow("Number", value?.proof_height?.revision_number)}
						{getInfoRowSummary("Proof Ack", value?.proof_ack)}
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_CREATE_CLIENT, txTypes.COSMOS_SDK_NEW_VERSION.MSG_CREATE_CLIENT]) && (
					<>
						{getAddressRow("Signer", value?.signer)}
						{getInfoRow("Chain ID", value?.client_state?.chain_id)}
						{getInfoRow("Height", value?.client_state?.latest_height?.revision_height)}
						{getInfoRow("Revision", value?.client_state?.latest_height?.revision_number)}
						{getInfoRow("Next Validators Hash", value?.consensus_state?.next_validators_hash)}
						{getInfoRow("Max Clock Drift", value?.client_state?.max_clock_drift)}
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_CONNECTION_OPEN_TRY, txTypes.COSMOS_SDK_NEW_VERSION.MSG_CONNECTION_OPEN_TRY]) && (
					<>
						{getAddressRow("Signer", value?.signer)}
						{getInfoRow("Chain ID", value?.client_state?.chain_id)}
						{getInfoRow("Height", value?.client_state?.latest_height?.revision_height)}
						{getInfoRow("Max Clock Drift", value?.client_state?.max_clock_drift)}
						{getInfoRowSummary("Proof Client", value?.proof_client)}
						{getInfoRowSummary("Proof Consensus", value?.proof_consensus)}
						{getInfoRowSummary("Proof Init", value?.proof_init)}
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_CHANNEL_OPEN_TRY, txTypes.COSMOS_SDK_NEW_VERSION.MSG_CHANNEL_OPEN_TRY]) && (
					<>
						{getAddressRow("Signer", value?.signer)}
						{getInfoRow("Port ID", value?.port_id)}
						{getInfoRow("Counterparty Version", value?.counterparty_version)}
						{getInfoRow("Channel ID", value?.channel?.counterparty?.channel_id)}
						{getInfoRowSummary("Proof Init", value?.proof_init)}
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_CHANNEL_OPEN_CONFIRM, txTypes.COSMOS_SDK_NEW_VERSION.MSG_CHANNEL_OPEN_CONFIRM]) && (
					<>
						{getAddressRow("Signer", value?.signer)}
						{getInfoRow("Port ID", value?.port_id)}
						{getInfoRow("Channel ID", value?.channel_id)}
						{getInfoRowSummary("Proof Ack", value?.proof_ack)}
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_CONNECT_OPEN_INIT, txTypes.COSMOS_SDK_NEW_VERSION.MSG_CONNECT_OPEN_INIT]) && (
					<>
						{getAddressRow("Signer", value?.signer)}
						{getInfoRow("Client ID", value?.client_id)}
						{getInfoRow("Delay", value?.delay_period)}
						{getInfoRow("Connection ID", value?.connection_id)}
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_CONNECTION_OPEN_ACK, txTypes.COSMOS_SDK_NEW_VERSION.MSG_CONNECTION_OPEN_ACK]) && (
					<>
						{getAddressRow("Signer", value?.signer)}
						{getInfoRow("Chain ID", value?.client_state?.chain_id)}
						{getInfoRow("Connection ID", value?.connection_id)}
						{getInfoRowSummary("Proof Client", value?.proof_client)}
						{getInfoRowSummary("Proof Consensus", value?.proof_consensus)}
						{getInfoRowSummary("Proof Try", value?.proof_try)}
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_CHANNEL_OPEN_INIT, txTypes.COSMOS_SDK_NEW_VERSION.MSG_CHANNEL_OPEN_INIT]) && (
					<>
						{getAddressRow("Signer", value?.signer)}
						{getInfoRow("Port ID", value?.port_id)}
						{getInfoRowSummary("Version", value?.channel?.version)}
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_CHANNEL_OPEN_ACK, txTypes.COSMOS_SDK_NEW_VERSION.MSG_CHANNEL_OPEN_ACK]) && (
					<>
						{getAddressRow("Signer", value?.signer)}
						{getInfoRow("Port ID", value?.port_id)}
						{getInfoRow("Channel ID", value?.channel_id)}
						{getInfoRow("Version", value?.counterparty_version)}
						{getInfoRowSummary("Proof Try", value?.proof_try)}
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_CHANNEL_ACKNOWLEDGEMENT, txTypes.COSMOS_SDK_NEW_VERSION.MSG_CHANNEL_ACKNOWLEDGEMENT]) && (
					<>
						{getAddressRow("Signer", value?.signer)}
						{getInfoRow("Sequence", value?.packet.sequence)}
						{getInfoRow("Source Port", value?.packet?.source_port)}
						{getInfoRow("Source Channel", value?.packet?.source_channel)}
						{getInfoRow("Desination Port", value?.packet?.destination_port)}
						{getInfoRow("Desination Channel", value?.packet?.destination_channel)}
						<InfoRow label='Data'>
							<ReactJson
								style={{ backgroundColor: "transparent" }}
								name={false}
								theme={activeThemeId === themeIds.DARK ? "monokai" : "rjv-default"}
								displayObjectSize={false}
								displayDataTypes={false}
								src={JSON.parse(atob(value?.packet?.data))}
							/>
						</InfoRow>
						{getInfoRow("Revision Number", value?.packet?.timeout_height?.revision_number)}
						{getInfoRow("Revision Height", value?.packet?.timeout_height?.revision_height)}
						{getInfoRow("Proof Number", value?.proof_height?.revision_number)}
						{getInfoRow("Proof Height", value?.proof_height?.revision_height)}
						{getInfoRow("Timeout Timestamp", new Date(value?.packet?.timeout_timestamp / Math.pow(10, 9)).toTimeString())}
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_TIMEOUT, txTypes.COSMOS_SDK_NEW_VERSION.MSG_TIMEOUT]) && (
					<>
						{getAddressRow("Signer", value?.signer)}
						{getInfoRow("Sequence", value?.packet?.sequence)}
						{getInfoRow("Next Sequence Recv", value?.next_sequence_recv)}
						{getInfoRow("Destination Channel", value?.packet?.destination_channel)}
						{getInfoRow("Destination Port", value?.packet?.destination_port)}
						{getInfoRow("Source Channel", value?.packet?.source_channel)}
						{getInfoRow("Source Port", value?.packet?.source_port)}
						{getInfoRow("Height", value?.proof_height?.revision_height)}
						{getInfoRow("Timeout Timestamp", new Date(value?.packet?.timeout_timestamp / Math.pow(10, 9)).toTimeString())}
						{getInfoRowThreeDots("Unreceived", value?.proof_unreceived)}
						<InfoRow label='Message'>
							<ReactJson
								style={{ backgroundColor: "transparent" }}
								name={false}
								theme={activeThemeId === themeIds.DARK ? "monokai" : "rjv-default"}
								displayObjectSize={false}
								displayDataTypes={false}
								src={JSON.parse(atob(value?.packet?.data))}
							/>
						</InfoRow>
					</>
				)}
				{compareTypeMessage(type, [txTypes.COSMOS_SDK.MSG_MIGRATE_CONTRACT, txTypes.COSMOS_SDK_NEW_VERSION.MSG_MIGRATE_CONTRACT]) && (
					<>
						{getInfoRow("Code ID", value?.code_id)}
						{getAddressRow("Contract", value?.contract)}
						{getAddressRow("Sender", value?.sender)}
						<InfoRow label='Migrate Msg'>
							<ReactJson
								style={{ backgroundColor: "transparent" }}
								name={false}
								theme={activeThemeId === themeIds.DARK ? "monokai" : "rjv-default"}
								displayObjectSize={false}
								displayDataTypes={false}
								src={value?.migrate_msg}
							/>
						</InfoRow>
					</>
				)}
				{getRawLog(data?.raw_log, ind)}
			</div>
		</>
	);
};

export default TxMessageContent;
