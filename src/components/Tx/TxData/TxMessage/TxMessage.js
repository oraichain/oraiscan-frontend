import React, { useMemo, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactJson from "src/components/ReactJson";
import PropTypes from "prop-types";
import cn from "classnames/bind";
import { Fade, Tooltip } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SyntaxHighlighter from "react-syntax-highlighter";
import { agate } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { foundation } from "react-syntax-highlighter/dist/esm/styles/hljs";
import copy from "copy-to-clipboard";
import Interweave from "interweave";
import consts from "src/constants/consts";
import txTypes from "src/constants/txTypes";
import getTxTypeIcon from "src/constants/getTxTypeIcon";
import { themeIds } from "src/constants/themes";
import useGithubSource from "src/hooks/useGithubSource";
import { formatOrai, formatFloat, extractValueAndUnit, checkTokenCW20 } from "src/helpers/helper";
import { showAlert } from "src/store/modules/global";
import { loadMore, loadAll } from "src/store/modules/txs";
import { divide } from "src/lib/Big";
import { _, reduceString, reduceStringAssets } from "src/lib/scripts";
import Address from "src/components/common/Address";
import LinkRow from "src/components/common/LinkRow";
import InfoRow from "src/components/common/InfoRow/InfoRow";
import ThemedTable from "src/components/common/ThemedTable";
import TxMessageContent from "./TxMessageContent";
import copyIcon from "src/assets/common/copy_ic.svg";
import styles from "./TxMessage.module.scss";
import { tryParseMessage } from "src/lib/scripts";
import IBCProgress from "./IBCProgress";
import { CW20_DECIMALS } from "@oraichain/oraidex-common/build/constant";
import { toDisplay } from "@oraichain/oraidex-common/build/helper";
const cx = cn.bind(styles);

const getTxTypeNew = (type, result = "", value) => {
	const typeArr = type.split(".");
	let typeMsg = typeArr[typeArr.length - 1];
	if (typeMsg === "MsgExecuteContract" && result === "Success") {
		if (value?.msg) {
			for (let val in value?.msg) {
				let attValue = val
					.split("_")
					.map(word => word.charAt(0).toUpperCase() + word.slice(1))
					.join("");
				typeMsg += "/" + attValue;
			}
		}
	}
	return typeMsg;
};

const tryParseMessageBinary = data => {
	try {
		const obj = JSON.parse(atob(data));
		if (!obj) return;
		for (let key in obj) {
			if (obj[key].msg && typeof obj[key].msg === "string") {
				try {
					obj[key].msg = JSON.parse(atob(obj[key].msg));
				} catch {}
			}
		}
		return obj;
	} catch (e) {
		return { data };
	}
};

const TxMessage = ({ key, msg, data, ind }) => {
	const dispatch = useDispatch();
	const fees = useSelector(state => state.blockchain.fees);
	const status = useSelector(state => state.blockchain.status);
	const storageData = useSelector(state => state.contact);
	const activeThemeId = useSelector(state => state.activeThemeId);
	const loadMoreValue = useSelector(state => state.txs.loadMore);
	const { data: storeCodeData, loading: loadingStoreCode, error: storeCodeError, fetch: fetchStoreCode } = useGithubSource();
	const value = msg;

	let type = msg["@type"] || "";
	const { memo } = data;
	useEffect(() => {
		if (type === txTypes.COSMOS_SDK.STORE_CODE || type === txTypes.COSMOS_SDK_NEW_VERSION.STORE_CODE) {
			const loadStoreCode = async () => {
				let source = msg?.source;
				source = source?.split?.(" ")?.[0];
				fetchStoreCode(source);
			};

			loadStoreCode();
		}
	}, [type, msg.source]);

	const messageDetails = useMemo(() => {
		const getAmountHeaderRow = () => {
			const validatorHeaderCell = <div className={cx("header-cell")}>Value</div>;
			const amountHeaderCell = <div className={cx("header-cell")}>Denom</div>;
			const headerCells = [validatorHeaderCell, amountHeaderCell];
			const headerCellStyles = [
				{ width: "50px" }, // Address
				{ width: "50px" }, // Amount
			];

			return {
				headerCells,
				headerCellStyles,
			};
		};

		const getMultiSendHeaderRow = () => {
			const validatorHeaderCell = <div className={cx("header-cell")}>Address</div>;
			const amountHeaderCell = <div className={cx("header-cell")}>Amount</div>;
			const headerCells = [validatorHeaderCell, amountHeaderCell];
			const headerCellStyles = [
				{ minWidth: "150px" }, // Address
				{ minWidth: "150px" }, // Amount
			];

			return {
				headerCells,
				headerCellStyles,
			};
		};

		const getAmountValidatorCommission = () => {
			let value = "";
			if (data) {
				try {
					const newData = JSON.parse(data?.raw_log)[1];
					const item = newData?.events.find(val => val.type === "withdraw_commission");
					if (item) {
						const amountString = item?.attributes[0]?.value;
						const amount = amountString.slice(0, -4);
						const denom = amountString.slice(-4);
						value = {
							amount,
							denom,
						};
					}
				} catch (e) {
					return value;
				}
			}
			return value;
		};
		getAmountValidatorCommission();
		const getMultiSendDataRows = data => {
			if (!Array.isArray(data)) {
				return [];
			}
			let dataLoadMore = (loadMoreValue * 5 === value?.outputs?.length ? data : data?.slice(0, loadMoreValue * 5)) || [];
			return dataLoadMore.map(item => {
				const addressDataCell = _.isNil(item?.address) ? (
					<div className={cx("align-center")}>-</div>
				) : (
					<NavLink className={cx("address-data-cell")} to={`${consts.PATH.ACCOUNT}/${item?.address}`}>
						{item?.address_tag || item?.address}
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

		const getRoyaltyHeaderRow = () => {
			const validatorHeaderCell = <div className={cx("header-cell")}>Address</div>;
			const royaltyAmountHeaderCell = <div className={cx("header-cell")}>Royalty Amount</div>;
			const newRoyalHeaderCell = <div className={cx("header-cell")}>Royalty Percentage</div>;
			const headerCells = [validatorHeaderCell, royaltyAmountHeaderCell, newRoyalHeaderCell];
			const headerCellStyles = [
				{ width: "110px" }, // Address
				{ width: "110px" }, // Royalty Amount
				{ width: "80px" }, // Royalty Percentage
			];

			return {
				headerCells,
				headerCellStyles,
			};
		};

		const getRoyaltyDataRows = data => {
			return data.map(item => {
				const addressDataCell = _.isNil(item?.address) ? (
					<div className={cx("align-center")}>-</div>
				) : (
					<NavLink className={cx("address-data-cell")} to={`${consts.PATH.ACCOUNT}/${item?.address}`}>
						{item?.address_tag || item?.address}
					</NavLink>
				);

				const royaltyAmountDataCell = (
					<div className={cx("amount-data-cell")}>
						<div className={cx("amount")}>
							<span className={cx("amount-value")}>{item?.amount + " "}</span>
							<span className={cx("amount-denom")}>ORAI</span>
							<span className={cx("amount-usd")}>{status?.price ? " ($" + formatFloat(item?.amount * status.price, 4) + ")" : ""}</span>
						</div>
					</div>
				);

				const newRoyaltyDataCell = (
					<div className={cx("amount-data-cell")}>
						<div className={cx("amount")}>
							<span className={cx("amount-value")}>{item?.newRoyalty + " "}</span>
							<span className={cx("amount-denom")}>%</span>
						</div>
					</div>
				);

				return [addressDataCell, royaltyAmountDataCell, newRoyaltyDataCell];
			});
		};

		const getMultiRoyaltyRow = (label, key = 0, rawLog = "[]", result = "") => {
			const royalty = getRoyaltyDetail(key, rawLog, result);

			return (
				royalty.checkRoyalty && (
					<InfoRow label={label}>
						<ThemedTable
							headerCellStyles={getRoyaltyHeaderRow()?.headerCellStyles}
							headerCells={getRoyaltyHeaderRow()?.headerCells}
							dataRows={getRoyaltyDataRows(royalty.royaltys)}
						/>
					</InfoRow>
				)
			);
		};

		const getInfoRow = (label, value) => (
			<InfoRow label={label}>
				<span className={cx("text")}>{_.isNil(value) ? "-" : value}</span>
			</InfoRow>
		);

		const getInfoPriceRow = (label, value, denom) => (
			<InfoRow label={label}>
				<span className={cx("text")}>
					{_.isNil(value) ? "-" : toDisplay(BigInt(Math.trunc(value)), CW20_DECIMALS)}&nbsp;
					{denom}
				</span>
			</InfoRow>
		);

		const getInfoRowThreeDots = (label, value) => (
			<InfoRow label={label}>
				<span className={cx("text-three-dots")}>{_.isNil(value) ? "-" : value}</span>
			</InfoRow>
		);

		const getWasmDataJson = rawLog => {
			let messageParse = [];
			try {
				messageParse = tryParseMessage(JSON.parse(rawLog));
			} catch (error) {
				messageParse = [{ error: rawLog }];
			} finally {
				const wasmData = messageParse[0]?.events?.find(e => e.type === "wasm");
				const wasmAttributes = wasmData?.attributes;

				const pair = wasmData?.attributes?.find(wd => wd.key === "pair");
				const [base, quote] = pair?.value?.split("/") || [];

				return {
					base,
					quote,
					wasmAttributes,
				};
			}
		};

		const getInfoRowFromRawData = (wasmAttributes, key, label) => {
			const data = wasmAttributes?.find(wd => wd.key === key);

			return !data ? null : getInfoRow(label, data.value);
		};

		const getPriceInfoFromRawData = (wasmAttributes, key, label, denom) => {
			const data = wasmAttributes?.find(wd => wd.key === key);

			return !data ? null : getInfoPriceRow(label, data.value, denom);
		};

		const getRawLog = rawLog => {
			let messageParse = [];
			try {
				messageParse = tryParseMessage(JSON.parse(rawLog));
			} catch (error) {
				messageParse = [{ error: rawLog }];
			} finally {
				return (
					<InfoRow label='RawLog'>
						<ReactJson
							style={{ backgroundColor: "transparent" }}
							name={false}
							theme={activeThemeId === themeIds.DARK ? "monokai" : "rjv-default"}
							displayObjectSize={false}
							displayDataTypes={false}
							collapsed={4}
							src={messageParse}
						/>
					</InfoRow>
				);
			}
		};

		const getInfoRowSummary = (label, value) => (
			<InfoRow label={label}>
				<span className={cx("text")}>{_.isNil(value) ? "-" : reduceStringAssets(value, 80, 10)}</span>
			</InfoRow>
		);

		const getIbcReceivedRows = value => {
			const data = JSON.parse(atob(value));
			const denomCheck = checkTokenCW20(data.denom);
			return (
				<div>
					{getInfoRow("Denom", reduceString(denomCheck?.denom || data?.denom))}
					{getInfoRow("Amount", denomCheck?.status ? formatOrai(+data.amount / Math.pow(10, denomCheck?.decimal), 1, 6) : data.amount)}
					{getAddressRow("Receiver", data.receiver)}
					{getInfoRow("Sender", data.sender)}
				</div>
			);
		};

		const getHtmlRow = (label, value) => (
			<InfoRow label={label}>
				<div className={cx("html")}>{_.isNil(value) ? "-" : <Interweave content={value} />}</div>
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

			const { valueString, unitString } = extractValueAndUnit(inputString);
			const amount = parseFloat(valueString);
			const denom = unitString;

			return (
				<InfoRow label={label}>
					<div className={cx("amount")}>
						<span className={cx("amount-value")}>{formatOrai(amount)}</span>
						<span className={cx("amount-denom")}>{reduceString(denom)}</span>
						<span className={cx("amount-usd")}>{!_.isNil(amount) ? " ($" + formatFloat((amount / 1000000) * status.price, 4) + ")" : ""}</span>
					</div>
				</InfoRow>
			);
		};

		const parseRawEvents = (events, type) => {
			return events.find(event => event.type === type);
		};

		const handleCurrencyData = ({ label, denom, denom_name, amount, keepOriginValue }) => {
			let finalDenom = denom;
			if (denom !== consts.DENOM) {
				var logs;
				try {
					const logs = JSON.parse(data.raw_log);
					const ibcTransferEvent = parseRawEvents(logs[0].events, "send_packet");
					// process denom for msg transfer case
					if (ibcTransferEvent) {
						const packetData = JSON.parse(ibcTransferEvent.attributes.find(attr => attr.key === "packet_data").value).denom;
						finalDenom = packetData.split("/")[2]; // syntax: transfer/channel-15/uatom. trim the first character and upper everything
						if (finalDenom.charAt(0) === "u") finalDenom = finalDenom.substring(1).toUpperCase();
						else finalDenom = finalDenom.toUpperCase();
					}
				} catch (error) {
					console.log("get currency row from object error: ", error);
				}
			}
			let formatedAmount;
			let calculatedValue;
			const denomCheck = checkTokenCW20(denom_name);
			if (keepOriginValue) {
				calculatedValue = amount;
				formatedAmount = denomCheck?.denom ? formatOrai(amount, Math.pow(10, denomCheck?.decimal)) : formatOrai(amount, 1);
			} else {
				calculatedValue = amount / 1000000;
				formatedAmount = denomCheck?.denom ? formatOrai(amount, Math.pow(10, denomCheck?.decimal)) : formatOrai(amount);
			}
			const amountValue = <span className={cx("amount-value")}>{formatedAmount + " "}</span>;
			const amountDenom = (
				<span className={cx("amount-denom")}>
					{denomCheck?.denom || denom_name || (finalDenom && String(finalDenom).toLowerCase() === consts.DENOM ? finalDenom : consts.MORE)}
				</span>
			);
			const amountUsd = (
				<>
					{finalDenom === consts.DENOM && (
						<span className={cx("amount-usd")}>{status?.price ? " ($" + formatFloat(calculatedValue * status.price, 4) + ")" : ""}</span>
					)}
				</>
			);
			return { amountValue, amountDenom, amountUsd };
		};

		const handleConditionAmount = (label, inputObject, keepOriginValue = false) => {
			if (Array.isArray(inputObject) && inputObject.length > 1) {
				const dataRows = inputObject.map(val => {
					const { amount, denom, denom_name } = val;
					const { amountValue, amountDenom, amountUsd } = handleCurrencyData({ label, denom, denom_name, amount, keepOriginValue });
					const amountCell = (
						<div className={cx("amount")}>
							{amountValue}
							{amountDenom}
						</div>
					);
					return [amountCell, amountDenom];
				});

				return (
					<div style={{ maxWidth: "50%" }}>
						<ThemedTable headerCellStyles={getAmountHeaderRow()?.headerCellStyles} headerCells={getAmountHeaderRow()?.headerCells} dataRows={dataRows} />
					</div>
				);
			} else {
				const { amount, denom, denom_name } = inputObject[0] ? inputObject[0] : inputObject;
				const { amountValue, amountDenom, amountUsd } = handleCurrencyData({ label, denom, denom_name, amount, keepOriginValue });
				return (
					<div className={cx("amount")}>
						{amountValue}
						{amountDenom}
						{amountUsd}
					</div>
				);
			}
		};

		const getCurrencyRowFromObject = (label, inputObject, keepOriginValue = false) => {
			if (!inputObject || inputObject?.length <= 0) {
				return null;
			}
			const amountData = handleConditionAmount(label, inputObject, keepOriginValue);
			return <InfoRow label={label}>{amountData}</InfoRow>;
		};

		const getImageRow = (label, src) => (
			<InfoRow label={label}>
				<img src={src} className={cx("responsive-image")} />
			</InfoRow>
		);

		const getNameByAddress = address => {
			return storageData?.[address]?.name;
		};

		const getAddressRow = (label, address, name, isSmartContract = false) => (
			<InfoRow label={label}>
				<Address name={name ?? getNameByAddress(address)} address={address} showCopyIcon={true} size='lg' isSmartContract={isSmartContract} />
			</InfoRow>
		);

		const getMultiAddressRow = (label, address) => (
			<InfoRow label={label}>
				<ThemedTable
					headerCellStyles={getMultiSendHeaderRow()?.headerCellStyles}
					headerCells={getMultiSendHeaderRow()?.headerCells}
					dataRows={getMultiSendDataRows(address)}
				/>
				<div className={cx("load-more")}>
					<div
						className={cx("load-more-result")}
						onClick={() => {
							if (loadMoreValue * 5 >= value?.outputs?.length) {
								return;
							}
							dispatch(loadMore());
						}}>
						Load More Result (+5)
					</div>
					<div
						className={cx("load-more-result")}
						onClick={() => {
							dispatch(
								loadAll({
									loadMore: loadMoreValue * 5 < value?.outputs?.length ? value?.outputs?.length : 1,
								})
							);
						}}>
						{loadMoreValue * 5 < value?.outputs?.length ? "Load More All Result" : "Load More Less"}
					</div>
				</div>
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

		let storeCodeElement;
		if (type === txTypes.COSMOS_SDK.STORE_CODE || type === txTypes.COSMOS_SDK_NEW_VERSION.STORE_CODE) {
			if (loadingStoreCode) {
				storeCodeElement = <Skeleton className={cx("skeleton-block")} variant='rect' height={200} />;
			} else {
				if (storeCodeError) {
					storeCodeElement = <div>-</div>;
				} else {
					if (Array.isArray(storeCodeData)) {
						storeCodeElement = storeCodeData.map((item, index) => {
							return (
								<div className={cx("code-container")}>
									<Accordion key={"code-" + index}>
										<AccordionSummary expandIcon={<ExpandMoreIcon />}>
											<div className={cx("code-name")}>{item?.name ?? "-"}</div>
											<img
												src={copyIcon}
												alt=''
												className={cx("code-copy")}
												onClick={e => {
													copy(item?.content ?? "-");
													dispatch(
														showAlert({
															show: true,
															message: "Copied",
															autoHideDuration: 1500,
														})
													);
													e.stopPropagation();
												}}
											/>
										</AccordionSummary>
										<AccordionDetails>
											<SyntaxHighlighter
												customStyle={{ background: "none", overflow: "auto", width: "100%" }}
												language='rust'
												style={activeThemeId === themeIds.LIGHT ? foundation : agate}>
												{item?.content ?? "-"}
											</SyntaxHighlighter>
										</AccordionDetails>
									</Accordion>
								</div>
							);
						});
					} else {
						storeCodeElement = <div>-</div>;
					}
				}
			}
		}

		const getContractAddress = rawLogString => {
			try {
				const rawLogObj = JSON.parse(rawLogString);
				const messageEvent = rawLogObj[0].events.find(event => event?.type === "instantiate");

				if (_.isNil(messageEvent)) {
					return "-";
				}

				const contractAddressObj = messageEvent?.attributes?.find(attribute => attribute.key === "_contract_address" || attribute.key === "contract_address");
				if (_.isNil(contractAddressObj)) {
					return "-";
				}

				const contractAddress = contractAddressObj.value;
				return contractAddress;
			} catch (err) {
				return "-";
			}
		};

		const getSubmitProposalContent = proposalType => {
			switch (proposalType) {
				case "/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal":
					return (
						<>
							<InfoRow label='Plan'>
								<ReactJson
									style={{ backgroundColor: "transparent" }}
									name={false}
									theme={activeThemeId === themeIds.DARK ? "monokai" : "rjv-default"}
									displayObjectSize={false}
									displayDataTypes={false}
									src={value?.content.plan}
								/>
							</InfoRow>
						</>
					);
				case "/cosmos.params.v1beta1.ParameterChangeProposal":
					return (
						<>
							<InfoRow label='Changes'>
								<ReactJson
									style={{ backgroundColor: "transparent" }}
									name={false}
									theme={activeThemeId === themeIds.DARK ? "monokai" : "rjv-default"}
									displayObjectSize={false}
									displayDataTypes={false}
									src={value?.content.changes}
								/>
							</InfoRow>
						</>
					);
				default:
					break;
			}
		};

		const getTransferHeaderRow = () => {
			const recipientHeaderCell = <div className={cx("header-cell")}>Recipient</div>;
			const senderHeaderCell = <div className={cx("header-cell")}>Sender</div>;
			const amountHeaderCell = <div className={cx("header-cell")}>Amount</div>;
			const headerCells = [recipientHeaderCell, senderHeaderCell, amountHeaderCell];
			const headerCellStyles = [
				{ width: "326px" }, // Recipient
				{ width: "326px" }, // Sender
				{ minWidth: "80px" }, // Amount
			];

			return {
				headerCells,
				headerCellStyles,
			};
		};

		const getFundsHeaderRow = () => {
			const denomHeaderCell = <div className={cx("header-cell")}>Denom</div>;
			const amountHeaderCell = <div className={cx("header-cell")}>Amount</div>;
			const headerCells = [denomHeaderCell, amountHeaderCell];
			const headerCellStyles = [
				{ width: "652px" }, // Demon
				{ minWidth: "80px" }, // Amount
			];

			return {
				headerCells,
				headerCellStyles,
			};
		};

		const getTransfer = (key = 0, rawLog = "[]", result = "") => {
			let checkTransfer = false;
			let msgTransfer = [];
			if (result === "Success") {
				let rawLogArr = JSON.parse(rawLog);
				for (let event of rawLogArr[key].events) {
					if (event["type"] === "transfer") {
						checkTransfer = true;
						let start = false;
						let obj = {};
						for (let att of event["attributes"]) {
							if (att["key"] === "recipient") {
								start = true;
								obj = { recipient: att["value"] };
								continue;
							}

							if (start && att["key"] === "sender") {
								obj.sender = att["value"];
								continue;
							}

							if (start && att["key"] === "amount") {
								const value = att["value"]?.split(",") || [];
								for (let i = 0; i < value.length; i++) {
									const e = value[i];
									let splitValue = e.split("/");
									let splitTextNumber = processText(splitValue?.[0]);
									obj = {
										...obj,
										amount: +splitTextNumber?.[0]?.[0] / Math.pow(10, 6),
										demon: splitTextNumber?.[0]?.[1],
										txs: splitValue?.[1],
									};
									msgTransfer.push(obj);
								}
								continue;
							}
						}

						break;
					}
				}
			}
			return { checkTransfer: checkTransfer, transfers: msgTransfer };
		};

		const processText = inputText => {
			let output = [];
			let json = inputText.split(" ");
			json.forEach(function(item) {
				output.push(
					item
						.replace(/\'/g, "")
						.split(/(\d+)/)
						.filter(Boolean)
				);
			});
			return output;
		};

		const getTransferRow = (label, key = 0, rawLog = "[]", result = "") => {
			const transfer = getTransfer(key, rawLog, result);

			return (
				transfer.checkTransfer && (
					<InfoRow isTransfer={true} label={label}>
						{Array.isArray(transfer.transfers) && transfer?.transfers?.length !== 0 && (
							<ThemedTable
								headerCellStyles={getTransferHeaderRow()?.headerCellStyles}
								headerCells={getTransferHeaderRow()?.headerCells}
								dataRows={getTransferDataRows(transfer.transfers)}
							/>
						)}
					</InfoRow>
				)
			);
		};

		const getFundsRow = (label, key = 0, rawLog = [], result = "", amount) => {
			return (
				<>
					{Array.isArray(rawLog) && rawLog.length !== 0 && amount.length < 2 && (
						<InfoRow isTransfer={true} label={label}>
							<ThemedTable
								headerCellStyles={getFundsHeaderRow()?.headerCellStyles}
								headerCells={getFundsHeaderRow()?.headerCells}
								dataRows={getFundsDataRows(rawLog)}
							/>
						</InfoRow>
					)}
				</>
			);
		};

		const getTransferDataRows = data => {
			return data.map(item => {
				const recipientDataCell = _.isNil(item?.recipient) ? (
					<div className={cx("align-center")}>-</div>
				) : (
					<NavLink className={cx("address-data-cell")} to={`${consts.PATH.ACCOUNT}/${item?.recipient}`}>
						{item?.recipient}
					</NavLink>
				);

				const senderDataCell = _.isNil(item?.sender) ? (
					<div className={cx("align-center")}>-</div>
				) : (
					<NavLink className={cx("address-data-cell")} to={`${consts.PATH.ACCOUNT}/${item?.sender}`}>
						{item?.sender}
					</NavLink>
				);

				const amountDataCell = (
					<div className={cx("amount-data-cell")}>
						<div className={cx("amount")}>
							<span className={cx("amount-value")}>{item?.amount ? item?.amount : "0" + " "}</span>
							<span className={cx("amount-denom")}>{item?.demon}</span>
							<span className={cx("amount-usd")}>
								{/* {!item?.amount ? " ($0)" : status?.price ? " ($" + formatFloat(item?.amount * status.price, 4) + ")" : ""} */}
								{item?.txs ? reduceStringAssets(item?.txs, 3, 3) : " "}
							</span>
						</div>
					</div>
				);

				return [recipientDataCell, senderDataCell, amountDataCell];
			});
		};

		const getFundsDataRows = data => {
			return data.map(item => {
				let denomSplit = item?.denom?.split("/") || [];
				const denomDataCell = _.isNil(item?.denom) ? (
					<div className={cx("align-center")}>-</div>
				) : (
					<NavLink className={cx("address-data-cell")} to={`${consts.PATH.ACCOUNT}/${item?.denom}`}>
						{item?.denom}
					</NavLink>
				);
				const denomCheck = checkTokenCW20(item?.denom_name);
				const amountDataCell = (
					<div className={cx("amount-data-cell")}>
						<div className={cx("amount")}>
							<span className={cx("amount-value")}>
								{item?.amount ? (denomCheck.status ? item?.amount / Math.pow(10, denomCheck?.decimal) : item?.amount / Math.pow(10, 6)) : "0"}
							</span>
							<span className={cx("amount-denom")}>
								{reduceStringAssets(denomCheck.status ? denomCheck?.denom : item?.denom_name) || item?.denom || denomSplit?.[0]}
							</span>
						</div>
					</div>
				);

				return [denomDataCell, amountDataCell];
			});
		};

		const getRoyaltyDetail = (key = 0, rawLog = "[]", result = "") => {
			let royaltys = [];
			let checkRoyaltyAmount = false;
			if (result === "Success") {
				let rawLogArr = JSON.parse(rawLog);
				for (let index = rawLogArr[key].events.length - 1; index > -1; index--) {
					const event = rawLogArr[key].events[index];
					if (event["type"] === "wasm") {
						for (let att of event["attributes"]) {
							if (att["key"] === "action" && att["value"] === "pay_royalty") {
								checkRoyaltyAmount = true;
								continue;
							}

							if (att["key"] === "action" && att["value"] === "finish_pay_royalty") {
								break;
							}

							if (checkRoyaltyAmount && att["key"].startsWith("royalty_")) {
								const royaltyInfoArr = att["key"].split("_");
								const index = att["value"].indexOf("orai");
								const royaltyAmount = index !== -1 ? att["value"].slice(0, index) : att["value"];
								const obj = {
									address: royaltyInfoArr[1] ? royaltyInfoArr[1] : "0",
									amount: formatOrai(royaltyAmount),
									newRoyalty: formatOrai(royaltyInfoArr[2] ? royaltyInfoArr[2] : 0, 10000000, 2),
								};

								royaltys.push(obj);
							}
						}

						break;
					}
				}
			}

			return { checkRoyalty: checkRoyaltyAmount, royaltys: royaltys };
		};

		// add IBC progress
		const getIBCProgressRow = (label, data) => {
			return (
				<InfoRow label={label}>
					<IBCProgress dataTxs={data} />
				</InfoRow>
			);
		};

		return (
			<>
				<TxMessageContent
					type={type}
					txTypes={txTypes}
					data={data}
					value={value}
					memo={memo}
					getTxTypeNew={getTxTypeNew}
					getAddressRow={getAddressRow}
					getCurrencyRowFromObject={getCurrencyRowFromObject}
					getCurrencyRowFromString={getCurrencyRowFromString}
					getInfoRow={getInfoRow}
					getInfoRowSummary={getInfoRowSummary}
					getWebsiteRow={getWebsiteRow}
					getLinkRow={getLinkRow}
					getContractAddress={getContractAddress}
					getFundsRow={getFundsRow}
					getHtmlRow={getHtmlRow}
					getMultiAddressRow={getMultiAddressRow}
					getAmountValidatorCommission={getAmountValidatorCommission}
					getIbcReceivedRows={getIbcReceivedRows}
					getTransferRow={getTransferRow}
					getMultiRoyaltyRow={getMultiRoyaltyRow}
					getSubmitProposalContent={getSubmitProposalContent}
					getInfoRowThreeDots={getInfoRowThreeDots}
					tryParseMessageBinary={tryParseMessageBinary}
					activeThemeId={activeThemeId}
					themeIds={themeIds}
					getRawLog={getRawLog}
					getInfoRowFromRawData={getInfoRowFromRawData}
					getWasmDataJson={getWasmDataJson}
					getPriceInfoFromRawData={getPriceInfoFromRawData}
					key={key}
					ind={ind}
					storeCodeElement={storeCodeElement}
					getIBCProgressRow={getIBCProgressRow}
				/>
			</>
		);
	}, [type, value, storageData, activeThemeId, loadingStoreCode, status, storeCodeData, storeCodeError, memo, dispatch, data, loadMoreValue]);
	return (
		<div className={cx("card")}>
			<div>{messageDetails}</div>
		</div>
	);
};

TxMessage.propTypes = {
	msg: PropTypes.any,
	data: PropTypes.any,
};
TxMessage.defaultProps = {};

export default TxMessage;
