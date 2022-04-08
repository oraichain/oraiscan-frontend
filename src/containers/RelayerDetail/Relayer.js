import React, {useCallback, useState, useRef} from "react";
import cn from "classnames/bind";
import Container from "@material-ui/core/Container";
import {useGet} from "restful-react";
import {useParams} from "react-router-dom";
import {useTheme} from "@material-ui/core/styles";
// components
import RelayerAsset from "./RelayerAssset";
import Pagination from "src/components/common/Pagination";
import StatusCardList from "src/components/Ibc/StatusCardList";
import PageTitle from "src/components/common/PageTitle";
// constants
import consts from "src/constants/consts";
import TogglePageBar from "src/components/common/TogglePageBar";
import TitleWrapper from "src/components/common/TitleWrapper";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// styles
import styles from "./RelayerDetail.module.scss";
import NoResult from "src/components/common/NoResult";
import Grid from "@material-ui/core/Grid";
import RelayersAssetSearch from "src/components/Ibc/RelayersAssetSearch";
import RelayersAssetTable from "src/components/Ibc/RelayersAssetTable";
import RelayersAssetsTableCardList from "src/components/Ibc/RelayersAssetsTableCardList/RelayersAssetsTableCardList";

import RelayersAssetsTableSkeleton from "src/components/Ibc/RelayersAssetTable/RelayersAssetsTableSkeleton";

import RelayersAssetsTableCardListSkeleton from "src/components/Ibc/RelayersAssetsTableCardList/RelayersAssetsTableCardListSkeleton";
import RelayerTransactions from 'src/containers/RelayerDetail/RelayerTransactions';

const cx = cn.bind(styles);

export const TX_TYPE = {
	RECEIVE: "RECEIVE",
	TRANSFER: "TRANSFER",
};

const RelayerDetail = () => {
	const theme = useTheme();
	const {channelId} = useParams();
	const [pageId, setPageId] = React.useState(1);
	const [assetSearch, setAssetSearch] = useState(0);
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const totalPagesRef = useRef(null);
	let statusCardList;

	let titleSection;
	let relayerAssets;
	let relayerTransactions;
	let tableSection;
	let paginationSection;
	console.log("🚀 ~ file: index.js ~ line 29 ~ RelayerDetail ~ pagination");

	const {data: relayerInfoData} = useGet({
		path: `${consts.API.IBC_RELAYERS_DETAIL}/${channelId}`,
	});

	const {data: relayerAssetDaily} = useGet({
		path: `/ibc/channel/${channelId}/daily-transfer-value`,
	});

	const {data: relayerAssetList, loading: assetListLoading, error: assetListError} = useGet({
		path: `/ibc/channel/${channelId}/assets?tx_type=${!assetSearch ? TX_TYPE.RECEIVE : TX_TYPE.TRANSFER}`,
	});

	const onPageChange = page => {
		setPageId(page);
	};

	statusCardList = <StatusCardList relayerInfoData={relayerInfoData} />;
	relayerAssets = <RelayerAsset relayerAssetDaily={relayerAssetDaily} relayerAssetList={relayerAssetList} />;
	relayerTransactions = <RelayerTransactions channelId={channelId} />
	if (isLargeScreen) {
		titleSection = (
			<Container fixed>
				<TitleWrapper>
					<PageTitle title={"IBC Relayer Detail"} />
				</TitleWrapper>
			</Container>
		);
	} else {
		titleSection = <TogglePageBar type='ibc-relayer' />;
	}

	if (assetListLoading) {
		tableSection = isLargeScreen ? <RelayersAssetsTableSkeleton /> : <RelayersAssetsTableCardListSkeleton />;
	} else {
		if (assetListError) {
			totalPagesRef.current = null;
			tableSection = <NoResult />;
		} else {
			if (!isNaN(relayerAssetList?.length)) {
				totalPagesRef.current = relayerAssetList?.length;
			} else {
				totalPagesRef.current = null;
			}
			if (relayerAssetList?.length > 0) {
				let arrayRelayerAssets = pageId === 1 ? relayerAssetList.slice(0,5) : relayerAssetList.slice((pageId - 1) * 5,((pageId - 1) * 5) + 5);
				tableSection = isLargeScreen ? <RelayersAssetTable data={arrayRelayerAssets} /> : <RelayersAssetsTableCardList data={arrayRelayerAssets} />;
			} else {
				tableSection = <NoResult />;
			}
		}
	}
	paginationSection = totalPagesRef.current ? (
		<Pagination pages={Math.ceil(totalPagesRef.current / 5) || 1} page={pageId} onChange={(e, page) => onPageChange(page)} />
	) : (
		<></>
	);

	return (
		<>
			{titleSection}
			<Container fixed className={cx("relayers")}>
				{statusCardList}
				<Grid container spacing={2} className={cx("relayers-card-list")}>
					<Grid item lg={4} xs={12}>
						{relayerAssets}
					</Grid>
					<Grid item lg={8} xs={12}>
						<div className={cx("relayers-assets-card")}>
							<RelayersAssetSearch total={relayerAssetList?.length || 0} assetSearch={assetSearch} setAssetSearch={setAssetSearch} />
							{tableSection}
							{paginationSection}
						</div>
					</Grid>
				</Grid>
				<div className={cx("relayers-transactions")}>
					{relayerTransactions}
				</div>
			</Container>
		</>
	);
};

export default RelayerDetail;
