// @ts-nocheck
import React from "react";
import Container from "@material-ui/core/Container";
import cn from "classnames/bind";
import {useGet} from "restful-react";
import Grid from "@material-ui/core/Grid";
import {NavLink, useParams, useHistory} from "react-router-dom";
import queryString from "query-string";
import {_} from "src/lib/scripts";
import consts from "src/constants/consts";
import TitleWrapper from "src/components/common/TitleWrapper";
import PageTitle from "src/components/common/PageTitle";
import StatusBox from "src/components/common/StatusBox";
import {ReactComponent as InformationIcon} from "src/assets/icons/information.svg";
import CheckIcon from "src/icons/Validators/CheckIcon";
import FailedIcon from "src/icons/Transactions/FailedIcon";

import RequestContainer from "./RequestContainer";
import TestcaseResult from "./TestcaseResult";
import styles from "./RequestReportDetail.scss";

const cx = cn.bind(styles);

export default function() {
	const {id} = useParams();
	const history = useHistory();
	const queryStringParse = queryString.parse(history.location.search) || {};
	const address = queryStringParse?.validator_address ?? "";

	const path = `${consts.API.REQUESTS_REPORTS}/detail/${id}${address ? "?validator_address=" + address : ""}`;
	const {data, loading, error} = useGet({
		path: path,
	});

	return (
		<Container fixed className={cx("validator-list")}>
			<TitleWrapper>
				<PageTitle title='Request Detail' />
				<StatusBox />
			</TitleWrapper>

			<div className={cx("data-request-table")}>
				<div className={cx("data-request-table__title")}>Request Info</div>

				<div className={cx("data-request-table__info")}>
					<div className={cx("data-request-table__info-head")}> Infomation </div>
					<div className={cx("data-request-table__info-code")}>
						<div className={cx("data-request-table__info-code-item")}>
							<div className={cx("data-request-table__info-code-item-title")}> RequestID </div>
							{_.isNil(data?.request_id) ? (
								<div className={cx("data-request-table__info-code-item-content", "data-request-table__info-code-item-content-type1")}>-</div>
							) : (
								<NavLink
									className={cx("data-request-table__info-code-item-content", "data-request-table__info-code-item-content-type1")}
									to={`${consts.PATH.REQUESTS}/${data?.request_id}`}>
									{data?.request_id}
								</NavLink>
							)}
						</div>
						<div className={cx("data-request-table__info-code-item")}>
							<div className={cx("data-request-table__info-code-item-title", "test-cases")}>
								{" "}
								Test Cases <InformationIcon />{" "}
							</div>
							<div className={cx("data-request-table__info-code-item-content", "data-request-table__info-code-item-content-type1")}>
								{_.isNil(data?.test_cases) ? (
									<div className={cx("data-request-table__info-code-item-content", "data-request-table__info-code-item-content-type1")}>-</div>
								) : (
									<span className={cx("data-request-table__info-code-item-content", "data-request-table__info-code-item-content-type1")}>
										{data?.test_cases}
									</span>
								)}
							</div>
						</div>
						<div className={cx("data-request-table__info-code-item")}>
							<div className={cx("data-request-table__info-code-item-title")}> Block Height </div>
							{_.isNil(data?.block_height) ? (
								<div className={cx("data-request-table__info-code-item-content")}>-</div>
							) : (
								<span className={cx("data-request-table__info-code-item-content")}>{data?.block_height}</span>
							)}
						</div>
						<div className={cx("data-request-table__info-code-item")}>
							<div className={cx("data-request-table__info-code-item-title")}> Fee </div>
							{_.isNil(data?.fee) ? (
								<div className={cx("data-request-table__info-code-item-content")}>-</div>
							) : (
								<span className={cx("data-request-table__info-code-item-content")}>{data?.fee}</span>
							)}
						</div>
						<div className={cx("data-request-table__info-code-item")}>
							<div className={cx("data-request-table__info-code-item-title")}> Status </div>
							<div className={cx("data-request-table__info-code-item-content", "status")}>
								{" "}
								{_.isNil(data?.status) ? (
									<div className={cx("data-request-table__info-code-item-content")}>-</div>
								) : data?.status === "success" ? (
									<>
										<CheckIcon className={cx("status-success")} />
										<span>Success</span>
									</>
								) : (
									<>
										<FailedIcon className={cx("status-fail")} />
										<span>Failed</span>
									</>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className={cx("data-request-table__info", "margin-top-20")}>
					<div className={cx("data-request-table__info-head")}> Reporter </div>
					<div className={cx("data-request-table__info-code")}>
						<div className={cx("data-request-table__info-code-item")}>
							<div className={cx("data-request-table__info-code-item-title")}> Address </div>
							{_.isNil(data?.reporter_address) ? (
								<div className={cx("data-request-table__info-code-item-content")}>-</div>
							) : (
								<div className={cx("data-request-table__info-code-item-content")}>{data?.reporter_address}</div>
							)}
						</div>
						<div className={cx("data-request-table__info-code-item")}>
							<div className={cx("data-request-table__info-code-item-title")}> Name </div>
							{_.isNil(data?.reporter_name) ? (
								<div className={cx("data-request-table__info-code-item-content")}>-</div>
							) : (
								<div className={cx("data-request-table__info-code-item-content")}>{data?.reporter_name}</div>
							)}
						</div>
						<div className={cx("data-request-table__info-code-item")}>
							<div className={cx("data-request-table__info-code-item-title")}> Validator </div>
							{_.isNil(data?.reporter_validator) ? (
								<div className={cx("data-request-table__info-code-item-content")}>-</div>
							) : (
								<div className={cx("data-request-table__info-code-item-content")}>{data?.reporter_validator}</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<Grid container spacing={2} className={cx("request-table-area")}>
				<Grid item lg={6} xs={12}>
					<RequestContainer id={id} address={address} />
				</Grid>
				<Grid item lg={6} xs={12}>
					<TestcaseResult />
				</Grid>
			</Grid>
		</Container>
	);
}
