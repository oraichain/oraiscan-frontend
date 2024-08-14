// @ts-nocheck
import React from "react";
import { useGet } from "restful-react";
import cn from "classnames/bind";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import consts from "src/constants/consts";
import NoResult from "src/components/common/NoResult";
import WithdrawTable from "src/components/DelegatedValidator/DelegatedWithdraw/WithdrawTable/WithdrawTable";
import WithdrawTableSkeleton from "src/components/DelegatedValidator/DelegatedWithdraw/WithdrawTable/WithdrawTableSkeleton";
import WithdrawCardList from "src/components/DelegatedValidator/DelegatedWithdraw/WithdrawCardList/WithdrawCardList";
import WithdrawCardListSkeleton from "src/components/DelegatedValidator/DelegatedWithdraw/WithdrawCardList/WithdrawCardListSkeleton";
import arrowIcon from "src/assets/wallet/arrow.svg";
import styles from "./DelegatedWithdraw.module.scss";
import { formatOrai } from "src/helpers/helper";

const cx = cn.bind(styles);

export default function({ setActiveTab, address }) {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const path = consts.API.WALLET.WITHDRAW + "/" + address;
	const { data } = useGet({
		path: path,
	});

	let tableSection;

	if (data) {
		const withdrawData =
			Array.isArray(data?.withdraw) && data.withdraw.length > 0
				? data?.withdraw.filter(withdraw => withdraw.staked > 0 || parseFloat(formatOrai(withdraw.rewards)) >= parseFloat(formatOrai(1)))
				: [];

		if (withdrawData.length > 0) {
			tableSection = isLargeScreen ? <WithdrawTable data={withdrawData} /> : <WithdrawCardList data={withdrawData} />;
		} else {
			tableSection = (
				<div className={cx("no-result-wrapper")}>
					<NoResult />
				</div>
			);
		}
	} else {
		tableSection = isLargeScreen ? <WithdrawTableSkeleton /> : <WithdrawCardListSkeleton />;
	}

	return (
		<div className={cx("delegated-withdraw")}>
			<div className={cx("delegated-withdraw-header")}>
				<div className={cx("label")}>
					<div className={cx("title")}>Withdraw tokens</div>
					<p className={cx("note")}>Please be aware that you have to wait 14 days to complete unbonding your funds from validators.</p>
				</div>
			</div>
			{tableSection}
		</div>
	);
}
