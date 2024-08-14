// @ts-nocheck
import React from "react";
import { useGet } from "restful-react";
import cn from "classnames/bind";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import consts from "src/constants/consts";
import ClaimTable from "src/components/DelegatedValidator/DelegatedClaim/ClaimTable/ClaimTable";
import ClaimTableSkeleton from "src/components/DelegatedValidator/DelegatedClaim/ClaimTable/ClaimTableSkeleton";
import ClaimCardList from "src/components/DelegatedValidator/DelegatedClaim/ClaimCardList/ClaimCardList";
import ClaimCardListSkeleton from "src/components/DelegatedValidator/DelegatedClaim/ClaimCardList/ClaimCardListSkeleton";
import NoResult from "src/components/common/NoResult";
import arrowIcon from "src/assets/wallet/arrow.svg";
import styles from "./DelegatedClaim.module.scss";
import { formatOrai } from "src/helpers/helper";

const cx = cn.bind(styles);

export default function({ setActiveTab, address }) {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const path = consts.API.WALLET.CLAIM_REWARD + "/" + address;
	const { data } = useGet({
		path: path,
	});

	let tableSection;

	if (data) {
		const claimData =
			Array.isArray(data?.claim_reward) && data.claim_reward.length > 0
				? data?.claim_reward.filter(claim => parseInt(claim.staked) > 0 || parseFloat(formatOrai(claim.claimable_rewards)) >= parseFloat(formatOrai(1)))
				: [];

		if (claimData.length > 0) {
			tableSection = isLargeScreen ? (
				<ClaimTable data={claimData} totalStaked={data?.total_staked} totalRewards={data?.total_rewards} />
			) : (
				<ClaimCardList data={claimData} totalStaked={data?.total_staked} totalRewards={data?.total_rewards} />
			);
		} else {
			tableSection = <NoResult />;
		}
	} else {
		tableSection = isLargeScreen ? <ClaimTableSkeleton /> : <ClaimCardListSkeleton />;
	}

	return (
		<div className={cx("delegated-claim")}>
			<div className={cx("delegated-claim-header")}>
				<div className={cx("title")}>Claim Reward</div>
			</div>
			{tableSection}
		</div>
	);
}
