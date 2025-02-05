import React, { useState, useEffect, useMemo, useRef } from "react";
import { useGet } from "restful-react";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import cn from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
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
import copyIcon from "src/assets/common/copy_ic.svg";
import NoResult from "src/components/common/NoResult";
import AssetsTable from "src/components/Account/AssetsTable";
import AssetsTableCardList from "src/components/Account/AssetsTableCardList/AssetsTableCardList";
import Pagination from "src/components/common/Pagination";
import AssetSearch from "src/components/Account/AssetSearch";
import MobileSkeleton from "../RequestReportDetail/RequestContainer/MobileSkeleton";
import AssetsTableSkeleton from "src/components/Account/AssetsTable/AssetsTableSkeleton";
import { priceBalance } from "src/constants/priceBalance";
import * as api from "src/lib/api";
import CwToken from "src/components/Wallet/CwToken";
import { formatOrai } from "src/helpers/helper";
import styles from "./Account.module.scss";
import NFTToken from "../../components/Wallet/NFTToken";
import { flattenTokens, oraichainTokens } from "@oraichain/oraidex-common/build/token";
import { toDisplay } from "@oraichain/oraidex-common";

export const typeExport = {
	cw20: "cw20",
	allTransaction: "all-transaction",
};

const Account = props => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const history = useHistory();
	const cx = cn.bind(styles);
	const arrayAssetSearch = ["", "orai", "cw20", "native"];
	const [activeTab, setActiveTab] = useState(0);
	const [arrayPriceBalance, setArrayPriceBalance] = React.useState({});
	const [pageId, setPageId] = useState(1);
	const account = props?.match?.params?.account ?? 0;
	const isCw20Assets = window.location.search === "?cw20";
	const initAssetSearch = isCw20Assets ? 2 : 0;
	if (!isCw20Assets && window.location.search) history.replace(`${consts.API.ACCOUNT}/${account}`);
	const [assetSearch, setAssetSearch] = useState(initAssetSearch);
	const token_type = assetSearch === 0 ? "" : `token_type=${arrayAssetSearch[assetSearch]}&limit=5&page_id=${pageId}`;
	const coinsPath = `${consts.API.ACCOUNT_COINS}/${account}`;
	const nameTagPath = `${consts.API.ACCOUNT}/name_tag/${account}`;
	const balancePath = `${consts.API.ACCOUNT_BALANCE}/${account}?${token_type}`;
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const totalPagesRef = useRef(null);
	const { data: coinsData, loading: coinsLoading, error: coinsError } = useGet({
		path: coinsPath,
	});
	const { data: balanceData, loading: balanceLoading, error: balanceError } = useGet({
		path: balancePath,
	});
	const { data: nameTagData } = useGet({
		path: nameTagPath,
	});
	const totalValPath = `${consts.API.ACCOUNT_BALANCE}/${account}/total-value`;
	const { data: totalValData } = useGet({
		path: totalValPath,
	});

	const priceTokens = useSelector(state => state.blockchain.priceTokens);

	let data = [];

	useEffect(() => {
		fetchData();
	}, [balanceData]);

	const fetchData = async () => {
		const arrayCoin = flattenTokens.map(e => e.coinGeckoId).join(",");

		let price = await api.getGeckoMarketBalance(arrayCoin);

		setArrayPriceBalance(price?.data);
	};

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
			onClick: function() {
				handleCopy(this.value);
			},
		},
	];

	let decodedObj;
	let operatorAddress;
	try {
		decodedObj = bech32?.decode(account);
		operatorAddress = bech32.encode("oraivaloper", decodedObj.data);
	} catch (err) {
		console.log(err);
	}

	addresses.push({
		title: "Operator address",
		icon: copyIcon,
		value: operatorAddress,
		onClick: function() {
			handleCopy(this.value);
		},
	});

	let titleSection;
	let addressCard;
	let coinsCard;
	let delegationCard;
	let unbondingCard;
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
		tableSection = isLargeScreen ? <AssetsTableSkeleton /> : <MobileSkeleton />;
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
			if (arrayAssetSearch[assetSearch] === "cw20") {
				if (Array.isArray(balanceData) && balanceData?.length > 0) {
					data = balanceData
						?.filter(val => val.amount > 1)
						?.map(val => {
							const denomName = val?.base_denom?.toLowerCase();
							const reward = arrayPriceBalance?.[priceBalance[denomName]]?.["usd"] * val?.amount;
							return {
								validator_address: val?.base_denom,
								amount: val?.amount,
								denom: val?.base_denom,
								reward: reward ? reward : 0,
								denom_reward: "usd",
							};
						});
				} else {
					tableSection = <NoResult />;
				}
				tableSection = isLargeScreen ? <AssetsTable data={data} /> : <AssetsTableCardList data={data} />;
			} else {
				if (Array.isArray(balanceData?.balances) && balanceData?.balances?.length > 0) {
					let totalList = balanceData?.balances?.slice((pageId - 1) * 5, pageId * 5);
					data = totalList?.map((e, i) => {
						const denom = e?.denom === consts.TON_TOKENFACTORY_DENOM ? e?.denom : e?.denom?.split("/");
						const ids = denom === consts.TON_TOKENFACTORY_DENOM ? denom : denom?.[0];
						let coin = ids?.slice(0, 1) === "u" ? ids?.slice(1, ids?.length) : ids;

						let reward = arrayPriceBalance?.[priceBalance[coin]]?.["usd"] * e?.amount;

						return {
							...e,
							validator_address: e?.denom,
							denom: coin,
							reward: reward ? reward : 0,
							denom_reward: "usd",
						};
					});

					tableSection = isLargeScreen ? <AssetsTable data={data} /> : <AssetsTableCardList data={data} />;
				} else {
					tableSection = <NoResult />;
				}
			}
		}
	}
	paginationSection = totalPagesRef.current ? (
		<Pagination pages={Math.ceil(totalPagesRef.current / 5) || 1} page={pageId} onChange={(e, page) => onPageChange(page)} />
	) : (
		<></>
	);

	delegationCard = <DelegationCard account={account} />;
	unbondingCard = <UnbondingCard account={account} />;

	const totalValueToken = useMemo(() => {
		let totalValue = 0;
		if (arrayAssetSearch[assetSearch] === "cw20") {
			if (data && data.length > 0) {
				totalValue = data.reduce((acc, cur) => {
					return acc + cur?.reward;
				}, 0);
				return formatOrai(totalValue);
			}
		}

		const tonTokenFactory = balanceData?.balances?.find(token => token.denom === consts.TON_TOKENFACTORY_DENOM);
		let tonValue = 0;

		if (tonTokenFactory) {
			const tonInOraichain = oraichainTokens.find(token => {
				const arrIncludes = [token?.denom?.toLowerCase(), token?.name?.toLowerCase()];
				return arrIncludes.includes(tonTokenFactory.denom.toLowerCase()) || arrIncludes.includes(tonTokenFactory.base_denom.toLowerCase());
			});
			const tonUsd = priceTokens[tonInOraichain?.coinGeckoId] || 0;
			tonValue = tonUsd * toDisplay(tonTokenFactory.amount, 9);
		}

		totalValue = (totalValData?.totalBalances + tonValue) * 1000000;
		return formatOrai(totalValue);
	}, [arrayAssetSearch[assetSearch], totalValData, data]);

	const handleSetAssetSearch = assetId => {
		let str = `${consts.API.ACCOUNT}/${account}`;
		if (assetId === 2) str += "?cw20";
		history.replace(str);
		setAssetSearch(assetId);
	};

	return (
		<Container fixed className={cx("account")}>
			{titleSection}
			<Grid container spacing={2} className={cx("card-list")}>
				<Grid item lg={5} xs={12}>
					{addressCard}
				</Grid>

				<Grid item lg={7} xs={12}>
					<div className={cx("assets-card")}>
						<AssetSearch totalValue={totalValueToken} assetSearch={assetSearch} setAssetSearch={handleSetAssetSearch} />
						{assetSearch === 1 && coinsCard}
						{(assetSearch === 0 || assetSearch === 2) && (
							<>
								{tableSection}
								{paginationSection}
							</>
						)}
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
						<Tabs activeTab={activeTab} setActiveTab={setActiveTab} address={account} />
						{activeTab === 0 && <TransactionCard account={account} />}
						{activeTab === 1 && <TransactionCard account={account} royalty={true} />}
						{activeTab === 2 && <CwToken address={account} />}
						{activeTab === 3 && <NFTToken address={account} />}
					</div>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Account;
