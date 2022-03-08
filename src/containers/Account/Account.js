import React, { useEffect, useRef } from "react";
import { useGet } from "restful-react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import cn from "classnames/bind";
import { useDispatch } from "react-redux";
import copy from "copy-to-clipboard";
import * as bech32 from "bech32-buffer";
import { useTheme } from "@material-ui/core/styles";
import { showAlert } from "src/store/modules/global";
import consts from "src/constants/consts";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import AddressCard from "src/components/common/AddressCard";
import AddressCardSkeleton from "src/components/common/AddressCard/AddressCardSkeleton";
import CoinsCard from "src/components/common/CoinsCard";
import EmptyCoinsCard from "src/components/common/CoinsCard/EmptyCoinsCard";
import CoinsCardSkeleton from "src/components/common/CoinsCard/CoinsCardSkeleton";
import DelegationCard from "src/components/Account/DelegationCard";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import UnbondingCard from "src/components/Account/UnbondingCard";
import Tabs from "src/components/TxList/Tabs";
import TransactionCard from "src/components/Account/TransactionCard";
import styles from "./Account.scss";
import copyIcon from "src/assets/common/copy_ic.svg";
import NoResult from "src/components/common/NoResult";
import AssetsTable from "src/components/Account/AssetsTable";
import AssetsTableCardList from "src/components/Account/AssetsTableCardList/AssetsTableCardList";
import Pagination from "src/components/common/Pagination";
import AssetSearch from "src/components/Account/AssetSearch";
import Skeleton from "react-skeleton-loader";
import MobileSkeleton from "../RequestReportDetail/RequestContainer/MobileSkeleton";

const Account = props => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const cx = cn.bind(styles);
	const [activeTab, setActiveTab] = React.useState(0);
	const [assetSearch, setAssetSearch] = React.useState(0);
	const [pageId, setPageId] = React.useState(1);
	const token_type = assetSearch === 1 ? `` : assetSearch === 2 ? `?token_type=native&page_id=${pageId}&limit=5` : `?token_type=ibc&page_id=${pageId}&limit=5`;
	const account = props?.match?.params?.account ?? 0;
	const coinsPath = `${consts.API.ACCOUNT_COINS}/${account}`;
	const nameTagPath = `${consts.API.ACCOUNT}/name_tag/${account}`;
	const balancePath = `${consts.API.ACCOUNT_BALANCE}/${account}` + `${token_type}`;
	const pricePath = `${consts.API.ACCOUNT_PRICE}`
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const totalPagesRef = useRef(null);
	const { data: coinsData, loading: coinsLoading, error: coinsError } = useGet({
		path: coinsPath,
	});
	const { data: balanceData, loading: balanceLoading, error: balanceError } = useGet({
		path: balancePath,
	});
	const { data: nameTagData, loading: nameTagLoading, error: nameTagError } = useGet({
		path: nameTagPath,
	});
	

	const onPageChange = page => {
		setPageId(page);
	};

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
			onClick: function () {
				handleCopy(this.value);
			},
		},
	];

	const decodedObj = bech32.decode(account);
	const operatorAddress = bech32.encode("oraivaloper", decodedObj.data);

	addresses.push({
		title: "Operator address",
		icon: copyIcon,
		value: operatorAddress,
		onClick: function () {
			handleCopy(this.value);
		},
	});

	let titleSection;
	let addressCard;
	let coinsCard;
	let delegationCard;
	let unbondingCard;
	let transactionCard;


	let tableSection;
	let paginationSection;

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


	if (balanceLoading) {
		// tableSection = isLargeScreen ? <Skeleton /> : <MobileSkeleton />;
	} else {
		if (balanceError) {
			totalPagesRef.current = null;
			tableSection = <NoResult />;
		} else {
			if (!isNaN(balanceData?.pagination?.total)) {
				totalPagesRef.current = +balanceData?.pagination?.total;
			} else {
				totalPagesRef.current = null;
			}

			if (Array.isArray(balanceData?.balances) && balanceData?.balances?.length > 0) {
				tableSection = isLargeScreen ? <AssetsTable data={balanceData?.balances} /> : <AssetsTableCardList data={balanceData?.balances} />;
			} else {
				tableSection = <NoResult />;
			}
		}
	}

	paginationSection = totalPagesRef.current ? <Pagination pages={Math.ceil(totalPagesRef.current / 5) || 1} page={pageId} onChange={(e, page) => onPageChange(page)} /> : <></>;

	delegationCard = <DelegationCard account={account} />;
	unbondingCard = <UnbondingCard account={account} />;
	return (
		<Container fixed className={cx("account")}>
			{titleSection}
			<Grid container spacing={2} className={cx("card-list")}>
				<Grid item lg={5} xs={12}>
					{addressCard}
				</Grid>

				<Grid item lg={7} xs={12}>
					<div className={cx("assets-card")}>
						<AssetSearch assetSearch={assetSearch} setAssetSearch={setAssetSearch} />
						{assetSearch === 1 && coinsCard}
						{assetSearch === 0 && tableSection}
						{assetSearch === 2 && tableSection}
						{(assetSearch === 0 || assetSearch === 2) && paginationSection}
					</div>
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
					<div className={cx("transaction-card")}>
						<Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
						{activeTab === 0 && <TransactionCard account={account} />}
						{activeTab === 1 && <TransactionCard account={account} royalty={true} />}
					</div>
				</Grid>
			</Grid>
		</Container >
	);
};

export default Account;
