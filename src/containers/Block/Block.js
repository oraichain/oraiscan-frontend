import React, { useEffect } from "react";
import { useGet } from "restful-react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import { useParams } from "react-router-dom";
import CountdownRemainingBlock from "src/components/Block/CountdownRemainingBlock";
import CurrentBlock from "src/components/Block/CurrentBlock";
import { useCheckFutureBlock } from "src/hooks";
import styles from "./Block.module.scss";
import { getCryptoValidators } from "src/store/modules/blockchain";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import NavigateBackBar from "src/components/common/NavigateBackBar";
import HeaderCardSkeleton from "src/components/Block/HeaderCard/HeaderCardSkeleton";
import NotFound from "src/components/common/NotFound";
import HeaderCard from "src/components/Block/HeaderCard";
import consts from "src/constants/consts";

const cx = cn.bind(styles);

const Block = () => {
	const params = useParams();
	const height = parseInt(params?.["height"]);
	const path = `${consts.API_BASE}${consts.API.BLOCK}/${height}`;
	const { data: data, loading: loading, error: error } = useGet({
		path: path,
	});
	const dispatch = useDispatch();
	const [isFutureBlock, remainingBlock] = useCheckFutureBlock(height);
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	useEffect(() => {
		const cancelToken = axios.CancelToken;
		const source = cancelToken.source();
		dispatch(getCryptoValidators(source.token));
	}, [])

	let titleSection;
	let headerCard;

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
			headerCard = <HeaderCard data={data} />;
		}
	}

	if (isFutureBlock === true) {
		return <Container fixed className={cx("block")}>
			<CountdownRemainingBlock remainingBlock={remainingBlock} height={height} />
		</Container>
	} else if (isFutureBlock === false) {
		return <CurrentBlock height={height} />
	} else return <></>

};

Block.propTypes = {};
Block.defaultProps = {};

export default Block;
