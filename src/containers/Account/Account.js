import React from "react";
import {useGet} from "restful-react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import cn from "classnames/bind";
import {useDispatch} from "react-redux";
import copy from "copy-to-clipboard";
import * as bech32 from "bech32-buffer";
import {showAlert} from "src/store/modules/global";
import consts from "src/constants/consts";
import {logoBrand} from "src/constants/logoBrand";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import AddressCard from "src/components/common/AddressCard";
import AddressCardSkeleton from "src/components/common/AddressCard/AddressCardSkeleton";
import CoinsCard from "src/components/common/CoinsCard";
import EmptyCoinsCard from "src/components/common/CoinsCard/EmptyCoinsCard";
import CoinsCardSkeleton from "src/components/common/CoinsCard/CoinsCardSkeleton";
import DelegationCard from "src/components/Account/DelegationCard";
import UnbondingCard from "src/components/Account/UnbondingCard";
import TransactionCard from "src/components/Account/TransactionCard";
import styles from "./Account.scss";
import copyIcon from "src/assets/common/copy_ic.svg";

const Account = props => {
	const dispatch = useDispatch();

	const cx = cn.bind(styles);
	const account = props?.match?.params?.account ?? 0;
	const coinsPath = `${consts.API.ACCOUNT_COINS}/${account}`;
	const nameTagPath = `${consts.API.ACCOUNT}/name_tag/${account}`;

	const {data: coinsData, loading: coinsLoading, error: coinsError} = useGet({
		path: coinsPath,
	});

	const {data: nameTagData, loading: nameTagLoading, error: nameTagError} = useGet({
		path: nameTagPath,
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

	let addresses = [
		{
			title: "Address",
			icon: copyIcon,
			value: account,
			onClick: function() {
				handleCopy(this.value);
			},
		},
		{
			title: "Reward Address",
			icon: copyIcon,
			value: account,
			onClick: function() {
				handleCopy(this.value);
			},
		},
	];

	const decodedObj = bech32.decode(account);
	const operatorAddress = bech32.encode("oraivaloper", decodedObj.data);

	if (logoBrand.find(item => item.operatorAddress === operatorAddress)) {
		addresses.push({
			title: "Operator address",
			icon: copyIcon,
			value: operatorAddress,
			onClick: function() {
				handleCopy(this.value);
			},
		});
	}

	let titleSection;
	let addressCard;
	let coinsCard;
	let delegationCard;
	let unbondingCard;
	let transactionCard;

	titleSection = (
		<TitleWrapper>
			<PageTitle title={"Account Details"} />
			<StatusBox />
		</TitleWrapper>
	);

	if (addresses) {
		addressCard = <AddressCard nameTagData={nameTagData} headerTitle='QR Code' addresses={addresses} />;
	} else {
		addressCard = <AddressCardSkeleton />;
	}

	if (coinsLoading) {
		coinsCard = <CoinsCardSkeleton />;
	} else {
		if (coinsError) {
			coinsCard = <EmptyCoinsCard denom={consts.DENOM} />;
		} else {
			coinsCard = (
				<CoinsCard
					total={coinsData.total}
					price={coinsData.price}
					available={coinsData.available}
					delegated={coinsData.delegated}
					unbonding={coinsData.unbonding}
					reward={coinsData.reward}
					denom={consts.DENOM}
				/>
			);
		}
	}

	delegationCard = <DelegationCard account={account} />;
	unbondingCard = <UnbondingCard account={account} />;
	transactionCard = <TransactionCard account={account} />;

	return (
		<Container fixed className={cx("account")}>
			{titleSection}
			<Grid container spacing={2} className={cx("card-list")}>
				<Grid item lg={5} xs={12}>
					{addressCard}
				</Grid>

				<Grid item lg={7} xs={12}>
					{coinsCard}
				</Grid>
			</Grid>

			<Grid container spacing={2}>
				<Grid item lg={6} xs={12}>
					{delegationCard}
				</Grid>
				<Grid item lg={6} xs={12}>
					{unbondingCard}
				</Grid>
				<Grid item xs={12}>
					{transactionCard}
				</Grid>
			</Grid>
		</Container>
	);
};

export default Account;
