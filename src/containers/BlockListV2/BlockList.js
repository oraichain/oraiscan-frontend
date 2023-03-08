import { useMediaQuery } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { useTheme } from "@material-ui/core/styles";
import cn from "classnames/bind";
import BlockTableWrapper from "src/components/BlockList/BlockTableWrapper/BlocksCard";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TitleWrapper from "src/components/common/TitleWrapper";
import TogglePageBar from "src/components/common/TogglePageBar";
import styles from "./BlockList.module.scss";

const cx = cn.bind(styles);

const BlockList = () => {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	const titleSection = isLargeScreen ? (
		<Container fixed>
			<TitleWrapper>
				<PageTitle title={"Blocks"} />
				<StatusBox />
			</TitleWrapper>
		</Container>
	) : (
		<TogglePageBar type='blocks' />
	);

	return (
		<>
			{titleSection}
			<Container fixed className={cx("block-list")}>
				<BlockTableWrapper isShowMore={true} />
			</Container>
		</>
	);
};

export default BlockList;
