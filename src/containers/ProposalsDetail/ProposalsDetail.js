import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import {useParams} from "react-router-dom";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import consts from "src/constants/consts";
import {useFetch} from "src/hooks";
import styles from "./ProposalsDetail.scss";
import {ProposalsListDetalTable} from "src/components/Proposals";

const cx = cn.bind(styles);

export default function(props) {
	const {detailId} = useParams();
	const url = `${consts.LCD_API_BASE}${consts.LCD_API.DATA_SOURCE_DETAIL}/${detailId}`;
	const [state, , , , setUrl] = useFetch(`${url}`);
	const pages = parseInt(state?.data?.result?.count || 0);
	const onPageChange = page => {
		setUrl(`${url}`);
	};
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

	const switchList = ["All(454)", "Yes(454)", "No(454)", "NoWithVeto(454)", "Abstain(454)"];
	const [activeSwitchItem, setActiveSwitchItem] = useState("All");
	const onActiveSwitchItem = item => {
		setActiveSwitchItem(item);
	};

	const [showTenLine, setShowTenLine] = useState(false);

	const onShowMore = () => {
		setShowTenLine(!showTenLine);
	};

	return (
		<Container fixed className={cx("validator-list")}>
			<TitleWrapper>
				<PageTitle title='Proposals Details' />
				<StatusBox data={dataForStatusBox} />
			</TitleWrapper>

			<div className={cx("head")}>
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

						<div className={cx("board__chart")}></div>

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
		</Container>
	);
}
