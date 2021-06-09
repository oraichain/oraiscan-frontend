import React from "react";
import {useParams} from "react-router-dom";
import {useGet} from "restful-react";
import cn from "classnames/bind";
import PropTypes from "prop-types";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import consts from "src/constants/consts";
import HeaderCard from "src/components/Block/HeaderCard";
import HeaderCardSkeleton from "src/components/Block/HeaderCard/HeaderCardSkeleton";
import TransactionsCard from "src/components/Block/TransactionsCard";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import NotFound from "src/components/common/NotFound";
import NavigateBackBar from "src/components/common/NavigateBackBar";
import styles from "./Block.module.scss";

const cx = cn.bind(styles);

const Block = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const params = useParams();
	const height = parseInt(params?.["height"]);
	const path = `${consts.API_BASE}${consts.API.BLOCKLIST}?&limit=1&before=${height + 1}`;
	const {data: data, loading: loading, error: error} = useGet({
		path: path,
	});

	let titleSection;
	let headerCard;
	let transactionsCard;

	titleSection = isLargeScreen ? (
		<Container fixed>
			<TitleWrapper>
				<PageTitle title={"Block details"} />
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
		headerCard = <HeaderCardSkeleton />;
	} else {
		if (error) {
			return <NotFound message={"Sorry! Block Not Found"} />;
		} else {
			headerCard = <HeaderCard data={data?.data?.[0]} />;
		}
	}

	transactionsCard = <TransactionsCard height={height} />;

	return (
		<>
			{titleSection}
			<Container fixed className={cx("block")}>
				{headerCard}
				{transactionsCard}
			</Container>
		</>
	);
};

Block.propTypes = {};
Block.defaultProps = {};

export default Block;
