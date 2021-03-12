import React, {memo} from "react";
import classNames from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Skeleton from "@material-ui/lab/Skeleton";
import Grid from "@material-ui/core/Grid";
import styles from "./DetailCard.scss";

const cx = classNames.bind(styles);

const DetailCard = memo(({}) => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	const websiteInfo = <Skeleton className={cx("skeleton")} variant='text' width={100} height={21} />;
	const websiteElement = (
		<div className={cx("info")}>
			<div className={cx("info-title")}>Website</div>
			<div className={cx("info-link")}>{websiteInfo}</div>
		</div>
	);

	const commissionRateInfo = <Skeleton className={cx("skeleton")} variant='text' width={100} height={21} />;
	const commissionElement = (
		<div className={cx("info")}>
			<div className={cx("info-title")}>Commission</div>
			<div className={cx("info-text")}>{commissionRateInfo}</div>
		</div>
	);

	const uptimeInfo = <Skeleton className={cx("skeleton")} variant='text' width={100} height={21} />;
	const uptimeElement = (
		<div className={cx("info")}>
			<div className={cx("info-title")}>Uptime</div>
			<div className={cx("info-text")}>{uptimeInfo}</div>
		</div>
	);

	const votingPowerInfo = <Skeleton className={cx("skeleton")} variant='text' width={100} height={21} />;
	const votingPowerElement = (
		<div className={cx("info")}>
			<div className={cx("info-title")}>Voting Power</div>
			<div className={cx("info-link")}>{votingPowerInfo}</div>
		</div>
	);

	const bondedHeightInfo = <Skeleton className={cx("skeleton")} variant='text' width={100} height={21} />;
	const bondedHeightElement = (
		<div className={cx("info")}>
			<div className={cx("info-title")}>Bonded Height</div>
			<div className={cx("info-text")}>{bondedHeightInfo}</div>
		</div>
	);

	const selfBondeInfo = <Skeleton className={cx("skeleton")} variant='text' width={100} height={21} />;
	const selfBondedElement = (
		<div className={cx("info")}>
			<div className={cx("info-title")}>Self Bonded</div>
			<div className={cx("info-link")}>{selfBondeInfo}</div>
		</div>
	);

	const detailsInfo = <Skeleton className={cx("skeleton")} variant='text' width={100} height={21} />;
	const detailsElement = (
		<div className={cx("info")}>
			<div className={cx("info-title")}>Details</div>
			<div className={cx("info-text")}>{detailsInfo}</div>
		</div>
	);

	const showMoreElement = (
		<div className={cx("info")}>
			<Skeleton className={cx("skeleton")} variant='text' width={100} height={21} />
		</div>
	);

	return (
		<div className={cx("detail-card")}>
			{isLargeScreen ? (
				<Grid container spacing={0}>
					<Grid container item xs={8}>
						<Grid item xs={6}>
							{websiteElement}
						</Grid>
						<Grid item xs={6}>
							{votingPowerElement}
						</Grid>
						<Grid item xs={6}>
							{commissionElement}
						</Grid>
						<Grid item xs={6}>
							{bondedHeightElement}
						</Grid>
						<Grid item xs={6}>
							{uptimeElement}
						</Grid>
						<Grid item xs={6}>
							{selfBondedElement}
						</Grid>
					</Grid>
					<Grid item xs={4}>
						{detailsElement}
						{showMoreElement}
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
							<td colSpan={2}>{votingPowerElement}</td>
						</tr>
						<tr>
							<td>{selfBondedElement}</td>
							<td>{bondedHeightElement}</td>
						</tr>
						<tr>
							<td colSpan={2}>
								{detailsElement}
								{showMoreElement}
							</td>
						</tr>
					</tbody>
				</table>
			)}
		</div>
	);
});

export default DetailCard;
