// @ts-nocheck
import React, { memo } from "react";
import classNames from "classnames/bind";
import { useTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import copy from "copy-to-clipboard";
import Grid from "@material-ui/core/Grid";
import ReactJson from "src/components/ReactJson";
import _ from "lodash";
import Interweave from "interweave";
import { formatDateTime, formatOrai, isJsonString } from "src/helpers/helper";
import PassedIcon from "src/icons/Proposals/PassedIcon";
import RejectedIcon from "src/icons/Proposals/RejectedIcon";
import { useDispatch } from "src/hooks";
import CopyIcon from "src/icons/CopyIcon";
import { showAlert } from "src/store/modules/global";
import { themeIds } from "src/constants/themes";
import styles from "./DetailsCard.module.scss";
import { NavLink } from "react-router-dom";
import consts from "src/constants/consts";
import { addressDisplay } from "src/helpers/helper";
import txTypes from "src/constants/txTypes";
const cx = classNames.bind(styles);

const filter = {
	attribute(name, value) {
		if (name === "href") {
			return encodeURIComponent(value);
		}
		return {};
	},
	node(name, node) {
		if (name === "a") {
			node.setAttribute("target", "_blank");
		}
		return node;
	},
};

const DetailsCard = memo(({ data }) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const dispatch = useDispatch();
	const activeThemeId = useSelector(state => state.activeThemeId);

	let statusStateClassName;
	let statusIcon;
	let statusText;
	if (data?.status == "PROPOSAL_STATUS_PASSED") {
		statusStateClassName = "status-passed";
		statusIcon = <PassedIcon className={cx("status-icon-passed")}></PassedIcon>;
		statusText = "Passed";
	} else if (data?.status == "PROPOSAL_STATUS_REJECTED") {
		statusStateClassName = "status-rejected";
		statusIcon = <RejectedIcon className={cx("status-icon-rejected")}></RejectedIcon>;
		statusText = "Rejected";
	}

	const idElement = <span className={cx("proposal-id")}>{data?.proposal_id ? "#" + data.proposal_id : "-"}</span>;
	const statusElement = (
		<div className={cx("status", statusStateClassName)}>
			{statusIcon}
			<span className={cx("status-text")}>{statusText}</span>
		</div>
	);
	const titleElement = (
		<div className={cx("proposal-title")}>
			{data.type === txTypes.COSMOS_SDK_NEW_VERSION.EXECUTE_CONTRACT ? "Frontier List Token" + data?.title : data?.title ?? "-"}
		</div>
	);

	const proposerElementMobile = (
		<>
			<div className={cx("item-link")}>{addressDisplay(data?.proposer) ?? "-"}</div>
		</>
	);
	const denomElement = (
		<>
			<div className={cx("amount")}>
				<span className={cx("amount-denom")}>ORAI</span>
			</div>
		</>
	);
	const typeElement = (
		<>
			<div className={cx("item-link")}>{data?.type ? data.type.split(".").pop() : "-"}</div>
		</>
	);

	const totalDepositElement = (
		<>
			<div className={cx("amount")}>
				<span className={cx("amount-value")}>{data?.total_deposit ? formatOrai(data.total_deposit) : "-"}</span>
				<span className={cx("amount-denom")}>ORAI</span>
			</div>
		</>
	);
	const votingStartElement = (
		<>
			<div className={cx("item-text")}>{data?.voting_start && data?.status !== "PROPOSAL_STATUS_DEPOSIT_PERIOD" ? formatDateTime(data.voting_start) : "-"}</div>
		</>
	);
	const submitTimeElement = (
		<>
			<div className={cx("item-text")}>{data?.submit_time ? formatDateTime(data.submit_time) : "-"}</div>
		</>
	);
	const votingEndElement = (
		<>
			<div className={cx("item-text")}>{data?.voting_end && data?.status !== "PROPOSAL_STATUS_DEPOSIT_PERIOD" ? formatDateTime(data.voting_end) : "-"}</div>
		</>
	);
	const depositEndTimeElement = (
		<>
			<div className={cx("item-text")}>{data?.deposit_end_time ? formatDateTime(data.deposit_end_time) : "-"}</div>
		</>
	);

	const descriptionElement = (
		<div className={cx("description")}>
			<div className={cx("description-header")}>Description</div>
			<div dangerouslySetInnerHTML={{ __html: data?.description }} className={cx("description-body")} />
		</div>
	);

	const titleColumnElement = (
		<>
			<div className={cx("item-link")}>
				{data.type === txTypes.COSMOS_SDK_NEW_VERSION.EXECUTE_CONTRACT ? "Frontier List Token" + data?.title : data?.title ?? "-"}
			</div>
		</>
	);

	const proposerElement = (
		<tr>
			<td>
				<div className={cx("item-title")}>Proposer</div>
				<NavLink className={cx("tx-hash-data-cell", "align-left")} to={`${consts.PATH.ACCOUNT}/${data?.proposer ?? 0}`}>
					<span className={cx("item-text-proposer")}>{data?.proposer}</span>
				</NavLink>
			</td>
		</tr>
	);

	return (
		<div className={cx("details-card")}>
			{isLargeScreen ? (
				<Grid container spacing={1}>
					<Grid item xs={8}>
						<table className={cx("table-desktop")}>
							<tbody>
								<tr>
									<td colSpan={2}>
										<div className={cx("item-header")}>
											{idElement}
											{statusElement}
										</div>
									</td>
								</tr>

								<tr>
									<td>
										<div className={cx("item-title")}>Type</div>
										{typeElement}
									</td>
									<td>
										<div className={cx("item-title")}>Denom</div>
										{denomElement}
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("item-title")}>Title</div>
										{titleColumnElement}
									</td>
									<td>
										<div className={cx("item-title")}>Total Deposit</div>
										{totalDepositElement}
									</td>
								</tr>
								{data?.type && data?.type?.split(".")?.pop() === "UpdateAdminProposal" ? (
									<>
										<tr>
											<td>
												<div className={cx("item-title")}>New Admin</div>
												<div className={cx("item-new-admin")}>
													<NavLink className={cx("tx-hash-data-cell", "align-left")} to={`${consts.PATH.ACCOUNT}/${data?.new_admin}`}>
														<span className={cx("item-text-proposer")}>{data?.new_admin}</span>
													</NavLink>
												</div>
											</td>
										</tr>
										<tr>
											<td>
												<div className={cx("item-title")}>Contract Address</div>
												<div className={cx("item-proposer")}>
													<NavLink className={cx("tx-hash-data-cell", "align-left")} to={`${consts.PATH.SMART_CONTRACT}/${data?.contract}`}>
														<span className={cx("item-text-proposer")}>{data?.contract ?? "-"}</span>
													</NavLink>
												</div>
											</td>
										</tr>
									</>
								) : (
									""
								)}
								{data?.type && data?.type?.split(".")?.pop() === "SoftwareUpgradeProposal" ? (
									<>
										<tr>
											<td>
												<div className={cx("item-title")}>Name</div>
												<div className={cx("item-text")}>{data?.plan?.name ? data?.plan?.name : "-"}</div>
											</td>
											<td>
												<div className={cx("item-title")}>Time</div>
												<div className={cx("item-text")}>{data?.plan?.time ? data?.plan?.time : "-"}</div>
											</td>
										</tr>

										<tr>
											<td>
												<div className={cx("item-title")}>Height</div>
												<div className={cx("item-text")}>{data?.plan?.height ? data?.plan?.height : "-"}</div>
											</td>
											<td>
												<div className={cx("item-title")}>Infor</div>
												<a href={data?.plan?.info ?? undefined} target='_blank' className={cx("item-link", "copy")}>
													{data?.plan?.info?.length > 15 ? data?.plan?.info?.substring(0, 15) + "...." : data?.plan?.info || "-"}
												</a>
												<CopyIcon
													onClick={() => {
														copy(data?.plan?.info);
														dispatch(
															showAlert({
																show: true,
																message: "Copied",
																autoHideDuration: 1500,
															})
														);
													}}
													className={cx("copy-icon")}></CopyIcon>
											</td>
										</tr>
									</>
								) : (
									""
								)}

								{proposerElement}

								{data?.type && data?.type?.split(".")?.pop() === "CommunityPoolSpendProposal" && isJsonString(data.messages) ? (
									<tr>
										<td>
											<div className={cx("item-title")}>Recipient</div>
											{data.messages ? (
												<NavLink
													className={cx("tx-hash-data-cell", "align-left")}
													to={`${consts.PATH.ACCOUNT}/${JSON.parse(data.messages)[0]?.content?.recipient}`}>
													{JSON.parse(data.messages)[0]?.content?.recipient}
												</NavLink>
											) : (
												"-"
											)}
										</td>
										<td>
											<div className={cx("item-title")}>Amount</div>
											<div className={cx("item-text")}>
												{data.messages
													? `${formatOrai(JSON.parse(data.messages)[0]?.content?.amount?.[0]?.amount)} ${JSON.parse(
															data.messages
													  )[0]?.content?.amount?.[0]?.denom?.toUpperCase()}`
													: "-"}
											</div>
										</td>
									</tr>
								) : (
									""
								)}

								<tr>
									<td>
										<div className={cx("item-title")}>Voting Start</div>
										{votingStartElement}
									</td>
									<td>
										<div className={cx("item-title")}>Submit Time</div>
										{submitTimeElement}
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("item-title")}>Voting End</div>
										{votingEndElement}
									</td>
									<td>
										<div className={cx("item-title")}>Deposit End Time</div>
										{depositEndTimeElement}
									</td>
								</tr>
								{data?.changes && (
									<tr>
										<td>
											<div className={cx("item-title")}> Changes </div>
											<ReactJson
												style={{ backgroundColor: "transparent" }}
												name={false}
												theme={activeThemeId === themeIds.DARK ? "monokai" : "rjv-default"}
												displayObjectSize={false}
												displayDataTypes={false}
												src={data?.changes}
											/>
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</Grid>
					<Grid item xs={4}>
						{descriptionElement}
					</Grid>
				</Grid>
			) : (
				<table className={cx("table-mobile")}>
					<tbody>
						<tr>
							<td colSpan={2}>
								<div className={cx("item-header")}>
									{idElement}
									{statusElement}
								</div>
							</td>
						</tr>
						<tr>
							<td colSpan={2}>{titleElement}</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>Proposer</div>
							</td>
							<td>{proposerElementMobile}</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>Type</div>
							</td>
							<td>{typeElement}</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>Denom</div>
								{denomElement}
							</td>
							<td>
								<div className={cx("item-title")}>Total Deposit</div>
								{totalDepositElement}
							</td>
						</tr>
						{data?.type && data?.type?.split(".")?.pop() === "UpdateAdminProposal" ? (
							<>
								<tr>
									<td colSpan={2}>
										<div className={cx("item-title")}>New Admin</div>
										<div className={cx("item-new-admin")}>
											<NavLink className={cx("tx-hash-data-cell", "align-left")} to={`${consts.PATH.ACCOUNT}/${data?.new_admin}`}>
												<span className={cx("item-text-proposer")}>{data?.new_admin}</span>
											</NavLink>
										</div>
									</td>
								</tr>
								<tr>
									<td colSpan={2}>
										<div className={cx("item-title")}>Contract Address</div>
										<div className={cx("item-proposer")}>
											<NavLink className={cx("tx-hash-data-cell", "align-left")} to={`${consts.PATH.SMART_CONTRACT}/${data?.contract}`}>
												<span className={cx("item-text-proposer")}>{data?.contract ?? "-"}</span>
											</NavLink>
										</div>
									</td>
								</tr>
							</>
						) : (
							""
						)}
						{data?.type && data?.type?.split(".")?.pop() === "CommunityPoolSpendProposal" && isJsonString(data.messages) ? (
							<>
								<tr>
									<td>
										<div className={cx("item-title")}>Recipient</div>
									</td>
									<td>
										<NavLink
											className={cx("tx-hash-data-cell", "align-left")}
											to={`${consts.PATH.ACCOUNT}/${JSON.parse(data.messages)[0]?.content?.recipient}`}>
											{addressDisplay(JSON.parse(data.messages)[0]?.content?.recipient)}
										</NavLink>
									</td>
								</tr>
								<tr>
									<td>
										<div className={cx("item-title")}>Amount</div>
									</td>
									<td>
										<div className={cx("item-text")}>
											{data.messages
												? `${JSON.parse(data.messages)[0]?.content?.amount?.[0]?.amount} ${JSON.parse(
														data.messages
												  )[0]?.content?.amount?.[0]?.denom?.toUpperCase()}`
												: "-"}
										</div>
									</td>
								</tr>
							</>
						) : (
							""
						)}
						<tr>
							<td>
								<div className={cx("item-title")}>Voting Start</div>
								{votingStartElement}
							</td>
							<td>
								<div className={cx("item-title")}>Voting End</div>
								{votingEndElement}
							</td>
						</tr>
						<tr>
							<td>
								<div className={cx("item-title")}>Summit Time</div>
								{submitTimeElement}
							</td>
							<td>
								<div className={cx("item-title")}>Deposit End Time</div>
								{depositEndTimeElement}
							</td>
						</tr>
						<tr>
							<td colSpan={2}>{descriptionElement}</td>
						</tr>
					</tbody>
				</table>
			)}
		</div>
	);
});

export default DetailsCard;
