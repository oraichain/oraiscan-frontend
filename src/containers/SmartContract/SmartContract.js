import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {useGet} from "restful-react";
import cn from "classnames/bind";
import {Grid} from "@material-ui/core";
import PropTypes from "prop-types";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import consts from "src/constants/consts";
import ContractPreview from "src/components/SmartContract/ContractPreview";
import MoreInfo from "src/components/SmartContract/MoreInfo";
import SmartContractCodeCard from "src/components/SmartContract/SmartContractCodeCard";
import TransactionsCard from "src/components/Block/TransactionsCard";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import NotFound from "src/components/common/NotFound";
import NavigateBackBar from "src/components/common/NavigateBackBar";
import styles from "./SmartContract.module.scss";

const cx = cn.bind(styles);

const Block = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const params = useParams();
	const address = parseInt(params?.["address"]);
	const [path, setPath] = useState("https://dog.ceo/api/breeds/image/1");
	const {data, loading, error, refetch} = useGet({
		path: path,
		lazy: true,
		mock: {
			loading: false,
			data: {
				address: "orai18vd8fpwxzck93qlwghaj6arh4p7c5n8903w6c8",
				code_id: "1",
				creator: "orai18hr8jggl3xnrutfujy2jwpeu0l76azprlvgrwt",
				admin: "",
				label: "aioracle test",
			},
			error: null,
		},
	});

	let titleSection;
	let headerCard;
	let transactionsCard;

	titleSection = isLargeScreen ? (
		<Container fixed>
			<TitleWrapper>
				<PageTitle title={"Smart Contract"} />
				<StatusBox />
			</TitleWrapper>
		</Container>
	) : (
		<>
			<TogglePageBar type='blocks' />
			<NavigateBackBar type='blocks' />
		</>
	);

	if (loading) {
		// headerCard = <SmartContractCardSkeleton />;
	} else {
		if (error) {
			return <NotFound message={"Sorry! Smart Contract Not Found"} />;
		} else {
			// headerCard = <SmartContractCard data={data} />;
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
				<SmartContractCodeCard />
			</Container>
		</>
	);
};

Block.propTypes = {};
Block.defaultProps = {};

export default Block;
