// @ts-nocheck
import React from "react";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import {useParams} from "react-router-dom";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import styles from "./RequestsDetail.scss";
// import {ProposalsListDetalTable} from "src/components/Proposals";
import DonutChart from "react-donut-chart";

const cx = cn.bind(styles);

const SuccessIcon = () => {
	return (
		<svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path
				d='M15.5917 6.00822C15.5142 5.93011 15.4221 5.86811 15.3205 5.82581C15.219 5.7835 15.11 5.76172 15 5.76172C14.89 5.76172 14.7811 5.7835 14.6796 5.82581C14.578 5.86811 14.4858 5.93011 14.4084 6.00822L8.20004 12.2249L5.59171 9.60822C5.51127 9.53052 5.41632 9.46942 5.31227 9.42842C5.20823 9.38742 5.09713 9.36731 4.98531 9.36924C4.87349 9.37118 4.76315 9.39512 4.66058 9.4397C4.55802 9.48427 4.46524 9.54862 4.38754 9.62905C4.30984 9.70949 4.24875 9.80444 4.20774 9.90848C4.16674 10.0125 4.14663 10.1236 4.14856 10.2354C4.1505 10.3473 4.17444 10.4576 4.21902 10.5602C4.2636 10.6627 4.32794 10.7555 4.40837 10.8332L7.60837 14.0332C7.68584 14.1113 7.77801 14.1733 7.87956 14.2156C7.98111 14.2579 8.09003 14.2797 8.20004 14.2797C8.31005 14.2797 8.41897 14.2579 8.52052 14.2156C8.62207 14.1733 8.71424 14.1113 8.79171 14.0332L15.5917 7.23322C15.6763 7.15518 15.7438 7.06047 15.79 6.95506C15.8361 6.84964 15.86 6.7358 15.86 6.62072C15.86 6.50563 15.8361 6.3918 15.79 6.28638C15.7438 6.18096 15.6763 6.08625 15.5917 6.00822Z'
				fill='#3FCC28'
			/>
		</svg>
	);
};

export default function(props) {
	// const {detailId} = useParams();
	// const url = `${consts.LCD_API_BASE}${consts.LCD_API.DATA_SOURCE_DETAIL}/${detailId}`;
	// const [state, , , , setUrl] = useFetch(`${url}`);
	// const pages = parseInt(state?.data?.result?.count || 0);
	// const onPageChange = page => {
	// 	setUrl(`${url}`);
	// };
	const dataForStatusBox = [
		{
			label: "Price",
			value: "$455.73",
		},
		{
			label: "Height",
			value: "4,374,598",
		},
		{
			label: "Bonded",
			value: "189,132,631",
		},
		{
			label: "Inflation",
			value: "7.00%",
		},
	];

	// const switchList = ["All(454)", "Yes(454)", "No(454)", "NoWithVeto(454)", "Abstain(454)"];
	// const [activeSwitchItem, setActiveSwitchItem] = useState("All");
	// const onActiveSwitchItem = item => {
	// 	setActiveSwitchItem(item);
	// };

	// 	const [showTenLine, setShowTenLine] = useState(false);

	// const onShowMore = () => {
	// 	setShowTenLine(!showTenLine);
	// };

	return (
		<Container fixed className={cx("validator-list")}>
			<TitleWrapper>
				<PageTitle title='Proposals Details' />
				<StatusBox data={dataForStatusBox} />
			</TitleWrapper>

			{/*			<div className={cx("head")}>
				<div className={cx("head__description")}>
					<div className={cx("description")}>
						<div className={cx("description__info")}>
							<div className={cx("description__info-id")}>
								<span>#32</span>
								<button>
									<svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
										<path
											d='M5.73959 9.96343C5.66298 9.96352 5.5871 9.94846 5.51632 9.91913C5.44555 9.8898 5.38127 9.84677 5.32717 9.79251L3.08727 7.55262C3.0326 7.49858 2.98915 7.43426 2.95943 7.36336C2.9297 7.29246 2.91429 7.21639 2.91406 7.13951C2.91384 7.06264 2.92882 6.98648 2.95814 6.91541C2.98745 6.84434 3.03053 6.77977 3.08489 6.72541C3.13925 6.67105 3.20381 6.62797 3.27488 6.59865C3.34594 6.56933 3.4221 6.55435 3.49898 6.55457C3.57586 6.55479 3.65193 6.5702 3.72283 6.59992C3.79373 6.62964 3.85805 6.67308 3.9121 6.72775L5.73959 8.55522L10.0873 4.20757C10.1967 4.09856 10.345 4.03743 10.4995 4.0376C10.6539 4.03776 10.8021 4.09921 10.9113 4.20845C11.0205 4.31769 11.082 4.4658 11.0821 4.62029C11.0823 4.77477 11.0211 4.92301 10.9121 5.03247L6.15201 9.79256C6.09791 9.84681 6.03363 9.88983 5.96285 9.91915C5.89208 9.94847 5.8162 9.96352 5.73959 9.96343Z'
											fill='#12C90E'
										/>
									</svg>
									<span>Passed</span>
								</button>
							</div>
							<div className={cx("description__info-title")}>
								Genesis fund recovery proposal on behalf of fundraiser participants unable to access their ATOMs
							</div>

							<div className={cx("description__info-tab-wrap")}>
								<div className={cx("description__info-tab")}>
									<div className={cx("description__info-tab-title")}>Proposer</div>
									<div className={cx("description__info-tab-content1")}>iqlusion</div>
								</div>
								<div className={cx("description__info-tab")}>
									<div className={cx("description__info-tab-title")}>Initial Deposit</div>
									<div className={cx("description__info-tab-content2")}>
										<span>512.00</span> ORAI
									</div>
								</div>
							</div>

							<div className={cx("description__info-tab-wrap")}>
								<div className={cx("description__info-tab")}>
									<div className={cx("description__info-tab-title")}>Type</div>
									<div className={cx("description__info-tab-content3")}>cosmos-sdk/TextProposal</div>
								</div>
								<div className={cx("description__info-tab")}>
									<div className={cx("description__info-tab-title")}>Total Deposit</div>
									<div className={cx("description__info-tab-content2")}>
										<span>512.00</span> ORAI
									</div>
								</div>
							</div>

							<div className={cx("description__info-tab-wrap")}>
								<div className={cx("description__info-tab")}>
									<div className={cx("description__info-tab-title")}>Voting Start</div>
									<div className={cx("description__info-tab-content3")}>2020-09-09 13:47:46</div>
								</div>
								<div className={cx("description__info-tab")}>
									<div className={cx("description__info-tab-title")}>Submit Time</div>
									<div className={cx("description__info-tab-content3")}>2020-09-09 13:47:46</div>
								</div>
							</div>

							<div className={cx("description__info-tab-wrap")}>
								<div className={cx("description__info-tab")}>
									<div className={cx("description__info-tab-title")}>Voting End</div>
									<div className={cx("description__info-tab-content3")}>2020-09-09 13:47:46</div>
								</div>
								<div className={cx("description__info-tab")}>
									<div className={cx("description__info-tab-title")}>Deposit End Time</div>
									<div className={cx("description__info-tab-content3")}>2020-09-09 13:47:46</div>
								</div>
							</div>
						</div>
						<div className={cx("description__content")}>
							<div className={cx("description__content-title")}>Description</div>
							<div className={showTenLine ? cx("description__content-main") : cx("description__content-main", "ten-line")}>
								The purpose of this proposal is to restore access to geneis ATOMs for a subset of donors who have been active participants in our community
								through the last year. The view of iqlusion is that this is an important moment for the Cosmos Hub. Stargate brings the fundraiser period to the
								end with delivery of IBC. This proposal resolves the open business of active members of our community who cannot access their ATOM ... The view
								of iqlusion is that this is an important moment for the Cosmos Hub. Stargate brings the fundraiser period to the end with delivery of IBC. This
								proposal resolves the open business of active members of our community who cannot access their ATOM ... The view of iqlusion is that this is an
								important moment for the Cosmos Hub. Stargate brings the fundraiser period to the end with delivery of IBC. This proposal resolves the open
								business of active members of our community who cannot access their ATOM ...
							</div>
							<div onClick={onShowMore} className={cx("description__content-more")}>
								{showTenLine ? "Show more" : "Hide"}
							</div>
						</div>
					</div>
				</div>
				<div className={cx("head__board")}>
					<div className={cx("board")}>
						<div className={cx("board__title")}>Total ORAI</div>
						<div className={cx("board__number")}>11,050,300.54</div>

						<div className={cx("board__chart")}>
							<DonutChart
								startAngle={-90}
								width={120}
								height={120}
								outerRadius={0.95}
								innerRadius={0.5}
								legend={false}
								data={[
									{value: parseFloat("81.96"), label: ""},
									{value: parseFloat("0.00"), label: ""},
									{value: parseFloat("5.37"), label: ""},
									{value: parseFloat("12.67"), label: ""},
								]}
								colors={["#51ADCF", "#A5ECD7", "#FFBF9B", "#0278AE"]}
								strokeColor={false}
							/>
						</div>

						<div className={cx("board__estimation")}>
							<div className={cx("board__estimation-item")}>
								<div className={cx("board__estimation-item-dot", "board__estimation-item-dot--type1")}></div>
								<div className={cx("board__estimation-item-info")}>
									<div className={cx("board__estimation-item-info-title")}>Available</div>
									<div className={cx("board__estimation-item-info-number")}>12.67%</div>
								</div>
							</div>

							<div className={cx("board__estimation-item")}>
								<div className={cx("board__estimation-item-dot", "board__estimation-item-dot--type2")}></div>
								<div className={cx("board__estimation-item-info")}>
									<div className={cx("board__estimation-item-info-title")}>Delegated</div>
									<div className={cx("board__estimation-item-info-number")}>12.67%</div>
								</div>
							</div>

							<div className={cx("board__estimation-item")}>
								<div className={cx("board__estimation-item-dot", "board__estimation-item-dot--type3")}></div>
								<div className={cx("board__estimation-item-info")}>
									<div className={cx("board__estimation-item-info-title")}>Unbonding</div>
									<div className={cx("board__estimation-item-info-number")}>12.67%</div>
								</div>
							</div>

							<div className={cx("board__estimation-item")}>
								<div className={cx("board__estimation-item-dot", "board__estimation-item-dot--type4")}></div>
								<div className={cx("board__estimation-item-info")}>
									<div className={cx("board__estimation-item-info-title")}>Reward</div>
									<div className={cx("board__estimation-item-info-number")}>12.67%</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={cx("table")}>
				<div className={cx("table__title")}>
					<div className={cx("table__title-text")}>Transactions</div>
					<div className={cx("switch-tab")}>
						<div className={cx("switch-tab__list")}>
							{switchList.map((item, index) => (
								<div
									onClick={() => onActiveSwitchItem(item)}
									key={index}
									className={item.includes(activeSwitchItem) ? cx("switch-tab__item", "active") : cx("switch-tab__item")}>
									{item}
								</div>
							))}
						</div>
					</div>
				</div>
				<ProposalsListDetalTable />
			</div>
*/}

			<div className={cx("data-request-table")}>
				<div className={cx("data-request-table__title")}>Request Info</div>

				<div className={cx("data-request-table__info")}>
					<div className={cx("data-request-table__info-head")}> Infomation </div>
					<div className={cx("data-request-table__info-code")}>
						<div className={cx("data-request-table__info-code-item")}>
							<div className={cx("data-request-table__info-code-item-title")}> RequestID </div>
							<div className={cx("data-request-table__info-code-item-content", "data-request-table__info-code-item-content-type1")}>
								<span>band1nl23kd2w7vehmk6d6scrs9jagqrdrxrat32vxv</span>
							</div>
						</div>
						<div className={cx("data-request-table__info-code-item")}>
							<div className={cx("data-request-table__info-code-item-title")}>Sender</div>
							<div className={cx("data-request-table__info-code-item-content", "data-request-table__info-code-item-content-type2")}>
								band1q3flqe8cdlcjywlg2qmtap32gkzjgh429qw5gs
							</div>
						</div>
						<div className={cx("data-request-table__info-code-item")}>
							<div className={cx("data-request-table__info-code-item-title")}>TX Hash</div>
							<div className={cx("data-request-table__info-code-item-content")}>F127B443F798126DFAF5C7185CC48F3875C12EE67FB8D5D767...</div>
						</div>
						<div className={cx("data-request-table__info-code-item")}>
							<div className={cx("data-request-table__info-code-item-title")}>Fee</div>
							<div className={cx("data-request-table__info-code-item-content", "data-request-table__info-code-item-content-type3")}>
								0.00 <span>ORAI</span>
							</div>
						</div>
					</div>

					<div className={cx("data-request-table__info-chart")}>
						<div className={cx("data-request-table__info-chart-left")}>
							<div className={cx("data-request-table__info-chart-left-status")}>
								<div className={cx("data-request-table__info-chart-left-status-title")}>Request Status</div>
								<div className={cx("data-request-table__info-chart-left-status-success")}>
									<SuccessIcon />
									Success
								</div>
							</div>

							<div className={cx("data-request-table__info-chart-left-report")}>
								<div className={cx("data-request-table__info-chart-left-report-title")}>Success Report</div>
								<div className={cx("data-request-table__info-chart-left-report-success")}>16/16 (> min 10)</div>
							</div>

							<div className={cx("data-request-table__info-chart-left-chartbox")}>
								<DonutChart
									startAngle={-90}
									width={120}
									height={120}
									outerRadius={0.95}
									innerRadius={0.5}
									legend={false}
									data={[
										{value: parseFloat("81.96"), label: ""},
										{value: parseFloat("0.00"), label: ""},
										{value: parseFloat("5.37"), label: ""},
										{value: parseFloat("12.67"), label: ""},
									]}
									colors={["#51ADCF", "#A5ECD7", "#FFBF9B", "#0278AE"]}
									strokeColor={false}
								/>

								<div className={cx("data-request-table__info-chart-left-chartbox-info")}>
									<div className={cx("data-request-table__info-chart-left-chartbox-info-tab1")}>
										<div></div>
									</div>
									<div className={cx("data-request-table__info-chart-left-chartbox-info-tab2")}></div>
								</div>
							</div>
						</div>
						<div className={cx("data-request-table__info-chart-middle")}>1</div>
						<div className={cx("data-request-table__info-chart-right")}>1</div>
					</div>
				</div>
			</div>
		</Container>
	);
}
