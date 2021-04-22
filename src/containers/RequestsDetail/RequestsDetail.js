// @ts-nocheck
import React from "react";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import {useParams} from "react-router-dom";
import DonutChart from "react-donut-chart";
import Grid from "@material-ui/core/Grid";

import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import {ReactComponent as InformationIcon} from "src/assets/icons/information.svg";
import {ReactComponent as SuccessIcon} from "src/assets/icons/success.svg";

import DelegationCard from "./RequestTable";
import styles from "./RequestsDetail.scss";

const cx = cn.bind(styles);

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

	return (
		<Container fixed className={cx("validator-list")}>
			<TitleWrapper>
				<PageTitle title='Proposals Details' />
				<StatusBox data={dataForStatusBox} />
			</TitleWrapper>

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
							<div className={cx("data-request-table__info-code-item-title", "test-cases")}>
								{" "}
								Test Cases <InformationIcon />{" "}
							</div>
							<div className={cx("data-request-table__info-code-item-content", "data-request-table__info-code-item-content-type1")}>
								<span>#test11</span> <span>#test12</span> <span>#test13</span>
							</div>
						</div>
						<div className={cx("data-request-table__info-code-item")}>
							<div className={cx("data-request-table__info-code-item-title")}> Block Height </div>
							<div className={cx("data-request-table__info-code-item-content")}> 472230 </div>
						</div>
						<div className={cx("data-request-table__info-code-item")}>
							<div className={cx("data-request-table__info-code-item-title")}> Fee </div>
							<div className={cx("data-request-table__info-code-item-content")}> 10,000 ORAI </div>
						</div>
						<div className={cx("data-request-table__info-code-item")}>
							<div className={cx("data-request-table__info-code-item-title")}> Status </div>
							<div className={cx("data-request-table__info-code-item-content", "status")}>
								{" "}
								<SuccessIcon /> Success{" "}
							</div>
						</div>
					</div>
				</div>

				<div className={cx("data-request-table__info", "margin-top-20")}>
					<div className={cx("data-request-table__info-head")}> Reporter </div>
					<div className={cx("data-request-table__info-code")}>
						<div className={cx("data-request-table__info-code-item")}>
							<div className={cx("data-request-table__info-code-item-title")}> Address </div>
							<div className={cx("data-request-table__info-code-item-content")}> orai14vcw5qk0tdvknpa38wz46js5g7vrvut8lk0lk6 </div>
						</div>
						<div className={cx("data-request-table__info-code-item")}>
							<div className={cx("data-request-table__info-code-item-title")}> Name </div>
							<div className={cx("data-request-table__info-code-item-content")}> g3 </div>
						</div>
						<div className={cx("data-request-table__info-code-item")}>
							<div className={cx("data-request-table__info-code-item-title")}> Validator </div>
							<div className={cx("data-request-table__info-code-item-content")}> oraivaloper14vcw5qk0tdvknpa38wz46js5g7vrvut8ku5kaa </div>
						</div>
					</div>
				</div>
			</div>

			<Grid container spacing={2} className={cx("request-table-area")}>
				<Grid item lg={6} xs={12}>
					<DelegationCard />
				</Grid>
				<Grid item lg={6} xs={12}>
					<DelegationCard />
				</Grid>
			</Grid>
		</Container>
	);
}
