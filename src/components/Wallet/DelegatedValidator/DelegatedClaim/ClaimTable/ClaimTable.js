/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo, useState} from "react";
import {NavLink} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import classNames from "classnames/bind";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import {formatOrai} from "src/helpers/helper";
import {tableThemes} from "src/constants/tableThemes";
import {logoBrand} from "src/constants/logoBrand";
import ThemedTable from "src/components/common/ThemedTable";
import {myKeystation} from "src/lib/Keystation";

import styles from "./ClaimTable.scss";
import giftIcon from "src/assets/wallet/gift.svg";
import ClaimRwBtn from "./ClaimRwBtn";
import ClaimRwAllBtn from "./ClaimRwAllBtn";

const cx = classNames.bind(styles);

const BtnComponent = ({handleClick, buttonName}) => {
	return (
		<div className={cx("claim-data-cell", "align-center", "claim-btn")}>
			<button className={cx("button")} onClick={handleClick}>
				{buttonName}
				<img alt='/' className={cx("button-icon")} src={giftIcon} />
			</button>
		</div>
	);
};

const ClaimTable = memo(({data, totalStaked, totalRewards}) => {
	const {address, account} = useSelector(state => state.wallet);
	// const dispatch = useDispatch();

	// const handleClickClaimAll = (validatorAddress, claimableRewards) => {
	// 	let msg = [];
	// 	data.forEach(element => {
	// 		let msgEle;
	// 		if (parseFloat(element.claimable_rewards) && parseFloat(element.claimable_rewards) > 0) {
	// 			msgEle = {
	// 				type: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
	// 				value: {
	// 					delegator_address: address,
	// 					validator_address: element.validator_address,
	// 				},
	// 			};
	// 		}

	// 		msg.push(msgEle);
	// 	});

	// 	const payload = {
	// 		type: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
	// 		value: {
	// 			msg: msg,
	// 			fee: {
	// 				amount: [0],
	// 				gas: 2000000,
	// 			},
	// 			signatures: null,
	// 			memo: "",
	// 		},
	// 	};

	// 	const popup = myKeystation.openWindow("transaction", payload, account);
	// 	let popupTick = setInterval(function() {
	// 		if (popup.closed) {
	// 			clearInterval(popupTick);
	// 		}
	// 	}, 500);
	// };

	const getHeaderRow = () => {
		const validatorHeaderCell = <div className={cx("header-cell", "align-left")}>Validator</div>;
		const stakedHeaderCell = (
			<div className={cx("header-cell", "align-left")}>
				Staked <span className={cx("total-item-value")}>({formatOrai(totalStaked)} ORAI)</span>
			</div>
		);
		const claimableRewardsHeaderCell = (
			<div className={cx("header-cell", "align-left")}>
				Claimable Rewards <span className={cx("total-item-value")}>({formatOrai(totalRewards)} ORAI)</span>
			</div>
		);

		const claimHeaderCell = (
			<div className={cx("header-cell", "align-center")}>
				<ClaimRwAllBtn
					delegatedData={data}
					validatorAddress={data[0]?.validator_address}
					withdrawable={totalRewards}
					BtnComponent={({handleClick}) => <BtnComponent handleClick={handleClick} buttonName={"Claim All"} />}
					validatorName={data[0]?.validator}
				/>
			</div>
		);
		const headerCells = [validatorHeaderCell, stakedHeaderCell, claimableRewardsHeaderCell, claimHeaderCell];
		const headerCellStyles = [{width: "auto"}, {width: "auto"}, {width: "auto"}, {width: "140px"}];
		return {
			headerCells,
			headerCellStyles,
		};
	};

	// const handleClickClaim = (validatorAddress, claimableRewards) => {
	// 	if (parseFloat(claimableRewards) <= 0 || !parseFloat(claimableRewards)) {
	// 		return dispatch(
	// 			showAlert({
	// 				show: true,
	// 				message: "Claimable Rewards ORAI must greater than 0",
	// 				autoHideDuration: 1500,
	// 				type: "error",
	// 			})
	// 		);
	// 	}

	// 	const payload = {
	// 		type: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
	// 		value: {
	// 			msg: [
	// 				{
	// 					type: "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
	// 					value: {
	// 						delegator_address: address,
	// 						validator_address: validatorAddress,
	// 					},
	// 				},
	// 			],
	// 			fee: {
	// 				amount: [0],
	// 				gas: 2000000,
	// 			},
	// 			signatures: null,
	// 			memo: "",
	// 		},
	// 	};

	// 	const popup = myKeystation.openWindow("transaction", payload, account);
	// 	let popupTick = setInterval(function() {
	// 		if (popup.closed) {
	// 			clearInterval(popupTick);
	// 		}
	// 	}, 500);
	// };

	const getDataRows = data => {
		if (!Array.isArray(data)) {
			return [];
		}

		return data.map((item, index) => {
			// const validatorIcon = logoBrand.find(logoBrandItem => item?.validator === logoBrandItem.operatorAddress)?.logo ?? aiIcon;
			const logoItem = logoBrand.find(it => it.operatorAddress === item?.validator_address) || {customLogo: null};
			const logoURL = item.moniker_image ? item.moniker_image : logoItem.logo ? logoItem.logo : false;
			const logoName = item.validator || "";
			const validatorDataCell = item?.validator ? (
				<NavLink className={cx("validator-data-cell", "align-left")} to={`${consts.PATH.VALIDATORS}/${item.validator_address}`}>
					<div className={cx("validator")}>
						{logoURL && <img alt='/' className={cx("validator-icon")} src={logoURL} />}
						{!logoURL && <div className={cx("logo-custom")}> {logoName.substring(0, 3).toUpperCase()} </div>}
						<span className={cx("validator-name")}>{item.validator}</span>
					</div>
				</NavLink>
			) : (
				<div className={cx("align-left")}>-</div>
			);

			const stakedDataCell = _.isNil(item?.staked) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("staked-data-cell")}>{formatOrai(item?.staked)}</div>
			);

			const claimableRewardsDataCell = _.isNil(item?.claimable_rewards) ? (
				<div className={cx("align-left")}>-</div>
			) : (
				<div className={cx("claimable-rewards-data-cell", "align-left")}>{formatOrai(item.claimable_rewards)}</div>
			);

			const claimDataCell = (
				<ClaimRwBtn
					validatorAddress={item?.validator_address}
					withdrawable={item.claimable_rewards}
					BtnComponent={({handleClick}) => BtnComponent({handleClick, buttonName: "Claim"})}
					validatorName={item.validator}
				/>
			);

			// const claimDataCell = (
			// 	<div className={cx("claim-data-cell", "align-center", "claim-btn")} onClick={() => handleClickClaim(item?.validator_address, item.claimable_rewards)}>
			// 		<button className={cx("button")}>
			// 			Claim
			// 			<img alt='/' className={cx("button-icon")} src={giftIcon} />
			// 		</button>
			// 	</div>
			// );
			return [validatorDataCell, stakedDataCell, claimableRewardsDataCell, claimDataCell];
		});
	};

	const headerRow = useMemo(() => getHeaderRow(), []);
	const dataRows = useMemo(() => getDataRows(data), [data, getDataRows]);

	return <ThemedTable theme={tableThemes.LIGHT} headerCellStyles={headerRow.headerCellStyles} headerCells={headerRow.headerCells} dataRows={dataRows} />;
});

export default ClaimTable;
