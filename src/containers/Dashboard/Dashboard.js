import React from "react";
import cn from "classnames/bind";
import { useDispatch } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { themeIds, themes } from "src/constants/themes";
import { setActiveThemeId } from "src/store/modules/activeThemeId";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import TogglePageBar from "src/components/common/TogglePageBar";
import InfoCard from "src/components/Dashboard/InfoCard";
import BlocksCard from "src/components/Dashboard/BlocksCard";
import TransactionsCard from "src/components/Dashboard/TransactionsCard";
import styles from "./Dashboard.scss";
import PopupDashboard from "src/components/Dashboard/PopupDashboard";

const cx = cn.bind(styles);

export default function (props) {
	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
	const dispatch = useDispatch();

	let titleSection;
	let infoCard;
	let blocksCard;
	let transactionCard;
	let popupDashboard;

	titleSection = isLargeScreen ? (
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

	infoCard = <InfoCard />;
	blocksCard = <BlocksCard />;
	transactionCard = <TransactionsCard />;
	popupDashboard = <PopupDashboard />;

	return (
		<>
			{titleSection}
			<Container fixed className={cx("dashboard")}>
				{/* {popupDashboard} */}
				<Grid container spacing={4}>
					<Grid item lg={12} xs={12}>
						{infoCard}
					</Grid>
					<Grid item lg={6} xs={12}>
						{blocksCard}
					</Grid>
					<Grid item lg={6} xs={12}>
						{transactionCard}
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
