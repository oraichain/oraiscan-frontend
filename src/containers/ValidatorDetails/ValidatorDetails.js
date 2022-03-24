// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector } from "react-redux";
import { useGet } from "restful-react";
import cn from "classnames/bind";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import consts from "src/constants/consts";
import { logoBrand } from "src/constants/logoBrand";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import BackTitle from "src/components/common/BackTitle";
import AddressCard from "src/components/ValidatorDetails/AddressCard/AddressCard";
import AddressCardSkeleton from "src/components/ValidatorDetails/AddressCard/AddressCardSkeleton";
import DetailCard from "src/components/ValidatorDetails/DetailCard/DetailCard";
import DetailCardSkeleton from "src/components/ValidatorDetails/DetailCard/DetailCardSkeleton";
import ProposedBlocksCard from "src/components/ValidatorDetails/ProposedBlocksCard/ProposedBlocksCard";
import MissedBlocksCard from "src/components/ValidatorDetails/MissedBlocksCard";
import styles from "./ValidatorDetails.scss";
import DelegatorsCard from "src/components/ValidatorDetails/DelegatorsCard";
import NavigateBackBar from "src/components/common/NavigateBackBar";

const cx = cn.bind(styles);

const ValidatorDetails = ({ match }) => {
	const validatorParam = match.params.validator;
	let validatorAddress;
	if (validatorParam.startsWith("oraivaloper1")) {
		validatorAddress = validatorParam;
	} else {
		validatorAddress = logoBrand.find(item => item.name === validatorParam)?.operatorAddress ?? "";
	}

	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	const path = `${consts.API.VALIDATOR}/${validatorAddress}`;
	const { data, loading, error } = useGet({
		path: path,
	});

	const titleSection = isLargeScreen ? (
		<Container fixed>
			<TitleWrapper>
				<PageTitle title={"Validator details"} />
				<StatusBox />
			</TitleWrapper>
		</Container>
	) : (
		<>
			<TogglePageBar type='validators' />
			<NavigateBackBar type='validators' />
		</>
	);

	let addressCard;
	let detailCard;
	let proposedBlocksCard;
	let missedBlocksCard;
	let delegatorsCard;

	if (loading) {
		addressCard = <AddressCardSkeleton />;

		detailCard = <DetailCardSkeleton />;
	} else {
		if (error) {
			addressCard = <AddressCard moniker='-' operatorAddress='-' address='-' nonce={0} />;
			detailCard = <DetailCard data={{}} />;
		} else {
			addressCard = (
				<AddressCard
					moniker={data?.moniker ?? "-"}
					operatorAddress={data?.operator_address ?? "-"}
					address={data?.account_address ?? "-"}
					isInactive={data?.jailed}
					nonce={data?.nonce}
				/>
			);
			detailCard = <DetailCard data={data} />;
		}
	}

	missedBlocksCard = <MissedBlocksCard validatorAddress={validatorAddress} />;
	proposedBlocksCard = <ProposedBlocksCard validatorAddress={validatorAddress} />;
	delegatorsCard = <DelegatorsCard validatorAddress={validatorAddress} />;

	return (
		<>
			{titleSection}
			<Container fixed className={cx("validator-details")}>
				<Grid container spacing={2}>
					<Grid item lg={4} xs={12}>
						{addressCard}
					</Grid>
					<Grid item lg={8} xs={12}>
						{detailCard}
					</Grid>
					<Grid item lg={6} xs={12}>
						{proposedBlocksCard}
					</Grid>
					<Grid item lg={6} xs={12}>
						{missedBlocksCard}
					</Grid>
					<Grid item lg={6} xs={12}>
						{delegatorsCard}
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default ValidatorDetails;
