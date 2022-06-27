/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useMemo, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import { _, reduceString } from "src/lib/scripts";
import { formatOrai } from "src/helpers/helper";
import { tableThemes } from "src/constants/tableThemes";
import ThemedTable from "src/components/common/ThemedTable";
import styles from "./DelegatedTable.scss";
import GiftIcon from "./Gift";
import { walletStation } from "src/lib/walletStation";
import { handleTransactionResponse } from "src/helpers/transaction";
import { notification } from "antd";
import LoadingOverlay from "src/components/common/LoadingOverlay";

const cx = classNames.bind(styles);

// const ClaimBtn = ({ onClick }) => (
// 	<div className={cx("txs-data-cell", "align-left", "claim-btn")} onClick={onClick}>
// 		Claim <GiftIcon />
// 	</div>
// );

export const getHeaderRow = () => {
	const addressHeaderCell = <div className={cx("header-cell", "align-left")}>Validator</div>;
	const stakeHeaderCell = <div className={cx("header-cell", "align-left")}>Staked (ORAI)</div>;
	const claimHeaderCell = <div className={cx("header-cell", "align-left")}>Claimable Rewards (ORAI)</div>;
	const claimBtnHeaderCell = <div className={cx("header-cell", "align-left")}> </div>;
	const headerCells = [addressHeaderCell, stakeHeaderCell, claimHeaderCell, claimBtnHeaderCell];
	const headerCellStyles = [{ width: "30.33%" }, { width: "28.33%" }, { width: "28.33%" }];
	return {
		headerCells,
		headerCellStyles,
	};
};

const DelegatedTable = memo(({ rewards = [], delegations = [] }) => {
	const { address, account } = useSelector(state => state.wallet);
	const [loadingTransaction, setLoadingTransaction] = useState(false);
	const history = useHistory();

	const handleClickClaim = async validatorAddress => {
		try {
			setLoadingTransaction(true);
			const response = await walletStation.withdrawDelegatorReward([
				{
					delegator_address: address,
					validator_address: validatorAddress,
				},
			]);
			console.log("response claim rewards: ", response);
			handleTransactionResponse(response, notification, history, setLoadingTransaction);
		} catch (error) {
			setLoadingTransaction(false);
			notification.error({ message: `Transaction failed with message: ${JSON.stringify(error)}` });
			console.log(error);
		}
	};

	const getDataRows = rewards => {
		if (!Array.isArray(rewards)) {
			return [];
		}

		return rewards.map((item, index) => {
			const addressHashDataCell = _.isNil(item?.validator_address) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<NavLink className={cx("parent-hash-data-cell", "align-left")} to={`${consts.API.ACCOUNT}/${item.validator_address}`}>
					{reduceString(item.validator_address, 6, 6)}
				</NavLink>
			);

			const stakeDataCell = _.isNil(delegations[index]?.balance?.amount) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("node-data-cell")}>{formatOrai(delegations[index]?.balance?.amount)}</div>
			);

			const claimDataCell = _.isNil(item?.reward[0]) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("txs-data-cell", "align-left")}>{formatOrai(item?.reward[0].amount)}</div>
			);

			const claimBtnCell = (
				<div className={cx("txs-data-cell", "align-left", "claim-btn")} onClick={() => handleClickClaim(item?.validator_address)}>
					{" "}
					Claim <GiftIcon />{" "}
				</div>
			);

			return [addressHashDataCell, stakeDataCell, claimDataCell, claimBtnCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(rewards), [rewards, getDataRows]);

	return (
		<>
			{loadingTransaction && <LoadingOverlay />}
			<ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
		</>
	);
});

export default DelegatedTable;
