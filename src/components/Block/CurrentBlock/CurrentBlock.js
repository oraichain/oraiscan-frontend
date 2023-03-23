import { useMediaQuery, useTheme } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import { useGet } from "restful-react";
import HeaderCard from "src/components/Block/HeaderCard";
import HeaderCardSkeleton from "src/components/Block/HeaderCard/HeaderCardSkeleton";
import TransactionsCard from "src/components/Block/TransactionsCard";
import NavigateBackBar from "src/components/common/NavigateBackBar";
import NotFound from "src/components/common/NotFound";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TitleWrapper from "src/components/common/TitleWrapper";
import TogglePageBar from "src/components/common/TogglePageBar";
import consts from "src/constants/consts";
import styles from "./CurrentBlock.module.scss";

const cx = cn.bind(styles);

const CurrentBlock = ({ height }) => {
	const theme = useTheme();

	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	const path = `${consts.API_BASE}${consts.API.BLOCK}/${height}`;
	const { data: data, loading: loading, error: error } = useGet({
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
			headerCard = <HeaderCard data={data} />;
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

export default CurrentBlock;
