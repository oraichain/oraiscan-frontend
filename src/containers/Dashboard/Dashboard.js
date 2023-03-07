import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import cn from "classnames/bind";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TitleWrapper from "src/components/common/TitleWrapper";
import TogglePageBar from "src/components/common/TogglePageBar";
import BlocksCardV2 from "src/components/Dashboard/BlocksCardV2";
import InfoCard from "src/components/Dashboard/InfoCard";
import TransactionsCard from "src/components/Dashboard/TransactionsCard";
import styles from "./Dashboard.module.scss";

const cx = cn.bind(styles);

export default function() {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	const titleSection = isLargeScreen ? (
		<Container fixed>
			<TitleWrapper>
				<PageTitle title={"Dashboard"} />
				<StatusBox />
			</TitleWrapper>
		</Container>
	) : (
		<div>
			<TogglePageBar type='dashboard' />
		</div>
	);

	return (
		<>
			{titleSection}
			<Container fixed className={cx("dashboard")}>
				<Grid container spacing={4}>
					<Grid item lg={12} xs={12}>
						<InfoCard />
					</Grid>
					<Grid item lg={6} xs={12}>
						<BlocksCardV2 />
					</Grid>
					<Grid item lg={6} xs={12}>
						<TransactionsCard />
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
