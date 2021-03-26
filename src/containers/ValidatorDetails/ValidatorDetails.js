// @ts-nocheck
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {useGet} from "restful-react";
import cn from "classnames/bind";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import consts from "src/constants/consts";
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

const cx = cn.bind(styles);

const ValidatorDetails = ({match}) => {
	const validatorAddress = match.params.validator;

	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	const path = `${consts.API.VALIDATOR}/${validatorAddress}`;
	const {data, loading, error} = useGet({
		path: path,
	});

	const titleSection = isLargeScreen ? (
		<TitleWrapper>
			<PageTitle title={"Validators"} />
			<StatusBox />
		</TitleWrapper>
	) : (
		<>
			<TogglePageBar type='validators' />
			<BackTitle title='Validator details' to={consts.PATH.VALIDATORS} />
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
			addressCard = <AddressCard moniker='-' operatorAddress='-' address='-' />;
			detailCard = <DetailCard data={{}} />;
		} else {
			addressCard = <AddressCard moniker={data?.moniker ?? "-"} operatorAddress={data?.operator_address ?? "-"} address={data?.account_address ?? "-"} />;
			detailCard = <DetailCard data={data} />;
		}
	}

	missedBlocksCard = <MissedBlocksCard validatorAddress={validatorAddress} />;
	proposedBlocksCard = <ProposedBlocksCard validatorAddress={validatorAddress} />;
	delegatorsCard = <DelegatorsCard validatorAddress={validatorAddress} />;

	return (
		<Container fixed className={cx("validator-details")}>
			{titleSection}

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
	);
};

export default ValidatorDetails;
