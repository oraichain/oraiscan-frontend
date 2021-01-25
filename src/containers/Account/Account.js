import React, {useState, useRef} from "react";
import {useGet} from "restful-react";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";
import Skeleton from "react-loading-skeleton";
import cn from "classnames/bind";
import {useDispatch, useSelector} from "react-redux";
import copy from "copy-to-clipboard";

import {showAlert} from "src/store/modules/global";
import consts from "src/constants/consts";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import AddressCard from "src/components/common/AddressCard";
import CoinsCard from "src/components/common/CoinsCard";
import DelegationCard from "src/components/Account/DelegationCard";
import UnbondingCard from "src/components/Account/UnbondingCard";
import TransactionCard from "src/components/Account/TransactionCard";
import styles from "./Account.scss";
import copyIcon from "src/assets/common/copy_ic.svg";
import questionIcon from "src/assets/common/question_ic.svg";

const Account = props => {
	const dispatch = useDispatch();

	const addressCardMinHeight = 220;
	const coinsCardMinHeight = 220;

	const cx = cn.bind(styles);
	const account = props?.match?.params?.account ?? 0;
	const addressPath = `${consts.API.ACCOUNT}/${account}`;
	const coinsPath = `${consts.API.ACCOUNT_COINS}/${account}`;
	const {data: addressData} = useGet({
		path: addressPath,
	});

	const {data: coinsData} = useGet({
		path: coinsPath,
	});

	const handleCopy = address => {
		copy(address);
		dispatch(
			showAlert({
				show: true,
				message: "Copied",
				autoHideDuration: 1500,
			})
		);
	};

	const addresses = [
		{
			title: "Address",
			icon: copyIcon,
			value: addressData?.address ?? "",
			onClick: function() {
				handleCopy(this.value);
			},
		},
		{
			title: "Reward Address",
			icon: questionIcon,
			value: addressData?.address ?? "",
			onClick: function() {
				handleCopy(this.value);
			},
		},
	];

	const skeletonAddresses = [
		{
			title: "Address",
			icon: copyIcon,
			value: <Skeleton />,
			onClick: function() {},
		},
		{
			title: "Reward Address",
			icon: questionIcon,
			value: <Skeleton />,
			onClick: function() {},
		},
	];

	return (
		<Container fixed className={cx("account")}>
			<TitleWrapper>
				<PageTitle title={"Account Detail"} />
				<StatusBox />
			</TitleWrapper>
			<Grid container spacing={2} className={cx("card-list")}>
				<Grid item lg={4} xs={12}>
					{addressData ? (
						<AddressCard headerTitle='QR Code' addresses={addresses} minHeight={addressCardMinHeight} />
					) : (
						<AddressCard headerTitle='QR Code' qrValue='Loading' addresses={skeletonAddresses} minHeight={addressCardMinHeight} />
					)}
				</Grid>

				<Grid item lg={8} xs={12}>
					{coinsData ? (
						<CoinsCard
							total={coinsData.total}
							price={coinsData.price}
							available={coinsData.available}
							delegated={coinsData.delegated}
							unbonding={coinsData.unbonding}
							reward={coinsData.reward}
							denom={consts.DENOM}
							minHeight={coinsCardMinHeight + "px"}
						/>
					) : (
						<Skeleton variant='rect' animation='wave' height={coinsCardMinHeight} />
					)}
				</Grid>
			</Grid>

			<Grid container spacing={2}>
				<Grid item md={6} xs={12}>
					<DelegationCard account={account} />
				</Grid>
				<Grid item md={6} xs={12}>
					<UnbondingCard account={account} />
				</Grid>
				<Grid item xs={12}>
					<TransactionCard account={account} />
				</Grid>
			</Grid>
		</Container>
	);
};

export default Account;
