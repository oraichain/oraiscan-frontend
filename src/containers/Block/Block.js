import React from "react";
import {useParams} from "react-router-dom";
import {useGet} from "restful-react";
import cn from "classnames/bind";
import PropTypes from "prop-types";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import consts from "src/constants/consts";
import {_} from "src/lib/scripts";
import HeaderCard from "src/components/Block/HeaderCard";
import HeaderCardSkeleton from "src/components/Block/HeaderCard/HeaderCardSkeleton";
import TransactionsCard from "src/components/Block/TransactionsCard";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import NotFound from "src/components/common/NotFound";
import styles from "./Block.module.scss";

const cx = cn.bind(styles);

const Block = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const params = useParams();
	const height = params?.["height"];
	const basePath = `${consts.API_BASE}${consts.API.BLOCKLIST}?&limit=1`;
	const path = `${basePath}&before=${Number(height) + 1}`;
	const {data, loading, error, refetch} = useGet({
		path: path,
	});

	let titleSection;
	let headerCard;
	let transactionsCard;

	titleSection = isLargeScreen ? (
		<TitleWrapper>
			<PageTitle title={"Block details"} />
			<StatusBox />
		</TitleWrapper>
	) : (
		<TogglePageBar type='blocks' />
	);

	if (loading) {
		headerCard = <HeaderCardSkeleton />;
	} else {
		if (error) {
			return <NotFound message={"Sorry! Block Not Found"} />;
		} else {
			headerCard = <HeaderCard data={data?.data?.[0]} />;
		}
	}

	transactionsCard = <TransactionsCard data={data?.data?.[0]?.txs} loading={loading} error={error} />;

	return (
		<Container fixed className={cx("block")}>
			{titleSection}
			{headerCard}
			{transactionsCard}
		</Container>
	);
};

Block.propTypes = {};
Block.defaultProps = {};

export default Block;
