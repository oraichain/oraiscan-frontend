import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import {useParams} from "react-router-dom";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import ComingSoon from "src/components/common/ComingSoon";
import {ProposalsListTable} from "src/components/Proposals";
import consts from "src/constants/consts";
import {useFetch} from "src/hooks";
import styles from "./Proposals.scss";
import TogglePageBar from "src/components/common/TogglePageBar";

const cx = cn.bind(styles);

export default function(props) {
	// const {detailId} = useParams();
	// const url = `${consts.LCD_API_BASE}${consts.LCD_API.DATA_SOURCE_DETAIL}/${detailId}`;
	// const [state, , , , setUrl] = useFetch(`${url}`);
	// const pages = parseInt(state?.data?.result?.count || 0);
	// const onPageChange = page => {
	// 	setUrl(`${url}`);
	// };
	// const dataForStatusBox = [
	// 	{
	// 		label: "Price",
	// 		value: "$455.73",
	// 	},
	// 	{
	// 		label: "Height",
	// 		value: "4,374,598",
	// 	},
	// 	{
	// 		label: "Bonded",
	// 		value: "189,132,631",
	// 	},
	// 	{
	// 		label: "Inflation",
	// 		value: "7.00%",
	// 	},
	// ];

	// const switchList = ["All", "Core", "Community", "Active", "Pending", "Closed"];
	// const [activeSwitchItem, setActiveSwitchItem] = useState("All");
	// const onActiveSwitchItem = item => {
	// 	setActiveSwitchItem(item);
	// };

	// const Board = () => {
	// 	return (
	// 		<div className={cx("board")}>
	// 			<div className={cx("board__badge")}>
	// 				<span className={cx("board__badge-text")}>#32</span>
	// 				<button>
	// 					<svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
	// 						<path
	// 							d='M5.73959 9.96337C5.66298 9.96346 5.5871 9.9484 5.51632 9.91907C5.44555 9.88974 5.38127 9.84671 5.32717 9.79245L3.08727 7.55256C3.0326 7.49852 2.98915 7.43419 2.95943 7.3633C2.9297 7.2924 2.91429 7.21633 2.91406 7.13945C2.91384 7.06258 2.92882 6.98641 2.95814 6.91535C2.98745 6.84428 3.03053 6.77971 3.08489 6.72535C3.13925 6.67099 3.20381 6.62791 3.27488 6.59859C3.34594 6.56927 3.4221 6.55429 3.49898 6.55451C3.57586 6.55472 3.65193 6.57014 3.72283 6.59986C3.79373 6.62958 3.85805 6.67302 3.9121 6.72769L5.73959 8.55516L10.0873 4.20751C10.1967 4.0985 10.345 4.03737 10.4995 4.03754C10.6539 4.0377 10.8021 4.09915 10.9113 4.20839C11.0205 4.31763 11.082 4.46574 11.0821 4.62023C11.0823 4.77471 11.0211 4.92295 10.9121 5.03241L6.15201 9.7925C6.09791 9.84675 6.03363 9.88977 5.96285 9.91909C5.89208 9.94841 5.8162 9.96346 5.73959 9.96337Z'
	// 							fill='#12C90E'
	// 						/>
	// 					</svg>
	// 					<span>Passed</span>
	// 				</button>
	// 			</div>

	// 			<div className={cx("board__title")}>Funding for Development of Governance Split Votes Funding for Development of Governance Split Votes</div>

	// 			<div className={cx("board__proposer")}>
	// 				<span className={cx("board__proposer-title")}>Proposer</span>
	// 				<span className={cx("board__proposer-content")}>Sikka</span>
	// 			</div>

	// 			<div className={cx("board__vote")}>
	// 				<span className={cx("board__vote-title")}>Voting Start</span>
	// 				<span className={cx("board__vote-content")}>2020-11-25 02:05:51</span>
	// 			</div>

	// 			<div className={cx("board__vote", "board__vote--last")}>
	// 				<span className={cx("board__vote-title")}>Voting End</span>
	// 				<span className={cx("board__vote-content")}>2020-11-25 02:05:51</span>
	// 			</div>

	// 			<div className={cx("board__progress")}>
	// 				<div
	// 					className={cx("board__progress-run")}
	// 					style={{
	// 						width: `30%`,
	// 					}}></div>
	// 			</div>

	// 			<div className={cx("board__more")}>
	// 				<div className={cx("board__more-title")}>Most voted on</div>
	// 				<div className={cx("board__more-content")}>
	// 					<span>View more</span>
	// 					<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
	// 						<path
	// 							d='M17.9995 10.1403C17.9995 10.4557 17.7435 10.7117 17.4281 10.7117L2.57141 10.7117C2.25599 10.7117 2 10.4557 2 10.1403C2 9.82484 2.25599 9.56885 2.57141 9.56885H17.4281C17.7435 9.56885 17.9995 9.82484 17.9995 10.1403Z'
	// 							fill='#1B57F0'
	// 						/>
	// 						<path
	// 							d='M18.0004 10.1418C18.0004 10.2881 17.9444 10.4344 17.8335 10.5464L13.2622 15.1177C13.0394 15.3405 12.6771 15.3405 12.4542 15.1177C12.2314 14.8948 12.2314 14.5326 12.4542 14.3097L16.621 10.1418L12.4542 5.97511C12.2314 5.75226 12.2314 5.38998 12.4542 5.16713C12.6771 4.94428 13.0394 4.94428 13.2622 5.16713L17.8335 9.73843C17.9444 9.84928 18.0004 9.99556 18.0004 10.1418Z'
	// 							fill='#1B57F0'
	// 						/>
	// 					</svg>
	// 				</div>
	// 			</div>

	// 			<div className={cx("board__percent")}>
	// 				<div className={cx("board__percent-circle")}></div>
	// 				<div className={cx("board__percent-content")}>Yes 84.37%</div>
	// 			</div>
	// 		</div>
	// 	);
	// };

	// return (
	// 	<Container fixed className={cx("validator-list")}>
	// 		<TitleWrapper>
	// 			<PageTitle title='Coming Soon' />
	// 			<StatusBox data={dataForStatusBox} />
	// 		</TitleWrapper>
	// 		<div className={cx("board-list")}>
	// 			<Board />
	// 			<Board />
	// 			<Board />
	// 			<Board />
	// 		</div>

	// 		<div className={cx("switch-tab")}>
	// 			<div className={cx("switch-tab__list")}>
	// 				{switchList.map((item, index) => (
	// 					<div
	// 						onClick={() => onActiveSwitchItem(item)}
	// 						key={index}
	// 						className={item === activeSwitchItem ? cx("switch-tab__item", "active") : cx("switch-tab__item")}>
	// 						{item}
	// 					</div>
	// 				))}
	// 			</div>
	// 		</div>

	// 		<ProposalsListTable />
	// 	</Container>
	// );

	const theme = useTheme();
	const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

	let titleSection;
	if (isLargeScreen) {
		titleSection = (
			<TitleWrapper>
				<PageTitle title={"Proposals"} />
				<StatusBox />
			</TitleWrapper>
		);
	} else {
		titleSection = <TogglePageBar type='proposals' />;
	}

	return (
		<Container fixed className={cx("proposals")}>
			{titleSection}
			<ComingSoon />
		</Container>
	);
}
