import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGet } from "restful-react";
import cn from "classnames/bind";
import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import consts from "src/constants/consts";
import ContractPreview from "src/components/SmartContract/ContractPreview";
import MoreInfo from "src/components/SmartContract/MoreInfo";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import NavigateBackBar from "src/components/common/NavigateBackBar";
import ContractCard from "./ContractCard";
import styles from "./VerifiedContract.module.scss";

const cx = cn.bind(styles);

const VerifiedContract = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const params = useParams();
	const address = params?.["address"];
	const path = `${consts.API_CONTRACT_DEPLOY}${consts.PATH_CONTRACT.LIST}/${address}`;

	const {data, loading, error, refetch} = useGet({
		path: path,
	});

	let titleSection;
	let tableSection;

	titleSection = isLargeScreen ? (
		<Container fixed>
			<TitleWrapper>
				<PageTitle title={""} />
				<StatusBox />
			</TitleWrapper>
		</Container>
	) : (
		<>
			<TogglePageBar type='smart-contracts' />
			<NavigateBackBar type='smart-contracts' />
		</>
	);

	tableSection = <ContractCard address={data?.data?.data?.contract_address} data={data?.data} />;

	return (
		<>
			{titleSection}
			<Container fixed className={cx("smart-contract")}>
				<div className={cx("header-card")}>
					<Grid spacing={2} container>
						<ContractPreview data={{
							...data,
							address: data?.data?.data?.contract_address,
							code_id: data?.data?.data?.code_id,
						}} />
						<MoreInfo data={{
							...data,
							creator: data?.data?.data?.creator_address,
						}} />
					</Grid>
				</div>
				{tableSection}
			</Container>
		</>
	);
};

VerifiedContract.propTypes = {};
VerifiedContract.defaultProps = {};

export default VerifiedContract;
