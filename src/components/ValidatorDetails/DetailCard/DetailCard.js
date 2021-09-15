import React, {memo, useState} from "react";
import classNames from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import styles from "./DetailCard.scss";
import {formatInteger, formatPercentage} from "src/helpers/helper";
import {NavLink} from "react-router-dom";
import {Progress} from "antd";
import RightArrowIcon from "src/icons/RightArrowIcon";
import Dialog from "@material-ui/core/Dialog";
import RequestsCard from "src/components/ValidatorDetails/RequestsCard";
import {ReactComponent as CloseIcon} from "src/assets/icons/close.svg";
import {isNil} from "lodash";

const cx = classNames.bind(styles);

const DetailCard = memo(({data, selfBondedData}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const [open, setOpen] = useState(false);

	const websiteInfo = data?.description?.website ?? "-";
	const websiteElement = (
		<div className={cx("info")}>
			<div className={cx("info-title")}>Website</div>
			<a target='_blank' href={websiteInfo} className={cx("info-link")}>
				{websiteInfo}
			</a>
		</div>
	);

	let commissionRateInfo;
	if (isNaN(data?.commission_rate)) {
		commissionRateInfo = "-";
	} else {
		const commissionRate = formatPercentage(data?.commission_rate);
		commissionRateInfo = commissionRate + "%";
	}
	const commissionElement = (
		<div className={cx("info")}>
			<div className={cx("info-title")}>Commission</div>
			<div className={cx("info-text")}>{commissionRateInfo}</div>
		</div>
	);

	let uptimeInfo;
	if (isNaN(data?.uptime)) {
		uptimeInfo = "-";
	} else {
		const uptime = formatPercentage(data?.uptime);
		uptimeInfo = uptime + "%";
	}
	const uptimeElement = (
		<div className={cx("info")}>
			<div className={cx("info-title")}>Uptime</div>
			<div className={cx("info-text")}>{uptimeInfo}</div>
		</div>
	);

	let votingPowerInfo;
	if (isNaN(data?.voting_percentage) || isNaN(data?.voting_power)) {
		votingPowerInfo = "-";
	} else {
		const votingPowerPercent = formatPercentage(data?.voting_percentage / 100);
		const votingPower = formatInteger(data.voting_power);
		votingPowerInfo = (
			<div className={cx("info-text")}>
				{votingPowerPercent} % ({votingPower}) <span className={cx("info-denom")}>ORAI</span>
			</div>
		);
	}
	const votingPowerElement = (
		<div className={cx("info")}>
			<div className={cx("info-title")}>Voting Power</div>
			<div className={cx("info-link")}>{votingPowerInfo}</div>
		</div>
	);

	let bondedHeightInfo;
	if (isNaN(data?.bond_height)) {
		bondedHeightInfo = "-";
	} else {
		bondedHeightInfo = formatInteger(data?.bond_height);
	}
	const bondedHeightElement = (
		<div className={cx("info")}>
			<div className={cx("info-title")}>Bonded Height</div>
			<div className={cx("info-text")}>{bondedHeightInfo}</div>
		</div>
	);

	const selfBondedElement = (
		<div className={cx("info")}>
			<div className={cx("info-title")}>Self Bonded</div>
			<div className={cx("info-text")}>{!isNil(selfBondedData?.pagination?.total) ? selfBondedData?.pagination?.total : "-"}</div>
		</div>
	);

	const detailsInfo = data?.description?.details ?? "-";
	const detailsElement = (
		<div className={cx("info")}>
			<div className={cx("info-title")}>Details</div>
			<div className={cx("info-text")}>{detailsInfo}</div>
		</div>
	);

	const reportingElement = (
		<div className={cx("info")}>
			<div className={cx("info-title")}>Reporting</div>
			<div className={cx("info-text")}>
				{data?.reporting_rate ? (
					<>
						<span>{formatPercentage(data.reporting_rate, 2) + "% "}</span>
						<Progress
							percent={formatPercentage(data.reporting_rate, 2)}
							showInfo={false}
							strokeColor={formatPercentage(data.reporting_rate, 2) === 100 ? "#52c41a" : "#1890ff"}
							trailColor='#bfbfbf'
						/>
					</>
				) : (
					"-"
				)}
			</div>
		</div>
	);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const requestsElement = (
		<div className={cx("info")}>
			<button className={cx("more-button")} onClick={handleOpen}>
				Request information
				<RightArrowIcon className={cx("more-button-icon")} />
			</button>
			<Dialog open={open} maxWidth='lg' fullWidth={true} aria-labelledby='source-dialog' onClose={handleClose} scroll={"body"}>
				{/* <div className={cx("preview")}> */}
				{/* <div className={cx("close-button")} onClick={handleClose}>
						<CloseIcon />
					</div> */}
				<RequestsCard operatorAddress={data?.operator_address ?? "-"} />
				{/* </div> */}
			</Dialog>
		</div>
	);

	const missedBlockElement = (
		<div className={cx("info")}>
			<div className={cx("info-title")}>Missed Block Number</div>
			<div className={cx("info-text")}>
				{data?.missed_block ?? "-"} / {data?.blocks ?? "-"}
			</div>
		</div>
	);

	return (
		<div className={cx("detail-card")}>
			{isLargeScreen ? (
				<Grid container spacing={0}>
					<Grid container item xs={12}>
						<Grid item xs={4}>
							{websiteElement}
						</Grid>
						<Grid item xs={4}>
							{votingPowerElement}
						</Grid>
						<Grid item xs={4}>
							{detailsElement}
						</Grid>
						<Grid item xs={4}>
							{commissionElement}
						</Grid>
						<Grid item xs={4}>
							{bondedHeightElement}
						</Grid>
						<Grid item xs={4}>
							{reportingElement}
						</Grid>
						<Grid item xs={4}>
							{uptimeElement}
						</Grid>
						<Grid item xs={4}>
							{selfBondedElement}
						</Grid>
						<Grid item xs={4}>
							{requestsElement}
						</Grid>
						<Grid item xs={4}>
							{missedBlockElement}
						</Grid>
					</Grid>
				</Grid>
			) : (
				<table>
					<tbody>
						<tr>
							<td colSpan={2}>{websiteElement}</td>
						</tr>
						<tr>
							<td>{commissionElement}</td>
							<td>{uptimeElement}</td>
						</tr>
						<tr>
							<td>{votingPowerElement}</td>
							<td>{missedBlockElement}</td>
						</tr>
						<tr>
							<td>{selfBondedElement}</td>
							<td>{bondedHeightElement}</td>
						</tr>
						<tr>
							<td colSpan={2}>{detailsElement}</td>
						</tr>
						<tr>
							<td colSpan={2}>{reportingElement}</td>
						</tr>
					</tbody>
				</table>
			)}
		</div>
	);
});

export default DetailCard;
