import React from "react";
import {useParams} from "react-router-dom";
import {useGet} from "restful-react";
import cn from "classnames/bind";
import {Grid} from "@material-ui/core";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import consts from "src/constants/consts";
import ContractPreview from "src/components/SmartContract/ContractPreview";
import MoreInfo from "src/components/SmartContract/MoreInfo";
import SmartContractCodeCard from "src/components/SmartContract/SmartContractCodeCard";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import NotFound from "src/components/common/NotFound";
import NavigateBackBar from "src/components/common/NavigateBackBar";
import TransactionCard from "./TransactionCard";
import styles from "./SmartContract.module.scss";
import TransactionTableSkeleton from "src/components/TxList/TransactionTable/TransactionTableSkeleton";
import TransactionCardListSkeleton from "src/components/TxList/TransactionCardList/TransactionCardListSkeleton";

const cx = cn.bind(styles);

const SmartContract = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const params = useParams();
	const address = params?.["address"];
	const path = `${consts.API.SMART_CONTRACT}/${address}`;
	const {data, loading, error, refetch} = useGet({
		path: path,
	});

	let titleSection;
	let tableSection;

	titleSection = isLargeScreen ? (
		<Container fixed>
			<TitleWrapper>
				<PageTitle title={"Smart Contract"} />
				<StatusBox />
			</TitleWrapper>
		</Container>
	) : (
		<>
			<TogglePageBar type='smart-contracts' />
			<NavigateBackBar type='smart-contracts' />
		</>
	);

	if (loading) {
		// headerCard = <SmartContractCardSkeleton />;
		tableSection = isLargeScreen ? <TransactionTableSkeleton /> : <TransactionCardListSkeleton />;
	} else {
		if (error) {
			return <NotFound message={"Sorry! Smart Contract Not Found"} />;
		} else {
			// headerCard = <SmartContractCard data={data} />;
			tableSection = <TransactionCard address={data?.address} />;
		}
	}

	// transactionsCard = <TransactionsCard height={address} />;

	return (
		<>
			{titleSection}
			<Container fixed className={cx("smart-contract")}>
				<div className={cx("header-card")}>
					<Grid spacing={2} container>
						<ContractPreview data={data} />
						<MoreInfo data={data} />
					</Grid>
				</div>
				<SmartContractCodeCard data={data} />
				{tableSection}
			</Container>
		</>
	);
};

SmartContract.propTypes = {};
SmartContract.defaultProps = {};

export default SmartContract;
