// @ts-nocheck
import React from "react";
import {useGet} from "restful-react";
import cn from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import consts from "src/constants/consts";
import ClaimTable from "src/components/Wallet/DelegatedValidator/DelegatedClaim/ClaimTable/ClaimTable";
import ClaimTableSkeleton from "src/components/Wallet/DelegatedValidator/DelegatedClaim/ClaimTable/ClaimTableSkeleton";
import ClaimCardList from "src/components/Wallet/DelegatedValidator/DelegatedClaim/ClaimCardList/ClaimCardList";
import ClaimCardListSkeleton from "src/components/Wallet/DelegatedValidator/DelegatedClaim/ClaimCardList/ClaimCardListSkeleton";
import NoResult from "src/components/common/NoResult";
import styles from "./DelegatedClaim.scss";
import arrowIcon from "src/assets/wallet/arrow.svg";

const cx = cn.bind(styles);

export default function({setActiveTab, address}) {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const path = consts.API.WALLET.CLAIM_REWARD + "/" + address;
	const {data} = useGet({
		path: path,
	});

	let tableSection;

	if (data) {
		if (Array.isArray(data?.claim_reward) && data.claim_reward.length > 0) {
			tableSection = isLargeScreen ? <ClaimTable data={data.claim_reward} /> : <ClaimCardList data={data.claim_reward} />;
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
				<button className={cx("button")} onClick={() => setActiveTab(1)}>
					Withdraw
					<img className={cx("button-icon")} src={arrowIcon} />
				</button>
			</div>
			{tableSection}
		</div>
	);
}
